import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
const Todo = () => {
  const [list, setList] = useState(null);
  const [textinputvalue, setTextinputvalue] = useState(null);
  const getdata = async () => {
    try {
      // const data = await database().ref('todo').once('value');
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          setList(tempData.val());
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  console.log('data', list);
  // add data in firebase realtime database
  const adddata = async () => {
    
   
    try {
      let index = list.length;
      const response = await database()
        .ref(`todo/${index}`)
        .set({Task: textinputvalue});
      console.log(response);
      setTextinputvalue("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: '600'}}>TODO APP</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="enter your task"
        value={textinputvalue}
        onChangeText={text => setTextinputvalue(text)}
      />
      <Button title="ADD" onPress={adddata}></Button>

      <View style={styles.Cardcontainer}>
        <Text>TODO LIST</Text>

        <FlatList
          data={list}
          renderItem={item => {
            console.log(item);
            if (item.item !== null) {
              return (
                <View style={styles.card}>
                  <Text>{item.item.Task}</Text>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    //    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  inputbox: {
    width: width - 30,
    borderWidth: 2,
    margin: 10,
    padding: 25,
    borderRadius: 15,
  },
  Cardcontainer: {},
  card: {},
});

export default Todo;

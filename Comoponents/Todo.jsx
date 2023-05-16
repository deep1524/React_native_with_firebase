import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
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
        const data = await database().ref('todo/1').once('value');
        console.log(data);
        setList(data.val());
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        getdata();
    }, []);
// add data in firebase realtime database
  const adddata = async () => {
    try {
      const response = await database()
        .ref('todo/1')
        .set({Task: textinputvalue});
      console.log(response);
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


      <View>
        <Text>Task:-{list?list.Task:"loading"}</Text>
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
});

export default Todo;

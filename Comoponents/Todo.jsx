import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
const Todo = () => {
  const [list, setList] = useState(null);
  const [textinputvalue, setTextinputvalue] = useState(null);
  const [isupdate, setIsUpdate] = useState(false);
  const [selectedcardindex, setSelectedcardindex] = useState(null);

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
      if (textinputvalue.length > 0) {
        let index = list.length;
        const response = await database()
          .ref(`todo/${index}`)
          .set({Task: textinputvalue});
        console.log(response);
        setTextinputvalue('');
      } else {
        alert('Please enter a text input & then try again');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      if (textinputvalue.length > 0) {
        const response = await database()
          .ref(`todo/${selectedcardindex}`)
          .update({Task: textinputvalue});
        console.log(response);
        setTextinputvalue('');
        setIsUpdate(false);
      } else {
        alert('Please enter a text input & then try again');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlecardpress = (cardindex, cardvalue) => {
    try {
      setIsUpdate(true);
      setSelectedcardindex(cardindex);
      setTextinputvalue(cardvalue);
    } catch (error) {
      console.log(error);
    }
  };

  const handlelongpressdelete = (cardindex, cardvalue) => {
    try {
      Alert.alert('Alert', `Are you sure to delete:- ${cardvalue}`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel is press');
          },
        },
        {text: 'OK', onPress: async() => {
          try {
            const response=await database().ref(`todo/${cardindex}`).remove();
            console.log(response);
              setTextinputvalue("");
             setIsUpdate(false);


          } catch (error) {
            console.log('error');
          }
       
        },},
      ]);
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
      {!isupdate ? (
        <Button title="ADD" onPress={adddata}></Button>
      ) : (
        <Button title="Update" onPress={handleUpdate}></Button>
      )}

      <View style={styles.Cardcontainer}>
        <Text>TODO LIST</Text>

        <FlatList
          data={list}
          renderItem={item => {
            const cardindex = item.index;
            console.log(item);
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handlecardpress(cardindex, item.item.Task)}
                  onLongPress={() =>
                    handlelongpressdelete(cardindex, item.item.Task)
                  }>
                  <Text>{item.item.Task}</Text>
                </TouchableOpacity>
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

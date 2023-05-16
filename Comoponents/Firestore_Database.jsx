import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Firestore_Database = () => {
  const [user, setUser] = useState('');
  // fetch the user in firebase database
  const getdata = async () => {
    try {
      let data = await firestore()
        .collection('user')
        .doc('KQ5eKlw5jn7S5neY6H9H')
        .get();
      setUser(data._data);
      console.log(data._data.hobby);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <View>
      <Text>Name:{user ? user.name : 'Loading'}</Text>
      <Text>Name:{user ? user.age : 'Loading'}</Text>

      <Text>
        Hobby:{user ? user.hobby.map(list => `  ${list}`) : 'Loading'}
      </Text>
    </View>
  );
};

export default Firestore_Database;

import React from 'react';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

const HomeScreen = () => {
    const route=useRoute();
    const {email,usersid}=route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>HomeScreen</Text>
      <Text style={{fontSize: 15}}>Email:{email}</Text>
      <Text style={{fontSize: 15}}>UserID:{usersid}</Text>
    </View>
  );
};

export default HomeScreen;

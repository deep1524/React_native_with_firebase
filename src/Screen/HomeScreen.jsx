import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
    const navigation = useNavigation();
  // it will comes to route
  // const route=useRoute();
  // const {email,usersid}=route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>HomeScreen</Text>
      {/* // it will comes directly to auth */}
      <Text style={{fontSize: 15}}>Email:{Auth().currentUser.email}</Text>
      <Text style={{fontSize: 15}}>UserID:{Auth().currentUser.uid}</Text>
      <TouchableOpacity
        style={{
          marginVertical: 20,
          width: '80%',
          backgroundColor: 'red',
          alignItems: 'center',
          padding: 10,
          borderRadius: 20,
        }}
        onPress={async() => {
          await Auth().signOut();
          navigation.navigate('Login');
        }}>
        <Text style={{color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

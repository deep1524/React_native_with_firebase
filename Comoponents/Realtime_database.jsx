import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import database from '@react-native-firebase/database';
const Realtime_database = () => {
    const [user,setUser]=useState("");
    const getdata= async()=>{
        try {
      const data =await database().ref("users/1").once("value");
      console.log(data);
      setUser(data.val());
        } catch (error) {
          console.log(error)
        }
    
      }
      useEffect(()=>{
        getdata();
      },[]);
  return (
    <View>
    <Text>Name:{user?user.name:"Loading"}</Text>
    <Text>Name:{user?user.age:"Loading"}</Text>
   
    {/* <Text>Hobby:{user?user.hobby.map((list)=>`  ${list}`):"Loading"}</Text> */}

  </View>
  )
}

export default Realtime_database
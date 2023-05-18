import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';


import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Resister = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMesseage] = useState("")

  const handleSignUp = async () => {
    try {
     const isusercreated=await auth().createUserWithEmailAndPassword(email,pass) ;  
     console.log(isusercreated);
    } catch (error) {
      console.log(error)
        setMesseage(error.message)
    }
  };
  console.log("error",message);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: '600'}}>META HUB</Text>
      <TextInput
        style={styles.inputbox}
        placeholder="enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
     
      <TextInput
        style={styles.inputbox}
        placeholder="enter your password"
        value={pass}
        onChangeText={text => setPass(text)}
        secureTextEntry={true}
      />
     <Text>{message}</Text>
      <Button title="SignUp" onPress={() => handleSignUp()}></Button>
      
    </View>
  );
};

const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
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
export default Resister;

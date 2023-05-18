import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMesseage] = useState("")
  const navigation = useNavigation();
  const handleSignUp = async () => {
    try {
        if(email.length && pass.length>0){
            const isusercreated=await auth().createUserWithEmailAndPassword(email,pass) ;  
            console.log(isusercreated);
            navigation.navigate('Login');
        }else{
            alert("Please fill the detailes")
        }
    
    } catch (error) {
      console.log(error)
        setMesseage(error.message)
    }
  };
  console.log("error",message);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: '600'}}>Signup</Text>
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
   
      <Button title="SignUp" onPress={() => handleSignUp()}></Button>
      <Text>{message}</Text>

      <TouchableOpacity style={styles.login} onPress={()=>{navigation.navigate("Login")}} >
        <Text style={{color:"blue"}}>Allready Have An Account!</Text>
      </TouchableOpacity>
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
  login:{
    alignItems:"center",
  }
});
export default SignUpScreen;

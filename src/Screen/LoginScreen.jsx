import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {StackActions, useNavigation} from '@react-navigation/native';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMesseage] = useState('');
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
        if(email.length > 0 && pass.length>0){
           
            const isuserLogin = await auth().signInWithEmailAndPassword(email, pass);
            console.log(isuserLogin);
            if(isuserLogin.user.emailVerified){
                 alert("You are verified");
                  navigation.dispatch(StackActions.replace("Home"));
            }else{
              alert("please verify your email");
              await auth().currentUser.sendEmailVerification();
              await auth().signOut(); 
            }
            // setMesseage('');
            // navigation.navigate('Home', {
            //   email: isuserLogin.user.email,
            //   usersid: isuserLogin.user.uid,
            // });
           
        }else{
            alert("please fill the username and password")
        }
    
    } catch (error) {
      console.log(error);
      setMesseage(error.message);
    }
  };
  console.log('error', message);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: '600'}}>LOGIN</Text>
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
     
      <Button title="Login" onPress={() => handleLogin()}></Button>
      <Text>{message}</Text>
{/* 
      // signup */}
      <TouchableOpacity style={styles.signup} onPress={()=>{navigation.navigate("Resister")}} >
        <Text style={{color:"blue"}}>New user Signup Here!</Text>
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
  signup:{
    alignItems:"center",
     
  }
});
export default LoginScreen;

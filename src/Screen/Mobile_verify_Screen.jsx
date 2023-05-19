import {View, Text, TextInput, Button} from 'react-native';
import React,{useState} from 'react';
import auth from '@react-native-firebase/auth';
const Mobile_verify_Screen = () => {
  const [mobile, setMobile] = useState('');
  const [otpinput, setOtpinput] = useState('');
  const [confirmdata, setConfirmdata] = useState('');
  const sendOTP = async () => {
    try {
        
    const mobileno='+91'+ mobile;
      const response = await auth().signInWithPhoneNumber(mobileno);
      setConfirmdata(response);
      console.log(response);
      alert('Otp send your mobile number..');
    } catch (error) {
      console.log(error);
    }
  };
  const SubmitOTP = async () => {
    try {
        const response =await confirmdata.confirm(otpinput);
        console.log(response);
        alert("your number is verified")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
        Mobile_verify_Screen
      </Text>
      <TextInput
        style={{borderWidth: 2, width: '90%', padding: 10, margin: 10}}
        placeholder="enter your Mobile number"
        onChangeText={text => setMobile(text)}></TextInput>
      <Button title="Send OTP" onPress={() => sendOTP()} />
      <TextInput
        style={{borderWidth: 2, width: '90%', padding: 10, margin: 10}}
        placeholder="enter your OTP"
        onChangeText={text => setOtpinput(text)}></TextInput>
      <Button title="Submit" onPress={() => SubmitOTP()} />
    </View>
  );
};

export default Mobile_verify_Screen;

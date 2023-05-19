import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpScreen from '../Screen/SignupScreen';
import LoginScreen from '../Screen/LoginScreen';
import HomeScreen from '../Screen/HomeScreen';
import SplashScreen from '../Screen/SplashScreen';
import Mobile_verify_Screen from '../Screen/Mobile_verify_Screen';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mobile" component={Mobile_verify_Screen} />

        {/* <Stack.Screen
         name="Splash" 
         component={SplashScreen} 
         />
        <Stack.Screen
         name="Login" 
         component={LoginScreen} 
         />
        <Stack.Screen
          name="Resister"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

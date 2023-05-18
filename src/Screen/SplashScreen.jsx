import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
const SplashScreen = () => {
  const navigation = useNavigation();
  // to find out the use state

  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';
        // navigation.navigate(routeName);
        navigation.dispatch(StackActions.replace(routeName)); 
        
      });
    }, 3000);

    return () => {};
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

import React from 'react';
import Firestore_Database from './Comoponents/Firestore_Database';
import { View } from 'react-native';
import Realtime_database from './Comoponents/Realtime_database';
const App = () => {
  return (
    <View>
     {/* <Firestore_Database/> */}
     <Realtime_database/>
    </View>
  );
};

export default App;


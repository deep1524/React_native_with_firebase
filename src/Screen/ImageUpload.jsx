import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


import storage from '@react-native-firebase/storage';


const ImageUpload = () => {
  const [imagedata, setImagedata] = useState("");
  const pickimage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log(response);
      setImagedata(response);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadimage=async()=>{
    try {
        const response=await storage().ref("/profile/1.png").putFile(imagedata.uri);
       console.log(response);
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ImageUpload</Text>
      {imagedata ? <Image source={{uri: imagedata.uri}}  style={{height:100,width:100}}/> : <Text>No image found</Text>}
      <View style={{width:'100%',flexDirection:"row",justifyContent:"space-around"}}>

    
      <Button title="Select Image" onPress={() => pickimage()}></Button>

      <Button title="Upload Image" onPress={() => uploadimage()}></Button>
      </View>
    </View>
  );
};

export default ImageUpload;

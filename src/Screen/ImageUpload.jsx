import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


import storage from '@react-native-firebase/storage';


const ImageUpload = () => {
  const [imagedata, setImagedata] = useState("");
  const [fullimagerefpath, setfullimagerefpath] = useState("");
  const [imageurl, setimageurl] = useState("");
  const pickimage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo:"cachesDirectory",
      });
      console.log(response);
      setImagedata(response);
     
    } catch (error) {
      console.log(error);
    }
  };
  const uploadimage=  async()=>{
    try {
        const response= await storage().ref(`/profile/${imagedata.name}`).putFile(imagedata.fileCopyUri);
       console.log(response);
       setfullimagerefpath(response.metadata.fullPath)
      //  const url= await response.ref.getDownloadURL();
      //  setimageurl(url);
    } catch (error) {
        console.log(error);
        
    }
  }
  const deleteimage=()=>{
    try {
      
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
      <Button title="Delete Image" onPress={() => deleteimage()} color="red"></Button>
      </View>
      <View>
        <Text>Url:-{imageurl.length>0?imageurl:"Url not found"}</Text>
      </View>
    </View>
  );
};

export default ImageUpload;

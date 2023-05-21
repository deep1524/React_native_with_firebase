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
      alert("image successfully picked")
      setImagedata(response);
     
    } catch (error) {
      console.log(error);
    }
  };
  const uploadimage=  async()=>{
    try {
      //   const response= await storage().ref(`/profile/${imagedata.name}`).putFile(imagedata.fileCopyUri);
      //  console.log(response);
      const response=storage().ref(`/profile/${imagedata.name}`);
      const put=await response.putFile(imagedata.fileCopyUri);
       setfullimagerefpath(put.metadata.fullPath)
       const url= await response.getDownloadURL();
       setimageurl(url);
       alert("image upload sucessfully")
    } catch (error) {
        console.log(error);
        
    }
  }
  const deleteimage=async()=>{
    try {
      const response=await storage().ref(fullimagerefpath).delete();
      console.log(response);
      alert("image delete sucessfully");
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
      <View>
        <Image source={{uri:imageurl}} style={{height:300,width:300}}></Image>
      </View>
    </View>
  );
};

export default ImageUpload;

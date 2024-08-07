import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Modal, TextInput, Alert, RefreshControl, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { doc, setDoc, collection, addDoc, getDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import { Foundation } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import SavedIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeIcon from 'react-native-vector-icons/Entypo'
import SpreadSheetIcon from 'react-native-vector-icons/Entypo'
import DocumentIcon from 'react-native-vector-icons/Ionicons'
import Arrow from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'



const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [savedText, setSavedText] = useState('');


  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      console.log(result);
    }
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      console.log(result);
    }
  };


  const handleUpload = async () => {
    if (!image) {
      alert("No image selected!");
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('https://ocr-mobile-backend-06f174d2d1ae.herokuapp.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      setResult(response.data);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
    }
  };




  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert.message)
  }
  




  async function savedScannedText(docImageText) {
    // Ensure the text is a string and not undefined
    if (typeof docImageText !== 'string') {
      console.error("Attempted to save non-string or undefined text:", docImageText);
      return;
    }
  
    try {
      const plainObject = {
        text: docImageText,
      };
      // const docRef = await addDoc(collection(db, "scannedText"), plainObject);
      // console.log("Document written with ID: ", docRef.id);
      console.log("test to see if this worked")
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  
  // Assuming 'result' is the array you posted above
  if (result && result.length > 0) {
    result.forEach((page) => {
      if (page.lines && page.lines.length > 0) {
        page.lines.forEach((line) => {
          // Assuming 'line' has a property 'text' that contains the actual text
          if (line.text && typeof line.text === 'string') {
            savedScannedText(line.text);
          }
        });
      }
    });
  } else {
    console.log("No pages or lines to process");
  }


  const handleSaveText = () => {
    if (result && result.length > 0) {
      result.forEach((page) => {
        if (page.lines && page.lines.length > 0) {
          page.lines.forEach((line) => {
            // Assuming 'line' has a property 'text' that contains the actual text
            if (line.text && typeof line.text === 'string') {
              savedScannedText(line.text);
            }
          });
        }
      });
    } else {
      console.log("No pages or lines to process");

    }

  }

const handler = (pageText) => {
  setSavedText(pageText);
    console.log(pageText);

    const user = auth.currentUser;
    if (user) {
      const docRef = collection(db, "documents");
      addDoc(docRef, {
        text: pageText,
        timestamp: new Date(), // Add a timestamp if you need it
        userId: auth.currentUser?.email // Store the user's UID with the document
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    } else {
      console.log("No user logged in");
    }


  const saveSuccess = true;

  if (saveSuccess) {
    Alert.alert('Success', 'Save operation was successful!')

    setImage(null);
    setResult(null);
  } else {
    setError('Failed to save. Please try again.');
}
}

  return (
    <>
      <SafeAreaView style={{
        backgroundColor: '#fff',paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)
      }}>



      </SafeAreaView>

      <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>

        <Text>Hello,{auth.currentUser?.email}</Text>
  
        <View style={styles.innerContainer}>
        <Text style={styles.h1}>Create New</Text>
  
        <View style={styles.docuContainer}>
  
        <View style={styles.innerDocuContainer}>
    <View style={styles.idc2}>
      <View style={styles.docuIconContainer}>
        <TouchableOpacity onPress={takePhoto}>
        <DocumentIcon name='document-text' color={'white'} size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.dch1}>Document</Text>
        <Text style={styles.dcCopy}>You can create new document project</Text>
      </View>
    </View>
    <TouchableOpacity activeOpacity={0.5}  style={styles.shadow}>
    <View style={styles.arrowIconContainer}>
      <TouchableOpacity onPress={pickImage}>
      <Arrow name='arrow-forward-ios' size={18} color={'gray'} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  </View>
  
       
        </View>
  <View style={styles.hr1} />
  
  
  <View style={styles.docuContainer}>
  
  <View style={styles.innerDocuContainer}>
  <View style={styles.idc2}>
  <View style={styles.docuIconContainer2}>
  <SpreadSheetIcon name='spreadsheet' color={'white'} size={25} />
  </View>
  <View>
  <Text style={styles.dch1}>Spreadsheet</Text>
  <Text style={styles.dcCopy}>You can create new document project</Text>
  </View>
  </View>
  <TouchableOpacity activeOpacity={0.5} style={styles.shadow}>
  <View style={styles.arrowIconContainer}>
  <Arrow name='arrow-forward-ios' size={18} color={'gray'} />
  </View>
  </TouchableOpacity>
  </View>
  
  
  </View>
  <View style={styles.hr} />
  
  
        {/* <Text style={{textAlign:'center'}}>or</Text>
        <Button title="Take photo" onPress={takePhoto} /> */}
  {/*     
      <TouchableOpacity>
        <Text style={styles.scanBtn} onPress={handleUpload}>Scan Text</Text>
      </TouchableOpacity> */}


      <View>
        <TouchableOpacity onPress={handleUpload} style={styles.uploadBtn}>
        <Text style={styles.uploadBtnText}>Scan Text</Text>
        </TouchableOpacity>
      </View>
  
        {image && <Image source={{ uri: image }} style={styles.image} />}
  
  
        {result && (
      <View>
      {result.map((page, pageIndex) => (
        <View style={styles.docImageContainer} key={pageIndex}>

          <View style={styles.dFlex}>

          <TouchableOpacity activeOpacity={0.6}>
            <View style={styles.createDoc}>
            <Text onPress={() => handler(page.lines.map(line => line.text).join('\n'))}>Save +</Text>
            </View>
          </TouchableOpacity>
          {page.lines.map((line, lineIndex) => (
          <View key={lineIndex}>
            <Text style={styles.docImageText}>{line.text}</Text>
          </View>  
          ))}
            </View>
        </View>
      ))}
    </View>
        )}
        {error && (
          <View>
            <Text>Error:</Text>
            <Text>{error}</Text>
          </View>
        )}
  
        <StatusBar style="auto" />
  
        </View>

        

        <TouchableOpacity onPress={handleSignOut} activeOpacity={0.6}>
        <Text style={styles.logOut}>Log out</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
    height: '100%'
  },
  innerContainer: {
  width: '90%',
  marginTop: 30
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
   alignSelf: 'center',
   marginTop: 50
  },
  scanBtn: {
    backgroundColor: '#e5e5e5',
    width: 100,
    textAlign: 'center',
    padding: 12,
    marginTop: 30,
    fontWeight: 'bold',
    margin: 'auto',
    marginBottom: 20
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pickImage: {
   textAlign: 'left'
  },
  docuContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dch1: {
    fontSize: 18,
    marginBottom: 8
  },
  dcCopy: {
    color: 'gray'
  },
  innerDocuContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%'
  },
  idc2: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  docuIconContainer: {
    marginRight: 15, 
    backgroundColor: 'lightblue', 
    padding: 9, 
    borderRadius: 5
  },
  docuIconContainer2: {
    marginRight: 15, 
    backgroundColor: 'green', 
    padding: 9, 
    borderRadius: 5
  },
  arrowIconContainer: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 6,
  },
  hr: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 2,
    border: 'none',
  },
  hr1: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 2,
    border: 'none',
    marginBottom: 20
  },
  logOut: {
  marginTop: 80, 
  color: 'red', 
  fontWeight:'bold',
  fontSize: 15        
  },
  uploadBtn: {
    backgroundColor: 'blue',
    padding: 14,
    marginTop: 50,
    borderRadius: 30,
    width: '60%',
    alignSelf: 'center'
  },
  uploadBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  docImageContainer: {
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 12,
    padding: 12
  },
  docImageText: {
    fontSize: 18,
    lineHeight: 24
  },
  createDoc: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    padding: 4,
    borderRadius: 4
  },
  dFlex: {
    // flexDirection: 'row',
    // alignItems: 'center'
  }
})

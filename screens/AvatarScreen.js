import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons'

const AvatarScreen = ({ navigation }) => {

    const handlePress = async (backgroundColor, imageUrl, text) => {
        const user = auth.currentUser;
    
        // Check if the user is authenticated
        if (user) {
          // Create a reference to a Firestore collection for the user
          const userCollection = collection(db, 'users');
    
          // Create a document with the user's email as the document ID
          const userEmail = user.email;
          const userDocRef = doc(userCollection, userEmail);
    
          try {
            // Set the data for the document with the information
            await setDoc(userDocRef, {
              backgroundColor,
              imageUrl,
              text,
            });
    
            console.log('Document updated for user: ', userEmail);
          } catch (error) {
            console.error('Error updating document: ', error);
          }
        } else {
          console.error('User is not authenticated');
        }
      };
    
    return (

        <>
            <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>

                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Back</Text>
                        </View>
                    </TouchableOpacity>


                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>Avatars</Text>
                    </View>


                    <Text style={{ color: 'transparent' }}>none</Text>
                </View>

            </SafeAreaView>


            <ScrollView style={{ backgroundColor: '#EEECE4' }}>

                <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>

                        <TouchableOpacity   onPress={() =>
          handlePress(
            'lightgreen',
            'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/hearts.png?alt=media&token=aca3a3e9-4d19-4a58-85bd-7126427f31ba&_gl=1*15zlzct*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODY5MjYuMjcuMC4w',
            'You are Loved'
          )
        } style={{ borderWidth: 1, width: '48%', height: 160, borderRadius: 8,backgroundColor: '#fff' }} activeOpacity={0.5}>
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                        {/* <Ionicons style={{ alignSelf: 'center', marginTop: 20 }} name="ios-heart-circle" size={54} color="black" /> */}
                      <View style={{backgroundColor: 'lightgreen',padding: 12,borderRadius: '50%',height:90,width:90}}>
                       <Image style={{height: 60,width: 60,alignSelf:'center'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/hearts.png?alt=media&token=aca3a3e9-4d19-4a58-85bd-7126427f31ba&_gl=1*15zlzct*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODY5MjYuMjcuMC4w'}} />
                      </View>
                        <Text style={{ textAlign: 'center',fontSize: 18,marginTop: 10, fontWeight: '500' }}>You are Loved</Text>
                    </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() =>
          handlePress(
            '#7A7F97',
            'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/egg.png?alt=media&token=8ecb2869-c122-486c-8e19-49b3b2c67cdc&_gl=1*niryhd*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc0MDMuNTMuMC4w',
            'You are Evolving'
          )
        }  style={{ borderWidth: 1, width: '48%', height: 160, borderRadius: 8, backgroundColor: '#fff' }} activeOpacity={0.5}>
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                        {/* <Ionicons style={{ alignSelf: 'center', marginTop: 20 }} name="ios-heart-circle" size={54} color="black" /> */}
                      <View style={{backgroundColor: '#7A7F97',padding: 12,borderRadius: '50%',height:90,width:90}}>
                       <Image style={{height: 60,width: 60,alignSelf:'center'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/egg.png?alt=media&token=8ecb2869-c122-486c-8e19-49b3b2c67cdc&_gl=1*niryhd*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc0MDMuNTMuMC4w'}} />
                      </View>
                        <Text style={{ textAlign: 'center',fontSize: 18,marginTop: 10,fontWeight: '500' }}>You are Evolving</Text>
                    </View>
                        </TouchableOpacity>
                </View>


                <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>

                <TouchableOpacity  onPress={() =>
          handlePress(
            '#FF5A43',
            'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/easter-bunny.png?alt=media&token=b3d7ed1d-f6b3-460a-b38e-ac237b3c0696&_gl=1*1cebqmw*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc3MDAuNTQuMC4w',
            'You are Capable'
          )
        } style={{ borderWidth: 1, width: '48%', height: 160, borderRadius: 8,backgroundColor: '#fff' }} activeOpacity={0.5}>
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                        {/* <Ionicons style={{ alignSelf: 'center', marginTop: 20 }} name="ios-heart-circle" size={54} color="black" /> */}
                      <View style={{backgroundColor: '#FF5A43',padding: 12,borderRadius: '50%',height:90,width:90}}>
                       <Image style={{height: 60,width: 60,alignSelf:'center'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/easter-bunny.png?alt=media&token=b3d7ed1d-f6b3-460a-b38e-ac237b3c0696&_gl=1*1cebqmw*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc3MDAuNTQuMC4w'}} />
                      </View>
                        <Text style={{ textAlign: 'center',fontSize: 18,marginTop: 10,fontWeight: '500' }}>You are Capable</Text>
                    </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() =>
          handlePress(
            '#FFB543',
            'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/frog-.png?alt=media&token=a97c7d8b-9bad-4d5b-9225-6e976cfb5605&_gl=1*1us88m1*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc5NDAuNDkuMC4w',
            'You are Unique'
          )
        }  style={{ borderWidth: 1, width: '48%', height: 160, borderRadius: 8, backgroundColor: '#fff' }} activeOpacity={0.5}>
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                        {/* <Ionicons style={{ alignSelf: 'center', marginTop: 20 }} name="ios-heart-circle" size={54} color="black" /> */}
                      <View style={{backgroundColor: '#FFB543',padding: 12,borderRadius: '50%',height:90,width:90}}>
                       <Image style={{height: 60,width: 60,alignSelf:'center'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/frog-.png?alt=media&token=a97c7d8b-9bad-4d5b-9225-6e976cfb5605&_gl=1*1us88m1*_ga*MTMzMDU1NTg3Mi4xNjc2ODQzNzEy*_ga_CW55HF8NVT*MTY5Njg4NjgwOS42Mi4xLjE2OTY4ODc5NDAuNDkuMC4w'}} />
                      </View>
                        <Text style={{ textAlign: 'center',fontSize: 18,marginTop: 10, fontWeight: '500' }}>You are Unique</Text>
                    </View>
                        </TouchableOpacity>

                </View>

            </ScrollView>
        </>
    )
}

export default AvatarScreen

const styles = StyleSheet.create({})
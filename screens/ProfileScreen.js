import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Platform, ScrollView, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc, collection, getDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const [userEmail, setUserEmail] = useState(null);
  const [selectedAvatarData, setSelectedAvatarData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
      fetchDataFromFirestore(user.email);
    } else {
      setUserEmail('No user is currently signed in');
    }
  }, []);

  const fetchDataFromFirestore = async userEmail => {
    const userCollection = collection(db, 'users');
    const userDocRef = doc(userCollection, userEmail);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const { backgroundColor, imageUrl, text } = userData;
        setSelectedAvatarData({ backgroundColor, imageUrl, text });
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === 'android'
              ? StatusBar.currentHeight
              : StatusBar.currentHeight || 0,
          backgroundColor: '#EEECE4',
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 14, marginRight: 10 }}
            />
            <Text style={{ fontSize: 18 }}>Back</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={{ backgroundColor: '#EEECE4' }}>
        <View>
          <View style={{}}>
            {/* <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                backgroundColor: 'gray',
                alignSelf: 'center',
                marginTop: 30,
              }}
            ></View> */}
                {selectedAvatarData && (
            <>
          <View style={{ backgroundColor: selectedAvatarData.backgroundColor, width:110,alignSelf: 'center',padding: 20,borderRadius: '50%',height:110,marginTop: 30 }}>
            <Image source={{ uri: selectedAvatarData.imageUrl }} style={{height: 80,width: 80,alignSelf:'center'}} />
          </View>
            <Text style={{textAlign:'center',marginTop: 12,fontWeight: 'bold'}}>{selectedAvatarData.text}</Text>
            </>
        )}
            <View
              style={{
                backgroundColor: 'black',
                width: 50,
                alignSelf: 'center',
                borderRadius: 50,
                position: 'absolute',
                top: 4,
                right: '35%',
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('AvatarScreen')}>
                <AntDesign
                  name="edit"
                  size={24}
                  color="white"
                  style={{ alignSelf: 'center', padding: 12 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 19 }}>
            {userEmail}
          </Text>
        </View>

        {/* {selectedAvatarData && (
            <>
          <View style={{ backgroundColor: selectedAvatarData.backgroundColor, width:110,alignSelf: 'center',padding: 20,borderRadius: '50%',height:110 }}>
            <Image source={{ uri: selectedAvatarData.imageUrl }} style={{height: 80,width: 80,alignSelf:'center'}} />
          </View>
            <Text style={{textAlign:'center',marginTop: 12,fontWeight: 'bold'}}>{selectedAvatarData.text}</Text>
            </>
        )} */}

        <TouchableOpacity activeOpacity={0.6} onPress={handleSignOut}>
          <View style={{ marginTop: 50 }}>
            <View style={{}}>
              <Text style={{ textAlign: 'center', textDecorationLine: 'underline', fontSize: 15 }}>
                Log Out
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  
});

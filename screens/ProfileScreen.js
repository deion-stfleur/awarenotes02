import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { db, auth } from '../firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';


const ProfileScreen = ({ navigation }) => {

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch(error => {
                // Use `error.message` to access and display the error message
                alert(error.message);
            });
    }

    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
      const user = auth.currentUser;
  
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('No user is currently signed in');
      }
    }, []);
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0), backgroundColor: '#EEECE4' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                        <Text style={{ fontSize: 18 }}>Back</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView style={{backgroundColor: '#EEECE4'}}>

                <View>
                    <View style={{}}>
                        <View style={{height: 150,width: 150,borderRadius: '100%',backgroundColor:'gray',alignSelf:'center',marginTop: 30}}></View>
                       <View style={{backgroundColor: 'black',width: 50,alignSelf:'center',borderRadius: '50%',position:'absolute',bottom:-20,right: '35%'}}>
                        <TouchableOpacity>

                        <AntDesign name="edit" size={24} color="white" style={{alignSelf:'center',padding: 12}} />
                        </TouchableOpacity>
                       </View>
                    </View>
                <Text style={{textAlign:'center',marginTop: 50,fontSize: 19,}}>{userEmail}</Text>
                </View>


            <TouchableOpacity activeOpacity={0.6} onPress={handleSignOut}>
            <View style={{marginTop: 50}}>

                <View style={{}}>
                <Text style={{textAlign: 'center',textDecorationLine:'underline',fontSize: 15}}>Log Out</Text>
                </View>
            </View>
            </TouchableOpacity>
            </ScrollView>
        </>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React from 'react'
import { db, auth } from '../firebaseConfig'
import { Ionicons } from '@expo/vector-icons'


const ProfileScreen = ({ navigation }) => {

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert.message)
    }
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

            <TouchableOpacity activeOpacity={0.6} onPress={handleSignOut}>
            <View style={{marginTop: 50}}>
                <Text style={{textAlign: 'center'}}>Log Out</Text>
            </View>
            </TouchableOpacity>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
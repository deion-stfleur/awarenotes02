import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

const InterestScreen = ({navigation}) => {
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>Edit Interests</Text>
    </View>


    <Text style={{ color: 'transparent' }}>none</Text>
</View>

</SafeAreaView>
    
    <ScrollView style={{backgroundColor: '#EEECE4'}}>

    <View style={{backgroundColor:'#fff',width:'90%',alignSelf:'center',padding: 16,borderRadius: 6,marginTop: 15}}>
      <Text style={{fontSize: 17,marginBottom: 14}}>Add any interest you would like to share and be comfortable talking about.</Text>
     

      <TextInput multiline style={{borderWidth: 1,borderColor: 'gray',borderRadius: 6, height: 200, marginTop: 10,marginBottom: 14}} />
    </View>
    </ScrollView>
    <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#7A7F97' }}>
                    <TouchableOpacity>
                    <View style={{ padding: 24, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Save</Text>
                    </View>
                    </TouchableOpacity>
                </View>
    </>
  )
}

export default InterestScreen

const styles = StyleSheet.create({})
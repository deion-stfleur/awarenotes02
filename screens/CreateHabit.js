import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons'

const CreateHabit = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>

                    <TouchableOpacity onPress={() => navigation.navigate("GoalsScreen")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 8 }}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Create personal habit</Text>
                        </View>
                    </TouchableOpacity>


                </View>

            </SafeAreaView>

            <ScrollView style={{ backgroundColor: '#EEECE4' }}>

                <View>
                    <TextInput multiline style={{ backgroundColor: '#fff', width: '90%', alignSelf: 'center', height: 300, borderRadius: 6, padding: 20, paddingTop: 12, fontSize: 22 }} placeholder='Enter details...' placeholderTextColor={'black'} />
                </View>
                {/* 
            <TouchableOpacity style={{width:'90%',alignSelf:'center',marginTop: 60, backgroundColor:'#fff',padding: 22,borderRadius: 8}}>
                <View>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Frequency</Text>
                </View>
            </TouchableOpacity> */}

                <TouchableOpacity style={{ width: '90%', alignSelf: 'center', marginTop: 60, backgroundColor: '#fff', padding: 22, borderRadius: 8,borderWidth: 1 }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign:'center' }}>Create New</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default CreateHabit

const styles = StyleSheet.create({})
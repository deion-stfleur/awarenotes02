import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, {useState} from 'react'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons'

const CreateHabit = ({ navigation }) => {

    const [habits, setHabits] = useState('');


    const isSubmitDisabled = !habits;


    const sendHabits = async () => {
        const user = auth.currentUser.email;
        const order = {
          userId: user,
          habits: habits
        };
    
        try {
          const docRef = await addDoc(collection(db, 'user-created-habits'), order);
          console.log('Document created with ID: ', user);
        } catch (error) {
          console.error('Error creating document:', error);
        }
      };


      const addSendHabits = () => {
        sendHabits();
        navigation.navigate("GoalsScreen");
      }
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
                    <TextInput value={habits} onChangeText={setHabits}  multiline style={{ backgroundColor: '#fff', width: '90%', alignSelf: 'center', height: 300, borderRadius: 6, padding: 20, paddingTop: 12, fontSize: 22 }} placeholder='Enter details...' placeholderTextColor={'black'} />
                </View>
                {/* 
            <TouchableOpacity style={{width:'90%',alignSelf:'center',marginTop: 60, backgroundColor:'#fff',padding: 22,borderRadius: 8}}>
                <View>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Frequency</Text>
                </View>
            </TouchableOpacity> */}

                <TouchableOpacity disabled={isSubmitDisabled} onPress={addSendHabits} style={{ width: '90%', alignSelf: 'center', marginTop: 60, backgroundColor: isSubmitDisabled ? 'lightgray' : '#7A7F97' , padding: 22, borderRadius: 8,borderWidth: 2 }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign:'center' }}>Create New +</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default CreateHabit

const styles = StyleSheet.create({})
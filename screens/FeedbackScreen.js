import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, StatusBar, TextInput } from 'react-native'
import React, {useState} from 'react'
import {Ionicons} from '@expo/vector-icons';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'

const FeedbackScreen = ({navigation}) => {
    const [description, setDescription] = useState('');

    const handleMessage = () => {
        Alert.alert("Thank You","Your Feedback has been set for review. We will respond accordingly")
    }

    const isSubmitDisabled = !description 

    const sendFeedback = async () => {
        const user = auth.currentUser;
        const order = {
          userId: auth.currentUser?.email,  
          description: description,
        };
      
        try {
          const docRef = await addDoc(collection(db, 'phase1-feedback'), order);
          console.log('Document created with ID: ', docRef.id);
          handleMessage();
          navigation.navigate("Profile");
        } catch (error) {
          console.error('Error creating document:', error);
        }
      };

  return (

    

    <>
    <SafeAreaView>
   
    <View style={{flexDirection: 'row',alignItems: 'center'}}>

<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
<View style={{
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)
}}>
        <Ionicons size={28} name='arrow-back-outline' style={{marginLeft: 14, marginRight: 10}} />
<Text style={{fontSize: 20, fontWeight: 'bold'}}>Back</Text>
</View>
</TouchableOpacity>


</View>
    </SafeAreaView>
    <View style={{width: '95%', alignSelf: 'center', marginTop: 30, marginBottom: 30}}>
      <Text style={{fontSize: 45, fontWeight: 'bold', marginBottom: 18}}>Share your feedback</Text>

      <Text style={{fontSize: 18,lineHeight: 21}}>Thanks for sending us your ideas, issues, or appreciations. We can’t respond individually, but we’ll pass it on to the teams who are working to help make this app better for everyone.</Text>
    </View>
    <KeyboardAvoidingView behavior='padding'>

    <View style={{width: '95%', alignSelf: 'center'}}>
        <Text style={{fontSize: 18, marginBottom: 18}}>What's your feedback about?</Text>
        <TextInput        value={description}
              onChangeText={setDescription}  placeholder='Enter description' style={{borderWidth: 1, paddingVertical: '30%', paddingTop: 5, paddingLeft: 5, fontSize: 18, borderRadius: 4}} />

        <TouchableOpacity activeOpacity={0.5} style={{width: 100, alignSelf:'flex-end'}} onPress={sendFeedback} disabled={isSubmitDisabled}>
            <View style={{alignSelf: 'flex-end', marginTop: 12, backgroundColor: isSubmitDisabled ? 'gray' : 'black', padding: 12, width: 100, borderRadius: 6, opacity: isSubmitDisabled ? .3 : 1}}>
                <Text style={{textAlign: 'center',color: isSubmitDisabled ? 'white' : 'white', fontWeight: 'bold'}}>Submit</Text>
            </View>
        </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </>
  )
}

export default FeedbackScreen

const styles = StyleSheet.create({})
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig'; // Import auth and db from your Firebase configuration
import { collection, addDoc, doc, setDoc, getDocs, query, where, equalTo } from 'firebase/firestore';


const Yoga = ({navigation}) => {
    const [isJoined, setIsJoined] = useState(false);
    const [email, setEmail] = useState(''); // Assuming you have a way to get the user's email
    const [uid, setUid] = useState(''); // Assuming you have a way to get the user's UID
  
    const handlePress = async () => {
      setIsJoined(!isJoined);
  
      try {
        const user = auth.currentUser;
  
        if (user) {
          // Reference to the Firestore collection where you want to store user data
          const userCollection = collection(db, 'users');
          const userDoc = doc(userCollection, user.uid);
  
          // Update the user's document in Firestore
          await setDoc(userDoc, {
            joined: true,
            email: auth.currentUser.email,
            uid: uid,
            yoga: true,
          }, { merge: true });
  
          // Check if the user's email exists in the userEmails collection
          const userEmailsCollection = collection(db, 'userEmails');
          const q = query(userEmailsCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);
  
          if (querySnapshot.empty) {
            // Email does not exist in the userEmails collection, so add it
            await addDoc(userEmailsCollection, { email: email });
          }
  
          console.log('User data updated in Firestore');
        }
      } catch (error) {
        console.error('Error updating user data in Firestore:', error);
      }
    };
  return (
    <>
    <SafeAreaView style={{backgroundColor:'green'}}>
        <TouchableOpacity onPress={() => navigation.navigate("GoalsScreen")} style={{marginTop: 17}}>
             {/* <Ionicons  name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} /> */}
             <MaterialCommunityIcons name="window-close" size={24} color="black" style={{alignSelf: 'flex-end', marginRight: 14}} />
        </TouchableOpacity>
    </SafeAreaView>
    
    <View style={{backgroundColor: 'green'}}>
      
      <View style={{marginLeft: 14,backgroundColor: 'gray',width: 90,padding: 8,borderRadius: 20}}>
        <Text style={{fontSize: 17,color: '#fff',textAlign: 'center'}}>For You</Text>

      </View>

      <View style={{flexDirection: 'row',alignItems: 'baseline', justifyContent: 'space-between',width: '90%'}}>
     
      <Text style={{marginLeft: 14,marginTop: 15,fontSize: 40,fontWeight: 'bold'}}>Yoga</Text>

     
      <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <View style={{ backgroundColor: isJoined ? 'white' : 'black', borderRadius: 20, width: 70 }}>
        <Text style={{ color: isJoined ? 'black' : '#fff', padding: 10, textAlign: 'center', fontWeight: 'bold' }}>
          {isJoined ? 'Joined' : 'Join +'}
        </Text>
      </View>
    </TouchableOpacity>
      </View>
        <Text style={{width:'90%',marginLeft: 14,marginBottom: 25,color: '#fff',fontWeight: '500',marginTop: 12,fontSize: 16}}>Yoga is more than just a physical practice; it's a holistic approach to health and well-being. It combines physical postures, breathing exercises, and meditation to create a sense of harmony within the body and mind. Regular yoga practice can enhance flexibility, reduce stress, improve posture, and boost overall vitality. It's a journey towards inner and outer strength, fostering balance, both physically and mentally.</Text>
    </View>

    <ScrollView style={{marginTop: 20}}>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Mindfulness Meditation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Guided Meditation for Relaxation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Loving-Kindness Meditation (Metta)</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Body Scan Meditation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20,marginBottom: 50}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Transcendental Meditation (TM)</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


    </ScrollView>
    </>
  )
}

export default Yoga

const styles = StyleSheet.create({})
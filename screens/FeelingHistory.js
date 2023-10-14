import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const FeelingHistory = ({navigation}) => {
    const [feelingCounts, setFeelingCounts] = useState([]);
    const user = auth.currentUser;
  
    useEffect(() => {
      if (user) {
        const userEmail = user.email;
  
        // Create a query to filter FeelingCounts by userEmail
        const feelingCountsQuery = query(
          collection(db, 'FeelingCounts'),
          where('userEmail', '==', userEmail)
        );
  
        // Fetch the feeling counts for the current user
        const fetchFeelingCounts = async () => {
          try {
            const querySnapshot = await getDocs(feelingCountsQuery);
            const feelingCountData = querySnapshot.docs.map((doc) => ({
              id: doc.id, // Include the document name as 'id'
              ...doc.data(), // Include the document data
            }));
            setFeelingCounts(feelingCountData);
          } catch (error) {
            console.error('Error fetching feeling counts:', error);
          }
        };
  
        fetchFeelingCounts();
      }
    }, [user]);
  
  return (
    <>

    <SafeAreaView>

        <View style={{flexDirection: 'row',alignItems: 'center',marginLeft: 14,marginBottom: 30}}>

<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("HomeTab")}>
    <Ionicons style={{marginRight: 10}} name="arrow-back" size={24} color="black" />
</TouchableOpacity>
      <Text style={{fontSize: 19,fontWeight: 'bold'}}>Feeling History</Text>

        </View>
      {/* <Text>Tracking your emotions is a delightful journey of self-awareness and personal growth. This practice empowers you to uncover the vibrant tapestry of your feelings, providing valuable insights into your emotional landscape. By nurturing this awareness, you'll uncover patterns, triggers, and trends in your emotional well-being, allowing you to make informed decisions about your mental health. As you develop this skill, you'll find it easier to manage stress, anxiety, and enhance emotional regulation. Moreover, heightened awareness of your emotions can lead to improved communication with those around you, fostering more meaningful connections. Your emotional awareness journey begins here, guiding you to a deeper understanding of yourself and your path to greater well-being</Text> */}
    </SafeAreaView>
    
    <View style={{alignSelf: 'center'}}>
      <View style={{}}>
      <FlatList
      showsVerticalScrollIndicator={false}
      style={{}}
        data={feelingCounts}
        keyExtractor={(item) => item.id} // Use the document name as the key
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.4}>
          <View style={{borderWidth: 1,padding: 35,marginBottom: 4,borderRadius: 6}}>
            <Text style={{fontSize: 22,textAlign: 'center'}}> {item.id}</Text>
            {/* <Text>Feeling: {item.feeling}</Text> */}
            {/* <Text>Count: {item.count}</Text> */}
            <Text style={{textAlign: 'center',fontSize: 19}}>{item.timestamp.toDate().toLocaleDateString()}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
    </View>
    </>
  )
}

export default FeelingHistory

const styles = StyleSheet.create({})
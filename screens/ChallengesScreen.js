import {ActivityIndicator, StyleSheet, RefreshControl, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Image, Alert, Platform, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, setDoc, collection, addDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import firebase from '../firebaseConfig'




const ChallengesScreen = ({ navigation }) => {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the current user from Firebase Authentication
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid); // Set the userId from the authenticated user
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        
        const docsRef = collection(db, 'documents'); 
        console.log(docsRef);

        
        const q = query(docsRef, where('userId', '==', userId));

        
        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleString(); // Change format as needed
  };


  return (
    <>

      <SafeAreaView style={{
 backgroundColor: 'white',paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)
      }}>

        <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',marginBottom: 10 }}>
          <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: 'bold', marginTop: 4 }}>Explore</Text>

       
        </View>
      </SafeAreaView>

      <View style={styles.container}>
      {documents.length > 0 ? (
        <View>
          <Text style={styles.header}>Recent Documents</Text>
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.documentContainer}>
                <Text style={styles.documentText}>{item.text}</Text>
                <Text style={styles.documentTime}>Date: {formatTimestamp(item.timestamp)}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.noDocumentsText}>You have no documents yet!</Text>
      )}
    </View>

     
    </>
  )
}

export default ChallengesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20
  },
  documentContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  documentText: {
    fontSize: 18,
  },
  noDocumentsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  documentTime: {
    fontSize: 14,
    color: 'gray',
    marginTop: 16
  },
})
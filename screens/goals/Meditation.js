import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

const Meditation = ({ navigation }) => {
    const [isCompleted, setCompleted] = useState(false);
    const [isCompleted2, setCompleted2] = useState(false);
    const [isCompleted3, setCompleted3] = useState(false);
    const [isCompleted4, setCompleted4] = useState(false);
    const [isCompleted5, setCompleted5] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCompletePress = () => {
        setCompleted(true);
    }

    const handleCompletePress2 = () => {
        setCompleted2(true);
    }

    const handleCompletePress3 = () => {
        setCompleted3(true);
    }

    const handleCompletePress4 = () => {
        setCompleted4(true);
    }

    const handleCompletePress5 = () => {
        setCompleted5(true);
    }

    useEffect(() => {
        if (isCompleted && isCompleted2 && isCompleted3 && isCompleted4 && isCompleted5) {
          const user = auth.currentUser; // Assuming the user is authenticated
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
      
            // Attempt to retrieve the streak count
            getDoc(userDocRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  // The document exists, so update the streak
                  const currentStreak = docSnap.data().streak || 0; // Use streak if it exists, or 0 if it doesn't
      
                  // Increment the streak count and update Firestore
                  const newStreak = currentStreak + 1;
                  return setDoc(userDocRef, { streak: newStreak }, { merge: true });
                } else {
                  // The document doesn't exist, so create it with a streak of 1
                  return setDoc(userDocRef, { streak: 1 });
                }
              })
              .then(() => {
                setShowModal(true);
      
                // After 5 seconds, hide the modal
                setTimeout(() => {
                  setShowModal(false);
                }, 5000);
              })
              .catch((error) => {
                console.error("Error updating streak:", error);
              });
          }
        }
      }, [isCompleted, isCompleted2, isCompleted3, isCompleted4, isCompleted5]);
      


    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0), backgroundColor: '#C35BD1' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                        <Text style={{ fontSize: 18 }}>Back</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{ backgroundColor: '#C35BD1' }}>

                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', width: '90%' }}>
                    <Text style={{ marginLeft: 14, marginTop: 15, fontSize: 40, fontWeight: 'bold' }}>Meditation</Text>

                </View>
                <Text style={{ width: '90%', marginLeft: 14, marginBottom: 25, color: '#fff', fontWeight: '500', marginTop: 12, fontSize: 16 }}>Meditation isn't just a moment of calm; it's a powerful tool to enhance your overall well-being. It's been shown to reduce stress, improve mental clarity, and promote emotional balance. By practicing meditation regularly, you can boost your immune system, enhance your focus, and find a sense of tranquility amidst life's hustle. Take a moment for yourself with meditation, and experience the profound benefits it brings to your mental and physical health</Text>
            </View>

            <ScrollView style={{ backgroundColor: '#EEECE4' }}>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                    <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%', backgroundColor: '#fff' }}>
                        <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                        <TouchableOpacity onPress={handleCompletePress} activeOpacity={0.6}>
                            <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center' }}>{isCompleted ? 'Completed' : 'Play |>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                    <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%', backgroundColor: '#fff' }}>
                        <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                        <TouchableOpacity onPress={handleCompletePress2} activeOpacity={0.6}>
                            <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted2 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center' }}>{isCompleted2 ? 'Completed' : 'Play |>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%', backgroundColor: '#fff' }}>
                        <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                        <TouchableOpacity onPress={handleCompletePress3} activeOpacity={0.6}>
                            <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted3 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center' }}>{isCompleted3 ? 'Completed' : 'Play |>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                    <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%', backgroundColor: '#fff' }}>
                        <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                        <TouchableOpacity onPress={handleCompletePress4} activeOpacity={0.6}>
                            <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted4 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center' }}>{isCompleted4 ? 'Completed' : 'Play |>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, marginBottom: 100 }}>
                    <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%', backgroundColor: '#fff' }}>
                        <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                        <TouchableOpacity onPress={handleCompletePress5} activeOpacity={0.6}>
                            <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted5 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center' }}>{isCompleted5 ? 'Completed' : 'Play |>'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* 
                <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                    <TouchableOpacity onPress={handleCompletePress2}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted2 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted2 ? 'Completed' : 'Play |>'}</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
                </View>


                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Go You!!!</Text>
                            <Text style={{ textAlign: 'center', alignSelf: 'center', width: '90%', fontSize: 17 }}>You've outperformed <Text style={{ fontWeight: 'bold', fontSize: 17 }}>10 users</Text> and proved that you have what it takes to complete the journey.</Text>


                        </View>
                    </View>
                </Modal>

            </ScrollView>


        </>
    )
}

export default Meditation

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        height: '100%'
    },
    modalContent: {
        marginTop: 50,
        marginLeft: 20
    },
    modalText: {
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 30,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'green',
        width: '90%',
        alignSelf: 'center'
    }
})

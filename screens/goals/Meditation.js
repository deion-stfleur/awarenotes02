import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

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
            setShowModal(true);

            // After 5 seconds, hide the modal
            setTimeout(() => {
                setShowModal(false);
            }, 5000);
        }
    }, [isCompleted, isCompleted2, isCompleted3, isCompleted4, isCompleted5]);


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

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 100 }}>
                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                    <TouchableOpacity onPress={handleCompletePress} activeOpacity={0.6}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted ? 'Completed' : 'Mark as Complete'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                    <TouchableOpacity onPress={handleCompletePress2} activeOpacity={0.6}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted2 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted2 ? 'Completed' : 'Mark as Complete'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                    <TouchableOpacity onPress={handleCompletePress3} activeOpacity={0.6}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted3 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted3 ? 'Completed' : 'Mark as Complete'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                    <TouchableOpacity onPress={handleCompletePress4} activeOpacity={0.6}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted4 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted4 ? 'Completed' : 'Mark as Complete'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Mindfulness Meditation</Text>
                    <TouchableOpacity onPress={handleCompletePress5} activeOpacity={0.6}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted5 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted5 ? 'Completed' : 'Mark as Complete'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
{/* 
                <View style={{ width: 10, backgroundColor: 'transparent' }}></View>

                <View style={{ borderWidth: 1, padding: 12, borderRadius: 6, width: '45%' }}>
                    <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}>Guided Meditation for Relaxation</Text>
                    <TouchableOpacity onPress={handleCompletePress2}>
                        <View style={{ marginBottom: 12, marginTop: 20, backgroundColor: isCompleted2 ? 'green' : 'lightgray', padding: 12, borderRadius: 6 }}>
                            <Text style={{ textAlign: 'center' }}>{isCompleted2 ? 'Completed' : 'Mark as Complete'}</Text>
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
                        <Text style={styles.modalText}>Completed!</Text>
                    </View>
                </View>
            </Modal>

     
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
        marginTop: 30,
        fontSize: 50,
        fontWeight: 'bold',
        color: 'green'
    }
})
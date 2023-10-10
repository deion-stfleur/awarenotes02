import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

const PublicChallengeDetailScreen = ({ route, navigation }) => {
    const { challenge } = route.params;

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Challenges")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Back</Text>
                        </View>
                    </TouchableOpacity>


                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>{challenge.challengeName}</Text>
                    </View>


                    <Text style={{ color: 'transparent' }}>none</Text>
                </View>

            </SafeAreaView>

            <ScrollView style={{ backgroundColor: '#EEECE4' }}>
                <Image style={{ height: 200, width: '90%', marginBottom: 12, borderRadius: 6, alignSelf: 'center', marginTop: 20 }} source={{ uri: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' }} />

                <View style={{ width: '90%', alignSelf: 'center' }}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>{challenge.challengeName}</Text>
                    
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 15}}>From: {challenge.duration.from}</Text>
                    <Text style={{marginLeft: 5,marginRight: 5,fontSize: 15}}>-</Text>
                    <Text style={{fontSize: 15}}>To: {challenge.duration.to}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Text style={{fontSize: 15}}>How many times per day?: </Text>
                        <Text>{challenge.goal}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 12,marginBottom: 15 }}>
                        <Text style={{ fontSize: 16 }}>Privacy:</Text>

                        <Text style={{ fontSize: 16 }}>{challenge.privacy}</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>Why you need this challenge?</Text>
                    <Text style={{ fontSize: 16 }}>{challenge.challengeDescription}</Text>
                </View>


                <View style={{width:'90%',alignSelf:'center',marginTop: 40}}>
                    <View style={{backgroundColor:'#7A7F97',padding: 24,borderRadius: 6}}>
                        <Text style={{color:'#fff',fontWeight:'500'}}>Reminder?</Text>
                    </View>
                </View>


                <View style={{marginBottom: 150}}>
                    <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 18, fontWeight: 'bold' }}>Challenge starting in</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 }}>

                        <View style={{ backgroundColor: 'lightgray', padding: 20,borderRadius: 6 }}>
                        <Text style={{ fontSize: 20, textAlign:'center' }}>15</Text>
                        <Text>Days</Text>
                        </View>
                        <View style={{ backgroundColor: 'lightgray', padding: 20,borderRadius: 6 }}>
                        <Text style={{ fontSize: 20, textAlign:'center'  }}>10</Text>
                        <Text>Hrs</Text>
                        </View>
                        <View style={{ backgroundColor: 'lightgray', padding: 20,borderRadius: 6 }}>
                        <Text style={{ fontSize: 20, textAlign:'center'  }}>38</Text>
                        <Text>Mins</Text>
                        </View>
                        <View style={{ backgroundColor: 'lightgray', padding: 20,borderRadius: 6 }}>
                        <Text style={{ fontSize: 20, textAlign:'center'  }}>9</Text>
                        <Text>Secs</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#7A7F97' }}>
                    <TouchableOpacity>
                    <View style={{ padding: 24, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Join</Text>
                    </View>
                    </TouchableOpacity>
                </View>
        </>
    )
}

export default PublicChallengeDetailScreen

const styles = StyleSheet.create({})
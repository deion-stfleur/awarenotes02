import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const QuizScreen1 = ({navigation}) => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginBottom: 12 }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Back</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <Text>Skip</Text>
                    </TouchableOpacity>


                 
                </View>

            </SafeAreaView>

            <ScrollView style={{backgroundColor: '#EEECE4'}}>

                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', marginTop: 40}}>What motivates you on this journey</Text>

                <View style={{flexDirection:'row',marginTop: 40, justifyContent: 'space-between',alignSelf: 'center',maxWidth: 500}}>
                    
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Improved Health</Text>
                    </View>
                    <View style={{width: 8}}></View>
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Increased Energy</Text>
                    </View>
                    <View style={{width: 8}}></View>

                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Weight Loss</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',marginTop: 10, justifyContent: 'space-between',alignSelf: 'center',maxWidth: 500}}>
                    
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Relationships</Text>
                    </View>
                    <View style={{width: 8}}></View>
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Growth</Text>
                    </View>
                    <View style={{width: 8}}></View>

                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Clarity</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop: 10, justifyContent: 'space-between',alignSelf: 'center',maxWidth: 500}}>
                    
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Stress Reduction</Text>
                    </View>
                    <View style={{width: 8}}></View>
                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Better Sleep</Text>
                    </View>
                    <View style={{width: 8}}></View>

                    <View style={{borderWidth: 1,padding: 12, borderRadius: 300}}>
                        <Text style={{textAlign: 'center'}}>Financial Security</Text>
                    </View>
                </View>
                

                
            </ScrollView>

        
        </>
    )
}

export default QuizScreen1

const styles = StyleSheet.create({})
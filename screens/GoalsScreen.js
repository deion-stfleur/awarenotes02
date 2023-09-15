import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const GoalsScreen = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0), backgroundColor: '#EEECE4'}}>
  
  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
  <Ionicons name="arrow-back" size={24} color="black"  style={{marginLeft: 14, marginBottom: 20}} />
  </TouchableOpacity>
  
    </SafeAreaView>
    
    <ScrollView style={{backgroundColor: '#EEECE4'}}> 
  

  
        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: '#7A00F5',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>
      <Text style={{fontSize: 22, fontWeight: 'bold',color: '#fff'}}>Let's Start the Morning Right</Text>
    </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: '#0078FF',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Fitness</Text>
    </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: '#D6DDFF',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Sleep Control</Text>
    </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: 'lightgreen',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Create a Routine</Text>
    </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.9}>
    <View style={{alignSelf: 'center', marginTop: 80, borderWidth: 1, padding: 10,borderRadius: 100, backgroundColor: '#fff'}}>
      <Text style={{fontSize: 18, fontWeight: '700'}}>Add More +</Text>
    </View>
    </TouchableOpacity>

    </ScrollView>
    </>
  )
}

export default GoalsScreen

const styles = StyleSheet.create({})
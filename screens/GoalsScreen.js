import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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

      <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
      <Text style={{fontSize: 25, fontWeight: 'bold',color: '#fff'}}>Nutrional Plan</Text>
      <MaterialIcons name="food-bank" size={54} color="white" />
      </View>
    </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: '#0078FF',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
      <Text style={{fontSize: 25, fontWeight: 'bold',color: '#fff'}}>Fitness Plan</Text>
      <Ionicons name="fitness" size={54} color="white" />
      </View>
    </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
    <View style={{backgroundColor: '#D6DDFF',width: '93%', alignSelf: 'center', marginTop: 30,padding: 35,borderRadius: 12, borderWidth: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
      <Text style={{fontSize: 25, fontWeight: 'bold',color: '#fff'}}>Sleep Control</Text>
      <MaterialCommunityIcons name="sleep" size={54} color="white" />
      </View>
    </View>
        </TouchableOpacity>

       

    </ScrollView>
    </>
  )
}

export default GoalsScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform,StatusBar, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';



const ChallengeDetail = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <>
         <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>
                <TouchableOpacity onPress={() => navigation.navigate("Challenges")}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                        <Text style={{ fontSize: 18 }}>Back</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
    
    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
      <Text>Why you need this challenge?</Text>

      <Text>Challenge Description: {item.challengeDescription}</Text>
                          <Text>Challenge Description: {item.duration.from}</Text>
                          <Text>Challenge Description: {item.duration.to}</Text>
                          <Text>Challenge Description: {item.goal}</Text>
                          <Text>Challenge Description: {item.privacy}</Text>
                <Text>Challenge Starting in</Text>
                <TextInput style={{borderWidth: 1,width: '90%',marginTop: 30,borderRadius: 4,padding: 12}} />

    </View>
    </>
  )
}

export default ChallengeDetail

const styles = StyleSheet.create({})
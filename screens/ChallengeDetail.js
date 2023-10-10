import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform,StatusBar, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';



const ChallengeDetail = ({route, navigation}) => {
  const {item} = route.params;
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>{item.challengeName}</Text>
    </View>


    <Text style={{ color: 'transparent' }}>none</Text>
</View>

</SafeAreaView>
    {/* <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
      <Text>Why you need this challenge?</Text>

      <Text>Challenge Description: {item.challengeDescription}</Text>
                          <Text>Challenge Description: {item.duration.from}</Text>
                          <Text>Challenge Description: {item.duration.to}</Text>
                          <Text>Challenge Description: {item.goal}</Text>
                          <Text>Challenge Description: {item.privacy}</Text>
                <Text>Challenge Starting in</Text>
                <TextInput style={{borderWidth: 1,width: '90%',marginTop: 30,borderRadius: 4,padding: 12}} />

    </View> */}

    <ScrollView style={{ backgroundColor: '#EEECE4' }}>
                <Image style={{ height: 200, width: '90%', marginBottom: 12, borderRadius: 6, alignSelf: 'center', marginTop: 20 }} source={{ uri: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' }} />

                <View style={{ width: '90%', alignSelf: 'center' }}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>{item.challengeName}</Text>
                    
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 15}}>From: {item.duration.from}</Text>
                    <Text style={{marginLeft: 5,marginRight: 5,fontSize: 15}}>-</Text>
                    <Text style={{fontSize: 15}}>To: {item.duration.to}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Text style={{fontSize: 15}}>How many times per day?: </Text>
                        <Text>{item.goal}</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', marginTop: 12,marginBottom: 15 }}>
                        <Text style={{ fontSize: 16 }}>Privacy:</Text>

                        <Text style={{ fontSize: 16 }}>{item.privacy}</Text>
                    </View> */}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12, marginTop: 35 }}>Your Challenge Description</Text>
                    <Text style={{ fontSize: 16 }}>{item.challengeDescription}</Text>
                </View>


                <View style={{width:'90%',alignSelf:'center',marginTop: 40}}>
                    <View style={{backgroundColor:'#7A7F97',padding: 24,borderRadius: 6}}>
                        <Text style={{color:'#fff',fontWeight:'500'}}>Set Reminder?</Text>
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
    </>
  )
}

export default ChallengeDetail

const styles = StyleSheet.create({})
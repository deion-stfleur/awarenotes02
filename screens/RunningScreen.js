import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


const RunningScreen = ({navigation}) => {
  return (
    <>
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate("Challenges")}>
    <Ionicons name="arrow-back" size={24} color="black" style={{paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0),marginLeft: 14}} />
        </TouchableOpacity>
    </SafeAreaView>

    <ScrollView>
    <View>
      
      <Text style={{textAlign: 'center',fontSize: 18, lineHeight: 25, width: '95%',alignSelf: 'center',marginTop: 40}}>Embracing activities like running, jogging, or walking is a joyful journey towards better mental health. At AwareNotes, we celebrate the sheer delight these exercises bring not only to your body but also to your mind. Our mission is to spread happiness and positivity by emphasizing the incredible benefits of these physical pursuits. When you lace up those sneakers and hit the pavement, you're not just getting fit; you're releasing a flood of endorphins that light up your spirit. The result? Reduced stress, anxiety, and depression, making way for a brighter, more vibrant you. These activities also offer a chance to immerse yourself in the present moment, clear your thoughts, and cultivate a positive mindset. AwareNotes wholeheartedly encourages you to embark on this journey to happiness through movement, knowing that it's a path to enhanced mental well-being and boundless joy.</Text>
        
        <TouchableOpacity activeOpacity={0.6}>
        <View style={{marginTop: 50,width: '95%',alignSelf: 'center',borderWidth: 1,padding: 20,borderRadius: 8,shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,backgroundColor: '#D037E8'}}>
            <Text style={{fontSize: 19}}>Jog for 10 min</Text>
        </View>
        </TouchableOpacity>

<TouchableOpacity activeOpacity={0.6}>
        <View style={{marginTop: 20,width: '95%',alignSelf: 'center',borderWidth: 1,padding: 20,borderRadius: 8,shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,backgroundColor: 'lightgreen'}}>
            <Text style={{fontSize: 19}}>Mile Run</Text>
        </View>
</TouchableOpacity>
    
    </View>


    </ScrollView>
    </>
  )
}

export default RunningScreen

const styles = StyleSheet.create({})
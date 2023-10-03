import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Meditate = ({navigation}) => {
  return (
    <>
    <SafeAreaView style={{backgroundColor:'#C35BD1'}}>
        <TouchableOpacity onPress={() => navigation.navigate("GoalsScreen")} style={{marginTop: 17}}>
             {/* <Ionicons  name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} /> */}
             <MaterialCommunityIcons name="window-close" size={24} color="black" style={{alignSelf: 'flex-end', marginRight: 14}} />
        </TouchableOpacity>
    </SafeAreaView>
    
    <View style={{backgroundColor: '#C35BD1'}}>
      
      <View style={{marginLeft: 14,backgroundColor: 'gray',width: 90,padding: 8,borderRadius: 20}}>
        <Text style={{fontSize: 17,color: '#fff',textAlign: 'center'}}>For You</Text>

      </View>
        <Text style={{marginLeft: 14,marginTop: 15,fontSize: 40,fontWeight: 'bold'}}>Meditation</Text>
        <Text style={{width:'90%',marginLeft: 14,marginBottom: 25,color: '#fff',fontWeight: '500',marginTop: 12,fontSize: 16}}>Meditation isn't just a moment of calm; it's a powerful tool to enhance your overall well-being. It's been shown to reduce stress, improve mental clarity, and promote emotional balance. By practicing meditation regularly, you can boost your immune system, enhance your focus, and find a sense of tranquility amidst life's hustle. Take a moment for yourself with meditation, and experience the profound benefits it brings to your mental and physical health</Text>
    </View>

    <ScrollView style={{marginTop: 20}}>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Mindfulness Meditation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Guided Meditation for Relaxation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Loving-Kindness Meditation (Metta)</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Body Scan Meditation</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


        <TouchableOpacity activeOpacity={0.6}>
        <View style={{borderWidth: 1,width: '70%',alignSelf: 'center',padding: 12,borderRadius: 6,marginTop: 20,marginBottom: 50}}>
            <View>

                <Text style={{fontWeight: 'bold',fontSize: 18,marginBottom: 9}}>Transcendental Meditation (TM)</Text>
                <Text style={{color: 'gray',fontWeight: 'bold'}}>5 minutes</Text>
            </View>
        </View>
        </TouchableOpacity>


    </ScrollView>
    </>
  )
}

export default Meditate

const styles = StyleSheet.create({})
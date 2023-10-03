import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Running = ({navigation}) => {
  return (
    <>
    <SafeAreaView style={{backgroundColor:'#394CC2'}}>
        <TouchableOpacity onPress={() => navigation.navigate("GoalsScreen")} style={{marginTop: 17}}>
             {/* <Ionicons  name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} /> */}
             <MaterialCommunityIcons name="window-close" size={24} color="black" style={{alignSelf: 'flex-end', marginRight: 14}} />
        </TouchableOpacity>
    </SafeAreaView>
    
    <View style={{backgroundColor: '#394CC2'}}>
      
      <View style={{marginLeft: 14,backgroundColor: 'gray',width: 90,padding: 8,borderRadius: 20}}>
        <Text style={{fontSize: 17,color: '#fff',textAlign: 'center'}}>For You</Text>

      </View>
        <Text style={{marginLeft: 14,marginTop: 15,fontSize: 40,fontWeight: 'bold'}}>Running</Text>
        <Text style={{width:'90%',marginLeft: 14,marginBottom: 25,color: '#fff',fontWeight: '500',marginTop: 12,fontSize: 16}}>Yoga is more than just a physical practice; it's a holistic approach to health and well-being. It combines physical postures, breathing exercises, and meditation to create a sense of harmony within the body and mind. Regular yoga practice can enhance flexibility, reduce stress, improve posture, and boost overall vitality. It's a journey towards inner and outer strength, fostering balance, both physically and mentally.</Text>
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

export default Running

const styles = StyleSheet.create({})
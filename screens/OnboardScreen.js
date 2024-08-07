import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Entypo } from '@expo/vector-icons';



const OnboardScreen = ({navigation}) => {
    return (

        <>

<Entypo name="documents" size={54} color="black" style={styles.mainIcon} />

      <View style={styles.container}>


     <Text style={styles.onbText}>Effortlessly manage and scan documents with ease.</Text>

   

     <View style={styles.bottomScreen}>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={styles.blackBtn}>
                <Text style={styles.blackBtnText}>Get Started</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.whiteBtn}>
                <Text style={styles.whiteBtnText}>Already Have Account</Text>
            </View>
        </TouchableOpacity>
     </View>


      </View>
        </>
    )
  }


export default OnboardScreen;

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'flex-end'
},
bottomScreen: {
    width: '100%',
    padding: 20,
    height: '30%'
  },
  blackBtn: {
     backgroundColor: 'black',
     padding: 20
  },
  blackBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  whiteBtn: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    marginTop: 14,
    borderWidth: 1
  },
  whiteBtnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  onbText: {
    textAlign: 'center',
    marginBottom: 14,
    fontSize: 37,
    width: '90%',
    alignSelf: 'center',
    fontWeight: 'bold',
    lineHeight: 42
  },
  mainIcon: {
    alignSelf: 'center',
    marginTop: 90
  }
})
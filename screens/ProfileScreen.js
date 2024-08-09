import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebaseConfig'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const CircleView = ({ email, navigation }) => {
  const firstLetter = email ? email.charAt(0).toUpperCase() : '';


 
  

  return (


    <View style={styles.mainCircleContainer}>
      <View style={styles.mainCircle}>
        <Text style={styles.mainCText}>{firstLetter}</Text>
      </View>
      <Text style={styles.mainh1}>Hello,{auth.currentUser?.email}</Text>
    </View>
 
  );
};


const ProfileScreen = ({navigation, email}) => {


  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert.message)
  }

  const [expanded, setExpanded] = useState(false);


  const handleMore = () => {
    setExpanded(!expanded);
  }
  return (
    <>
    <SafeAreaView>

    </SafeAreaView>

    <CircleView email={auth.currentUser?.email} />   
  
    

    <View style={styles.mainCol1}>

        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Feedback")}>
        <View style={styles.flexRow}>
      <Text style={styles.nainCopy}>Leave Feedback</Text>
      <MaterialIcons name="feedback" size={19} color="black" />
        </View>
        </TouchableOpacity>
      <View style={styles.borderLine}></View>

      <View style={styles.flexRow}>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={0.6} onPress={() => navigation.navigate("FAQ")}>
      <Text style={styles.nainCopy}>FAQs ?</Text>
      {/* <Text style={styles.bold}>&#62;</Text> */}
        </TouchableOpacity>
      {/* <Text onPress={handleMore}>{expanded ? "-" : "+"}</Text> */}
      {/* <AntDesign name="questioncircle" size={19} color="black" /> */}
      </View>

      {expanded && (
        <View>
          <Text style={styles.nainCopyBold}>What is the purpose of the app?</Text>

        </View>
      )} 
      <View style={styles.borderLine}></View>
      <TouchableOpacity activeOpacity={0.6} onPress={handleSignOut}>
      <Text style={styles.logOut}>Logout</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    logOut: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
        color:'red',
        fontWeight: 'bold'
    },
    mainh1: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 20
    },
    mainCol1: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 30,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray'
    },
    nainCopy: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '400',
        marginTop: 20,
        marginRight: 15
    },
    borderLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 2,
        border: 'none',
        display: 'none'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16
    },
    mainCircleContainer: {
      backgroundColor: '#fff',
      height: 220,
      marginTop: 30,
      width: '95%',
      alignSelf: 'center',
      borderRadius: 4,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    mainCircle: {
      height: 100,
      width: 100,
      borderRadius: 200,
      backgroundColor: '#V4AACA',
      alignSelf: 'center',
      marginTop: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
    mainCText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 28
    }
})
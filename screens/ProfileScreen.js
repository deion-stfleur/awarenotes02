import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebaseConfig'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const ProfileScreen = ({navigation}) => {


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
    <Text style={styles.mainh1}>Hello,{auth.currentUser?.email}</Text>

    <View style={styles.mainCol1}>

        <View style={styles.flexRow}>
      <Text style={styles.nainCopy}>Leave Feedback</Text>
      <MaterialIcons name="feedback" size={19} color="black" />
        </View>
      <View style={styles.borderLine}></View>

      <View style={styles.flexRow}>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={0.6} onPress={() => navigation.navigate("FAQ")}>
      <Text style={styles.nainCopy}>FAQ</Text>
      <Text style={styles.bold}>&#62;</Text>
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
    }
})
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

const FAQPage = ({navigation}) => {
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [expanded5, setExpanded5] = useState(false);
    const [expanded6, setExpanded6] = useState(false);
    const [expanded7, setExpanded7] = useState(false);
    const [expanded8, setExpanded8] = useState(false);
    const [expanded9, setExpanded9] = useState(false);
    const [expanded10, setExpanded10] = useState(false);
    const [expanded11, setExpanded11] = useState(false);
    const [expanded12, setExpanded12] = useState(false);
    const [expanded13, setExpanded13] = useState(false);
    const [expanded14, setExpanded14] = useState(false);

    


    const handleMore = () => {
      setExpanded(!expanded);
    }

    const handleMore2 = () => {
        setExpanded2(!expanded2);
    }

    const handleMore3 = () => {
        setExpanded3(!expanded3);
    }

    const handleMore4 = () => {
        setExpanded4(!expanded4);
    }

    const handleMore5 = () => {
        setExpanded5(!expanded5);
    }

    const handleMore6 = () => {
        setExpanded6(!expanded6);
    }

    const handleMore7 = () => {
        setExpanded7(!expanded7);
    }

    const handleMore8 = () => {
        setExpanded8(!expanded8);
    }

    const handleMore9 = () => {
        setExpanded9(!expanded9);
    }

    const handleMore10 = () => {
        setExpanded10(!expanded10);
    }

    const handleMore11 = () => {
        setExpanded11(!expanded11);
    }

    const handleMore12 = () => {
        setExpanded12(!expanded12);
    }

    const handleMore13 = () => {
        setExpanded13(!expanded13);
    }

    const handleMore14 = () => {
        setExpanded14(!expanded14);
    }



    
  return (

    <>
  <SafeAreaView>
  <View style={{flexDirection: 'row',alignItems: 'center'}}>

<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
<View style={{
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)
}}>
        <Ionicons size={28} name='arrow-back-outline' style={{marginLeft: 14, marginRight: 10}} />
<Text style={{fontSize: 20, fontWeight: 'bold'}}>Back</Text>
</View>
</TouchableOpacity>


</View>
      </SafeAreaView>


    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.dFlex}>
      <Text style={styles.accTitle}>What is the purpose of the app?</Text>
      <Text style={styles.accIcon} onPress={handleMore}>{expanded ? "-" : "+"}</Text>
        </View>

      {expanded && (
        <View>
          <Text style={styles.nainCopyReg}>The app allows users to scan handwritten notes and documents to convert them into digital text.</Text>

        </View>
      )} 


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Who can use the app?</Text>
      <Text style={styles.accIcon} onPress={handleMore2}>{expanded2 ? "-" : "+"}</Text>
        </View>

      {expanded2 && (
        <View>
          <Text style={styles.nainCopyReg}>The app is available to all users who sign in with a valid account.</Text>

        </View>
      )} 


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>What types of images can I upload?</Text>
      <Text style={styles.accIcon} onPress={handleMore3}>{expanded3 ? "-" : "+"}</Text>
        </View>

      {expanded3 && (
        <View>
          <Text style={styles.nainCopyReg}>All image formats are supported, so you can upload any type of image for scanning.</Text>

        </View>
      )} 



<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Can I use my camera to capture images directly?</Text>
      <Text style={styles.accIcon} onPress={handleMore4}>{expanded4 ? "-" : "+"}</Text>
        </View>

      {expanded4 && (
        <View>
          <Text style={styles.nainCopyReg}>Yes, you can take photos directly using your device's camera or choose existing images from your photo library.
</Text>

        </View>
      )} 


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Is the app available on the web?</Text>
      <Text style={styles.accIcon} onPress={handleMore5}>{expanded5 ? "-" : "+"}</Text>
        </View>

      {expanded5 && (
        <View>
          <Text style={styles.nainCopyReg}>No, the app is currently only available in mobile app form and not as a web application.</Text>

        </View>
      )} 


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Do I need an internet connection to use the app?</Text>
      <Text style={styles.accIcon} onPress={handleMore6}>{expanded6 ? "-" : "+"}</Text>
        </View>

      {expanded6 && (
        <View>
          <Text style={styles.nainCopyReg}>An internet connection is required for certain features, such as document scanning and saving. However, offline features may be available for viewing previously saved documents.</Text>

        </View>
      )}

<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Do I need an internet connection to use the app?</Text>
      <Text style={styles.accIcon} onPress={handleMore7}>{expanded7 ? "-" : "+"}</Text>
        </View>

      {expanded7 && (
        <View>
          <Text style={styles.nainCopyReg}>An internet connection is required for certain features, such as document scanning and saving. However, offline features may be available for viewing previously saved documents.</Text>

        </View>
      )}


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>How does the app handle privacy and security?</Text>
      <Text style={styles.accIcon} onPress={handleMore8}>{expanded8 ? "-" : "+"}</Text>
        </View>

      {expanded8 && (
        <View>
          <Text style={styles.nainCopyReg}>All user data is securely stored and processed, following best practices for privacy and security.</Text>

        </View>
      )}

<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Is there a limit to the number of documents I can scan?</Text>
      <Text style={styles.accIcon} onPress={handleMore9}>{expanded9 ? "-" : "+"}</Text>
        </View>

      {expanded9 && (
        <View>
          <Text style={styles.nainCopyReg}>There is currently no limit to the number of documents you can scan. However, please be mindful of your device's storage capacity.</Text>

        </View>
      )}

<View style={styles.dFlex}>
      <Text style={styles.accTitle}>Can I edit the scanned text?</Text>
      <Text style={styles.accIcon} onPress={handleMore10}>{expanded10 ? "-" : "+"}</Text>
        </View>

      {expanded10 && (
        <View>
          <Text style={styles.nainCopyReg}>Yes, the scanned text can be edited before saving the document.</Text>

        </View>
      )}


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>What should I do if the app doesn't recognize my handwriting?</Text>
      <Text style={styles.accIcon} onPress={handleMore11}>{expanded11 ? "-" : "+"}</Text>
        </View>

      {expanded11 && (
        <View>
          <Text style={styles.nainCopyReg}>Ensure the handwriting is clear and well-lit for better recognition. You can also manually correct any inaccuracies in the scanned text.
</Text>

        </View>
      )}


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>How often is the app updated?</Text>
      <Text style={styles.accIcon} onPress={handleMore12}>{expanded12 ? "-" : "+"}</Text>
        </View>

      {expanded12 && (
        <View>
          <Text style={styles.nainCopyReg}>The app is regularly updated to improve performance and add new features. Check for updates in your app store.</Text>

        </View>
      )}


<View style={styles.dFlex}>
      <Text style={styles.accTitle}>How can I provide feedback or report a problem?</Text>
      <Text style={styles.accIcon} onPress={handleMore13}>{expanded13 ? "-" : "+"}</Text>
        </View>

      {expanded13 && (
        <View>
          <Text style={styles.nainCopyReg}>You can provide feedback or report issues through the app's support section or contact us via the provided support email.
</Text>

        </View>
      )}


<View style={styles.dFlexBottom}>
      <Text style={styles.accTitle}>Are there any subscription fees or in-app purchases?</Text>
      <Text style={styles.accIcon} onPress={handleMore14}>{expanded14 ? "-" : "+"}</Text>
        </View>

      {expanded14 && (
        <View>
          <Text style={styles.nainCopyReg}>The basic features of the app are free to use, but additional features may require a subscription or in-app purchases.</Text>

        </View>
      )}


    </ScrollView>
    </>
  )
}

export default FAQPage

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,  
        marginBottom: 70  
    },
    accTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 12
    },
    dFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        width: '90%'
    },
    dFlexBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    accIcon: {
        fontSize: 22,
    },
    nainCopyReg: {
        marginTop: 15,
        marginLeft: 12,
        color: 'gray',
        lineHeight: 22
    },
    backBtn: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 10,
        fontSize: 15
    }
})
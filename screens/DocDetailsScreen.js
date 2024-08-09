import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

const DocDetailsScreen = ({route, navigation}) => {
    const { documentId, documentText, documentTimestamp } = route.params;
    const [expandMore, setExpandMore] = useState(false);

    const handleMore = () => {
      setExpandMore(!expandMore);
    }

  return (
    <>
    <SafeAreaView>
    <View style={{flexDirection: 'row',alignItems: 'center'}}>

<TouchableOpacity onPress={() => navigation.navigate("Explore")}>
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

    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
     <View style={styles.container}>
      {/* <Text>Document ID: {documentId}</Text> */}
      {/* <Text>Date: {formatTimestamp(documentTimestamp)}</Text> */}
      <Text>Content: {documentText}</Text>
      <Text style={styles.graytext}> Tap the text to continue</Text>

      <View style={styles.dFlex}>

        <TouchableOpacity onPress={handleMore}>
        <View style={styles.btn}>
        <Text style={styles.btnText}>{expandMore ? ' - less' : '+ more'}</Text>
        </View>
        </TouchableOpacity>
        {expandMore && 
      
      <View style={styles.dFlexAcc}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>copy</Text>
        </View>
            <View style={styles.sep}></View>
        <View style={styles.btn}>
          <Text style={styles.btnText}>share</Text> 
        </View>
    </View>
        }
      </View>
    </View>
    </KeyboardAvoidingView>
    
    </>
  )
}

export default DocDetailsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        width: '90%',
        alignSelf: 'center'
    },
    keyboardAvoidingContainer: {
        flex: 1,
      },
      dFlex: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'space-between',
        maxWidth: 223, 
        alignItems: 'center'
      },
      btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
      },
      btn: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 4
      },
      dFlexAcc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
      },
      sep: {
        width: 6
      },
      graytext: {
        color: 'gray',
        marginTop: 10
      }
    })
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar,KeyboardAvoidingView,TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth, db} from '../firebaseConfig'
import {collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("HomeTab")
            }
        })

        return unsubscribe;
    },[])


    const createUser = async () => {
        
        const order = {
          userEmail: email,  
        };
      
        try {
          const docRef = await addDoc(collection(db, 'userEmails'), order);
          console.log('Document created with ID: ', docRef.id);
        } catch (error) {
          console.error('Error creating document:', error);
        }
      };

    const handleSignUp = () => {
        if (email!== "" & password !== "") {
            createUserWithEmailAndPassword(auth,email,password)
            .then(() => console.log("Signup Successful"))
            .catch((err) => Alert.alert("Login error", err.message));
            Alert.alert("Account Successful! Navigate to sign in page to begin.")
        } if ( email === "" || password === "") {
            Alert.alert("Please fill out information")
        } 
    }


    const handleLogin = () => {
        if (email!== "" & password !== "") {
            signInWithEmailAndPassword(auth,email,password)
            .then(() => console.log("Login Successful"))
            .catch((err) => Alert.alert("Login error", err.message));
        }
    }

  return (
  <>


<View style={styles.container}>
  <Text style={styles.h1}>Let's</Text>
  <Text style={styles.h1}>Sign you up.</Text>

  <Text style={styles.grayToph2}>Welcome!</Text>
  <Text style={styles.grayh2}>Create account below!</Text>


  <Text style={styles.h3}>Email</Text>
  <TextInput 
  placeholder='Email' 
  style={styles.textInput}
  value={email}
 onChangeText={text => setEmail(text)}
  />

  <Text style={styles.h3}>Password</Text>
  <TextInput 
  placeholder='Password' 
  style={styles.textInput}
  value={password}
  onChangeText={text => setPassword(text)}
  secureTextEntry
  />


  <TouchableOpacity activeOpacity={0.6} onPress={handleSignUp}>
    <View style={styles.sIBtn}>
        <Text style={styles.sIBtnText}>Create Account</Text>
    </View>
  </TouchableOpacity>



</View>
  </>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        width: '90%',
        margin: 'auto',
        alignSelf: 'center'
        },
        h1: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 5
        },
        grayToph2: {
            marginTop: 25,
            color: 'gray'
        },
        grayh2: {
            color: 'gray'
        },
        h3: {
            marginTop: 40,
            marginBottom: 10,
            fontSize: 16
        },
        textInput: {
            borderColor: 'black',
            borderWidth: 1,
            padding: 15,
            borderRadius: 4,
            marginBottom: 15
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 50
        },
        sBtn: {
            marginLeft: 10,
        },
        sBtnText: {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
        },
        sIBtn: {
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
            backgroundColor: 'blue',
            padding: 12,
            borderRadius: 100,
            width: '60%',
            margin: 'auto',
            alignSelf: 'center'
        },
        sIBtnText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16
        }
})
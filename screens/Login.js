import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar,KeyboardAvoidingView,TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth, db} from '../firebaseConfig'
import {collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({navigation}) => {
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
            createUser();
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
     <SafeAreaView style={{backgroundColor: '#EEECE4'}}>
     
    </SafeAreaView>

    <ScrollView style={{backgroundColor: '#EEECE4', height: '100%'}}>
    <View style={styles.androidBack}>
        <Text style={styles.h1}>Welcome Back!</Text>
        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 10, color: '#8C8C8C'}}>Enter your account information below</Text>
    </View>

    <KeyboardAvoidingView
style={styles.container}
behavior="padding"
>
    <View>

        <TextInput
        placeholder='Email'
        style={styles.input}
        value={email}
        textContentType='emailAddress'
        onChangeText={text => setEmail(text)}
        />
        <TextInput
        placeholder='Password'
        value={password}
        textContentType='password'
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
    </View>

    <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.6}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={handleSignUp} style={styles.button} activeOpacity={0.6}>
        <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>


    </View>

</KeyboardAvoidingView>

        </ScrollView>
  </>
  )
}

export default Login

const styles = StyleSheet.create({
    back: {
        fontSize: 17,
        fontWeight:'bold',
        // marginLeft: 14
    },
    h1: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    androidBack: {
        paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0),
        marginLeft: 14
    },
    container: {
        flex: .6,
        justifyContent: 'center',
        alignItems: 'center'
    }, input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 15,
        width: 350,
        height: 45,
        borderWidth: 1,
        borderColor: '#0782F9',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40

    },
    button: {
        backgroundColor: '#0782F9',
        width: '55%',
        padding: 15,
        borderRadius: 4,
        marginBottom: 14

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'

    },
})
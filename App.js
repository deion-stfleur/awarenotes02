import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {auth} from './firebaseConfig';
import React, {useState, useEffect} from 'react'
import SignupScreen from './screens/SignUp';
import OnboardScreen from './screens/OnboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import FAQPage from './screens/FAQPage';
import FeedbackScreen from './screens/FeedbackScreen';
import DocDetailsScreen from './screens/DocDetailsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home"  options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name={focused ? 'home' : 'home'}
            size={20}
            color={focused ? '#000' : '#999'}
          />
        ),
      }} component={HomeScreen} />
      <Tab.Screen name="Explore"  options={{
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name={focused ? 'recent-actors' : 'recent-actors'}
            size={20}
            color={focused ? '#000' : '#999'}
          />
        ),
      }} component={ChallengesScreen} />

<Tab.Screen name="Profile"  options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? 'person-circle' : 'person-circle'}  
            size={20}
            color={focused ? '#000' : '#999'}
          />
        ),
      }} component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default function App() {



  const [user, setUser] = useState(null);


  // Handle user state changes
  function onAuthStateChanged(authUser) {
    setUser(authUser);
    // ...
  }


  useEffect(() => {
    // const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);


  return (
    <NavigationContainer>

{user ? (
      <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
        <Stack.Screen name="FAQ" component={FAQPage} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Document" component={DocDetailsScreen} />
      </Stack.Navigator>
          ) : (
              <Stack.Navigator>
                <Stack.Screen name="Docufy" component={OnboardScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </Stack.Navigator>


            )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

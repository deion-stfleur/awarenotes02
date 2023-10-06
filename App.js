import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import GoalsScreen from './screens/GoalsScreen';
import ActivityScreen from './screens/ActivityScreen';
// import RunningScreen from './screens/RunningScreen';
import FeelingHistoryScreen from './screens/FeelingHistory';
import MeditateScreen from './screens/subscreens/Meditate';
import YogaScreen from './screens/subscreens/Yoga'
import RunningScreen from './screens/subscreens/Running';
import MeditationGoal from './screens/goals/Meditation';
import YogaGoal from './screens/goals/Yoga';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {auth} from './firebaseConfig';
import React, {useState, useEffect} from 'react'


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
      <Tab.Screen name="Challenges"  options={{
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name={focused ? 'recent-actors' : 'recent-actors'}
            size={20}
            color={focused ? '#000' : '#999'}
          />
        ),
      }} component={ChallengesScreen} />

<Tab.Screen name="Activity"  options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? 'view-dashboard-variant-outline' : 'view-dashboard-variant-outline'}
            size={20}
            color={focused ? '#000' : '#999'}
          />
        ),
      }} component={ActivityScreen} />
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
        <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
        <Stack.Screen name="RunningScreen" component={RunningScreen} />
        <Stack.Screen name="FeelingHistoryScreen" component={FeelingHistoryScreen} />
        <Stack.Screen name="MeditateScreen" component={MeditateScreen} />
        <Stack.Screen name="YogaScreen" component={YogaScreen} />
        <Stack.Screen name="MediationGoal" component={MeditationGoal} />
        <Stack.Screen name="YogaGoal" component={YogaGoal} />
      </Stack.Navigator>
          ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
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

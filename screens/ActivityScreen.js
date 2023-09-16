import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { collection, query, onSnapshot } from 'firebase/firestore'
import {db} from '../firebaseConfig'

const ActivityScreen = () => {
  const currentDate = moment(); // Get the current date

  // Create an array of 7 days starting from the current day
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = currentDate.clone().day(i);
    const isToday = date.isSame(currentDate, 'day');
    const dayName = date.format('ddd');
    const dayDate = date.format('D');

    // Add the day view with styling for highlighting today
    daysOfWeek.push(
      <View key={i} style={[styles.dayContainer, isToday && styles.highlighted]}>
        <Text style={[styles.dayText, isToday && styles.highlightedText]}>{dayName}</Text>
        <Text style={[styles.dateText, isToday && styles.highlightedText]}>{dayDate}</Text>
      </View>
    );
  }


  const [orders, setOrders] = useState([]);

  useEffect(() => {


    const unsubscribe = onSnapshot(collection(db, 'user-description-posts'), (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    });



    return () => {
      unsubscribe(); 
    }// Unsubscribe from the snapshot listener when the component unmounts
  }, []);


  const alertMessage = () => {
    Alert.alert("We will hold you to your goals and help you track your progress!")
  }
  

  return (
    <>
    <SafeAreaView>

    </SafeAreaView>

<ScrollView style={{backgroundColor: '#EEECE4'}}>

    <View>
        <Text style={{marginLeft: 20, fontSize: 20,marginTop: 19,fontWeight: 'bold'}}>This Week</Text>
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      {daysOfWeek}
    </ScrollView>
    </View>

    <View style={{backgroundColor: '#fff',width: '95%',alignSelf: 'center',marginTop: 30,padding: 12, borderRadius: 12,shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,marginBottom: 30}}>

        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:'90%', alignSelf: 'center',marginTop: 14, marginBottom: 14}}>

            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5, fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center', width: '80%',alignSelf:'center'}}>Total Habits Created</Text>
            </View>


            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5, fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center', width: '80%',alignSelf:'center'}}>Moods Tracked</Text>
            </View>


            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5,fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center',width: '80%',alignSelf:'center'}}>Member Posts</Text>
            </View>
        </View>

    </View>


 
              {orders.map((order) => (

                <TouchableOpacity onPress={alertMessage}  key={order.id} activeOpacity={0.7}>

                <View key={order.id} style={{borderWidth: 1, width: '90%', marginBottom: 10, padding: 10, borderRadius: 4, backgroundColor: '#fff', alignSelf: 'center'}}>
                  {/* Render order details here */}
                  <Text style={{fontSize: 16}}>{order.userEmail}</Text>
                  <Text style={{fontSize: 16,marginTop: 5}}>{order.description}</Text>
                  <Text style={{fontSize: 16, alignSelf: 'flex-end'}}>{order.timestamp}</Text>
                </View>
                </TouchableOpacity>
              ))}
 
</ScrollView>
    
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
    marginTop: 8
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  highlighted: {
    backgroundColor: '#00aaff', // Change to your highlight color
    padding: 12,
    borderRadius: 200
  },
  dayText: {
    fontSize: 18,
    marginLeft: 4,
    marginRight: 4
  },
  dateText: {
    fontSize: 16,
    marginTop: 5,
  },
  highlightedText: {
    color: '#fff', // Change to your text color when highlighted
  },
});

export default ActivityScreen;

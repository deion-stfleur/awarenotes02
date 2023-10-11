import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert, Modal, Platform,StatusBar, RefreshControl } from 'react-native';
import moment from 'moment';
import { collection, query, onSnapshot, where, getDocs, doc } from 'firebase/firestore'
import {db, auth} from '../firebaseConfig'
import { Ionicons } from '@expo/vector-icons';

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

  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 }, // Adjust for leap year if needed
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  const [showAllMonths, setShowAllMonths] = useState(false);
  const visibleMonths = showAllMonths ? months : [months[currentDate.month()]];


  const [orders, setOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);


  useEffect(() => {


    const unsubscribe = onSnapshot(collection(db, 'user-description-posts'), (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    });


    const unsubscribe2 = onSnapshot(collection(db, 'userEmails'), (snapshot) => {
      const ordersData2 = [];
      snapshot.forEach((doc) => {
        ordersData2.push({ id: doc.id, ...doc.data() });
      });
      setOrders2(ordersData2);
    });

 


    return () => {
      unsubscribe(); 
      unsubscribe2(); 
   
    }// Unsubscribe from the snapshot listener when the component unmounts
  }, []);


  const alertMessage = () => {
    Alert.alert("We will hold you to your goals and help you track your progress!")
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };


  const closeModal = () => {
    setIsModalVisible(false);
  };
  const [brokenHabits, setBrokenHabits] = useState([]);
  const userEmail = auth.currentUser.email;
  
  const fetchBrokenHabits = async () => {
    // Create a reference to the "brokenHabits" subcollection of the user's document
    const userDocRef = doc(db, 'users', userEmail);
    const brokenHabitsRef = collection(userDocRef, 'brokenHabits');
  
    // Query the "brokenHabits" subcollection
    const q = query(brokenHabitsRef);
  
    try {
      const querySnapshot = await getDocs(q);
      const habitsData = [];
      querySnapshot.forEach((doc) => {
        habitsData.push(doc.data());
      });
      setBrokenHabits(habitsData);
    } catch (error) {
      console.error('Error fetching broken habits:', error);
    }
  };
  
  useEffect(() => {
    fetchBrokenHabits(); // Initial data fetch when the component mounts
  }, []);
  
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    setRefreshing(true);
  
    // Call fetchBrokenHabits to re-fetch the data
    fetchBrokenHabits();
  
    setTimeout(() => {
      // Simulate data fetching completion
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
    <SafeAreaView style={{backgroundColor: '#EEECE4',paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)}}>

    </SafeAreaView>

<ScrollView  refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
          colors={['#000']}
        />
      } style={{backgroundColor: '#EEECE4'}}>

    <View>

        <View style={{flexDirection: 'row', alignItems: 'center',marginTop: 19, justifyContent: 'space-between', width: '95%',marginBottom: 20}}>
        <Text style={{marginLeft: 20, fontSize: 20,fontWeight: 'bold'}}>This Week</Text>

    {/* <TouchableOpacity onPress={openModal}> 
        <Text style={{fontWeight: 'bold'}}><Ionicons name="analytics" size={20} color="black" /> More insights! </Text>
    </TouchableOpacity> */}
        </View>
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      {daysOfWeek}
    </ScrollView>
    </View>

    {/* <View style={{backgroundColor: '#fff',width: '95%',alignSelf: 'center',marginTop: 30,padding: 12, borderRadius: 12,shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,marginBottom: 30}}>

        <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 14, marginBottom: 14}}>

            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5, fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center', width: '80%',alignSelf:'center'}}>Total Habits Created</Text>
            </View>

                <View style={{height: '100%', width: 2,backgroundColor: '#CBCBCB'}}></View>
            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5, fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center', width: '80%',alignSelf:'center'}}>Moods Tracked</Text>
            </View>


            <View style={{height: '100%', width: 2,backgroundColor: '#CBCBCB'}}></View>


            <View>
            <Text style={{textAlign: 'center',fontWeight: 'bold',marginBottom: 5,fontSize: 19}}>0</Text>
            <Text style={{textAlign: 'center',width: '80%',alignSelf:'center'}}>Member Posts</Text>
            </View>
        </View>

    </View> */}

<Text style={{ marginLeft: 20, fontSize: 30, marginTop: 40, fontWeight: 'bold' }}>Today</Text>
<View>
  <Text style={{ width: '90%', alignSelf: 'center', marginBottom: 14, marginTop: 8, fontSize: 16 }}>Your Broken Habits:</Text>
  {brokenHabits.length === 0 ? ( // Check if the brokenHabits array is empty
    <Text style={{ width: '90%', alignSelf: 'center', fontSize: 16, textAlign: 'center', marginTop: 30 }}>
      No broken habits to display.... you either are done for the day (yaaay!!) or need to add more to conquer!!!
    </Text>
  ) : (
    brokenHabits.map((habit, index) => (
      <TouchableOpacity
        activeOpacity={0.6}
        key={index}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginBottom: 12,
          backgroundColor: '#7A7F97',
          padding: 16,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>{habit.text}</Text>
      </TouchableOpacity>
    ))
  )}
</View>

{/* <View style={{backgroundColor: '#7A7F97',padding: 5,width:'90%',alignSelf:'center',borderRadius: 6}}>
    <View style={styles.container}>
      {visibleMonths.map((month, index) => (
        <View key={index}>
          <Text style={styles.monthText}>{month.name}</Text>
          <View style={styles.dayContainer2}>
            {Array.from({ length: month.days }, (_, dayIndex) => (
              <View key={dayIndex} style={styles.dayBox}>
             
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
</View> */}
    {/* {!showAllMonths && (
      <TouchableOpacity onPress={() => setShowAllMonths(true)}>
        <Text style={{textAlign:'center',marginTop: 35}}>Show More +</Text>
      </TouchableOpacity>
    )}
    {showAllMonths && (
  <TouchableOpacity onPress={() => setShowAllMonths(false)}>
    <Text style={{textAlign:'center',marginTop: 35}}>Show Less -</Text>
  </TouchableOpacity>
)} */}

    <View>

    </View>
    <Text style={{marginLeft: 20, fontSize: 20,marginTop: 40,fontWeight: 'bold', marginBottom: 22}}>Other Members</Text>

      <View style={{marginBottom: 40}}>
           {orders2.map((order) => (

                <TouchableOpacity  key={order.id} activeOpacity={0.7}>

                <View key={order.id} style={{borderWidth: 1, width: '90%', marginBottom: 10, padding: 10, borderRadius: 4, backgroundColor: '#fff', alignSelf: 'center'}}>
                 
                 <View style={{flexDirection: 'row',justifyContent: 'space-between',width:'95%',alignSelf: 'center'}}>
                  <Text style={{fontSize: 16}}>{order.userEmail}</Text>
                  {/* <Text style={{fontSize: 16}}>{order.streak}</Text> */}
                 </View>
                </View>
                </TouchableOpacity>
              ))}
      </View>

 
              {/* {orders.map((order) => (

                <TouchableOpacity onPress={alertMessage}  key={order.id} activeOpacity={0.7}>

                <View key={order.id} style={{borderWidth: 1, width: '90%', marginBottom: 10, padding: 10, borderRadius: 4, backgroundColor: '#fff', alignSelf: 'center'}}>
                 
                  <Text style={{fontSize: 16}}>{order.userEmail}</Text>
                  <Text style={{fontSize: 16,marginTop: 5}}>{order.description}</Text>
                  <Text style={{fontSize: 16, alignSelf: 'flex-end'}}>{order.timestamp}</Text>
                </View>
                </TouchableOpacity>
              ))} */}


<Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>

                <View style={styles.modalContainer}>


                    <View style={styles.modalContent}>



                       

                   
                        <Text style={{ fontWeight: 'bold',fontSize: 20,textAlign: 'center'}}>Insights</Text>

                        <Text style={{textAlign: 'right',marginRight: 14}} onPress={closeModal}>x</Text>
                     
                  


                    </View>
                </View>

    </Modal>
 
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
  modalContainer: {
    backgroundColor: 'white',
    height: '99%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    bottom: 0,
  },
  modalContent: {
    flex: 1,
    marginTop: 60,
    width: '95%',
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '98%',
    alignSelf: 'center',
    
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  dayContainer2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: 40,
    height: 40,
    backgroundColor: 'lightblue',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  dayText2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActivityScreen;

import { StyleSheet, RefreshControl, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Image, Alert, Platform, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, collection, addDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const ChallengesScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [isModalVisible9, setIsModalVisible9] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [description, setDescription] = useState('');
  const [orders2, setOrders2] = useState([]);
  const [challengeName, setChallengeName] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [durationFrom, setDurationFrom] = useState('');
  const [durationTo, setDurationTo] = useState('');
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesQuery = query(collection(db, 'challenges'));
        const challengesSnapshot = await getDocs(challengesQuery);

        const challengesData = [];
        challengesSnapshot.forEach((doc) => {
          challengesData.push({ id: doc.id, ...doc.data() });
        });

        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching challenges: ', error);
        // Handle the error as needed
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in. Access the user's ID.
        setAuthenticatedUserId(user.uid);
      } else {
        // User is signed out or not authenticated.
        setAuthenticatedUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isSubmitDisableds = !challengeName || challengeDescription || goal


  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0); // Set the default selected button index to 0

  const handleBtnPress = (index) => {
    setSelectedBtnIndex(index);
  }


  useEffect(() => {


    const unsubscribe = onSnapshot(collection(db, 'FeelingCounts'), (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders2(ordersData);
    });




    return () => {
      unsubscribe();

    }// Unsubscribe from the snapshot listener when the component unmounts
  }, []);


  const handleMessage = () => {
    closeModal9();
  }


  const sendFeedback = async () => {
    const user = auth.currentUser.email;
    const order = {
      userId: user,
      challengeName: challengeName,
      challengeDescription: challengeDescription,
    };

    try {
      const docRef = await addDoc(collection(db, 'phase1-feedback'), order);
      console.log('Document created with ID: ', docRef.id);
      handleMessage();
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const [userFeedbackData, setUserFeedbackData] = useState([]);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      const user = auth.currentUser.email;
      const feedbackRef = collection(db, 'challenges');
      const userFeedbackQuery = query(feedbackRef, where('userId', '==', user));

      try {
        const querySnapshot = await getDocs(userFeedbackQuery);
        const feedbackData = [];

        querySnapshot.forEach((doc) => {
          const feedback = doc.data();
          feedbackData.push(feedback);
        });

        setUserFeedbackData(feedbackData);
      } catch (error) {
        console.error('Error fetching user feedback:', error);
      }
    };

    fetchUserFeedback();
  }, []); // Use an empty dependency array to run the effect once

  const [orders, setOrders] = useState([]);


  useEffect(() => {


    const unsubscribe = onSnapshot(collection(db, 'phase1-feedback'), (snapshot) => {
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



  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagePress = (uri) => {
    // Check if the image is already selected
    if (selectedImages.includes(uri)) {
      // If selected, remove it
      setSelectedImages(selectedImages.filter((imageUri) => imageUri !== uri));
    } else if (selectedImages.length < 3) {
      // If not selected and less than 3 images are selected, add it
      setSelectedImages([...selectedImages, uri]);
    }
  };


  const closeScreen = () => {
    closeModal();
    navigation.navigate("RunningScreen");
  }

  const isImageSelected = (uri) => selectedImages.includes(uri);

  const renderImage = (uri, label) => {
    const isSelected = isImageSelected(uri);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleImagePress(uri)}
        key={uri}
      >
        <View
          style={{
            borderColor: isSelected ? 'green' : 'transparent',
            borderWidth: isSelected ? 3 : 0,
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri }}
            style={{ height: 300, width: 180, borderRadius: 10 }}
          />
          {isSelected && (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -10 }, { translateY: -10 }],
                backgroundColor: 'green',
                width: 20,
                height: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>✔</Text>
            </View>
          )}
          <Text style={{ textAlign: 'center', marginTop: 15, fontWeight: '500', fontSize: 18 }}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isSubmitDisabled = !description


  const create = async () => {
    const user = auth.currentUser;
    const order = {
      userId: user.uid,
      userEmail: user.email,
      description: description,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    try {
      const docRef = await addDoc(collection(db, 'user-description-posts'), order);
      console.log('Document created with ID: ', docRef.id);
      Alert.alert("Nice!", "Go to the activity screen for all note history 😊");
      closeModal3();

      // Clear the description after successfully creating the document
      setDescription(''); // Set the description to an empty string
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };




  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getUTCHours() - 5; // Adjust for Eastern Time (ET)

      if (currentHour >= 5 && currentHour < 12) {
        return 'Morning Sunshine!';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'Afternoon hows it going?,';
      } else {
        return 'We did it its the end of the day!';
      }
    };

    setGreeting(getCurrentTime());
  }, []);

  const resetSelectedImages = () => {
    // Clear the selectedImages state
    setSelectedImages([]);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };


  const closeModal = () => {
    setIsModalVisible(false);
    resetSelectedImages();
  };

  const openModal4 = () => {
    setIsModalVisible(true);
  };


  const closeModal4 = () => {
    setIsModalVisible4(false);
  };

  const openModal9 = () => {
    setIsModalVisible9(true);
  };


  const closeModal9 = () => {
    setIsModalVisible9(false);
  };



  const openModal2 = () => {
    setIsModalVisible2(true);
  };


  const closeModal2 = () => {
    setIsModalVisible2(false);
  };


  const openModal3 = () => {
    setIsModalVisible3(true);
  };


  const closeModal3 = () => {
    setIsModalVisible3(false);
  };


  const [yesPressed, setYesPressed] = useState(false);
  const [noSkipsPressed, setNoSkipsPressed] = useState(false);

  const [yesPublic, setYesPublic] = useState(false);
  const [yesPrivate, setYesPrivate] = useState(false);

  const handleYesPress = () => {
    setYesPressed(true);
    setNoSkipsPressed(false);
  };

  const handleNoSkipsPress = () => {
    setNoSkipsPressed(true);
    setYesPressed(false);
  };


  const handleYesPublic = () => {
    setYesPublic(true);
    setYesPrivate(false);
  };

  const handleYesPrivate = () => {
    setYesPrivate(true);
    setYesPublic(false);
  };


  const addChallengeToFirestore = async () => {
    const user = auth.currentUser.email;
    try {
      // Define the data you want to add
      const challengeData = {
        userId: user,
        challengeName,
        challengeDescription,
        goal,
        duration: {
          from: durationFrom, // You'll need to replace this with the actual date data
          to: durationTo, // You'll need to replace this with the actual date data
        },
        privacy: yesPublic ? 'Public' : 'Private',
      };

      // Add the data to a Firestore collection
      const docRef = await addDoc(collection(db, 'challenges'), challengeData);

      // Clear the form fields or reset state as needed
      setChallengeName('');
      setChallengeDescription('');
      setGoal('');
      closeModal9();
      // ... and other state variables you may have

      // Optionally, you can display a success message or navigate to another screen
      // or perform other actions after successfully adding the data.
    } catch (error) {
      console.error('Error adding challenge to Firestore: ', error);
      // Handle the error as needed
    }
  };


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
   
    setRefreshing(true);

    setTimeout(() => {
      // Simulate data fetching completion
      setRefreshing(false);
    }, 2000);
  };


  return (
    <>

      <SafeAreaView style={{
        backgroundColor: '#EEECE4', paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0)
      }}>

        <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%',marginBottom: 10 }}>
          <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: 'bold', marginTop: 4 }}>Challenges</Text>

          <View>
            <TouchableOpacity activeOpacity={0.6} onPress={openModal9}>
              <Ionicons name="md-add-circle" size={29} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
          colors={['#000']}
        />
      }  showsVerticalScrollIndicator={false} style={{ backgroundColor: '#EEECE4' }}>


        {/* <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 17, marginTop: 20 }}>Leaderboards</Text> */}



        <View style={styles.btnRow}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleBtnPress(0)}>
            <View style={[styles.btnContainer, selectedBtnIndex === 0 && styles.selectedBtn]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.btnTxt}>Explore</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleBtnPress(1)}>
            <View style={[styles.btnContainer, selectedBtnIndex === 1 && styles.selectedBtn]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.btnTxt}>My Challenges</Text>
              </View>
            </View>

          </TouchableOpacity>
        </View>

        {selectedBtnIndex === 0 ? (


          <View>


          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("FeaturedChallengeScreen")}>

            <View style={{backgroundColor:'#7A7F97',width:'90%',alignSelf: 'center',marginTop: 15,height: 220,borderRadius: 8}}>
              <View style={{backgroundColor: 'lightgray',position: 'absolute',bottom: 0,width:'100%',borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}>
                <Image style={{height: 200, width: '100%', borderTopLeftRadius: 6,borderTopRightRadius: 6}} source={{uri: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbGxlbmdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'}} />
                <View style={{padding: 12}}>
                 <Text style={{color: '#fff',fontSize: 17}}>Featured</Text>
                 <Text style={{color: '#202020',fontSize: 17,marginTop: 5,fontWeight:'bold'}}>14 day Monthly Challenge</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>



            <Text style={{width:'90%',alignSelf: 'center',marginTop: 25,fontSize: 22,fontWeight: 'bold'}}>Upcoming challenges</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {challenges.map((challenge) => (
              <TouchableOpacity onPress={() => navigation.navigate('PublicChallenge', { challenge })} activeOpacity={.8} key={challenge.id} style={{marginLeft: 10,marginTop: 20,borderRadius: 6}}>
              <View style={{padding: 12}}>

                <View>
              <Image style={{ height: 200, width: 300, marginBottom: 12, borderRadius: 6, objectFit:'cover' }} source={{ uri: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' }} />
              <View style={{backgroundColor: 'blue',width: 96,padding: 10,borderRadius: 6,position:'absolute',top: 14,left: 10}}>
            
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Ionicons name="person-circle-sharp" size={24} color="white" style={{marginRight: 5}} />
            <Text style={{color: '#fff',fontSize: 14,fontWeight:'bold'}}>{challenge.privacy}</Text>
            </View>
              </View>
                </View>
                <View style={{maxWidth: 250}}>

                <Text style={{fontSize: 18,fontWeight: 'bold'}}>{challenge.challengeName}</Text>
                {/* <Text>Challenge Description: {challenge.challengeDescription}</Text> */}
                {/* <Text>Challenge Description: {challenge.duration.from}</Text>
                <Text>Challenge Description: {challenge.duration.to}</Text>
                <Text>Challenge Description: {challenge.goal}</Text>
                <Text>Challenge Description: {challenge.privacy}</Text> */}
                </View>
              </View>
              </TouchableOpacity>
            ))}
            </ScrollView>

          </View>

        ) : selectedBtnIndex === 1 ? (

          <View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>


              {userFeedbackData.length === 0 ? (

                <>
                  <Text style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 19 }}>No challenge joined</Text>
                  <Text style={{ fontSize: 16, marginBottom: 30 }}>Challenges that you join or create will appear here</Text>
                  <TouchableOpacity activeOpacity={0.6} onPress={openModal9}>
                    <View style={{ borderWidth: 1, padding: 18, borderRadius: 10, width: 300, backgroundColor: 'blue' }}>
                      <Text style={{ textAlign: 'center', fontWeight: '700', color: '#fff', fontSize: 17 }}>Host your own challenge</Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : null}

              <View style={{ width: '90%', alignSelf: 'center' }}>
                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Recent</Text> */}
                {userFeedbackData.length === 0 ? (
                  null
                ) : (
                  <FlatList
                    data={userFeedbackData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ChallengeDetail', { item })}>

                        <View style={{ marginBottom: 10, padding: 20, borderRadius: 4, marginBottom: 17 }}>
                          <Image style={{ height: 200, width: '100%', marginBottom: 12, borderRadius: 6 }} source={{ uri: 'https://images.unsplash.com/photo-1665686374221-1901faa9f3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGFwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60' }} />
                          <Text style={{fontSize: 15,fontWeight:'bold',marginBottom: 12}}>Name: {item.challengeName}</Text>
                          <Text>Description: {item.challengeDescription}</Text>
                          {/* <Text>Challenge Description: {item.duration.from}</Text>
                          <Text>Challenge Description: {item.duration.to}</Text>
                          <Text>Challenge Description: {item.goal}</Text> */}
                          {/* <Text>Challenge Description: {item.privacy}</Text> */}
                        
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  
               
                )}

                
              </View>
              
            </View>
            


            {/*   
<TouchableOpacity onPress={openModal9} activeOpacity={0.7} style={{alignSelf: 'flex-end',marginRight: 15,marginTop: 20}}>
  <AntDesign name="plussquareo" size={30} color="black" />
</TouchableOpacity> */}
          </View>
        ) : (


          null
        )}







        {/* <View>

          <TouchableOpacity activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>

              <TouchableOpacity onPress={openModal} activeOpacity={0.7} style={{ backgroundColor: 'pink', height: 250, width: '49%', borderRadius: 6 }}>

                <View>

                  <View>
                    
                    <View style={{ backgroundColor: 'white', width: 100, borderRadius: 16, alignSelf: 'center', marginTop: 20 }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Love</Text>

                    </View>
                    <MaterialCommunityIcons style={{ alignSelf: 'center', marginTop: 40 }} name="lightning-bolt" size={44} color="gray" />
                    <Text style={{ marginTop: 17, textAlign: 'center', fontWeight: '700' }}>Create Healthy Habits</Text>
                    <Text style={{ textAlign: 'center', width: '80%', alignSelf: 'center', marginTop: 10, lineHeight: 19 }}>Let's maintain 3 habits this week</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={openModal2} activeOpacity={0.7} style={{ backgroundColor: 'lightgreen', height: 250, width: '49%', borderRadius: 6 }}>
                <View>
                  <View>
                    <View style={{ backgroundColor: 'white', width: 100, borderRadius: 16, alignSelf: 'center', marginTop: 20 }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confused</Text>
                    </View>
                    <MaterialCommunityIcons name="head-question-outline" size={44} style={{ alignSelf: 'center', marginTop: 40 }} color="gray" />
                    <Text style={{ marginTop: 17, textAlign: 'center', fontWeight: '700' }}>Mood Board</Text>
                    
                    <Text style={{ textAlign: 'center', width: '80%', alignSelf: 'center', marginTop: 10, lineHeight: 19 }}></Text>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        </View> */}

        {/* <TouchableOpacity onPress={openModal3} activeOpacity={0.7}>

          <View style={{ backgroundColor: '#91CCFF', width: '90%', alignSelf: 'center', marginTop: 20, height: 260, borderRadius: 6,marginBottom: 40 }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="send-o" size={44} color="gray" style={{ marginBottom: 20 }} />
              <Text style={{ textAlign: 'center', width: '75%', alignSelf: 'center', fontSize: 19, fontWeight: '500' }}>Complete atleast 1 blank posts using different tags over the past month</Text>
            </View>
          </View>
        </TouchableOpacity> */}

        <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>

          <View style={styles.modalContainer}>

            <View style={styles.modalContent}>

              <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, fontWeight: '500', width: '80%', alignSelf: 'center' }}>Lets works on creating some healthy habits. </Text>

              <Text style={{ textAlign: 'center', marginTop: 20 }}>We have chosen these healthy habits for you based off our super fancy algorithm😆 </Text>
              {/* <Text style={{ textAlign: 'center', marginTop: 20 }}>Select three things you want achieve this cycle!</Text> */}


              {/* <ScrollView style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  {renderImage(
                    'https://images.unsplash.com/photo-1627376617965-b8c29ca91aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHNsZWVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
                    'Sleeping'
                  )}

                  {renderImage(
                    'https://images.unsplash.com/photo-1578880981498-3d60436ba825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxmaXRuZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
                    'Fitness'
                  )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 70 }}>
                  {renderImage(
                    'https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOXxfaGItZGw0US00VXx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
                    'Eating on Time!'
                  )}
                  {renderImage(
                    'https://images.unsplash.com/photo-1684938031016-81c55677220d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOXxfaGItZGw0US00VXx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
                    'Me Time'
                  )}
                </View>
              </ScrollView> */}
              {/* <TextInput placeholder='Answer Here' style={{ borderRadius: 6, marginBottom: 260, marginTop: 20,fontSize: 18}} /> */}


              <ScrollView>


                <TouchableOpacity activeOpacity={0.6} onPress={closeScreen}>
                  <View style={{
                    backgroundColor: 'white', borderWidth: 1, borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><FontAwesome5 name="running" size={24} color="black" /> Running</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>



                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{
                    borderWidth: 1, backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><MaterialCommunityIcons name="sleep" size={24} color="black" /> More Sleep</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{
                    borderWidth: 1, backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><MaterialCommunityIcons name="spoon-sugar" size={24} color="black" /> No sugar</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{
                    borderWidth: 1, backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><Foundation name="guide-dog" size={24} color="black" /> Walk the Dog</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{
                    borderWidth: 1, backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><AntDesign name="book" size={24} color="black" /> Read</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{
                    borderWidth: 1, backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30, shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4
                  }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 19, fontWeight: '500' }}><Ionicons name="person-circle" size={24} color="black" /> Personal Time</Text>

                      <View>
                        <Text style={{ fontSize: 19 }}>0/7</Text>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>


                {/* <TouchableOpacity activeOpacity={0.6}>

                <View style={{ backgroundColor: 'white', borderRadius: 6, padding: 19, marginTop: 30,borderWidth: 1 }}>

                 
                    <Text style={{ fontSize: 19, fontWeight: '500',textAlign: 'center' }}>Add More</Text>


                  
                </View>
              </TouchableOpacity> */}
              </ScrollView>


              <View style={{ backgroundColor: 'black', width: 45, borderRadius: '50%', alignSelf: 'center', position: 'absolute', bottom: 60 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 8 }} onPress={closeModal}>x</Text>
              </View>

            </View>

          </View>

        </Modal>


        <Modal visible={isModalVisible2} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible2(false)}>

          <View style={styles.modalContainer2}>

            <View style={styles.modalContent2}>

              <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, fontWeight: '500' }}>How are you feeling right now? </Text>


              <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 10 }}>

                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }} activeOpacity={0.7}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Angry</Text>
                  </View>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%', marginLeft: 3, marginRight: 3 }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Wishful</Text>
                  </View>

                </TouchableOpacity>


                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Meh</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'center' }}>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Lonely</Text>
                  </View>
                </TouchableOpacity>
                {/* 
  <View style={{backgroundColor: '#fff', borderWidth: 1,borderRadius: 100, width: '33%',marginLeft: 3,marginRight: 3}}>
    <Text style={{textAlign: 'center',padding: 7, fontSize: 16}}>Wishful</Text>
  </View> */}

                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }} activeOpacity={0.7}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Playful</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }} activeOpacity={0.7}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Happy</Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%', marginLeft: 3, marginRight: 3 }} activeOpacity={0.7}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Exhausted</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Fearful</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }} activeOpacity={0.7}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Stimulated</Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%', marginLeft: 3, marginRight: 3 }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Tired</Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Great</Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Loved</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%', marginLeft: 3, marginRight: 3 }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Terrible</Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Upset</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 30, alignSelf: 'center' }}>

                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Okay</Text>
                  </View>
                </TouchableOpacity>
                {/* 
  <View style={{backgroundColor: '#fff', borderWidth: 1,borderRadius: 100, width: '33%',marginLeft: 3,marginRight: 3}}>
    <Text style={{textAlign: 'center',padding: 7, fontSize: 16}}>Wishful</Text>
  </View> */}


                <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 100, width: '33%' }}>
                  <View>
                    <Text style={{ textAlign: 'center', padding: 7, fontSize: 16 }}>Sick</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: 'black', width: 45, borderRadius: '50%', alignSelf: 'center' }}>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 8 }} onPress={closeModal2}>x</Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>

        </Modal>



        <Modal visible={isModalVisible3} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible3(false)}>

          <View style={styles.modalContainer3}>

            <TouchableOpacity onPress={create} style={{ alignSelf: 'flex-end' }}>
              <View disabled={isSubmitDisabled} style={{ marginTop: 13, backgroundColor: isSubmitDisabled ? 'lightgray' : 'black', padding: 12, borderRadius: 100, width: 95, alignSelf: 'flex-end', marginRight: 14 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Send   <FontAwesome name="send-o" size={16} color="gray" style={{ marginBottom: 20 }} /></Text>
              </View>
            </TouchableOpacity>
            <View style={styles.modalContent3}>

              <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, fontWeight: '500' }}>{greeting} Note down three things you want to complete and we'll hold you to it!</Text>
              <View style={{
                borderWidth: 1, marginTop: 50, borderRadius: 6, marginBottom: 22, backgroundColor: '#fff', shadowColor: 'black',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              }}>
                <TextInput value={description}
                  onChangeText={setDescription} placeholder='Answer Here' style={{ borderRadius: 6, marginBottom: 260, marginTop: 20, fontSize: 28, paddingLeft: 12 }} />
              </View>


              <View style={{ backgroundColor: 'black', width: 45, borderRadius: '50%', alignSelf: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 8 }} onPress={closeModal3}>x</Text>
              </View>

            </View>

          </View>

        </Modal>



      </ScrollView>
      <Modal visible={isModalVisible9} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible9(false)}>
        <View style={styles.modalContainer4}>

          <View style={styles.modalContent4}>
            <ScrollView>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 }}>

                <View>
                  <TouchableOpacity onPress={closeModal9}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ textAlign: 'center', marginRight: 20, fontSize: 16, color: '#fff' }}>New Challenge</Text>
                </View>
                <View>
                  <Text style={{ color: 'transparent' }}>no</Text>
                </View>
              </View>
              {/* 
                <TouchableOpacity activeOpacity={0.6}>
                  <View style={{borderWidth: 1,borderRadius: 6,height: 150,marginTop: 20}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Entypo name="upload" size={24} color="black" style={{marginBottom: 20}} />
                   <Text>Tap to select or upload image</Text>
                    </View>
                  </View>
                </TouchableOpacity> */}

              <TextInput value={challengeName}
                onChangeText={setChallengeName} placeholder='Enter Challenge Name' placeholderTextColor={'black'} style={{ marginTop: 20, padding: 14, borderRadius: 6, backgroundColor: 'lightgray' }} />
              <TextInput placeholderTextColor={'black'} value={challengeDescription}
                onChangeText={setChallengeDescription} multiline placeholder='Enter Description for challenge' style={{ borderWidth: 1, marginTop: 20, padding: 14, borderRadius: 6, height: 140, backgroundColor: 'lightgray' }} />
              <Text style={{ marginTop: 20, fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Goal</Text>


              <TextInput placeholderTextColor={'black'} value={goal}
                onChangeText={setGoal} placeholder='How many times per day?' keyboardType={'numeric'} maxLength={2} style={{ borderWidth: 1, marginTop: 10, padding: 14, borderRadius: 6, backgroundColor: 'lightgray' }} />

              <Text style={{ marginTop: 40, fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Skip allowance</Text>


              <View style={styles.container}>
                <TouchableOpacity onPress={handleYesPress}>
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: yesPressed ? 'white' : '#202020' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: yesPressed ? 'black' : '#fff' },
                      ]}
                    >
                      Yes
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNoSkipsPress}>
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: noSkipsPressed ? 'white' : '#202020' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: noSkipsPressed ? 'black' : '#fff' },
                      ]}
                    >
                      No Skips
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={{ marginTop: 40, fontSize: 17, color: '#fff', fontWeight: 'bold', marginBottom: 15 }}>Duration</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#fff', fontSize: 17, marginRight: 8 }}>From</Text>
                <TextInput value={durationFrom}
                  onChangeText={setDurationFrom} keyboardType='numeric' placeholder='dd/mm' placeholderTextColor={'black'} style={{ borderWidth: 1, backgroundColor: 'lightgray', width: 90, padding: 14 }} maxLength={4} />
                <Text style={{ color: '#fff', fontSize: 18 }}>-</Text>
                <Text style={{ color: '#fff', fontSize: 17, marginRight: 8 }}>To</Text>
                <TextInput value={durationTo}
                  onChangeText={setDurationTo} keyboardType='numeric' placeholder='dd/mm' placeholderTextColor={'black'} style={{ borderWidth: 1, backgroundColor: 'lightgray', width: 90, padding: 14 }} maxLength={4} />
              </View>

              <Text style={{ marginTop: 40, fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Privacy*</Text>





              <View style={styles.container}>
                <TouchableOpacity onPress={handleYesPublic}>
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: yesPublic ? 'white' : '#202020' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: yesPublic ? 'black' : '#fff' },
                      ]}
                    >
                      Public
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleYesPrivate}>
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: yesPrivate ? 'white' : '#202020' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: yesPrivate ? 'black' : '#fff' },
                      ]}
                    >
                      Private
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>




              <TouchableOpacity style={{ marginTop: 40, marginBottom: 40 }} activeOpacity={0.6} onPress={addChallengeToFirestore}>
                <View style={{ borderWidth: 1.4, padding: 12, borderRadius: 8, width: 200, alignSelf: 'center', backgroundColor: '#fff' }}>
                  <Text style={{ textAlign: 'center', fontWeight: '500' }}>Create Challenge +</Text>
                </View>
              </TouchableOpacity>

            </ScrollView>
          </View>

        </View>
      </Modal>
    </>
  )
}

export default ChallengesScreen

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#DEDEDE',
    height: '95%',
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
    marginTop: 20,
    width: '95%',
    alignSelf: 'center'
  },
  modalContainer2: {
    backgroundColor: 'lightgreen',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    bottom: 0,
  },
  modalContent2: {
    flex: 1,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center'
  },
  modalContainer3: {
    backgroundColor: '#91CCFF',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    bottom: 0,
  },
  modalContent3: {
    flex: .99,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center'
  },
  btnRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
    // width: '90%',
    alignSelf: 'center'
  },
  btnTxt: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  selectedBtn: {
    backgroundColor: '#87C6FF',
  },
  btnContainer: {
    backgroundColor: 'lightgray',
    padding: 7,
    borderRadius: 6,
    width: 180,
    // alignSelf: 'center'
  },
  modalContainer4: {
    backgroundColor: '#162B96',
    height: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    bottom: 0,
  },
  modalContent4: {
    flex: .99,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 250,
    marginTop: 20,
  },
  button: {
    padding: 12,
    width: 100,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
})
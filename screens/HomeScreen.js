import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { doc, setDoc, collection, addDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import {db, auth} from '../firebaseConfig'

const quotes = [
    "No matter how dirty your past is, your future is still spotless.",
    "I was born to make mistakes, not to fake perfection",
    "Bad decisions, good intentions.",
    "If he only wants you for your breasts, legs, and thighs, send him to KFC.",
    "Smile more than you cry, Give more than you take, and Love more than you Hate.",
    "Life is like a confused teacher...first she gives the test and then teaches the lesson",
    "In the midst of chaos, seek the calm within yourself.",
"Your scars tell stories of battles fought and survived.",
"Behind every 'overnight success' lies years of hard work.",
"You can't control the wind, but you can adjust your sails.",
"Adversity is the forge where resilience is forged.",
"Don't let the fear of falling keep you from flying.",
"The most beautiful gardens bloom from the darkest soil.",
"Rainbows follow storms, not sunny days.",
"A river cuts through rock, not because of its power but its persistence.",
"Silence can be a powerful response to ignorance.",
"The best way to predict the future is to create it.",
"You are the author of your own story; make it a bestseller.",
"The journey of a thousand miles begins with a single step.",
"Happiness is a choice, not a destination.",
"The hardest battles are often fought within.",
"Strength isn't measured by how much you lift but by how you carry your burdens.",
"The most precious moments are often the simplest.",
"Gratitude turns what we have into enough.",
"You can't change the past, but you can shape the future.",
"Kindness is a language everyone understands.",
"Life's challenges are like a canvas; you choose the colors to paint with.",
"The greatest gift you can give is your presence.",
"In the dance of life, sometimes you lead, and sometimes you follow."
  ];


  const questions = [
   "What is something new you learned recently that fascinated you?", 
    "How do you envision your ideal self in five years?",
    "What inspires you to get out of bed every morning?",
   "What are your favorite books, and why do you love them?",
    "What's a challenging goal you've set for yourself, and how are you working towards it?",
    "Describe a situation where you overcame a significant obstacle. What did you learn from it?",
    "If you could travel anywhere in the world, where would you go, and what would you like to explore there?",
    "What's a skill or hobby you've always wanted to learn but haven't yet? Why?",
    "How do you handle setbacks and failures in your life?",
    "Who is a role model you admire and why?",
    "What are three things you're grateful for today?",
    "What's the most interesting fact you know about biology or the natural world?",
    "How can you incorporate more eco-friendly habits into your daily life?",
    "What's your favorite type of exercise or physical activity, and why?",
    "What do you enjoy doing in your free time to relax and unwind?",
    "Can you name a biographical book or documentary you found particularly inspiring?",
   "What's your favorite meal or cuisine, and do you enjoy cooking it?",
    "How do you handle stress or anxiety when it arises?",
    "What's a recent accomplishment you're proud of?",
    "What's a challenging question you'd like to find the answer to?",
    "How can you expand your knowledge in a subject you're passionate about?",
    "What role does mindfulness or meditation play in your life, if any?",
    "Describe a moment when you felt truly alive and in the present.",
    "What's a topic you could spend hours discussing with others?",
    "What are your favorite types of music, and how do they make you feel?",
    "How can you incorporate more kindness and compassion into your daily interactions?",
    "What's a personal project you'd love to start working on soon?",
    "How do you like to express your creativity?",
    "Can you share a memorable travel experience that had a significant impact on you?",
    "What's a recent scientific discovery or breakthrough that amazed you?",
    "What are your favorite outdoor activities, and why do you enjoy them?",
    "How do you define success in your life?",
    "What's a challenging concept or skill you'd like to master?",
    "Share a recipe you love cooking or a dish you'd like to learn to make.",
    "What's something you'd like to change about your daily routine to enhance your well-being?",
    "Describe a place in nature that holds special meaning to you.",
    "How do you stay motivated when pursuing long-term goals?",
    "What's a book, movie, or TV show you enjoyed recently and recommend to others?",
    "What's a personal mantra or quote that resonates with you?",
    "If you could meet any historical figure, who would it be, and what would you ask them?",
  ];


const HomeScreen = ({navigation}) => {
    const [greeting, setGreeting] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [isScrollViewVisible, setIsScrollViewVisible] = useState(true);


    const isSubmitDisabled = !description


    const create = async () => {
      const user = auth.currentUser;
      const order = {
        userId: user.uid,
        userEmail: user.email,
        generatedQuestion: randomQuote2,
        description: description,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      };
    
      try {
        const docRef = await addDoc(collection(db, 'answered-generated-user-questions'), order);
        console.log('Document created with ID: ', docRef.id);
        Alert.alert("Nice!","Go to the activity screen for all note history 😊");   
        // Clear the description after successfully creating the document
        setDescription(''); // Set the description to an empty string
      } catch (error) {
        console.error('Error creating document:', error);
      }
    };
    

    const handleButtonClick = async (buttonName) => {
      setSelectedButton(buttonName);
      setIsScrollViewVisible(false);

      if (buttonName === 'Hopeful') {
        Alert.alert("We apprecitate your response and understand that feeelng hopeful is okay!");
      }

      if (buttonName === 'Silly') {
        Alert.alert("We apprecitate your response and understand that feeelng silly is okay!");
      }

      if (buttonName === 'Sad') {
        Alert.alert("We apprecitate your response and understand that feeelng sad is okay!");
      }

      if (buttonName === 'Happy') {
        Alert.alert("We apprecitate your response and understand that feeelng happy is okay!");
      }

      if (buttonName === 'Angry') {
        Alert.alert("We apprecitate your response and understand that feeelng angry is okay!");
      }

     

      // Get the user's email (assuming you are using Firebase Authentication)
   
      const user = auth.currentUser;
      const userEmail = user ? user.email : 'Anonymous'; // Use 'Anonymous' for unauthenticated users
    
      // Reference to the Firestore document for the selected feeling
      const feelingRef = doc(db, 'FeelingCounts', buttonName);
    
      try {
        // Fetch the current count from Firestore
        const feelingDoc = await getDoc(feelingRef);
        const currentCount = feelingDoc.exists() ? feelingDoc.data().count : 0;
    
        // Increment the count in Firestore
        await setDoc(feelingRef, {
          count: currentCount + 1,
          userEmail: userEmail,
          timestamp: serverTimestamp(), // Use Firestore server timestamp
        });
    
        // Update the front end with the new count
        // Update the state variables and display the counts in your component
      } catch (error) {
        console.error('Error updating feeling count:', error);
      }
    };




    const openModal = () => {
        setIsModalVisible(true);
      };
  

      const closeModal = () => {
        setIsModalVisible(false);
      };


    useEffect(() => {
        // Function to reset the counter to 0 at the end of the day
        const resetCounterAtEndOfDay = () => {
          const now = new Date();
          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999);
    
          if (now >= endOfDay) {
            setCount(0);
          }
        };
    
        // Set an interval to check and reset the counter at the end of the day
        const interval = setInterval(resetCounterAtEndOfDay, 1000); // Check every second
    
        return () => clearInterval(interval); // Clean up the interval on unmount
      }, []);
    
      const increment = () => {
        if (count < 20) {
          setCount(count + 1);
        }
      };
    
      const decrement = () => {
        if (count > 0) {
          setCount(count - 1);
        }
      };


    useEffect(() => {
        const getCurrentTime = () => {
          const currentTime = new Date();
          const currentHour = currentTime.getUTCHours() - 5; // Adjust for Eastern Time (ET)
    
          if (currentHour >= 5 && currentHour < 12) {
            return 'Good morning,';
          } else if (currentHour >= 12 && currentHour < 17) {
            return 'Good afternoon,';
          } else {
            return 'Good evening,';
          }
        };
    
        setGreeting(getCurrentTime());
      }, []);
  
  
      const [randomQuote, setRandomQuote] = useState('');
  
      useEffect(() => {
        generateRandomQuote();
      }, []);
    
      const generateRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
      };
    
  
      const [randomQuote2, setRandomQuote2] = useState('');
  
      useEffect(() => {
        generateRandomQuote2();
      }, []);
    
      const generateRandomQuote2 = () => {
        const randomIndex2 = Math.floor(Math.random() * questions.length);
        setRandomQuote2(questions[randomIndex2]);
      };
    
      const words = randomQuote.split(' ');

    const [count, setCount] = useState(0);

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
          navigation.replace("Login")
        })
        .catch(error => alert.message)
      }

  return (
  <>
    <SafeAreaView style={{paddingTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0), backgroundColor: '#EEECE4'}}>
    </SafeAreaView>
    <ScrollView style={{backgroundColor: '#EEECE4'}}>

<View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', width: '95%'}}>
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>

      <View style={{flexDirection: 'row',alignItems: 'center',marginTop: 12}}>

        <TouchableOpacity activeOpacity={0.6}>
      <View style={{height: 50,width: 50, backgroundColor: 'gray',borderRadius: '50%',marginRight: 12}}>

        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
        {/* <Text style={{color: '#fff'}}>test</Text> */}
        </View>
      </View>
        </TouchableOpacity>
      <Text onPress={handleSignOut} style={{fontSize: 24, fontWeight: '500', marginTop: 6}}>Deion</Text>
      </View>
    </View>


</View>


    <View style={{marginLeft: 14, marginTop: 30}}>
      <Text>How are you feeling today?</Text>
        {!selectedButton ? (
          <ScrollView horizontal style={{flexDirection: 'row', marginTop: 20}}>

    
            <TouchableOpacity activeOpacity={0.6}    onPress={() => handleButtonClick('Hopeful')}>
            <View style={{borderColor: selectedButton === 'Hopeful' ? 'blue' : 'transparent', borderWidth: 1,padding: 8, borderRadius: 13, width: 70, marginRight: 5, backgroundColor: '#f5f5f3'}}>
                <Fontisto style={{alignSelf: 'center',color: '#FABE0E'}} name="neutral" size={24}  />
                <Text style={{marginTop: 5, textAlign: 'center'}}>Hopeful</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => handleButtonClick('Silly')}>
            <View style={{borderColor: selectedButton === 'Silly' ? 'blue' : 'transparent',borderWidth: 1,padding: 8, borderRadius: 13, width: 70,marginRight: 5,backgroundColor: '#f5f5f3'}}>
            <Fontisto style={{alignSelf: 'center'}} name="wink" size={24} color="purple" />
                <Text style={{marginTop: 5, textAlign: 'center'}}>Silly</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => handleButtonClick('Sad')}>
            <View style={{borderColor: selectedButton === 'Sad' ? 'blue' : 'transparent',borderWidth: 1,padding: 8, borderRadius: 13, width: 70,marginRight: 5,backgroundColor: '#f5f5f3'}}>
            <Fontisto style={{alignSelf: 'center'}} name="confused" size={24} color="blue" />
                <Text style={{marginTop: 5, textAlign: 'center', flexWrap: 'nowrap'}}>Sad</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => handleButtonClick('Happy')}>
            <View style={{borderColor: selectedButton === 'Happy' ? 'blue' : 'transparent',borderWidth: 1,padding: 8, borderRadius: 13, width: 70,marginRight: 5,backgroundColor: '#f5f5f3'}}>
            <Fontisto style={{alignSelf: 'center'}}  name="slightly-smile" size={24} color="green" />
                <Text  style={{marginTop: 5, textAlign: 'center'}}>Happy</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={() => handleButtonClick('Angry')}>
            <View  style={{borderColor: selectedButton === 'Angry' ? 'blue' : 'transparent',borderWidth: 1,padding: 8, borderRadius: 13, width: 70,marginRight: 5,backgroundColor: '#f5f5f3'}}>
            <Fontisto style={{alignSelf: 'center'}} name="rage" size={24} color="red" />
                <Text style={{marginTop: 5, textAlign: 'center'}}>Angry</Text>
            </View>
            </TouchableOpacity>

           

        </ScrollView>
        ) : <View>
          <Text>Thank you for your feedback we getting closer to our goals!</Text>
          </View>}
         

    </View>

    <View style={{marginTop: 40, marginLeft: 4}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '96%',alignSelf: 'center'}}>

        <Text style={{fontWeight: 'bold', fontSize: 19}}>Daily Goals</Text>

        {/* <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("GoalsScreen")}>
        <Text style={{fontSize: 15, textAlign: 'center', textDecorationLine: 'underline'}}>View all</Text>
        </TouchableOpacity> */}
        </View>
 
        
<View style={{marginTop: 25,marginLeft: 14, marginBottom: 30}}>
    {/* <Text style={{width: '70%',textAlign: 'center', lineHeight: 22}}>We have not decided what to complete today. Let's start!</Text> */}


<ScrollView horizontal showsHorizontalScrollIndicator={false}>

       
        <TouchableOpacity style={{backgroundColor:'lightblue',borderRadius: 6, width: 200, marginRight: 20}} activeOpacity={0.8}>
        
            <View style={{marginTop: 20,alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between', width: '85%', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', width: '50%'}}>Water Tracker</Text>

            <View style={{backgroundColor: '#2C8FD7',padding: 10, borderRadius: 6, paddingHorizontal: 16 }}>
            <MaterialCommunityIcons name="cup-water" size={24} color="black" style={{marginBottom: 3}} />
            <Text>{count}/20</Text>
            </View>
            </View>
            <Text style={{marginLeft: 15}}>20 cups/hr</Text>


            <View style={{flexDirection: 'row', justifyContent: 'space-between',width: '50%', marginTop: 50, marginBottom: 15}}>

            <TouchableOpacity activeOpacity={0.6} onPress={decrement}>
                <View style={{backgroundColor: '#fff',borderWidth: 1, marginLeft: 14, borderRadius: 5,borderWidth: 'lightblue'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold',paddingHorizontal: 8,paddingVertical: 3}}>-</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={increment}>
                <View style={{backgroundColor: '#fff',borderWidth: 1, marginLeft: 14, borderRadius: 5,borderWidth: 'lightblue'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold',paddingHorizontal: 8,paddingVertical: 3}}>+</Text>
                </View>
                </TouchableOpacity>
            </View>
    
        </TouchableOpacity>


        <TouchableOpacity onPress={openModal} style={{backgroundColor:'#FF956E',borderRadius: 6, width: 200, marginRight: 20}} activeOpacity={0.8}>
        
        <View style={{marginTop: 20,alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 15, width: 150}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Question of the day?</Text>
        <Text style={{marginTop: 10, fontSize: 16}}>{randomQuote2}</Text>
        </View>


            <View style={{marginTop: 10, backgroundColor: '#fff',width: 100,alignSelf: 'center', borderRadius: 100, marginBottom: 10}}>
                <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>Answer +</Text>
            </View>
    </TouchableOpacity>


    <TouchableOpacity style={{backgroundColor:'#F6BF04',borderRadius: 6, width: 200}} activeOpacity={0.8}>
        
        <View style={{marginTop: 20,alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 15, width: 150}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Let's get to the bottom of things!</Text>
        <Text style={{marginTop: 14, fontSize: 17}}>Take the Quiz!</Text>
        
        </View>


        
    </TouchableOpacity>

    
</ScrollView>
<Text style={{fontWeight: 'bold', fontSize: 19, marginTop: 40}}>Quote of the Day</Text>
<View style={{flexDirection: 'row',marginTop: 10}}>

{/* <View style={{backgroundColor:'orange', width: '40%',borderRadius: 6,marginRight: 18}}>
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>Taks</Text>
            <Text>0/10</Text>
            </View>
        </View> */}

        <View style={{alignSelf: 'center', backgroundColor: '#fff', marginTop: 10, width: '95%', borderRadius: 6,borderWidth:1}}>

<Text style={styles.quoteText}>
        <Text style={styles.boldWhite}>"{words[0]}</Text> {words.slice(1, 3).join(' ')} <Text style={styles.boldWhite}>{words[3]}</Text> {words.slice(4).join(' ')}"
      </Text>
        </View>






       
</View>


</View>

  

  {/* <View style={{borderWidth: 1,width: '95%', alignSelf: 'center',marginTop: 19}}></View> */}

  {/* <Text style={{fontSize: 19, marginLeft: 8, fontWeight: 'bold',marginTop: 20, marginBottom: 12}}>Challenges</Text> */}

  {/* <ScrollView horizontal style={{marginLeft: 8}} showsHorizontalScrollIndicator={false}>

    <View style={{borderWidth: 1, width: '38%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff', marginRight: 5}}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <Feather name="sun" size={24} color="black" style={{marginRight: 8,marginLeft: 8}} />
        <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500'}}>Morning</Text>
        </View>
    </View>

    <View style={{borderWidth: 1, width: '32%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff',marginRight: 5}}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <AntDesign name="bells" size={24} color="black" style={{marginRight: 8,marginLeft: 8}}  />
        <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500'}}>Stress</Text>
        </View>
    </View>

    <View style={{borderWidth: 1, width: '32%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff',marginRight: 5}}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <AntDesign name="disconnect" size={24} color="black" style={{marginRight: 8,marginLeft: 8}}  />
        <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500'}}>Focus</Text>
        </View>
    </View>

    
  </ScrollView> */}

  {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 8,marginTop: 10,marginBottom: 20}}>

<View style={{borderWidth: 1, width: '24%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff', marginRight: 5}}>
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
    <FontAwesome name="moon-o" size={24} color="black" style={{marginRight: 8,marginLeft: 8}} />
    <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500'}}>Sleep</Text>
    </View>
</View>

<View style={{borderWidth: 1, width: '45%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff',marginRight: 5}}>
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
    <Ionicons name="image-outline" size={24} color="black"  style={{marginRight: 8,marginLeft: 8}} />
    <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500',marginRight: 5}}>Guided Imagery</Text>
    </View>
</View>

<View style={{borderWidth: 1, width: '26%',borderColor: '#BDBDBD',borderRadius: 6, backgroundColor: '#fff',marginRight: 45}}>
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
    <Feather name="sun" size={24} color="black" style={{marginRight: 8,marginLeft: 8}} />
    <Text style={{textAlign: 'center',padding: 6, fontSize: 18, fontWeight: '500'}}>Anxiety</Text>
    </View>
</View>


</ScrollView> */}


    </View>


    <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>

    <View style={styles.modalContainer}>

    <View style={styles.modalContent}>

      
        <Text style={{fontSize: 18}}>{randomQuote2}</Text>

      <View style={{borderWidth: 1,marginTop: 20, borderRadius: 6,marginBottom: 22, backgroundColor: '#fff',  shadowColor: 'black',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,}}>
        <TextInput value={description}
          onChangeText={setDescription}  placeholder='Answer Here' style={{ borderRadius: 6, marginBottom: 260, marginTop: 20,fontSize: 28,paddingLeft: 12}} />
      </View>
      <TouchableOpacity onPress={create} style={{alignSelf: 'flex-end'}}>
<View disabled={isSubmitDisabled}  style={{ backgroundColor: isSubmitDisabled ? 'lightgray' : 'black',padding: 12, borderRadius: 100, width: 95,alignSelf: 'flex-end', marginRight: 14,marginBottom: 5}}>
  <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 16,textAlign: 'center'}}>Send   <FontAwesome name="send-o" size={16} color="gray" style={{marginBottom: 20}} /></Text>
</View>
  </TouchableOpacity>


    <View style={{backgroundColor: 'black',width: 45,borderRadius: '50%',alignSelf: 'center'}}>
        <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 24, textAlign: 'center',padding:8}} onPress={closeModal}>x</Text>
    </View>

    </View>

    </View>

    </Modal>


    <View style={{backgroundColor: '#fff', width: '100%', height: 300}}>

        <Text style={{textAlign: 'center',marginTop: 50, fontSize: 19, fontWeight: 'bold'}}>Try Premium</Text>


<View style={{alignSelf: 'center',marginTop: 20, width: '98%'}}>
    <Text style={{textAlign: 'center', fontSize: 18,marginBottom: 12}}>More Access to extensive habit trackers</Text>
    <Text style={{textAlign: 'center', fontSize: 18}}>24/7 Access to other communities and members</Text>
</View>


<TouchableOpacity>
    <View style={{backgroundColor: 'blue',borderRadius: 100, width: 100, alignSelf: 'center', marginTop: 20}}>
        <Text style={{textAlign: 'center',color: '#fff',padding: 12,fontWeight: 'bold',fontSize: 15}}>Upgrade</Text>
    </View>
</TouchableOpacity>
    </View>
    </ScrollView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 14,
        marginTop: 14,
        
      },
      greeting: {
        fontSize: 31,
        fontWeight: '600',
      },
      quoteText: {
        fontSize: 25, 
        // width: '90%', 
        alignSelf: 'center',
        lineHeight: 30,
        // marginTop: 50, 
        alignSelf: 'center',
        padding: 12,
      },
    //   quoteText: {
    //     fontSize: 18,
    //     marginHorizontal: 20,
    //     textAlign: 'center',
    //   },
      boldWhite: {
        fontWeight: 'bold',
        color: 'blue',
      },
      modalContainer: {
        backgroundColor: 'white',
        height: '70%',
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
      }
})
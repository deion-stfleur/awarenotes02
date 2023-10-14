import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Image, Button, Modal } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';


const GoalsScreen = ({ navigation }) => {
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0); // Set the default selected button index to 0
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };


  const closeModal = () => {
    setIsModalVisible(false);
  };


  const handleBtnPress = (index) => {
    setSelectedBtnIndex(index);
  }

  const [pressedCount, setPressedCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handlePress = (itemText) => {
    // Increment the pressedCount and set the showButton state
    setPressedCount(pressedCount + 1);
  
    if (pressedCount + 1 >= 3) {
      setShowButton(true);
    }
  
    // Call handleButtonClick to add the pressed item to Firestore
    handleButtonClick(itemText);
  };
  

  const handleButtonClick = async (itemText) => {
    // Check if the user is authenticated
    if (!auth.currentUser) {
      console.log('User not authenticated');
      return;
    }
  
    // Get the user's email
    const userEmail = auth.currentUser.email;
  
    // Create a reference to the user's document
    const userDocRef = doc(db, 'users', userEmail);
  
    // Define the data to be added to the "brokenHabits" collection
    const habitData = {
      text: itemText,
      // You can add more data as needed
    };
  
    try {
      // Add the habit data to the "brokenHabits" subcollection
      await setDoc(doc(userDocRef, 'brokenHabits', itemText), habitData);
      console.log('Habit added to Firestore');
    } catch (error) {
      console.error('Error adding habit to Firestore:', error);
    }
  };
  

  // You can create an array of item data for easy scaling
  const items = [
    { text: 'Limit Junk Food', iconName: 'pluscircle' },
    { text: 'Stop Drinking', iconName: 'pluscircle' }, // Example with a different icon
    { text: 'Limit Overeating', iconName: 'pluscircle' },
    // Add three more items here
    { text: 'Limit Screen Time', iconName: 'pluscircle' },
    { text: 'Overspending', iconName: 'pluscircle' },
    { text: 'Nail Biting', iconName: 'pluscircle' },
  ];



  return (
    <>
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0), backgroundColor: '#EEECE4' }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
            <Text style={{ fontSize: 18 }}>Back</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={{ backgroundColor: '#EEECE4' }}>
        <View style={styles.btnRow}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleBtnPress(0)}>
            <View style={[styles.btnContainer, selectedBtnIndex === 0 && styles.selectedBtn]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="infinity" size={20} color="black" style={{ marginRight: 8 }} />
                <Text style={styles.btnTxt}>Create Habits</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleBtnPress(1)}>
            <View style={[styles.btnContainer, selectedBtnIndex === 1 && styles.selectedBtn]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="not-interested" size={20} style={{ marginRight: 8 }} color="black" />
                <Text style={styles.btnTxt}>Breaks Habits</Text>
              </View>
            </View>

          </TouchableOpacity>
        </View>

        {selectedBtnIndex === 0 ? (

          <View>

            <View style={{ flex: 17 }}>

              <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

                <View style={{ backgroundColor: 'gray', width: 83, padding: 8, borderRadius: 20 }}>
                  <Text style={{ fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>For You</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 }}>

                <TouchableOpacity onPress={() => navigation.navigate("MeditateScreen")} activeOpacity={0.6} style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: '90%', alignSelf: 'center' }}>

                      <Text style={{ fontSize: 22, fontWeight: '500' }}>Meditate</Text>
                      {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
                    </View>
                  </View>
                </TouchableOpacity>



                <TouchableOpacity onPress={() => navigation.navigate("YogaScreen")} activeOpacity={0.6} style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: '90%', alignSelf: 'center' }}>

                      <Text style={{ fontSize: 22, fontWeight: '500', width: '60%' }}>Practice Yoga</Text>
                      {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
                    </View>
                  </View>
                </TouchableOpacity>


              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 10 }}>

                {/* 
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("RunningScreen")} style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Running</Text>
                 <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} />
               </View>
              </View>
          </TouchableOpacity> */}


                <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: '90%', alignSelf: 'center' }}>

                    <Text style={{ fontSize: 22, fontWeight: '500', width: '60%' }}>Set a to-do list</Text>
                    {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
                  </View>
                </View>


                <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: '90%', alignSelf: 'center' }}>

                    <Text style={{ fontSize: 22, fontWeight: '500', width: '60%' }}>Create your own</Text>
                    {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
                  </View>
                </View>

              </View>

          <View style={{marginTop: 70}}>
              <Button title="Create a habit" onPress={openModal} />
          </View>


          

              {/* 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 10 }}>

              <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Drink water</Text>
                 <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} />
               </View>
              </View>


              <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Journal Entry</Text>
                 <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} />
               </View>
              </View>

            </View> */}

            </View>
            {/* <View style={{ marginTop: 100, justifyContent: 'flex-end', alignItems: 'center' }}>

          <TouchableOpacity activeOpacity={0.4}>
        <View style={{borderWidth: 1, width: 300,padding: 12,borderRadius: 6}}>
            <Text style={{ textAlign: 'center' }}>Create a custom habit +</Text>
        </View>
          </TouchableOpacity>
  </View> */}

          </View>

        ) : selectedBtnIndex === 1 ? (
          <View>

            <View style={{ flex: 17 }}>

              <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

                <View style={{ backgroundColor: 'gray', width: 83, padding: 8, borderRadius: 20 }}>
                  <Text style={{ fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>For You</Text>
                </View>
                <Text style={{ fontSize: 18, marginTop: 12 }}>We will empower you to break your habits by providing guidance, continuous reminders, and regular check-ins with both you and your support network. <Text style={{fontWeight: 'bold'}}>(choose a minimum of 4 daily.)</Text></Text>
              </View>

              {/* <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 30 }}>
                  <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Limit Junk Food</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 16 }}>
                <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Stop Drinking</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 16 }}>
                <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Limit Overeating</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 16 }}>
                <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Limit Screen Time</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 16 }}>
                <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Overspending</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <View style={{ backgroundColor: '#E9E9E9', borderWidth: 1, width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: 16 }}>
                <View style={{ padding: 20 }}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nail Biting</Text>
                    <AntDesign name="pluscircle" size={22} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity> */}


<View>
      {items.map((item, index) => (
        <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => handlePress(item.text)}>
          <View style={{
            borderWidth: pressedCount >= 3 ? 1 : 1,
            borderColor: pressedCount >= 3 ? 'green' : 'black',
            width: '90%',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 16, // Adjust the spacing between items
          }}>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.text}</Text>
                <AntDesign name={item.iconName} size={22} color={pressedCount >= 3 ? 'green' : 'black'} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* {showButton && (
        <>
        <View style={{height: 30}}></View>
        <Button title="Track Habits + 5xp" onPress={handleButtonClick} />
        </>
      )} */}
    </View>






            </View>
            {/* <View style={{ marginTop: 50, justifyContent: 'flex-end', alignItems: 'center' }}>

              <TouchableOpacity activeOpacity={0.4}>
                <View style={{ borderWidth: 1, width: 300, padding: 12, borderRadius: 6 }}>
                  <Text style={{ textAlign: 'center' }}>Create a custom habit +</Text>
                </View>
              </TouchableOpacity>
            </View> */}

            {/* <View style={{borderWidth: 1,width:'90%', alignSelf: 'center',marginTop: 30}}></View> */}

            {/* <Text style={{textAlign: 'center',marginTop: 20, fontSize: 30, marginBottom: 100}}>See what habits other people are trying to break..</Text> */}

          </View>
        ) : (
          null
        )}

      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
            <Text onPress={closeModal}>Close</Text>
          </View>

        </View>

      </Modal>
    </>
  )
}

export default GoalsScreen

const styles = StyleSheet.create({
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
})

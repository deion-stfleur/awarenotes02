import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const GoalsScreen = ({ navigation }) => {
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0); // Set the default selected button index to 0

  const handleBtnPress = (index) => {
    setSelectedBtnIndex(index);
  }

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
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <Entypo name="infinity" size={20} color="black" style={{marginRight: 8}} />
              <Text style={styles.btnTxt}>Create Habits</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleBtnPress(1)}>
            <View style={[styles.btnContainer, selectedBtnIndex === 1 && styles.selectedBtn]}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <MaterialIcons name="not-interested" size={20} style={{marginRight: 8}} color="black" />
              <Text style={styles.btnTxt}>Breaks Habits</Text>
              </View>
            </View>

          </TouchableOpacity>
        </View>

        {selectedBtnIndex === 0 ? (

          <View>

          <View style={{ flex: 17 }}>

            <View style={{width: '90%',alignSelf: 'center',marginTop: 20}}>

              <View style={{backgroundColor: 'gray',width: 83,padding: 8,borderRadius: 20}}>
              <Text style={{fontSize: 15,color: '#fff',textAlign:'center',fontWeight: 'bold'}}>For You</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 }}>

              <TouchableOpacity onPress={() => navigation.navigate("MeditateScreen")} activeOpacity={0.6} style={{backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10}}>
              <View>
                <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                  <Text style={{fontSize: 22, fontWeight: '500'}}>Meditate</Text>
                  {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
                </View>
              </View>
              </TouchableOpacity>



            <TouchableOpacity onPress={() => navigation.navigate("YogaScreen")} activeOpacity={0.6} style={{backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10}}>
              <View>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Practice Yoga</Text>
                 {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
               </View>
              </View>
            </TouchableOpacity>


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 10 }}>


          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("RunningScreen")} style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Running</Text>
                 {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
               </View>
              </View>
          </TouchableOpacity>


              <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Set a to-do list</Text>
                 {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
               </View>
              </View>

            </View>
           

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 10 }}>

              <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Drink water</Text>
                 {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
               </View>
              </View>


              <View style={{ backgroundColor: 'lightgray', width: '48%', height: 160, borderRadius: 10 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 30,width:'90%',alignSelf: 'center' }}>
                 
                 <Text style={{fontSize: 22, fontWeight: '500',width: '60%'}}>Journal Entry</Text>
                 {/* <Image style={{height: 80,width: 80}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/app06-9e6c0.appspot.com/o/yoga.png?alt=media&token=b6a38ff6-7c1f-47b0-ab7f-80a46d000fc4'}} /> */}
               </View>
              </View>

            </View>
          
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

          <View style={{width: '90%',alignSelf: 'center',marginTop: 20}}>

<View style={{backgroundColor: 'gray',width: 83,padding: 8,borderRadius: 20}}>
<Text style={{fontSize: 15,color: '#fff',textAlign:'center',fontWeight: 'bold'}}>For You</Text>
</View>
</View>

          <TouchableOpacity activeOpacity={0.6}>
          <View style={{ backgroundColor: '#E7E7E7',borderWidth:1, width: '90%', height: 80, borderRadius: 10,alignSelf: 'center',marginTop: 30 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',padding: 30 }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Limit Junk Food</Text>
                </View>
              </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
              <View style={{ backgroundColor: '#E7E7E7',borderWidth:1, width: '90%', height: 80, borderRadius: 10,alignSelf: 'center',marginTop: 16 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',padding: 30 }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Stop Drinking</Text>
                </View>
              </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
              <View style={{ backgroundColor: '#E7E7E7',borderWidth:1, width: '90%', height: 80, borderRadius: 10,alignSelf: 'center',marginTop: 16 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',padding: 30 }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Limit Overeating</Text>
                </View>
              </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
              <View style={{ backgroundColor: '#E7E7E7',borderWidth:1, width: '90%', height: 80, borderRadius: 10,alignSelf: 'center',marginTop: 16 }}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start',padding: 30 }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Limit Screen Time</Text>
                </View>
              </View>
          </TouchableOpacity>

           
        
           

           
          
          </View>
            <View style={{ marginTop: 50, justifyContent: 'flex-end', alignItems: 'center' }}>

          <TouchableOpacity activeOpacity={0.4}>
        <View style={{borderWidth: 1, width: 300,padding: 12,borderRadius: 6}}>
            <Text style={{ textAlign: 'center' }}>Create a custom habit +</Text>
        </View>
          </TouchableOpacity>
  </View>
          
          </View>
        ) : (
          null
        )}
      </ScrollView>
    </>
  )
}

export default GoalsScreen

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
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
    width: 200
  },
})

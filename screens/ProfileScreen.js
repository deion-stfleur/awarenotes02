import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Platform, ScrollView, TextInput, Image, Alert, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc, collection, getDoc, query, where, getDocs } from 'firebase/firestore';
import { EvilIcons } from '@expo/vector-icons';


const ProfileScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const [userEmail, setUserEmail] = useState(null);
  const [selectedAvatarData, setSelectedAvatarData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
      fetchDataFromFirestore(user.email);
    } else {
      setUserEmail('No user is currently signed in');
    }
  }, []);

  const fetchDataFromFirestore = async userEmail => {
    const userCollection = collection(db, 'users');
    const userDocRef = doc(userCollection, userEmail);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const { backgroundColor, imageUrl, text } = userData;
        setSelectedAvatarData({ backgroundColor, imageUrl, text });
      } else {
        console.error('User document not found');
        Alert.alert("Please click on the pen button to choose and avatar!");
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
    }
  };


  const [feelingCounts, setFeelingCounts] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userEmail = user.email;

      // Create a query to filter FeelingCounts by userEmail
      const feelingCountsQuery = query(
        collection(db, 'FeelingCounts'),
        where('userEmail', '==', userEmail)
      );

      // Fetch the feeling counts for the current user
      const fetchFeelingCounts = async () => {
        try {
          const querySnapshot = await getDocs(feelingCountsQuery);
          const feelingCountData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document name as 'id'
            ...doc.data(), // Include the document data
          }));
          setFeelingCounts(feelingCountData);
        } catch (error) {
          console.error('Error fetching feeling counts:', error);
        }
      };

      fetchFeelingCounts();
    }
  }, [user]);

  const [userInterests, setUserInterests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserInterests = async () => {
    try {
      const user = auth.currentUser.email;
      const interestsQuery = query(collection(db, 'user-interests'), where('userId', '==', user));
      const querySnapshot = await getDocs(interestsQuery);
      const interestsArray = [];
      querySnapshot.forEach((doc) => {
        interestsArray.push(doc.data().interests);
      });
      setUserInterests(interestsArray);
    } catch (error) {
      console.error('Error fetching user interests:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserInterests();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchUserInterests();
  }, []);


  return (
    <>
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === 'android'
              ? StatusBar.currentHeight
              : StatusBar.currentHeight || 0,
          backgroundColor: '#EEECE4',
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 14, marginRight: 10 }}
            />
            <Text style={{ fontSize: 18 }}>Back</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
          colors={['#000']}
        />
      } style={{ backgroundColor: '#EEECE4' }}>
        <View>
          <View style={{}}>
            {/* <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                backgroundColor: 'gray',
                alignSelf: 'center',
                marginTop: 30,
              }}
            ></View> */}
                {selectedAvatarData && (
            <>
          <View style={{ backgroundColor: selectedAvatarData.backgroundColor, width:110,alignSelf: 'center',padding: 20,borderRadius: '50%',height:110,marginTop: 30 }}>
            <Image source={{ uri: selectedAvatarData.imageUrl }} style={{height: 80,width: 80,alignSelf:'center'}} />
          </View>
            <Text style={{textAlign:'center',marginTop: 12,fontWeight: 'bold'}}>{selectedAvatarData.text}</Text>
            </>
        )}
            <View
              style={{
                backgroundColor: 'black',
                width: 50,
                alignSelf: 'center',
                borderRadius: 50,
                position: 'absolute',
                top: 4,
                right: '35%',
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('AvatarScreen')}>
                <AntDesign
                  name="edit"
                  size={24}
                  color="white"
                  style={{ alignSelf: 'center', padding: 12 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 19 }}>
            {userEmail}
          </Text>
        </View>

        {/* {selectedAvatarData && (
            <>
          <View style={{ backgroundColor: selectedAvatarData.backgroundColor, width:110,alignSelf: 'center',padding: 20,borderRadius: '50%',height:110 }}>
            <Image source={{ uri: selectedAvatarData.imageUrl }} style={{height: 80,width: 80,alignSelf:'center'}} />
          </View>
            <Text style={{textAlign:'center',marginTop: 12,fontWeight: 'bold'}}>{selectedAvatarData.text}</Text>
            </>
        )} */}

{/*      
          <View style={{flexDirection:'row',justifyContent: 'space-between', width:'90%',alignSelf:'center',marginTop: 30,alignItems:'center'}}>
          
          
          <Text style={{fontSize: 18,fontWeight:'bold'}}>Questions about you</Text>
        
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("AddQuestion")}>
          <Text style={{fontSize: 28}}>+</Text>
        </TouchableOpacity>
          </View> */}

          {/* <View  onPress={() => navigation.navigate("AddQuestion")} style={{backgroundColor:'#fff',width:'90%',alignSelf:'center',marginTop: 15,padding: 15,borderRadius: 12}}>
            <Text style={{textAlign:'center',marginTop: 12}}>Answer questions about yourself</Text>

            <TouchableOpacity  onPress={() => navigation.navigate("AddQuestion")} activeOpacity={0.6} style={{alignSelf:'center',marginTop: 20,marginBottom: 12,borderWidth: 1,padding: 12,borderRadius:100,width: 100,borderColor: 'gray'}}>
              <View>
                <Text style={{textAlign:'center'}}>Answer</Text>
              </View>
            </TouchableOpacity>
          </View> */}



<Text style={{width:'90%',alignSelf:'center',marginTop: 30,fontSize: 18,fontWeight:'bold'}}>Recent Feeling History</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 20, width:'90%',alignSelf:'center'}}>
  {feelingCounts.map((item) => (
    <>
    <TouchableOpacity activeOpacity={1} key={item.id}>
      <View style={{ borderWidth: 2, padding: 35, marginBottom: 4, borderRadius: 6, marginRight: 10, backgroundColor:'#fff',borderColor:'#e6e6e6' }}>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>{item.id}</Text>
        {/* <Text>Feeling: {item.feeling}</Text> */}
        {/* <Text>Count: {item.count}</Text> */}
        <Text style={{ textAlign: 'center', fontSize: 19 }}>{item.timestamp.toDate().toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
    
    </>
  ))}
</ScrollView>


          <View style={{flexDirection:'row',justifyContent: 'space-between', width:'90%',alignSelf:'center',marginTop: 30,alignItems:'center'}}>
          
          
          <Text style={{fontSize: 18,fontWeight:'bold'}}>Interests</Text>

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("InterestScreen")}>
          <Text style={{fontSize: 28}}>+</Text>
          </TouchableOpacity>
          </View>

          {userInterests.length === 0 && (
  <TouchableOpacity onPress={() => navigation.navigate("InterestScreen")} activeOpacity={1}>
    <View style={{ backgroundColor: '#fff', width: '95%', alignSelf: 'center', marginTop: 15, padding: 15, borderRadius: 12 }}>
      <Text style={{ textAlign: 'center', marginTop: 12 }}>
        Add your Interests and save all your favorite moments
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("InterestScreen")}
        activeOpacity={0.6}
        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 12, borderWidth: 1, padding: 12, borderRadius: 100, width: 150, borderColor: 'gray' }}>
        <View>
          <Text style={{ textAlign: 'center' }}>Add Interests</Text>
        </View>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)}

<ScrollView>
  {userInterests.map((interest, index) => (

    <>
    <TouchableOpacity activeOpacity={1}  onPress={() => navigation.navigate("InterestScreen")}  style={{backgroundColor: '#fff',marginTop: 30,padding: 22,width:'90%',alignSelf:'center', borderRadius: 6, borderWidth: 2, borderColor: 'lightgray'}}>
    <EvilIcons name="pencil" size={24} color="black" style={{alignSelf:'flex-end',marginBottom: 10}} />
    <Text style={{textAlign: 'center'}} key={index}>{interest}</Text>
    </TouchableOpacity>
    </>
  ))}
</ScrollView>
        

        <TouchableOpacity activeOpacity={0.6} onPress={handleSignOut}>
          <View style={{ marginTop: 50, marginBottom: 100 }}>
            <View style={{}}>
              <Text style={{ textAlign: 'center', textDecorationLine: 'underline', fontSize: 15 }}>
                Log Out
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  
});

import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons'


const NotificationsScreen = ({navigation}) => {
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
            <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginBottom: 12 }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
                            <Text style={{ fontSize: 18 }}>Back</Text>
                        </View>
                    </TouchableOpacity>

{/* 
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>Notifications</Text>
                    </View> */}


                    <Text style={{ color: 'transparent' }}>none</Text>
                </View>

            </SafeAreaView>
<ScrollView  refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
          colors={['#000']}
        />
      } style={{backgroundColor: '#EEECE4'}}>
    
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize: 16, marginTop: 100}}>No Notifications yet..</Text>
            </View>
</ScrollView>
        </>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({})
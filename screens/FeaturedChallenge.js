import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const FeaturedChallenge = ({navigation}) => {
  return (

    <>
              <SafeAreaView style={{ backgroundColor: '#EEECE4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : (Platform.OS === 'ios' ? StatusBar.currentHeight : 0) }}>


<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>

    <TouchableOpacity onPress={() => navigation.navigate("Challenges")}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
            <Text style={{ fontSize: 18 }}>Back</Text>
        </View>
    </TouchableOpacity>


    <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 12 }}>Featured Challenge</Text>
    </View>


    <Text style={{ color: 'transparent' }}>none</Text>
</View>

</SafeAreaView>
    <ScrollView style={{backgroundColor: '#EEECE4'}}>
    <View style={{width:'90%',alignSelf:'center',marginTop: 50,marginBottom: 50}}>
   
   <View style={styles.tab}>
    <Image style={{height: 200, width: '100%',objectFit:'cover', marginBottom: 12,borderRadius: 6}} source={{uri: 'https://plus.unsplash.com/premium_photo-1664302314504-9d1b914c9151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1pbmRmdWwlMjBtb3JuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'}} />
    <Text style={{fontSize: 16, fontWeight: '500',marginBottom: 15}}>Day 1: Mindful Morning</Text>

<Text style={{fontSize: 16}}>Challenge users to start the day with a 5-minute mindfulness meditation using the app to help set a positive tone for the challenge.</Text>
   
   <Text style={{marginTop:13, textAlign:'right',padding: 12}}>10 people are currently on this day</Text>
   </View>


<View style={styles.tab}>
<Text>Day 2: Family Fitness</Text>
<Text>Encourage users to involve their family in a fun physical activity, such as a family walk, bike ride, or home workout, and track it in the app.</Text>

</View>


<View style={styles.tab}>
<Text>Day 3: Gratitude Journal</Text>
<Text>Instruct users to list three things they're grateful for in their life today using AwareNotes' journaling feature.</Text>
</View>


<View style={styles.tab}> 
<Text>Day 4: Try Something New</Text>
<Text>Challenge participants to try something they've never done before. It could be a new hobby, a recipe, or a skill. Have them journal about their experience.</Text>
</View>


<View style={styles.tab}>
<Text>Day 5: Healthy Meal Challenge</Text>
<Text>Encourage users to prepare a healthy, balanced meal for their family and track it in the app. Share recipes and meal photos within the AwareNotes community.</Text>
</View>


<View style={styles.tab}> 
<Text>Day 6: Digital Detox Day</Text>
<Text>Ask users to spend a day without screens (phones, tablets, TVs) and document how it makes them feel in the app's journal.</Text>
</View>


<View style={styles.tab}>
<Text>Day 7: Family Reflection</Text>
<Text>Have users and their family members share their reflections on the week's activities and feelings in a shared family journal within AwareNotes.</Text>
</View>



<View style={styles.tab}>
<Text>Day 8: Connect with Nature</Text>
<Text>Suggest users go outdoors and connect with nature. They can journal about the experience and its impact on their well-being.</Text>
</View>


<View style={styles.tab}>
<Text>Day 9: Acts of Kindness</Text>
<Text>Encourage users to perform random acts of kindness, and track their acts and their impact on their emotions in the app.</Text>
</View>


<View style={styles.tab}>
<Text>Day 10: Family Movie Night</Text>
<Text>Promote a family movie night where users can watch an inspiring film together and journal about the key takeaways.</Text>
</View>


<View style={styles.tab}>
<Text>Day 11: Social Connection</Text>
<Text>Encourage users to reach out to a friend or family member they haven't spoken to in a while. Ask them to journal about the experience.</Text>
</View>


<View style={styles.tab}>
<Text>Day 12: Fitness Challenge</Text>
<Text>Challenge users to complete a fitness challenge (e.g., a certain number of push-ups or a specific yoga routine) and document their progress.</Text>
</View>

<View style={styles.tab}>
<Text>Day 13: Reflect and Set Goals</Text>
<Text>Have users reflect on their progress in the challenge so far and set goals for self-improvement. They can use the app's goal-tracking feature.</Text>
</View>

<View style={styles.tab}>
<Text>Day 14: Share Your Journey</Text>
<Text>Encourage users to share their 14-day challenge experience, including their feelings, achievements, and insights, with the AwareNotes community to inspire and motivate others.</Text>
</View>

    </View>

    </ScrollView>
    <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff',height: 190 }}>
                   <View style={{alignSelf:'flex-end',marginRight: 14,marginTop: 10}}>
                    <Text>close</Text>
                   </View>
                   <Text style={{width:'90%',alignSelf:'center',marginTop: 14}}>Join this months challenge to continue getting updates and posts in your home feed.</Text>

                <View style={{flexDirection:'row',justifyContent:'space-between',width:'70%',alignSelf:'center',marginTop: 18, alignItems:'center'}}>
                    <Text style={{fontWeight:'bold'}}>TURN ON UPDATES</Text>

                    <TouchableOpacity>
                        <View style={{backgroundColor:'blue',padding: 15,borderRadius: 100}}>
                            <Text style={{color:'#fff'}}>Join Challenge</Text>
                        </View>
                    </TouchableOpacity>
                </View>
               
                </View>
    
    </>
  )
}

export default FeaturedChallenge

const styles = StyleSheet.create({
    tab: {
        borderWidth: 1,
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6
    }
})
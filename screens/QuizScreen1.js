import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuizScreen1 = ({ navigation }) => {
    const keyboardLetters = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ];
    
      const generateRandomEmojis = () => {
        // Implement your logic to generate random emoji combinations here
        // For example, you can select random words and emojis from predefined sets.
        return [
          { word: 'happy', symbols: ['😀', '+','😀', '+', '🚀'] },
          { word: 'sad', symbols: ['😢', '+', '😔'] },
          // Define more word and emoji combinations here
        ];
      };
    
      const [emojis, setEmojis] = useState(generateRandomEmojis());
      const [currentCombo, setCurrentCombo] = useState(0);
      const [inputText, setInputText] = useState('');
      const [showWinMessage, setShowWinMessage] = useState(false);
    
      const handleLetterPress = (letter) => {
        setInputText(inputText + letter);
      };
    
      const checkCombo = () => {
        const currentWord = emojis[currentCombo].word;
        if (inputText === currentWord) {
          if (currentCombo < emojis.length - 1) {
            setCurrentCombo(currentCombo + 1);
            setInputText('');
            setShowWinMessage(false);
          } else {
            // Show "You won" message
            setShowWinMessage(true);
            // Generate new emojis
            setEmojis(generateRandomEmojis());
          }
        }
      };
    
      useEffect(() => {
        checkCombo();
      }, [inputText]);
    
      const handleCheckPress = () => {
        checkCombo();
      };
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: '#EEECE4',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: 12,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 14, marginRight: 10 }} />
              <Text style={{ fontSize: 18 }}>Back</Text>
            </View>
          </TouchableOpacity>


          
        </View>
      </SafeAreaView>
      <ScrollView style={{ backgroundColor: '#EEECE4' }}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ height: 325, borderWidth: 12, borderRadius: 6, marginTop: 30, backgroundColor: '#fff' }}>
            {emojis[currentCombo].symbols.map((symbol, index) => (
            <>
            
            <View  key={index} style={{flex: 1,width:'90%',justifyContent:'center',alignItems:'center'}}>

          <Text style={{fontSize: 40, textAlign:'center'}} key={index}>{symbol} </Text>
                </View>
            </>
            ))}
          </View>
          {showWinMessage ? (
            <Text style={{ color: 'green', fontSize: 24, marginTop: 20 }}>You won!</Text>
          ) : (
            <View style={{ marginTop: 30 }}>
              {keyboardLetters.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  {row.map((letter, columnIndex) => (
                    <TouchableOpacity
                      key={columnIndex}
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        padding: 8,
                        margin: 5,
                        borderRadius: 3
                      }}
                      activeOpacity={0.6}
                      onPress={() => handleLetterPress(letter)}
                    >
                      <Text style={{ fontSize: 18 }}>{letter}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity
            onPress={handleCheckPress}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              alignSelf: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Check</Text>
          </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default QuizScreen1;

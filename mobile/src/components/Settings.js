import { React, useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, TextInput, StatusBar, StyleSheet, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import '../global.js';
import styles from "../styles.css";

const Settings = props => {
  const [text, onChangeText] = useState(global.baseUrl);

  useEffect(() => {
    console.log(`inside useEffect, text = '${text}'`)
    global.baseUrl = text
  }, [text])

  return (
    <View>
      {
        <View style={[styles.field]}>
          <View style={{ borderWidth: 1, backgroundColor: "white", borderColor: 'black', borderRadius: 4 }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
        </View>
      }
    </View >
  );
};

const local = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


export default Settings;

import { React, useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, TextInput, StatusBar, StyleSheet, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import '../../global.js';
import styles from "../../styles.css";

const Field = props => {
  const [selectedValue, setSelectedValue] = useState({});
  const onChangeText = (newText, item) => {
    props.setText((prev) => ({
      ...prev,
      [item.name]: newText,
    }));
  }
  return (
    <View>
      {
        props.item.type == "select" && props.item.options && (
          <View style={[styles.field]}>
            <Text style={styles.fieldLabel}>{props.item.label.charAt(0).toUpperCase() + props.item.label.slice(1)}</Text>
            <View style={{ borderWidth: 1, backgroundColor: "white", borderColor: 'black', borderRadius: 4 }}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                  props.setSelectedValue(prev => ({
                    ...prev,
                    [props.item.name]: itemValue,
                  }));
                }
                }
              >
                {props.item.options.map(item => (
                  <Picker.Item style={styles.picker} label={item} value={item} />
                ))}
              </Picker>
            </View>
          </View>
        )
      }
      {
        props.item.type == "input" && (
          <View style={[styles.field]}>
            <Text style={styles.fieldLabel}>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)}</Text>
            <View style={{ borderWidth: 1, backgroundColor: "white", borderColor: 'black', borderRadius: 4 }}>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  onChangeText(newText, props.item)
                }}
                placeholder={props.item.label}
              />
            </View>
          </View>
        )
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


export default Field;

import { React, useState, useEffect } from 'react';
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import '../../global.js';
import styles from "../../styles.css";

import axios from 'axios';
import Field from './Field.js';


const Fields = ({ navigation }) => {

  const [actionFields, setActionFields] = useState([]);

  const [selectedValueAction, setSelectedValueAction] = useState({});
  const [textAction, onChangeTextAction] = useState({});
  useEffect(() => { console.log(`TEXT ACTION: ${JSON.stringify(textAction, null, 2)}`) }, [textAction]);
  useEffect(() => { console.log(`SELECTED ACTION: ${JSON.stringify(selectedValueAction, null, 2)}`) }, [selectedValueAction]);


  useEffect(() => {
    navigation.addListener('focus', () => {
      (async () => {
        try {
          console.log(`${global.baseUrl}/action/${global.actionId}/fields/`);
          const actions = await axios.get(`${global.baseUrl}/action/${global.actionId}/fields/`, {
            withCredentials: true,
          });
          console.log("fields action =", actions)
          setActionFields(actions.data);
        } catch (err) {
          console.log("action error:", err.response.data)
        }
      })();
    });
  }, []);

  console.log("action fields:", actionFields)

  return (
    <>
      <SafeAreaView style={[styles.container, local.container]}>
        <Text style={styles.title}>
          <Text >Please provide the needed details for :</Text>
        </Text>
        <Text style={[styles.prefieldTitle, { backgroundColor: global.actionServiceColor }]}>
          {global.actionName.charAt(0).toUpperCase() + global.actionName.slice(1)}
        </Text>
        <FlatList
          data={actionFields}
          renderItem={({ item }) => <Field item={item} setSelectedValue={setSelectedValueAction} setText={onChangeTextAction} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={local.bottom}>
        <TouchableOpacity
          style={[styles.nextButton, { flexDirection: 'row', justifyContent: 'center' }]}
          onPress={() => {
            navigation.navigate("Reaction Fields");
            global.selectedValueAction = selectedValueAction;
            global.textAction = textAction;
          }}
          activeOpacity={.7}>
          <Ionicons name={"ios-arrow-forward"} size={45} color="white" />
        </TouchableOpacity>
      </View>

    </>
  );
}
const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});


export default Fields;

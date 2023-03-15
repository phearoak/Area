import { React, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import '../../global.js';
import styles from "../../styles.css";

import axios from 'axios';
import Field from './Field.js';


const Fields = ({ navigation }) => {
  const [reactionFields, setReactionFields] = useState([]);

  const [selectedValueReaction, setSelectedValueReaction] = useState({});
  const [textReaction, onChangeTextReaction] = useState({});
  useEffect(() => { console.log(`TEXT REACTION: ${JSON.stringify(textReaction, null, 2)}`) }, [textReaction]);
  useEffect(() => { console.log(`SELECTED REACTION: ${JSON.stringify(selectedValueReaction, null, 2)}`) }, [selectedValueReaction]);

  const sendFields = async () => {
    console.log({
      "action": global.actionId,
      "action_args": JSON.stringify({ ...global.selectedValueAction, ...global.textAction }),
      "reaction": [
        {
          "id": global.reactionId,
          "args": JSON.stringify({ ...selectedValueReaction, ...textReaction })
        }
      ],
      "status": true
    });
    try {
      const response = await axios.post(`${global.baseUrl}/workflow`,
        {
          "action": global.actionId,
          "action_args": JSON.stringify({ ...global.selectedValueAction, ...global.textAction }),
          "reaction": [
            {
              "id": global.reactionId,
              "args": JSON.stringify({ ...selectedValueReaction, ...textReaction })
            }
          ],
          "status": true
        }
        , { withCredentials: true });
      console.log(response.data)
      if (response.data.access_token)
        props.navigation.navigate("Main Screen")
    } catch (err) {
      console.log("Got an error: ", err);
    }
  };


  useEffect(() => {
    navigation.addListener('focus', () => {
      (async () => {
        try {
          console.log(`${global.baseUrl}/reaction/${global.reactionId}/fields/`);
          const reactions = await axios.get(`${global.baseUrl}/reaction/${global.reactionId}/fields/`, {
            withCredentials: true,
          });
          console.log("reactions =", reactions)
          setReactionFields(reactions.data);
        } catch (err) {
          console.log(err.response.data)
        }
      })();
    });
  }, []);

  console.log("reaction fields", reactionFields)

  return (
    <>
      <SafeAreaView style={[styles.container, local.container]}>
        <Text style={styles.title}>
          <Text >Last step !</Text>
        </Text>
        <Text style={[styles.prefieldTitle, { backgroundColor: global.reactionServiceColor }]}>
          {global.reactionName.charAt(0).toUpperCase() + global.reactionName.slice(1)}
        </Text>
        <FlatList
          data={reactionFields}
          renderItem={({ item }) => <Field item={item} setSelectedValue={setSelectedValueReaction} setText={onChangeTextReaction} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={local.bottom}>
        <TouchableOpacity
          style={[styles.nextButton, { flexDirection: 'row', justifyContent: 'center' }]}
          onPress={() => {
            sendFields();
            navigation.navigate("Applet Created");
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

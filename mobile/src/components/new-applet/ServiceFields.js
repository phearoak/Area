import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { React, useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import "../../global.js";
import styles from "../../styles.css";
import Card from "./Card.js";

import axios from "axios";
import Field from "./Field.js";

const Fields = ({ navigation }) => {
  const [actionFields, setActionFields] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        console.log(`${global.baseUrl}/action/${global.actionServiceId}/fields/`);
        const actions = await axios.get(
          `${global.baseUrl}/action/${global.actionServiceId}/fields/`
        );
        console.log("fields action =", actions);
        setActionFields(actions.data);
      } catch (err) {
        console.log("action error:", err.response.data);
      }
    })();
  }, []);

  console.log("action fields:", actionFields);

  const [reactionFields, setReactionFields] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        console.log(`${global.baseUrl}/action/${global.reactionServiceId}/fields/`);
        const reactions = await axios.get(
          `${global.baseUrl}/reaction/${global.reactionServiceId}/fields/`
        );
        console.log("reactions =", reactions);
        setReactionFields(reactions.data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, []);

  console.log("reaction fields", reactionFields);

  return (
    <SafeAreaView style={[styles.container, local.container]}>
      <Text style={styles.title}>
        <Text>Please provide the needed details for :</Text>
      </Text>
      <Text
        style={[
          styles.prefieldTitle,
          { backgroundColor: global.actionServiceColor },
        ]}
      >
        {global.actionServiceName.charAt(0).toUpperCase() +
          global.actionServiceName.slice(1)}
      </Text>
      <FlatList
        data={actionFields}
        renderItem={({ item }) => <Field item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Fields;

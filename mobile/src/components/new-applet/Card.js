import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import '../../global.js';
import styles from "../../styles.css";

// TODO: add logo on background
const Card = props => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, local.button, { backgroundColor: props.color }]}
        onPress={
          function() {
            console.log(`props DESCRIPTION: ${props.description}`)
            if (props.type == "Action") {
              global.actionServiceId = props.serviceId;
              global.actionId = props.id;
              global.actionName = props.description;
              global.actionServiceName = props.name;
              global.actionServiceColor = props.color;
            } else {
              global.reactionServiceId = props.serviceId;
              global.reactionId = props.id;
              global.reactionName = props.description;
              global.reactionServiceName = props.name;
              global.reactionServiceColor = props.color;
            }
            props.navigation.navigate(props.type == "Action" ? "Reactions" : "Services Connection")
          }
        }
        activeOpacity={.7}>
        <Text style={styles.buttonText}>{props.description.charAt(0).toUpperCase() + props.description.slice(1)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


export default Card;

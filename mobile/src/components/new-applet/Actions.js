import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { React, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import '../../global.js';
import { useIsFocused } from '@react-navigation/native';
import styles from "../../styles.css";
import Card from './Card.js';

import axios from 'axios';

const Actions = ({ navigation }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      (async () => {
        try {
          console.log(`${global.baseUrl}/action/`);
          const actions = await axios.get(`${global.baseUrl}/action/`, {
            withCredentials: true,
          });
          console.log("actions =", actions);
          setActions(actions.data);
        } catch (err) {
          console.log(err)
        }
      })();
    });
  }, [navigation]);
  console.log(actions)

  return (
    <SafeAreaView style={[styles.container, local.container]}>
      <Text style={styles.title}>
        <Text >Please choose an </Text>
        <Text style={{ fontWeight: 'bold' }}>Action</Text>
        <Text>:</Text>
      </Text>
      <FlatList
        data={actions}
        renderItem={({ item }) => <Card name={item.service.name} description={item.description} id={item.id} serviceId={item.service.id} color={item.service.color} navigation={navigation} type="Action" />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});


export default Actions;

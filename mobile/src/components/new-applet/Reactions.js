import { React, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import '../../global.js';
import styles from "../../styles.css";
import Card from './Card.js';

import axios from 'axios';


const Reactions = ({ navigation }) => {
  const [reactions, setReactions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const reactions = await axios.get(`${global.baseUrl}/reaction/`, {
          withCredentials: true,
        });
        setReactions(reactions.data);
      } catch (err) {
        console.log(err.response.data)
      }
    })();
  }, []);

  console.log(reactions)
  return (
    <SafeAreaView style={[styles.container, local.container]}>
      <Text style={styles.title}>
        <Text >Please choose a </Text>
        <Text style={{ fontWeight: 'bold' }}>Reaction</Text>
        <Text>:</Text>
      </Text>
      <FlatList
        data={reactions}
        renderItem={({ item }) => <Card name={item.service.name} description={item.description} id={item.id} serviceId={item.service.id} color={item.service.color} navigation={navigation} type="Reactions" />}
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

export default Reactions;

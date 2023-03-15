import { React, useState, useEffect } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import '../global.js';
import styles from "../styles.css";

import axios from 'axios';


const HomePage = ({ navigation }) => {
  const [applets, setApplets] = useState([]);
  const [appletName, setAppletName] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${global.baseUrl}/workflow`, {
          withCredentials: true,
        });
        console.log("applets =", response.data)
        console.log("workflow_reactions =", JSON.stringify(response.data[0].workflow_reactions, null, 2))
        console.log("applets[0] =", response.data[0].action_id)
        setApplets(response.data);
        console.log(`${baseUrl}/action/${applets[0].action_id}`)
        const tmp = await axios.get(`${baseUrl}/action/${applets[0].action_id}`, {
          withCredentials: true,
        });
        setAppletName(tmp.data.description);
        console.log(`DATAAAAAAAAA: ${appletName}`);
      } catch (err) {
        console.log("get applet error:", err)
      }
    })();
  }, []);

  return (
    <>{
      applets.length <= 0 ?
        <SafeAreaView style={[styles.container, local.container]}>
          <Text style={[styles.title, { textAlign: "center" }]}>
            <Text >You don´t have any applet.{"\n"}Select </Text>
            <Text style={{ fontWeight: 'bold' }}>New Applet</Text>
            <Text> to get started!</Text>
          </Text>
          <Image style={styles.arrow} source={require('./arrow.png')} />
        </SafeAreaView>
        :
        <SafeAreaView style={[styles.container, local.container]}>
          <Text style={styles.applet}>{appletName}</Text>
        </SafeAreaView>
    }</>);
}

const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default HomePage;

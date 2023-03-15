import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import '../../global.js';
import styles from "../../styles.css";

const AppletCreated = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, local.container]}>
      <Text style={styles.centerTitle}>
        <Text >Your new </Text>
        <Text style={{ fontWeight: 'bold' }}>applet</Text>
        <Text> got successfully created !</Text>
      </Text>
    </SafeAreaView>
  );
}

const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default AppletCreated;

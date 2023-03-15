import { React, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import '../../global.js';
import { useIsFocused } from '@react-navigation/native';
import styles from "../../styles.css";
import ServiceConnectionButton from './ServiceConnectionButton.js'

const ServiceLogginPage = ({ navigation }) => {
  const [firstConnected, setFirstConnection] = useState(false);
  const [secondConnected, setSecondConnection] = useState(false);

  useEffect(() => {
    if (firstConnected && (secondConnected || global.reactionServiceName == global.actionServiceName))
      navigation.navigate("Action Fields")
  }, [firstConnected])
  useEffect(() => {
    if (firstConnected && secondConnected)
      navigation.navigate("Action Fields")
  }, [secondConnected])

  if (firstConnected)
    global.serviceOneConnected = true;
  if (secondConnected)
    global.serviceTwoConnected = true;

  return (
    <SafeAreaView style={[styles.container, local.container]}>
      <Text style={styles.title}>
        <Text >Please connect to the service needed: </Text>
      </Text>
      <ServiceConnectionButton
        nameOfService={global.actionServiceName}
        idOfService={global.actionServiceId}
        setConnection={setFirstConnection}
        navigation={navigation} />
      {global.reactionServiceName != global.actionServiceName &&
        <ServiceConnectionButton
          nameOfService={global.reactionServiceName}
          idOfService={global.reactionServiceId}
          setConnection={setSecondConnection}
          navigation={navigation}
        />}
    </SafeAreaView >
  );
}

const local = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});


export default ServiceLogginPage;

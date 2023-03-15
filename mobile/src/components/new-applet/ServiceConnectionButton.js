import { React, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import '../../global.js';
import styles from "../../styles.css";
import axios from 'axios';


const ServiceConnectionButton = ({ navigation, nameOfService, idOfService, setConnection }) => {

  const [oauthUrl, setOauthUrl] = useState("");
  const [serviceConnected, setServiceConnected] = useState(false);

  useEffect(() => {
    const fetchOauthUrl = async () => {
      console.log(`${global.baseUrl}/connector/${nameOfService}`);
      const response = await axios.get(`${global.baseUrl}/connector/${nameOfService}`, {
        withCredentials: true,
      });
      console.log("Oauth Url:", response.data)
      console.log("Modified Oauth url: ", response.data.replace("http://localhost:8080", global.baseUrl));
      setOauthUrl(response.data);
    }

    fetchOauthUrl()
      .catch((err) => {
        console.log("oauth url error:", err)
      })
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const fetchIsConnected = async () => {
        console.log(`${global.baseUrl}/service/${idOfService}`);
        const response = await axios.get(`${global.baseUrl}/service/${idOfService}`, {
          withCredentials: true,
        });
        console.log(`${nameOfService} is connected =`, response.data.isConnected)
        setConnection(response.data.isConnected);
        setServiceConnected(response.data.isConnected);
      }

      fetchIsConnected()
        .catch((err) => {
          console.log("is connected error:", err)
        })
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.connectionButton, { flexDirection: 'row', justifyContent: 'center' }, serviceConnected ? { backgroundColor: "#90EE90" } : { backgroundColor: "blue" }]}
        onPress={() => {
          Linking.openURL(oauthUrl);
        }}
        activeOpacity={.7}>
        <Text style={styles.serviceName}>{nameOfService}</Text>
        <Ionicons name={serviceConnected ? "checkmark-done" : "arrow-redo"} size={30} color="white" />
      </TouchableOpacity>
    </View >
  );
}


export default ServiceConnectionButton;

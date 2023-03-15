import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import axios from 'axios';
import '../../global.js'

export default function logInButton(props) {

  const handleLogin = async () => {
    console.log(props.username, props.password);
    try {
      const response = await axios.post(`${global.baseUrl}/auth/signin`, {
        "email": props.username,
        "password": props.password
      }, { withCredentials: true });
      console.log(response.data)
      if (response.data.access_token)
        props.navigation.navigate("Main Screen")
    } catch (err) {
      console.log("Got an error: ", err);
    }
  };

  const checkServiceConnection = async (serviceId) => {
    console.log("isconnected serviceId:", serviceId);
    try {
      const response = await axios.get(
        `${global.baseUrl}/service/${serviceId}`,
        {
          withCredentials: true,
        }
      );
      console.log("isconnected response:", response.data);
      props.navigation.navigate("Main Screen");
    } catch (err) {
      console.log("isconnected error:", err);
    }
  };

  const handleServiceClick = (serviceName, serviceId) => {
    console.log("serviceName:", `${global.baseUrl}/auth/signin/${serviceName}/authorize`);
    (async () => {
      try {
        const response = await axios.get(
          `${global.baseUrl}/auth/signin/${serviceName}/authorize`,
          {
            withCredentials: true,
          }
        );
        console.log("oauth url response:", response.data);
        Linking.openURL(response.data, "_blank");
        setTimeout(() => {
          checkServiceConnection(serviceId);
        }, 2);
      } catch (err) {
        console.log("oauth url error:", err);
      }
    })();
  };

  return (
    <View>
      <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]} onPress={() => { props.service ? handleServiceClick(props.service, props.id) : handleLogin }}>
        <Text style={styles.buttonText}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

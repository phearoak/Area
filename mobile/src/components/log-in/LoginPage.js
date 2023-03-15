import React, { useState } from 'react';
import {
  StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from 'react-native';
import LogButton from './LogInButton';
import axios from 'axios'

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setEmailIsFocused] = useState(false);
  const [isPasswordFocused, setPasswordIsFocused] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={[styles.input,
        isEmailFocused ? styles.inputFocused : styles.inputBlurred]}
        placeholder="Email"
        keyboardType='email-address'
        value={username}
        onChangeText={setUsername}
        onFocus={() => setEmailIsFocused(true)}
        onBlur={() => setEmailIsFocused(false)}
      />
      <TextInput
        style={[styles.input,
        isPasswordFocused ? styles.inputFocused : styles.inputBlurred]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setPasswordIsFocused(true)}
        onBlur={() => setPasswordIsFocused(false)}
      />
      <TouchableOpacity>
        <Text style={styles.textButton}>Forgot password?</Text>
      </TouchableOpacity>
      <LogButton navigation={navigation} name="LOG IN" color="black" username={username} password={password} />
      <View style={styles.line} />
      <LogButton service="google" id={1} navigation={navigation} name="LOG IN WITH GOOGLE" color="#0000FF" />
      <LogButton service="github" id={4} navigation={navigation} name="LOG IN WITH GITHUB" color="#000000" />
      <TouchableOpacity>
        <Text style={styles.textButton}>Not register yet? sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 8,
    marginVertical: 8,
  },
  inputFocused: {
    borderColor: 'black',
  },
  inputBlurred: {
    borderColor: '#ccc',
  },
  line: {
    width: 380,
    height: 0.5,
    backgroundColor: 'black',
    marginVertical: 16,
  },
  textButton: {
    marginVertical: 15,
  },
});

export default LoginPage;

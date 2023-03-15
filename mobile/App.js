import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './src/components/log-in/LoginPage.js';
import MainSceen from './src/MainScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login Page"
          component={LoginPage}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Main Screen"
          component={MainSceen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;

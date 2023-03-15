import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import '../../global.js';
import Actions from './Actions.js';
import Reactions from './Reactions.js';
import ServiceLogginPage from './ServiceLogginPage.js';
import ActionFields from './ActionFields.js';
import ReactionFields from './ReactionFields.js';
import AppletCreated from './AppletCreated.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CreateArea = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Actions"
        component={Actions}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Reactions"
        component={Reactions}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Services Connection"
        component={ServiceLogginPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Action Fields"
        component={ActionFields}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Reaction Fields"
        component={ReactionFields}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Applet Created"
        component={AppletCreated}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>

  );
};


export default CreateArea;

import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateArea from './components/new-applet/NewApplet.js';
import HomePage from './components/HomePage.js';
import Settings from './components/Settings.js';
import './global.js';
const Tab = createBottomTabNavigator();


const MainScreen = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'New Applet') {
            iconName = focused ? 'md-add-circle' : 'md-add-circle-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="New Applet" component={CreateArea} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>

  );
};


export default MainScreen;


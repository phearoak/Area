import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect } from "react";
import CreateArea from "./Component/CreateArea.js";
import HomePage from "./Component/HomePage.js";
import Settings from "./Component/Settings.js";
import "./global.js";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home-sharp" : "home-outline";
                    } else if (route.name === "New Applet") {
                        iconName = focused
                            ? "md-add-circle"
                            : "md-add-circle-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="New Applet" component={CreateArea} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default MainScreen;

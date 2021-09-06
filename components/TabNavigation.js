import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from '../navigation/AppStack';
import LoginStack from '../navigation/LoginStack';
import ProfileStack from '../navigation/ProfileStack';
import Messages from '../screens/Messages';
import AccountScreen from '../screens/AccountScreen';
import Home from '../screens/HomeScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/colors';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bookmark') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'apps' : 'apps-box';
          } else if (route.name === 'Account') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        swipeEnabled: true,
      }}>
      <Tab.Screen name="Home" component={AppStack} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Account" component={ProfileStack} />
    </Tab.Navigator>
  );
};

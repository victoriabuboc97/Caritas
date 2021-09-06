import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Messages from '../screens/Messages';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Colors from '../constants/colors';

const Stack = createStackNavigator();

function KommunicateStack(props) {
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        name="Messages"
        options={{header: () => null}}
        component={Messages}
      />
    </Stack.Navigator>
  );
}

export default KommunicateStack;

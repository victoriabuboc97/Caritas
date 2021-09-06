import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import TabNavigation from '../components/TabNavigation';
import AccountScreen from '../screens/AccountScreen';
import DonateProcess from '../screens/DonateProcess';
import DonateDone from '../screens/DonateDone';
import PaymentPage from '../screens/PaymentPage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Colors from '../constants/colors';

const Stack = createStackNavigator();

function AppStack(props) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{header: () => null}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.green}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="DonateProcess"
        component={DonateProcess}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.green}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentPage"
        component={PaymentPage}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.green}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="DonateDone"
        component={DonateDone}
        options={({navigation}) => ({
          title: 'Thank you!',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
        })}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: Colors.background,
            shadowColor: Colors.background,
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.green}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default AppStack;

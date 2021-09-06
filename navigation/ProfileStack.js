import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import PersonalInfo from '../screens/PersonalInfo';
import Donations from '../screens/Donations';
import PaymentInfo from '../screens/PaymentInfo';
import Notifications from '../screens/Notifications';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Colors from '../constants/colors';

const Stack = createStackNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({navigation}) => ({
          title: 'Profil',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.background}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={({navigation}) => ({
          title: 'Personal Information',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.background}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Donations"
        component={Donations}
        options={({navigation}) => ({
          title: 'Donations',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.background}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentInfo"
        component={PaymentInfo}
        options={({navigation}) => ({
          title: 'Payment Info',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.background}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({navigation}) => ({
          title: 'Notifications',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'white',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesomeIcon
                icon="arrow-left"
                size={20}
                color={Colors.background}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;

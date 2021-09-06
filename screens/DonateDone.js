import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import Colors from '../constants/colors';
import {
  ChapterText,
  WelcomeBackText,
  UserNameText,
  UserInfoContainer,
  UserInfoText,
  Avatar,
  ElementText,
  BoxAmount,
} from '../styles/HomeStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import FormButton from '../components/FormButton';
import {TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';


function DonateDone({navigation}) {

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Image style={styles.image} source={require('../assets/done2.png')} />
      <ChapterText>Small steps turn into miles!</ChapterText>
      <FormButton
        buttonTitle="Done"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    marginBottom: -20,
  }
});
export default DonateDone;

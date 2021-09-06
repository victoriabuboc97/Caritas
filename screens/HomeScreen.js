import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, View, ScrollView, LogBox, SafeAreaView} from 'react-native';
import {CategoryCard} from '../components/CategoryCard';
import {AuthContext} from '../navigation/Context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Container,
  WelcomeBackText,
  UserNameText,
  Avatar,
  UserInfoContainer,
  UserInfoText,
  CategoriesContainer,
  Category,
  CategoryImage,
  MainText,
} from '../styles/HomeStyles';
import Search from '../components/Search';
import {TabNavigation} from '../components/TabNavigation';
import colors from '../constants/colors';
import PostScreen from '../screens/PostScreen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalOrgCard } from '../components/LocalOrgCard';
import auth from '@react-native-firebase/auth';
import RNKommunicateChat from 'react-native-kommunicate-chat';
import * as Sentry from "@sentry/react-native";

function HomeScreen({navigation}) {
  const [categories, setCategories] = useState(null);
  const [currentUser, setCurrentUser] = useState({email: '', firstName:''});
  const {user, logout} = useContext(AuthContext);
  const [id, setId] = useState(null);
  const usersCollection = firestore().collection('users');
  const categoriesCollection = firestore().collection('categories');

  async function getCurrentUser(value) {
    await usersCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const {email, first_name, last_name, photo, region, id, password} = documentSnapshot.data();
        setCurrentUser({email, first_name, last_name, photo, region, id});
        const thisUser = {email, first_name, last_name, photo, region, id};
        setId(id);
        console.log(id)
        AsyncStorage.setItem('currentUser', JSON.stringify(thisUser));
        });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
      getCurrentUser(value);
    });
    LogBox.ignoreAllLogs();
    const user = auth().currentUser;
    console.log(user)
    let mounted = true;
    let list = [];
    categoriesCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data();
        list.push(objCategory);
        if(mounted) {
          setCategories(list);
          AsyncStorage.setItem('categories', JSON.stringify(list));
          console.log(list);
        }
      });
    });
    return () => {
      mounted = false;
    }
  }, [])

  return (
     <ScrollView style={{backgroundColor: colors.background}}>
      <Container style={{backgroundColor: colors.background}}>
        <View>
          <UserInfoContainer>
            <Avatar source={{ uri: currentUser.photo }} />
            <UserInfoText>
              <WelcomeBackText>Welcome Back </WelcomeBackText>
              <UserNameText>{currentUser.first_name} {currentUser.last_name}</UserNameText>
            </UserInfoText>
          </UserInfoContainer>
        </View>
          <Search userId={id} categories={categories} navigation={navigation}/>
      </Container>
     </ScrollView>

  );
}
export default HomeScreen;
// export default Sentry.withProfiler(HomeScreen);


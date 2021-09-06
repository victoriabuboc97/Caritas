import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, View, ScrollView, Text, Button} from 'react-native';
import {AuthContext} from '../navigation/Context';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import RNKommunicateChat from 'react-native-kommunicate-chat';
import FormButton from '../components/FormButton';
import * as Sentry from "@sentry/react-native";


function Messages() {
  const usersCollection = firestore().collection('users');

  async function getCurrentUser(value) {
    await usersCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const {photo, id, password} = documentSnapshot.data();
        let user = {
          'userId' : id,
          'password' : password,
          'authenticationTypeId' : 1,
          'imageLink' : photo,
          'applicationId' : '346a63d78363381011333e7f19ad2399',  
          'deviceApnsType' : 0
        }
        RNKommunicateChat.loginUser(user, (response, message) => {
          if(response == 'Success') {
              console.log(message);
          } else if (response == 'Error') {
              console.log(message);
          }
        });
      });
    });
  }

  const startMessages = () => {
    RNKommunicateChat.openConversation((response, message) => {
        if(response == 'Error') {
          console.log(message);
        } else {
          //chat screen launched successfully
        }
      });
      let conversationObject = {
        'isSingleConversation' : true //passing true will start the same conversation everytime
      };
      RNKommunicateChat.buildConversation(conversationObject, (response, responseMessage) => {
          if(response == "Success") {
              console.log("Kommunicate create conversation successful the clientChannelKey is : " + responseMessage);
          } else {
              console.log("Kommunicate create conversation failed : " + responseMessage);
          }
        });  
  }

  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
      getCurrentUser(value);
    });
    const user = auth().currentUser;
    console.log(user)
  }, [])

  return (
     <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
         <FormButton buttonTitle='Talk to us' onPress={() => startMessages()}></FormButton>
     </View>
  );
}
export default Messages;
// export default Sentry.withProfiler(Messages);

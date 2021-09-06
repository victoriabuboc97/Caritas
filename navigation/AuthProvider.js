import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './Context';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import perf from '@react-native-firebase/perf';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (exception) {
            console.log(exception);
          }
          AsyncStorage.setItem('email', email);
        },
        
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (exception) {
            console.log(exception);
          }
        },
        facebookLogin: async () => {
          const trace = await perf().startTrace('login_with_social_trace');
          // Define trace meta details
          trace.putAttribute('user', 'abcd');
          trace.putMetric('credits', 30);
          try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }
            // Obtine jetonul de acces pentru utilizatorul conectat
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
              throw 'Something went wrong obtaining access token';
            }
            // Creeaza credentiale pentru Firebase cu jetonul obtinut
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            // Autentifica cu credentialele obtinute
            await auth().signInWithCredential(facebookCredential);
            await trace.stop();
          } catch (exception) {
            console.log(exception);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (exception) {
            console.log(exception);
          }
          AsyncStorage.setItem('email', email);
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (exception) {
            console.log(exception);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

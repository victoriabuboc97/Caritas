import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import Colors from '../constants/colors';
import {AuthContext} from '../navigation/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorText } from '../styles/HomeStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as Keychain from 'react-native-keychain';
import SInfo from 'react-native-sensitive-info';
import * as Sentry from "@sentry/react-native";
import perf from '@react-native-firebase/perf';

let trace;

function LoginScreen({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login, googleLogin, facebookLogin} = useContext(AuthContext);
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const usersCollection = firestore().collection('users');
  // To check if any sensor is available on iOS/Android
  // const hasAnySensors = await SInfo.isSensorAvailable();

  // // on Android you can check if has any fingersprints enrolled
  // const hasAnyFingerprintsEnrolled = await SInfo.hasEnrolledFingerprints();

  async function startMetring() {
    trace = await perf().startTrace('login_with_email_and_password');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
  }

  useEffect(() => {
    startMetring();
  }, [])

  async function checkCredentials() {
    let nrErrors = 0;
    if(!email){
      setErrorEmail('Email is not correct or not set!');
      nrErrors += 1;
    }
    if(!password) {
      setErrorPassword('Password is not set!');
      nrErrors += 1;
    }
    if(email && password && nrErrors == 0) {
      setErrorEmail('');
      setErrorPassword('');
      login(email, password);
      await trace.stop();
    }
  }

  // async function onFacebookButtonPress() {
  //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }
  //   // Obtine jetonul de acces pentru utilizatorul conectat
  //   const data = await AccessToken.getCurrentAccessToken();
  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }
  //   // Creeaza credentiale pentru Firebase cu jetonul obtinut
  //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //   // Autentifica cu credentialele obtinute
  //   return auth().signInWithCredential(facebookCredential);
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo1.png')}
        style={styles.imageContainer}
      />
      <FormInput
        style={styles.form}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <ErrorText style={{lineHeight: 8}}>{errorEmail}</ErrorText>
      <FormInput
        style={styles.form}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        placeholder="Password"
        iconType="lock"
      />
      <ErrorText style={{lineHeight: 8}}>{errorPassword}</ErrorText>
      <View style={styles.buttons}>
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
        <FormButton
          buttonTitle="Sign In"
          onPress={() => checkCredentials()}
        />
      </View>
      <TouchableOpacity style={styles.SignUpButton} onPress={() => {}}>
        <Text style={styles.textButton}>Forgot Password?</Text>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign in with Facebook"
            btnType={['fab', 'facebook']}
            color="#4867ab"
            backgroundColor="#e6eaf5"
            onPress={() => facebookLogin().then(() => {
              console.log('Signed in with Facebook!');
              const user = auth().currentUser;
              let nameArray = user.displayName.match(/\S+/g);
              const firstName = nameArray[0];
              const lastName = nameArray[1];
              if(!usersCollection.doc(user.email).get())
                usersCollection.doc(user.email).set({
                  first_name: firstName,
                  last_name: lastName,
                  email: user.email,
                  password: '',
                  photo: user.photoURL,
                  region: '',
                  id: 3
                });
              SInfo.setItem('email', user.email, {
                sharedPreferencesName: 'mySharedPrefs',
                keychainService: 'myKeychain'
                }).then((value) =>
                  console.log('From KeyChain ' + value)
                );
              AsyncStorage.setItem('email', user.email);
            })}
          />
          <SocialButton
            buttonTitle="Sign in with Google"
            btnType={['fab', 'google']}
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin().then(() => console.log('signed with google'))}
          />
        </View>
      ) : null}

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textButton}>
          Don't have an account yet? Create here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 1,
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    marginTop: -35,
  },
  buttons: {
    flexDirection: 'row',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
  },
  form: {
    justifyContent: 'center',
    width: '80%',
    height: 100,
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.textColor,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
// export default Sentry.withProfiler(LoginScreen);

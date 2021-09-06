import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import Colors from '../constants/colors';
import {AuthContext} from '../navigation/Context';
import firebase from './../express-server/db/Firebase';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as Sentry from "@sentry/react-native";


function SignupScreen({navigation}) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);
  dbRef = firestore().collection('users');
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isLoading: false
  });

  function userDetailsUpdate (val, prop) {
    const state = userDetails;
    state.prop = val;
    setUserDetails(state);
  }

  async function storeUser() {
    // if(email === ''){
    //  alert('Fill your email!')
    // } else if(firstName === ''){
    //   alert('Fill your first name!')
    //  } else if(lastName === ''){
    //   alert('Fill your last name!')
    //  } else if(password === ''){
    //   alert('Fill your password!')
    //  } else {
      setUserDetails({
        isLoading: true,
      });      
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(password);
      let photo = 'https://firebasestorage.googleapis.com/v0/b/charity-99e43.appspot.com/o/avatars%2Favatar.jpg?alt=media&token=0bf2d62d-95c0-4ed7-b266-17aec0846a74';
      // storage().ref('avatars/avatar1.jpg').getDownloadURL().then(function(url) {
      //   console.log(url);
      //   photo = url;
      // }, function(error){
      //     console.log(error);
      // });
      await dbRef.doc(email).set({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        photo: photo,
        region: '',
      }).then((res) => {
        register(email, password);
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        setUserDetails({
          isLoading: false,
        });
      });
    // }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create account</Text>
      <FormInput
        style={styles.form}
        labelValue={firstName}
        onChangeText={(userFirstName) => setFirstName(userFirstName)}
        placeholder="First Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        style={styles.form}
        labelValue={lastName}
        onChangeText={(userLastName) => setLastName(userLastName)}
        placeholder="Second Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
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
      <FormInput
        style={styles.form}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        placeholder="Password"
        iconType="lock"
      />
      <FormInput
        style={styles.form}
        labelValue={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        secureTextEntry={true}
        placeholder="Confirm Password"
        iconType="lock"
      />
      <View style={styles.buttons}>
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => storeUser()}
        />
      </View>
      <View style={styles.regTextContainer}>
        <Text style={styles.regText}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert('Terms clicked')}>
          <Text style={[styles.regText, {color: Colors.green}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.regText}> and </Text>
        <TouchableOpacity onPress={() => alert('Terms clicked')}>
          <Text style={[styles.regText, {color: Colors.green}]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign up with Facebook"
            btnType={['fab', 'facebook']}
            color="#4867ab"
            backgroundColor="#e6eaf5"
            onPress={() => {}}
          />
          <SocialButton
            buttonTitle="Sign up with Google"
            btnType={['fab', 'google']}
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.SignUpButton}>
        <Text style={styles.textButton}>Have an account? Sign In</Text>
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
  regTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  regText: {
    fontSize: 12,
    color: 'grey',
  },
  regTextColor: {
    color: Colors.green,
  },
  buttons: {
    flexDirection: 'row',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    margin: 10,
  },
  form: {
    marginLeft: '1%',
    width: '80%',
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.textColor,
  },
  SignUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default SignupScreen;
export default Sentry.withProfiler(SignupScreen);

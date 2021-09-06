import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';

import {UserInfoContain, PersonalInfoContainer, ErrorText} from './../styles/HomeStyles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import firebase from './../express-server/db/Firebase';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormButton from '../components/FormButton';
import PlacesInput from 'react-native-places-input';
import {Root, Popup} from 'popup-ui';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PersonalInfo({navigation}) {
  const [currentUser, setCurrentUser] = useState({email: '', firstName:''});
  const [settings, setSettings] = useState({});
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [region, setRegion] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [resourcePath, setResourcePath] = useState({uri: ' '});
  const [confirmPassword, setConfirmPassword] = useState('');
  const usersCollection = firestore().collection('users');
  const settingsCollection = firestore().collection('settings');
  const [image, setImage] = useState();
  const [downloadURL, setDownloadURL] = useState();

  async function getCurrentUser(value) {
    await usersCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const {email, first_name, last_name, region, photo, password} = documentSnapshot.data();
        setCurrentUser({email, first_name, last_name, region, photo, password});
        setResourcePath({uri: photo});
        setEmail(email);
        setFirstName(first_name);
        setLastName(last_name);
        setRegion(region);
        setPassword(password);
        setImage(photo);
      });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
      getCurrentUser(value);
    });
  }, [])

  const uploadPhotoAsync = async () => {
    if(resourcePath != '') {
      const path = `avatars/${currentUser.email}/${Date.now()}.jpg`;
      let reference = storage().ref(path);
      let task = reference.putFile(resourcePath.uri);
      task.then( async () => {
          const url = await reference.getDownloadURL();
          setDownloadURL(url);
          console.log(url);
          await usersCollection.doc(currentUser.email).update(
              {photo: url}
            );
        }
      );
    }
  }

  function savePersonalInfo () {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else if((password === confirmPassword) || (confirmPassword === '')){
      console.log("Everything is Correct");
      if(resourcePath.uri != currentUser.photo) {
        console.log('aici');
        uploadPhotoAsync();
      }
      if(currentUser.firstName != firstName) {
        usersCollection.doc(currentUser.email).update({first_name: firstName})
      }
      if(currentUser.lastName != lastName) {
        usersCollection.doc(currentUser.email).update({last_name: lastName})
      }
      if(currentUser.region != region) {
        usersCollection.doc(currentUser.email).update({region: region})
      }   
      Popup.show({
        type: 'Success',
        title: 'Done!',
        button: true,
        textBody:
          'Your personal information was successfully changed!',
        buttonText: 'Ok',
        callback: () => {Popup.hide(), navigation.navigate('Home')}
      }) 
    }
  }

  function selectFile () {
    let options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = {uri: res.uri};
        console.log(source);
        setResourcePath(source);
      }
    });
  };

  function checkConfirmedPassword(userInput) {
    setConfirmPassword(userInput);
    if(password != userInput) {
        console.log('Passwords dont match');
        setError(`Don't match`);
    } else {
      console.log('Passwords match');
      setError(' ');
    }
  }

  return (
    <Root>

    <ScrollView>
      <View>
        <View style={{backgroundColor: colors.background}}>
          <View style={styles.profileInfo}>
            <Image
              //source={require('../assets/avatar1.png')}
              source={{ uri: resourcePath.uri }}
              style={styles.imageStyle}
            />
            <TouchableOpacity onPress={() => selectFile()} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>    
            <Text style={{color: 'white', fontSize: 22}}>{currentUser.first_name} {currentUser.last_name}</Text>
          </View>
        </View>
      </View>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >First Name</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={firstName}
          onChangeText={userInput=>setFirstName(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="First name"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Last Name</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={lastName}
          onChangeText={userInput=>setLastName(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Last Name"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Email</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={email}
          onChangeText={userInput=>setEmail(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Email"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Region</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={region}
          onChangeText={userInput=>setRegion(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Region"
          placeholderTextColor="#666"
        />
        {/* <PlacesInput
          googleApiKey='AIzaSyDIXf5YKnXiZ38V0w08MnEBvUCzAD-VLTU'
          placeHolder={"Some Place holder"}
          language={"en-US"}
          onSelect={place => {
              this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
          }}
          iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
        /> */}
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Password</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={password}
          onChangeText={userInput=>setPassword(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Confirm Password</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={confirmPassword}
          onChangeText={userInput=>checkConfirmedPassword(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Confirm password"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />
        <ErrorText>{error}</ErrorText>
      </PersonalInfoContainer>
      <View style={{marginLeft: 100, marginTop: 15}}>

      <FormButton buttonTitle="Save changes" onPress={() => savePersonalInfo()} />
      </View>
    </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3740ff'
  },
  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
    width: 150,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth / 1.3,
  },
  settingContainer: {
    margin: 10,
    height: 50,
    flexDirection: 'row',
    borderRadius: 35,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  profileInfo: {
    width: windowWidth,
    height: windowHeight / 4,
    backgroundColor: colors.primary,
    borderBottomEndRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    borderTopLeftRadius: 35,
    backgroundColor: colors.background,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 80
  },
  settingText: {
    marginLeft: 10,
    marginTop:13,
    width: 150
  }
});

export default PersonalInfo;
// export default Sentry.withProfiler(DonateProcess);

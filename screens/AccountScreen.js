import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/Context';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from "@sentry/react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AccountScreen({navigation}) {
  const {logout} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({email: '', firstName:''});
  const [settings, setSettings] = useState({});
  const settingsCollection = firestore().collection('settings');
  const usersCollection = firestore().collection('users');

  async function getCurrentUser(value) {
    await usersCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const {email, first_name, last_name, photo} = documentSnapshot.data();
        setCurrentUser({email, first_name, last_name, photo});
      });
    });
  }

  async function getSettings() {
    let list = [];
    await settingsCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data()
        console.log('setting name: ', objCategory);
        list.push(objCategory);
      });
      setSettings(list);
    });
  }
    useEffect(() => {
      AsyncStorage.getItem('email').then((value) => {
        getCurrentUser(value);
      });
      getSettings();
    }, [])

  return (
   // <ScrollView>
      <View>
        <View style={{backgroundColor: colors.background}}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: currentUser.photo }}
              style={styles.imageStyle}
            />
            <Text style={{color: 'white', fontSize: 22}}>Hello, {currentUser.first_name}</Text>
          </View>
        </View>
        <View style={{backgroundColor: colors.primary}}>
          <View style={styles.settings}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={settings}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.component)}>
                  <View style={styles.settingContainer}>
                    <View style={styles.setting}>
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={22}
                        color={colors.primary}
                        style={{padding: 15}}
                      />
                      <Text>{item.name}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={22}
                      color={colors.primary}
                      style={{justifyContent: 'center', paddingTop: 5}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={{margin: 20}}>
              <FormButton buttonTitle="Logout" onPress={logout} />
            </View>
          </View>
        </View>
      </View>
    //</ScrollView>
  );
}
const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth / 1.3,
  },
  settingContainer: {
    margin: 10,
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
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
    alignItems: 'center',
    padding: 10,
    width: windowWidth,
  },
  imageStyle: {
    marginTop: -10,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});
// export default AccountScreen;
export default Sentry.withProfiler(AccountScreen);


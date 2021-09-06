import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';
import stripe from 'tipsi-stripe';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import firebase from './../express-server/db/Firebase';
import storage from '@react-native-firebase/storage';
import { faBlackberry } from '@fortawesome/free-brands-svg-icons';
import {Root, Popup} from 'popup-ui';
import DonateDone from './DonateDone';
import * as Sentry from "@sentry/react-native";
import perf from '@react-native-firebase/perf';

stripe.setOptions({
  publishableKey: 'pk_test_51IPsghGSVElWPp0sq2mfzsJnpmm3II7o4eXEUqYBgdZgS0z4kBVjKPQLwZQcMYDyDgdmIXtn2f8D9Kiuh94PQ8t50037DzCshZ',
  androidPayMode: 'test',
});

function DonateProcess({route, navigation}) {
  const [number, setNumber] = useState();
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const {item} = route.params;
  const [org, setOrg] = useState();
  const postsCollection = firestore().collection('posts');
  const usersCollection = firestore().collection('users');
  const localCollection = firestore().collection('localorg');

  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
      setEmail(value);
    });
    let list = null;
    console.log(item.id)
    postsCollection.where('id', '==', item.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data()
        list = objCategory;
        console.log(list);
      });
      setOrg(list);
    })
    .catch((error) => {
      console.log(error);
    });
    if(list == null) {
      localCollection.where('id', '==', item.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data()
        list = objCategory;
        console.log(list);
      });
      setOrg(list);
    })
    .catch((error) => {
      console.log(error);
    });
    }
  }, [])

  async function doPayment (amount) {
    const body = {
        amount: amount,
        email: email,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
      fetch('http://192.168.15.2:5000/checkout', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          usersCollection.doc(email).update({
            donations: firestore.FieldValue.arrayUnion({'amount': amount,
              'date': moment(new Date()).format("DD/MM/YYYY hh:mm:ss")})
          });
          usersCollection.doc(email).update({
            donationAmount: firestore.FieldValue.arrayUnion(amount)
          });
          usersCollection.doc(email).update({
            donationDates: firestore.FieldValue.arrayUnion(moment(new Date()).format("DD MM YYYY hh:mm:ss"))
          });
          const newAmount = parseInt(org.donated) + parseInt(amount);
          console.log(newAmount);
          setOrg(org.donated = newAmount);
          postsCollection.doc(org.id.toString()).update({donated: newAmount.toString()})
          Popup.show({
            type: 'Success',
            title: 'Donation accepted',
            button: true,
            textBody:
              'Thank you for your contribution!',
            buttonText: 'Ok',
            callback: () => {Popup.hide(), navigation.navigate(DonateDone)}
          })
        })
        .catch((error) => {
            console.warn(error);
        }) 
  };
  async function requestPayment () {
    const trace = await perf().startTrace('payment_trace');
  
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
    setIsPaymentPending(true);
    return stripe
      .paymentRequestWithCardForm()
      .then(stripePaymentInfo => {
        setPaymentMethod(stripePaymentInfo);
        doPayment(amount);
      })
      .then(() => {
        console.log('Payment succeeded!');
        trace.stop()
      })
      .catch(error => {
        if(error.message != 'Cancelled by user')
          console.warn('Payment failed', { error });
      })
      .finally(() => {
        setIsPaymentPending(false);
      });
  };
  return (
    <Root>
    <ScrollView style={{backgroundColor: colors.background}}>
      <View style={styles.card}>
        <Image
          source={{uri: item.organizationImage}}
          style={styles.imageContainer}
        />
        <View style={styles.title}>
          <ChapterText>{item.organizationName}</ChapterText>
        </View>
      </View>
      <View
        style={{alignItems: 'center', justifyContent: 'center', margin: 15}}>
        <UserNameText style={{fontSize: 20, marginBottom: -10}}>
          How much you want to donate?
        </UserNameText>
      </View>
      <View style={styles.amount}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter amount"
          labelValue={amount}
          onChangeText={(amount) => setAmount(amount)}></TextInput>
      </View>
      <View style={styles.box}>
        <View style={{width: 225}}>
          <TouchableOpacity onPress={() => setAmount(20)}>
            <BoxAmount>
              <WelcomeBackText style={{fontSize: 20, lineHeight: 24}}>
                RON 20
              </WelcomeBackText>
            </BoxAmount>
          </TouchableOpacity>
        </View>
        <View style={{width: 165}}>
          <TouchableOpacity onPress={() => setAmount(10)}>
            <BoxAmount>
              <WelcomeBackText style={{fontSize: 20, lineHeight: 24}}>
                RON 10
              </WelcomeBackText>
            </BoxAmount>
          </TouchableOpacity>
        </View>
        <View style={{width: 100}}>
          <TouchableOpacity onPress={() => setAmount(5)}>
            <BoxAmount>
              <WelcomeBackText style={{fontSize: 20, lineHeight: 24}}>
                RON 5
              </WelcomeBackText>
            </BoxAmount>
          </TouchableOpacity>
        </View>
        <FormButton
          buttonTitle={'Donate ' + amount + ' RON'}
          onPress={() => requestPayment()}
          disabled={isPaymentPending || (amount == 0)}
        />
      </View>
    </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    backgroundColor: Colors.background,
    marginTop: -40,
    borderRadius: 30,
  },
  column: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalLine: {
    width: 0.8,
    height: '100%',
    backgroundColor: '#656060',
  },
  card: {
    height: 200,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: -10,
    borderRadius: 20,
    backgroundColor: colors.categoryCard,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  verified: {
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.51)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  upRate: {
    backgroundColor: colors.primary,
    height: 10,
    width: 30,
    borderRadius: 30,
  },
  amount: {
    backgroundColor: '#D6D2D2',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    height: 40,
    alignItems: 'center',
  },
  box: {
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // backgroundColor: 'black',
    width: '100%',
    height: 50,
    justifyContent: 'center',
  }
});

export default DonateProcess;
// export default Sentry.withProfiler(DonateProcess);

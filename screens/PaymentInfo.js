import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import BankCard from '../components/BankCard';
import FormButton from '../components/FormButton';
import Colors from '../constants/colors';
import {Root, Popup} from 'popup-ui';
import AccountScreen from './AccountScreen';

function PaymentInfo({props, navigation}) {
  return (
    <Root>
      <ScrollView style={styles.card}>
        <BankCard />
        <View style={styles.buttonMargin}>
          <FormButton
            buttonTitle="Next"
            onPress={() =>
              Popup.show({
                type: 'Success',
                title: 'Credit Card added',
                button: true,
                textBody:
                  'Your credit card details were successfully added to your account!',
                buttonText: 'Ok',
                callback: () => {Popup.hide(), navigation.navigate(AccountScreen)}
              })
            }
          />
        </View>
      </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
  buttonMargin: {
    marginTop: 20,
  },
});

export default PaymentInfo;

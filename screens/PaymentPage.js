import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';
import AsyncStorage from '@react-native-async-storage/async-storage';

stripe.setOptions({
  publishableKey: 'pk_test_51IPsghGSVElWPp0sq2mfzsJnpmm3II7o4eXEUqYBgdZgS0z4kBVjKPQLwZQcMYDyDgdmIXtn2f8D9Kiuh94PQ8t50037DzCshZ',
  androidPayMode: 'test',
});

function PaymentPage (props) {
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
        setEmail(value);
    });
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
            // const clientSecret = res.paymentIntent;
            // console.log(clientSecret);
            // stripe.confirmPaymentIntent(clientSecret);
        })
        .catch((error) => {
            console.warn(error);
        }) 
  };
  const requestPayment = () => {
    setIsPaymentPending( true );
    return stripe
      .paymentRequestWithCardForm()
      .then(stripePaymentInfo => {
        setPaymentMethod(stripePaymentInfo);
        doPayment(10);
      })
      .then(() => {
        console.log('Payment succeeded!');
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      })
      .finally(() => {
        setIsPaymentPending(false);
      });
  };

    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={() => requestPayment()}
          disabled={isPaymentPending}
        />
      </View>
    );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default PaymentPage;
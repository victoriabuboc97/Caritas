import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Colors from '../constants/colors';

function FormButton({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <LinearGradient
        colors={[Colors.button1, Colors.button2, Colors.button3]}
        style={styles.gradient}>
        <Text style={styles.text}>{buttonTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  button: {
    width: windowWidth / 2 - 30,
    height: windowHeight / 16,
    padding: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

export default FormButton;

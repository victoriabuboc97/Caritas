import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SocialButton({btnType, buttonTitle, backgroundColor, color, ...rest}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}
      {...rest}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={btnType}
          style={styles.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonTextContainer: {
    paddingLeft: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: windowWidth - 25,
    backgroundColor: '#2e64e8',
    marginTop: 5,
    marginBottom: 5,
    height: windowHeight / 15,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SocialButton;

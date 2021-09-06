import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';

import Colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <FontAwesomeIcon icon={iconType} size={22} color={Colors.green} />
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        borderWidth={0}
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: '95%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    fontSize: 36,
    fontFamily: 'Lato-Regular',
    color: '#333',
  },
});

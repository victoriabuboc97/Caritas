import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {
  Category,
  CategoryImage,
  Container,
  UserNameText,
  CategoriesContainer,
  CategoryText,
} from '../styles/HomeStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { isWhiteSpaceLike } from 'typescript';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const DetailsCard = (props) => {
  return (
    <View style={[styles.container, props.style]}>
        {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        width: windowWidth - 40,
        height: windowHeight / 11,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2.62,
        elevation: 4,
    }
})
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import {
  CategoryImage,
  CategoriesContainer,
  CategoryText,
} from '../styles/HomeStyles';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export const CategoryCard = ({item, onPress}) => {
  return (
    <CategoriesContainer>
      <TouchableOpacity onPress={onPress}>
        {/* {console.log(item.photo)} */}
        <CategoryImage source={{uri: item.photo}} />
      </TouchableOpacity>
      <View>
        <CategoryText style={{color:colors.primary}}>{item.name}</CategoryText>
      </View>
    </CategoriesContainer>
  );
};

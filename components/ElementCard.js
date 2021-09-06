import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  UserInfoText,
  ElementImage,
  ElementTextContainer,
  ElementText,
  UserInfoContainer,
  ElementContainer,
  CategoryText,
  DescriptionText,
  OrgAvatar,
  UserNameText,
} from '../styles/HomeStyles';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import PostScreen from './../screens/PostScreen';

export const ElementCard = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("PostScreen", {item})}>
      <ElementContainer>
        <ElementImage imageStyle={{ borderRadius: 20}} source={{uri: item.organizationImage}}>
          <ElementTextContainer>
            {/* <ElementText>{item.title}</ElementText> */}
            <UserInfoContainer style={{marginBottom: 0}}>
              <OrgAvatar source={{uri: item.organizationAvatar}} />
              <UserInfoText>
                <ElementText style={{fontSize: 16}}>{item.organizationName}</ElementText>
              </UserInfoText>
            </UserInfoContainer>
            <Text style={{color: 'white', marginRight: 5, fontSize: 11}} numberOfLines={3}>{item.description}</Text>
          </ElementTextContainer>
        </ElementImage>
      </ElementContainer>
    </TouchableOpacity>
  );
};

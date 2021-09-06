import styled from 'styled-components';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Colors from '../constants/colors';

export const Container = styled.View`
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const PersonalInfoContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const WelcomeBackText = styled.Text`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  font-variant: small-caps;
  color: rgba(50, 31, 14, 0.6);
`;

export const ErrorText = styled.Text`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 200;
  font-size: 8px;
  line-height: 48px;
  font-variant: small-caps;
  color: rgba(255, 0, 0, 1);
`;

export const UserNameText = styled.Text`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #321f0e;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-top: 5px;
`;

export const Avatar = styled.Image`
  marginLeft: 10px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  justify-content: center;
`;

export const OrgAvatar = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

export const CategoriesContainer = styled.View`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const Category = styled.View`
  margin-top: -20px;
`;

export const CategoryImage = styled.ImageBackground`
  width: 80px;
  height: 80px;
  justify-content: center;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
`;

export const CategoryText = styled.Text`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
`;

export const MainText = styled.Text`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 900;
  font-size: 15px;
  line-height: 20px;
  margin-left: 15px;
  color: #321f0e;
`;

export const ElementContainer = styled.View`
  width: 250px;
  height: 250px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 25px;
`;

export const ElementImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 25px;
  background-color: rgba(50, 71, 14, 0.6);
`;

export const ElementText = styled.Text`
  font-family: SF Pro Text;
  color: #ffffff;
`;

export const DescriptionText = styled.Text`
  font-family: SF Pro Text;
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
  font-variant: small-caps;
  color: white;
`;

export const ElementTextContainer = styled.View`
  margin-bottom: -160px;
  margin-left: 10px;
  margin-right: 5px;
`;

export const ChapterText = styled.Text`
  font-size: 24px;
  color: #a179e6;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

export const BoxAmount = styled.View`
  background: #fce3cd;
  border: 1px solid #a179e6;
  border-radius: 15px;
  height: 43px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

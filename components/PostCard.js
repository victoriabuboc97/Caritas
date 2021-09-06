import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../constants/colors';
import {
  ChapterText,
  WelcomeBackText,
  UserNameText,
  UserInfoContainer,
  UserInfoText,
  Avatar,
} from '../styles/HomeStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import FormButton from '../components/FormButton';

function PostCard({item, navigation}) {
  const [percent, setPercent] = useState();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/org/charityWaterPost.png')}
        style={styles.imageContainer}
      />
      <View style={styles.detailsContainer}>
        <ChapterText>Charity: Water</ChapterText>
        <View style={{marginLeft: 15}}>
          <Text>
            Charity: water is a non-profit organization founded in 2006 that
            provides drinking water to people in developing nations. As of 2019,
            the organization has raised $370 million.
          </Text>
        </View>
        <View style={styles.column}>
          <View>
            <WelcomeBackText>Category</WelcomeBackText>
            <UserNameText>Water</UserNameText>
          </View>
          <View style={styles.verticalLine}></View>
          <View>
            <WelcomeBackText>Days left</WelcomeBackText>
            <UserNameText>32</UserNameText>
          </View>
          <View style={styles.verticalLine}></View>
          <View>
            <WelcomeBackText>Category</WelcomeBackText>
            <UserNameText>Water</UserNameText>
          </View>
        </View>
        <View style={styles.card}>
          <UserNameText style={{marginTop: 15, marginLeft: 15}}>
            Organization
          </UserNameText>
          <UserInfoContainer style={{marginLeft: 5}}>
            <Avatar source={require('../assets/org/charityWater.png')} />
            <UserInfoText style={{marginTop: -5}}>
              <UserNameText>Charity Water</UserNameText>
              <View style={styles.verified}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={Colors.primary}
                />
                <WelcomeBackText>Verified account</WelcomeBackText>
              </View>
            </UserInfoText>
          </UserInfoContainer>
        </View>
        <View style={styles.card}>
          <UserNameText style={{marginTop: 15, marginLeft: 15}}>
            Charity Target
          </UserNameText>
          <UserInfoContainer style={{marginLeft: 5}}>
            <View style={styles.column}>
              <View style={{marginLeft: -5}}>
                <WelcomeBackText>9.690RON / 50.000RON</WelcomeBackText>
                <View style={styles.verified}>
                  <View style={styles.upRate}></View>
                </View>
              </View>
              <FormButton
                style={{width: '50%', marginLeft: 10, height: 34}}
                buttonTitle="Donate"
                onPress={() => navigation.navigate('DonateProcess')}
              />
            </View>
          </UserInfoContainer>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    marginTop: -80,
    height: 220,
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
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
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
});

export default PostCard;

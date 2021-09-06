import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, ScrollView, Linking} from 'react-native';
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
import { Rating, AirbnbRating } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { color } from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from "@sentry/react-native";


function PostScreen({route, navigation}) {
  const [percent, setPercent] = useState();
  const {item} = route.params;
  console.log('start')
  console.log(item)
  const [org, setOrg] = useState();
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [ratingObj, setRatingObj] = useState([]);
  const ratingsCollection = firestore().collection('ratings');
  const postsCollection = firestore().collection('posts');

  const completeRating = (value) => {
    console.log(value);
    console.log('rating' + rating);
    if(rating != 0) {
      for(let i = 0; i < ratingObj.length; i++) {
        if(ratingObj.organizationId == item.organizationId) {
          ratingObj.stars = rating;
        }
      }
    } else {
      ratingObj.push({'organizationId': item.organizationId, 'stars': rating});
    }
    console.log(ratingObj);
    // ratingsCollection.doc(email).set( {ratings: ratingObj}).then(() => console.log('Added'))
    // setRatingObj({organizationId: item.organizationId, stars: rating});
    console.log({organizationId: item.organizationId, stars: rating});
  }

  async function getUsersRatings(value) {
    await ratingsCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const {ratings} = documentSnapshot.data();
        setRatingObj(ratings);
        ratings.filter((rating) => rating.organizationId == item.organizationId);
        console.log(ratings);
        if(ratings != null) {
          setRating(ratings[0].stars);
        }
      });
    });
  }

  useEffect(() => {
    let completionBar = parseInt(item.donated) / parseInt(item.target) * 100;
    completionBar+='%';
    setPercent(completionBar);
    AsyncStorage.getItem('email').then((value) => {
      setEmail(value);
      getUsersRatings(value);
      let list = [];
      console.log(item.id)
      postsCollection.where('id', '==', item.id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const objCategory = documentSnapshot.data()
          list.push(objCategory);
        });
        setOrg(list);
        console.log(org);
      });
    });
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{uri: item.organizationImage}}
          style={styles.imageContainer}
        />
        <View style={styles.detailsContainer}>
          <ChapterText>{item.organizationName}</ChapterText>
          <View style={{marginLeft: 15, marginRight: 10}}>
            <Text>
              {item.description}
            </Text>
            <Text style={{color: colors.primary}}onPress={ ()=> Linking.openURL(item.site) }>
              Get more info
            </Text>
          </View>
          <View style={styles.column}>
            <View>
              <WelcomeBackText>Category</WelcomeBackText>
              <UserNameText>{item.category}</UserNameText>
            </View>
            <View style={styles.verticalLine}></View>
            <View>
              <WelcomeBackText>Days left</WelcomeBackText>
              <UserNameText>32</UserNameText>
            </View>
            <View style={styles.verticalLine}></View>
            <View>
              <WelcomeBackText>Rating</WelcomeBackText>
              <UserNameText>{item.rank}</UserNameText>
              
            </View>
          </View>
          <View style={styles.card}>
            <UserNameText style={{marginTop: 15, marginLeft: 15}}>
              Organization
            </UserNameText>
            <Rating
                // showRating
                //onFinishRating={this.ratingCompleted}
                style={{ marginTop: -15 , marginLeft: 220}}
                imageSize={15}
                startingValue={item.rank}
                tintColor={Colors.categoryCard}
                onFinishRating={(value) => completeRating(value)}
              />
            <UserInfoContainer style={{marginLeft: 5}}>
              <Avatar source={{uri: item.organizationAvatar}} />
              <UserInfoText style={{marginTop: -5}}>
                <UserNameText style={{marginRight: 20}}>{item.organizationName}</UserNameText>
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
            {/* <UserInfoContainer style={{marginLeft: 5, marginBottom: 0}}> */}
              <View style={styles.column}>
                <View>
                  {console.log('donated'+item.donated)}
                  <WelcomeBackText>{parseInt(item.donated)} RON / {parseInt(item.target)} RON</WelcomeBackText>
                  <View style={[styles.verified, {width: 300}]}>
                    <View style={[styles.upRate, {width: percent}]}></View>
                  </View>
                </View>
              </View>
            {/* </UserInfoContainer> */}
            <View style={{marginLeft: 90}}>
              <FormButton
                    // style={{ marginLeft: 10}}
                    buttonTitle="Donate"
                    onPress={() => navigation.navigate('DonateProcess', {item})}
                  />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    width: 110,
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

export default PostScreen;
// export default Sentry.withProfiler(PostScreen);

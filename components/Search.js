import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, FlatList, ScrollView} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {ElementCard} from './ElementCard';
import {CategoryCard} from './CategoryCard';
import Colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { LocalOrgCard } from './LocalOrgCard';
import {
  MainText,
} from '../styles/HomeStyles';
import perf from '@react-native-firebase/perf';

const customData = require('./../express-server/data/codebeautify.json');
let trace;

function Search({id, categories, navigation}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const categoriesCollection = firestore().collection('categories');
  const postsCollection = firestore().collection('posts');
  const localCollection = firestore().collection('localorg');
  const [posts, setPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [getRecomm, setGetRecomm] = useState(false);

  async function startMetring() {
    trace = await perf().startTrace('get_organizations');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
  }

  useEffect(() => {
    AsyncStorage.getItem('currentUser').then((value) => {
      const parsedValue = JSON.parse(value);
      setCurrentUser(parsedValue);
      console.log(parsedValue.id)
      getRecommendations(parsedValue.id);
    });
    let list = [];
    startMetring();
    postsCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data();
        list.push(objCategory);
      });
      trace.stop();
      setPosts(list);
      //setFilteredDataSource(list);
      setMasterDataSource(list);
      // console.log(customData)
      // for(let i = 0; i < customData.length; i++) {
      //   localCollection.doc(customData[i].id.toString()).set(customData[i]);
      // console.log('done');

      // }
    });
    let localList = [];
    localCollection.get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data();
        localList.push(objCategory);
      });
      setLocalPosts(localList);
    });
  }, []);

  async function getRecommendations (id) {
    if(!getRecomm) {
      const trace = await perf().startTrace('get_recommendations');
      // Define trace meta details
      trace.putAttribute('user', 'abcd');
      trace.putMetric('credits', 30);
      const userId = id
      console.log('get Recoommmm: ' + userId);
      const headers = {
          'Content-Type': 'application/json',
      };
        fetch(`http://192.168.15.2:5000/recommend?userId=${userId}`, {
          method: 'GET',
          // body: JSON.stringify(body),
          headers: headers,
        })
          .then((res) => res.json())
          .then((res) => {
            setRecommendations(res);
            setFilteredDataSource(res);
            trace.stop();
            // for(let i = 0; i < recommendations.length; i++) {
            //   postsCollection.doc(recommendations[i].id.toString()).set(recommendations[i]);
            // }
          })
          .catch((error) => {
              console.warn(error);
          }) 
          setGetRecomm(true);
    }
  };

  async function searchFilterFunction (text) {
    trace = await perf().startTrace('search_filter');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
    await trace.stop();
  };

  async function categoryFilter(item) {
    trace = await perf().startTrace('category_filter');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
    // console.log(posts)
    console.log(item)
    const newData = posts.filter((post) => post.category == item.item.name);
    setFilteredDataSource(newData);
    await trace.stop();
  };

  return (
    <View style={({flex: 1}, {backgroundColor: Colors.background})}>
      <View>
        <MainText style={{marginBottom: 10, marginLeft: 10}}>Categories</MainText>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item, index) => item.id+'/'}
              renderItem={({item}) => (
                <CategoryCard item={item} onPress={() => categoryFilter({item})}/>
              )}
          />
        </SafeAreaView>
        <View style={styles.searchStyle}>
          <SearchBar
            round
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search..."
            // value={search}
            underlineColorAndroid="white"
          />
        </View>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredDataSource}
            keyExtractor={(item, index) => item.id+'/'}
            renderItem={({item}) => (
              <ElementCard item={item} navigation={navigation} />
            )}
        />
        </SafeAreaView>
        <Text style={{marginLeft: 15, marginTop: 5}}>Local charities</Text>
          <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={localPosts}
                keyExtractor={(item, index) => item.id+'/'}
                renderItem={({item}) => (
                  <LocalOrgCard item={item} navigation={navigation} />
                )}
              />
            </SafeAreaView>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchStyle: {
    padding: 10,
  },
  container: {
    margin: 10,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  }
});

export default Search;

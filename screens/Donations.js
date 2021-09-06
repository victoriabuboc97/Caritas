import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import moment from 'moment';
import { CategoryCard } from '../components/CategoryCard';
import colors from '../constants/colors';
import {UserInfoContain, PersonalInfoContainer, ErrorText, WelcomeBackText} from './../styles/HomeStyles';
import firestore from '@react-native-firebase/firestore';
import firebase from './../express-server/db/Firebase';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormButton from '../components/FormButton';
import { DetailsCard } from '../components/DetailsCard';
import { isImportEqualsDeclaration } from 'typescript';
import perf from '@react-native-firebase/perf';

function Donations({navigation}) {
  const [currentUser, setCurrentUser] = useState({email: '', firstName:''});
  const [categories, setCategories] = useState([{}]);
  const [clickedColor, setClickedColor] = useState('#fb8c00');
  const [unClickedColor, setUnClickedColor] = useState('white');
  const [totalLastWeek, setTotalLastWeek] = useState(0);
  const [total, setTotal] = useState(0);
  const [dataLastWeek, setDataLastWeek] = useState(0);
  const [dataTotal, setDataTotal] = useState(0);
  let list = [{id: 7, key: "7", name: "Health", photo: "https://firebasestorage.googleapis.com/v0/b/charity-99e43.appspot.com/o/assets%2FMedicine-cuate.png?alt=media&token=81f2f1c5-d610-47a3-8d84-cc7d4810616d"},
  {id:4,key:"4",name:"Children",photo:"https://firebasestorage.googleapis.com/v0/b/charity-99e43.appspot.com/o/assets%2Fchildren.png?alt=media&token=a1511e5f-efb6-45ec-9347-eeee2ce4188a"}
  // {id: 1, key:"1",name:"Education",photo:"https://firebasestorage.googleapis.com/v0/b/charity-99e43.appspot.com/o/assets%2Feducation.png?alt=media&token=ca57feee-3191-4f8b-affc-217e9db04803"}
];
  const [donationsData, setDonationsData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Current Donations"] // optional
  });
  const screenWidth = Dimensions.get("window").width;
  const chartConfig={
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa740",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }
  const item = {name: 'Children'};
  const categoriesCollection = firestore().collection('categories');
  const usersCollection = firestore().collection('users');
  let top = [];

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  async function getCurrentUser(value) {
    const trace = await perf().startTrace('get_chart');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
    await usersCollection.where('email', '==',  value).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        // console.log(documentSnapshot.data())
        const {donations, donationDates, donationAmount, email, first_name, last_name, region, photo, password, topCategories} = documentSnapshot.data();
        // console.log(topCategories);
        top = topCategories;
        setCurrentUser({donations, topCategories, email, first_name, last_name, region, photo, password, donationDates, donationAmount});
        getCategories();
        let dataCopy = donationsData;
        dataCopy.labels = donationDates;
        // console.log(donationAmount);
        let amountArray = new Array({data: donationAmount,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2
        });
        // console.log(amountArray);
        dataCopy.datasets = amountArray;
        // console.log('donations')
        // console.log(donations)
        setDataTotalPeriod(donations);
        setDataLastWeekPeriod(donations);
        trace.stop();
        // console.log(dataCopy);
      });
    });
  }

  async function getCategories() {
    await categoriesCollection.get()
    .then(querySnapshot => {
      // console.log('Total categories: ', querySnapshot.size);
      // console.log(top);
      querySnapshot.forEach(documentSnapshot => {
        const objCategory = documentSnapshot.data();
        if(top.includes(objCategory.name))
          list.push(objCategory);
      });
      setCategories(list);
      console.log(list);
      // getTopCategories(list);
    });
  }

  function getTopCategories (list) {
    list.filter((item) => top.includes(item.id));
    console.log(list);
    console.log(list.topCategories);
  }

  const setDataTotalPeriod = (donations) => {
    let dataCopy = Object.assign({}, donationsData);
    // console.log('aici');
    // console.log(dataCopy);
    // console.log(donations);
    let datesCopy = [];
    let donationsTotal = [];
    // dates.map((date) => {date=moment(date, 'DD/MM').format('DD/MM'); datesCopy.push(date);});
    // console.log(datesCopy);
    // dataCopy.labels = datesCopy;
    // let numArray = amounts;
    
    // console.log(numArray);
    let lastDate = moment();
    for(let i = 0; i < donations.length; i++) {
      // console.log(moment(donations[i].date, 'DD/MM/YYYY'))
      // console.log(lastDate)
      donationsTotal.push(donations[i].amount);
      if(lastDate != moment(donations[i].date, 'DD/MM/YYYY hh:mm:ss'))
        datesCopy.push(moment(donations[i].date, 'DD/MM/YYYY hh:mm:ss').format('DD/MM'));
      lastDate = moment(donations[i].date, 'DD/MM/YYYY hh:mm:ss')
      // console.log('from total')
    }
    // console.log(datesCopy)
    dataCopy.labels = datesCopy;
    let amountArray = new Array({data: donationsTotal,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2
    });
    dataCopy.datasets = amountArray;
    setDonationsData(dataCopy);
    setDataTotal(dataCopy);
    // console.log('dataCopy Total');
    // console.log(dataCopy);
    setTotal(donationsTotal.reduce((a, b) => parseInt(a) + parseInt(b), 0));
  }

  const setDataLastWeekPeriod = (donations) => {
    let numArray = new Array(7).fill(0);
    let date = moment().format('DD/MM/YYYY');
    date = moment().add(1, 'days');
    let lastWeek = moment().subtract(7, 'days');
    // console.log(lastWeek);
    // console.log(date);
    let donationsLastWeek = [];
    // console.log('donations')
    // console.log(donations)
    for(let i = 0; i < donations.length; i++) {
      // console.log(moment(donations[i].date, 'DD/MM/YYYY hh:mm:ss'))
      if(moment(donations[i].date, 'DD/MM/YYYY hh:mm:ss').isBetween(lastWeek, date)){
        donationsLastWeek.push(donations[i]);
        // console.log('hehe')
      }
    }
    // console.log('donations last week')
    // console.log(donationsLastWeek);
    for(let i = 0; i < donationsLastWeek.length; i++) {
      for(let j = 0; j < 7; j++) {
        let compareDate = moment();
        compareDate.subtract(j, 'days');
        if(moment(donationsLastWeek[i].date, 'DD/MM/YYYY').isSame(compareDate, 'day')) {
          numArray[6-j] += parseInt(donationsLastWeek[i].amount);
        }
      }
    }
    // console.log('numarray last week')
    // console.log(numArray)
    setTotalLastWeek(numArray.reduce((a, b) => parseInt(a) + parseInt(b), 0));
    let dateObj = new Array();
    for (let i = 0; i < 7; i++) {
      dateObj.push(moment(lastWeek).add(i, 'days').format('DD/MM'));
    }
    let dataCopy = Object.assign({}, donationsData);
    dataCopy.labels = dateObj;
    let amountArray = new Array({data: numArray,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2
    });
    // console.log(amountArray);
    dataCopy.datasets = amountArray;
    setDataLastWeek(dataCopy);
    setDonationsData(dataCopy);
    setClickedColor('#fb8c00');
    setUnClickedColor('white');
    // console.log('dataCopy');
    // console.log(dataCopy);
  }

  async function startMetring() {
    trace = await perf().startTrace('get_charts');
    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);
  }

  useEffect(() => {
    let isSubscribed = true;
    AsyncStorage.getItem('email').then((value) => {
      getCurrentUser(value);
    });
    return () => (isSubscribed = false)
  }, [])

  function changeTab() {
    if(clickedColor == '#fb8c00') {
      setClickedColor('white');
      setUnClickedColor('#fb8c00');
    }
    else {
      setClickedColor('#fb8c00');
      setUnClickedColor('white');
    }
  }

  return (
    <ScrollView>
      <View style={{backgroundColor: colors.background}}>
        <View style={{ margin: 20, marginTop: 10, marginBottom: 5}}>
          <Text style={{marginTop: 5, marginBottom: 10, fontSize: 18}}>Overview</Text> 
          <DetailsCard>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={[styles.tabContainerLeft, {backgroundColor: clickedColor}]}
                onPress={() => {changeTab(); console.log(dataLastWeek); setDonationsData(dataLastWeek);}}>
                <WelcomeBackText style={{marginTop: 10, marginBottom: 5, flexDirection: 'row'}}>Last week</WelcomeBackText>
                <Text>{totalLastWeek} RON</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabContainerRight, {backgroundColor: unClickedColor}]}
              onPress={() => {changeTab(); console.log(dataTotal); setDonationsData(dataTotal);}}>
                <WelcomeBackText style={{marginTop: 10, marginBottom: 5, flexDirection: 'row'}}>Total</WelcomeBackText>
                <Text>{total} RON</Text>
              </TouchableOpacity>
            </View>
          </DetailsCard>
        </View>
        <View>
        <LineChart
          data={donationsData}
          width={screenWidth-40}
          height={180}
          yAxisLabel="RON "
          // yAxisInterval={0.8}
          verticalLabelRotation={0}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignItems: 'center'
          }}
          bezier
        />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{margin: 5, marginBottom: 10}}>You're top causes</Text>
          {/* {categories.map((item)=>console.log(item.photo))} */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={list}
            keyExtractor={(item, index) => item.id+'/'}
            renderItem={({item}) => <CategoryCard item={item} />}
          />
        <FormButton buttonTitle="All charities" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContainerLeft: {
    // backgroundColor: '#fb8c00',
    alignItems: 'center',
    width: '50%',
    borderRadius: 15,
    borderTopEndRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabContainerRight: {
    backgroundColor: 'green',
    alignItems: 'center',
    width: '50%',
    borderRadius: 15,
    borderTopStartRadius: 0,
    borderBottomLeftRadius: 0,
  }
})

export default Donations;

import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  Category,
  CategoryImage,
  Container,
  UserNameText,
  CategoriesContainer,
  CategoryText,
} from '../styles/HomeStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const LocalOrgCard = ({item, navigation}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('PostScreen', {item})}}>
        <View style={styles.column}>
            <Image style={styles.logo} source={{uri: item.organizationImage}}/>
            <View style={{flexDirection:'column'}}>
                <Text>{item.organizationName}</Text>
                <Text style={{fontSize: 12, color: '#0029'}} numberOfLines={2}>{item.category}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        width: '90%',
        padding: 5,
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        width: '80%'
    },
    logo: {
        width: 40,
        height:40,
        marginRight: 15,
        resizeMode: 'cover',
        borderWidth: 0.2,
        borderColor: '#808080',
        borderRadius: 50,
    }
})

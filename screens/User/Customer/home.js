import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList,Linking } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import Search from '../components/searchBar';
import { MaterialIcons } from '@expo/vector-icons';


export default function Home({ navigation }) {
  const [shops, setShop] = useState([
    { shopName: 'Reliance store', waiting: 50, body: 'lorem ipsum', key: '1',location:'https://goo.gl/maps/hFuasuqSfLFua7816' },
    { shopName: 'Star Super Market', waiting: 45, body: 'lorem ipsum', key: '2',location:'https://goo.gl/maps/LzBw6AYFSocewDdP7' },
    { shopName: 'D Mart', waiting: 30, body: 'lorem ipsum', key: '3',location:'https://goo.gl/maps/wNTPKD9YXLhZGHnx5' },
  ]);

  return (
      
    <View style={globalStyles.container}>
    
      <View><Search /></View>  
      <View>
      <Text style={styles.heading}>Most Recommended</Text>
      <FlatList data={shops} renderItem={({ item }) => (
        <TouchableOpacity style={{backgroundColor:'#F4D03F', borderRadius:10}} onPress={() => navigation.navigate('ReviewDetails', item)}>
          <Card>
          <View style={styles.cardAlign}>
          <View>
            <Text style={globalStyles.titleText}>{ item.shopName }</Text>
            <Text>Waiting time : {item.waiting} minutes</Text>
          </View>  
          <MaterialIcons onPress={ ()=> Linking.openURL(item.location) } name='navigation' size={35} /*onPress={openMenu}*/  />
          </View>
          </Card>
        </TouchableOpacity>
      )} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
heading:{
    textAlign:'center',
    borderWidth:1,
    padding:20,
    margin:50,
    fontSize:20,
    borderRadius:30,
    backgroundColor:'#AF7AC5',
    fontFamily:'serif',
    borderColor:'#AF7AC5',
    
},

cardAlign:{
    flexDirection:'row',
    justifyContent:'space-between'
},


})
import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList,Linking,ScrollView } from 'react-native';
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import Search from '../../../components/searchBar';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from "firebase";
// import { v1 as uuidv1 } from 'uuid';



export default function Home({ navigation }) {

  function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}



  //  useEffect(() => {
  //   console.log("component did mount");

  //   var ref = firebase.database().ref("/shop");
  //   ref.once("value")
  //     .then(function(snapshot) {
  //       snapshot.forEach(function(childSnapshot) {
  //       var name = childSnapshot.child("/shop_name").val();
  //       console.log("name mila ",name)
  //       var category = childSnapshot.child("/Category_of_shop").val(); 
  //       console.log("category mila ",category);
  //       var shopKey = childSnapshot.child("/key").val(); 
  //       console.log("key mila ",shopKey);
  //       setShop( [...shops,
  //         {shopName: name, categoryOfShop: category, body:'hi',waiting:50,location:'',key:shopKey}]);
  //         console.log("shop data : ",shops);
        
  //       });
  //     });


  // });

  const [shops, setShop] = useState([
    { shopName: 'Reliance',categoryOfShop: "Super market", waiting: 50, body: 'lorem ipsum', key: '1',location:'https://goo.gl/maps/hFuasuqSfLFua7816' },
    { shopName: 'Star Super Market',categoryOfShop: "Super market", waiting: 45, body: 'lorem ipsum', key: '2',location:'https://goo.gl/maps/LzBw6AYFSocewDdP7' },
    { shopName: 'D Mart',categoryOfShop: "Super market", waiting: 30, body: 'lorem ipsum', key: '3',location:'https://goo.gl/maps/wNTPKD9YXLhZGHnx5' },
  ]);

  

  return (
      
    <View style={globalStyles.container}>
      <View><Search /></View>  
      <View>
      <Text style={styles.heading}>Most Recommended</Text>
      
      <FlatList data={shops} keyExtractor={(item)=>item.key.toString()} renderItem={({ item }) => (
        <TouchableOpacity style={{backgroundColor:'#F4D03F', borderRadius:10}} onPress={() => navigation.navigate('ReviewDetails', item)}>
          <Card>
          <View style={styles.cardAlign}>
          <View>
            <Text style={globalStyles.titleText}>{ item.shopName }</Text>
            <Text>Category : {item.categoryOfShop}</Text>
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
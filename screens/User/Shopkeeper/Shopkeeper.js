import React, { useEffect,useState } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import * as firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';



export default function Shopkeeper() {

    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    // useEffect(() => {
    //     console.log("component did mount");
    
    //     var ref = firebase.database().ref("/queueShop/D Mart");
    //     ref.on("value",(function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //         var name = childSnapshot.child("/username").val();
    //         console.log("name mila ",name)
    //         // var category = childSnapshot.child("/Category_of_shop").val(); 
    //         // console.log("category mila ",category);
    //         // var shopKey = childSnapshot.child("/key").val(); 
    //         // console.log("key mila ",shopKey);
    //         setShop( [...shops,
    //           {shopName: name, categoryOfShop: "category", body:'hi',waiting:50,location:'',key:create_UUID}]);
    //           console.log("shop data : ",shops);
            
    //         });
        
    //       }),
    //     )
    
    
    
    //   });

      const [shops, setShop] = useState([
        { shopName: 'Reliance',categoryOfShop: "Super market", waiting: 50, body: 'lorem ipsum', key: '1',location:'https://goo.gl/maps/hFuasuqSfLFua7816' },
        { shopName: 'Star Super Market',categoryOfShop: "Super market", waiting: 45, body: 'lorem ipsum', key: '2',location:'https://goo.gl/maps/LzBw6AYFSocewDdP7' },
        { shopName: 'D Mart',categoryOfShop: "Super market", waiting: 30, body: 'lorem ipsum', key: '3',location:'https://goo.gl/maps/wNTPKD9YXLhZGHnx5' },
      ]);

        return (
            <View style={styles.container}>
                <Text> Shopkeeper </Text>
                <Button
                    title = "Log Out"
                    onPress = {() => firebase.auth().signOut()} 
                />
                <Text>
                {shops.map( shop =>{<Text>{shop.shopName}</Text>})}
                </Text>
            </View>
        )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

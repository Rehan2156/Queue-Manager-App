import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../../shared/card';
import { globalStyles } from '../../../styles/global';
import { FontAwesome } from '@expo/vector-icons';




export default class Shopkeeper extends Component {
    
    state={
      customers:[
         { name: "Ajay Das",token:1,key:1},
         {name:'Laukik Chavan',token:2,key:2},
         {name:'Rehan Shaikh',token:3,key:3},
     ],
     shopName:"",
     tempArray:[
         {name:'Laukik Chavan',token:2,key:2},
         {name:'Rehan Shaikh',token:3,key:3},
     ],
     isReady:false  

    }

    tempArray=[
      {name:'Laukik Chavan',token:2,key:2},
      {name:'Rehan Shaikh',token:3,key:3},
  ]
    call=()=>{
      this.setState({customers:this.tempArray})
      Alert.alert("Notification sent to 'Ajay Das'","People in queue : 2")
    }
    // componentDidMount = () => {
    //     var myArray = []

    //     firebase
    //     .database()
    //     .ref('/shop/'+firebase.auth().currentUser.uid)
    //     .on("value",(snapshot)=>{
    //         var shopName = snapshot.child("/shop_name").val().toString()
    //         console.log("shop name "+shopName)
    //         this.setState({
    //             shopName:shopName
    //         })
    //     })

    //     try {
    //         console.log("here")
    //         var myJSON
    //       var ref = firebase.database().ref("/queueShop/Jessy Medical/line/");
    //       ref.once("value", (snapshot) => {
            
    //         snapshot.forEach( (childSnapshot) => {
    //             console.log("cust name is ");
    //         myJSON = childSnapshot.toJSON()
    //         console.log("myjson 0 is "+myJSON[0])
    //           var key = childSnapshot.key.toString()
    //           var name = childSnapshot.child("/username").val().toString()
    //           var token = childSnapshot.child("/userToken").val().toString()
    //           myArray = [...myArray, {name:name,token:token, key: key }]
    //         })
    //           this.setState({
    //             customers: [...this.state.customers, ...myArray],
    //           })
    
    //           this.setState({
    //             tempArray: this.state.customers,
    //             isReady: true,
    //           })
    
    //       })
    //     } catch(e) {
    //       console.log('Error: ', e)
    //     }
    //   }
    
    render(){
        return (
          <View style={{backgroundColor:'#Fedbd0'}}>
            <View style={styles.body}>
            <TouchableOpacity style={styles.myBtnB} onPress={this.call}>
                        <Text style={styles.label}>Click To call next person </Text>
                    </TouchableOpacity>
                <Text style={styles.head}>People in Queue</Text>
                {/* <Text>Your shop queue is empty</Text> */}
                
                <FlatList data={this.state.customers} renderItem={({ item }) => (
                    <View>
          <TouchableOpacity style={styles.touch}>
            <View style={styles.cardAlign}>
            <View>
              <Text style={{fontFamily:'nunito-bold',fontSize:20}}>{ item.name }</Text>
              <Text style={{fontFamily:'nunito-bold'}}>Token : {item.token}</Text>
            </View>  
            </View>
          </TouchableOpacity>
          <FontAwesome name="arrow-down" style={styles.icon}/>
                    </View>
        )} 
        contentContainerStyle={{ paddingBottom: 300}}
        />
        <Text style={{fontFamily:'nunito-bold',marginBottom:10,textAlign:'center',fontSize:20,color:'#fff'}}>Last person</Text>
            </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: '#555',
    margin: 5,
    padding: 10,
    fontFamily:'nunito-bold'
},
  myBtnB: {
    padding: 5,
    margin: 3,
    borderRadius: 30,
    borderColor: '#aaa',
    alignItems: 'center',
    backgroundColor: '#fedbd0',
    marginTop: 30,
},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    head:{
        padding:15,
        fontFamily:'nunito-bold',
        fontSize:20,
        textAlign:'center',
        // opacity:0.7,
        color:'#fff'
    },
    body:{
        backgroundColor:'#424242',
        padding:50,
        borderTopLeftRadius:150,
        height:'100%'
    },
    
    touch:{
        backgroundColor:'#Fedbd0',
        margin:10,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
    //   justifyContent: 'center',
    //   alignContent:'center',
      shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderBottomEndRadius:15,
    borderTopLeftRadius:15,
    elevation: 3,
    },
    cardAlign:{
        padding:10,
        margin:10,
        opacity:0.5,
        color:'transparent'
    },
    txt:{
        color:'white'
    },
    icon:{
        alignItems: 'center',
      justifyContent: 'center',
      alignContent:'center',
      textAlign:'center',
      fontSize:20,
      color:'#8A8A87'
    }
})

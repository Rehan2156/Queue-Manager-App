import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableOpacity, Dimensions, TextInput } from 'react-native'
import * as firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../../shared/card';
import { globalStyles } from '../../../styles/global';
import { FontAwesome } from '@expo/vector-icons';


const {width:WIDTH}=Dimensions.get('window')


export default class Shopkeeper extends Component {
    constructor(){
      super()
      this.state={
        customers:[
            {name:'Rehan',token:13,key:1}
        ],
        shopName:"",
        tempArray:[],
        isReady:false,
        howMany: '0',
    }
  }

    componentDidMount = async () => {
        var myArray = []
        await firebase
        .database()
        .ref('shop/'+firebase.auth().currentUser.uid)
        .on("value",(snapshot)=>{
            var shopName = snapshot.child("/shop_name").val().toString()
            console.log("shop name "+shopName)
            this.setState({
                shopName:shopName
            })
        })
        try {
            console.log("here")
            var myJSON
          var ref = await firebase.database().ref("shop/" + firebase.auth().currentUser.uid + '/line');
          await ref.on("value", (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
            myJSON = childSnapshot.toJSON()
              var key = childSnapshot.key.toString()
              var name = myJSON.Name
              var token = myJSON.Token
              myArray = [...myArray, {name:name,token:token, key: key }]
            })
              this.setState({
                customers: [...this.state.customers, ...myArray],
              })
              this.setState({
                tempArray: this.state.customers,
                isReady: true,
              })
          })
        } catch(e) {
          console.log('Error: ', e)
        }
    }

    render(){
        return (
          <View style={{backgroundColor:'#Fedbd0'}}>
            <View style={styles.body}>
            <TextInput style={styles.myInput} 
            value = {this.state.howMany}
            placeholder = "Enter Number"
            keyboardType = 'phone-pad'
            onChangeText = {val => this.setState({ howMany: val })}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
          />
           <TouchableOpacity style={styles.myBtn} onPress={ this.removeThem }>
            <Text style={styles.myBtnText}>remove</Text>
          </TouchableOpacity>
                <Text style={styles.head}>People in queue</Text>
                <FlatList data={this.state.tempArray} renderItem={({ item }) => (
                    <View>
          <TouchableOpacity style={styles.touch}>
            <View style={styles.cardAlign}>
            <View>
              <Text style={globalStyles.titleText}>{ item.name }</Text>
              <Text>Token : {item.token}</Text>
            </View>  
            </View>
          </TouchableOpacity>
          <FontAwesome name="arrow-down" style={styles.icon}/>
                    </View>
        )} 
        contentContainerStyle={{ paddingBottom: 300}}
        />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    head:{
        padding:15,
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        opacity:0.7,
        color:'white'
    },
    body:{
        backgroundColor:'#424242',
        padding:50,
        borderTopLeftRadius:150,
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
    },

  myBtn: {
    width:WIDTH - 55,
    alignSelf:'center',
    height:55,
    borderRadius:25,
    backgroundColor:'#fedbd0',
    justifyContent:'center',
    marginTop:20,
    marginHorizontal:25,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // borderBottomEndRadius:15,
    // borderTopLeftRadius:15,
    elevation: 3,
  },
  myBtnText: {
    padding: 7,
    margin: 5,
    fontSize: 18,
    alignSelf: 'center',
    color: '#555',
    fontWeight: 'bold'
  },
  myInput: {
    alignSelf:'center',
    width: WIDTH - 55,
    height:55,
    borderRadius:45,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal:25,
    fontFamily:'nunito-bold',
    margin:20
  },
})

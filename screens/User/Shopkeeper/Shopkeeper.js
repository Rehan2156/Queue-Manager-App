import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../../shared/card';
import { globalStyles } from '../../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

export default class Shopkeeper extends Component {
    
    constructor(){
      super()
      this.state={
        customers:[
            {name:'Rehan',token:99,key:'1'}
        ],
        shopName:"",
        tempArray:[],
        isReady:false,
        isOpen: 0,
        qLen: 0,
        howMany: '',
        line: {},
    }
    }

    

    componentDidMount = async () => {
        var myArray = []
        await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).once('value' , snapshot => {
          this.setState({
              isOpen: snapshot.toJSON().isOpen, 
          })
      })
        firebase
        .database()
        .ref('/shop/'+firebase.auth().currentUser.uid)
        .on("value",(snapshot)=>{
            var shopName = snapshot.child("/shop_name").val().toString()
            this.setState({
                shopName:shopName
            })
        })
        try {
          var ref = await firebase.database().ref('shop/' + firebase.auth().currentUser.uid + '/line');
          await ref.once("value", (snapshot) => {
            if(snapshot.exists()){
              var number = 0;
              snapshot.forEach( data => {
                number++;
                var key = data.key
                var name = data.toJSON().Name
                var token = data.toJSON().Token
                myArray = [...myArray, {name:name,token:token, key: key }]
              })
                this.setState({
                  customers: [...this.state.customers, ...myArray],
                })
              
              } else {  
                this.setState({ qLen: 0 })              
              }
                this.setState({
                  tempArray: this.state.customers,
                  isReady: true,
                })
          }).then(() => {
            var sortArray = this.state.tempArray
            sortArray.sort( (a, b) => a.token - b.token )
            console.log(sortArray)
            this.setState({ tempArray: sortArray })
          })
        } catch(e) {
          console.log('Error: ', e)
        }
      }

      componentWillUnmount = () => {
        console.log('The end')
      }

      wantToDelete = async (times) => {
        while(times > 0) {
          console.log('hello')
          var deleteArray = this.state.tempArray        
          deleteArray.reverse()
          var temp = deleteArray.reverse()[0]
          deleteArray.reverse().pop()
          deleteArray.reverse()
          this.setState({ tempArray: deleteArray })
          console.log(temp.key)
          await firebase.database().ref('shop/' + firebase.auth().currentUser.uid + '/line/' + temp.key).remove();
          await firebase.database().ref('users/' + temp.key).update({
            inQ: 0,
            shopKey: null
          })
          console.log('deleted')
          times = times - 1
        }
      }
    
    render(){
        return (
          <View style={{backgroundColor:'#Fedbd0'}}>
            <View style={styles.body}>
              <Button
                title = " call 1 " 
                onPress = {() => {this.wantToDelete(1)}}
              />
              <Text />
              <Button
                title = " call 2 " 
                onPress = {() => {this.wantToDelete(2)}}
              />
              <Text />
              <Button
                title = " call 5 " 
                onPress = {() => {this.wantToDelete(5)}}
              />
              <Text />
              <Button
                title = " call 10 " 
                onPress = {() => {this.wantToDelete(10)}}
              />
              <Text />


                <Text style={styles.head}>People in queue</Text>
                <FlatList data={this.state.tempArray} renderItem={({ item }) => (
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
        contentContainerStyle={{ paddingBottom: 600}}
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

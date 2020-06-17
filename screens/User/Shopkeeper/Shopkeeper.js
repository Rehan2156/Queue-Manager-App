import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableOpacity, Dimensions } from 'react-native'
import * as firebase from 'firebase'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Card from '../../../shared/card';
import { globalStyles } from '../../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

const {width:WIDTH}=Dimensions.get('window')

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
        customNum: 0,
        num: '',
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

      customNumberCall = () => {
        if(this.state.customNum === 0) {
          this.setState({ customNum: 1 })
        } else {
          let n = parseInt(this.state.num)
          this.wantToDelete(n)
          this.setState({ num: '' })
          this.setState({ customNum: 0 })
        }
      }
    
    render(){
        return (
          <View style={{backgroundColor:'#Fedbd0'}}>
            <View style={styles.body}>

              { this.state.customNum ? 
                  <TextInput style={styles.myInput} 
                    value = {this.state.num}
                    onChangeText = {val => this.setState({ num: val })}
                    placeholder={'Enter Number'}
                          placeholderTextColor={'rgba(255,255,255,0.7)'}
                          underlineColorAndroid='transparent'
                  /> 
                  :
                  <></>
              }

              <View style = { styles.btnGrid }>
                <TouchableOpacity 
                  style= { styles.myBtn}        
                  onPress = {() => {this.wantToDelete(1)}}        
                > 
                  <Text style= { styles.myBtnText} > call 1 </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style= { styles.myBtn}        
                  onPress = {() => {this.wantToDelete(2)}}        
                >  
                  <Text style= { styles.myBtnText} > call 2 </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style= { styles.myBtn}        
                  onPress = {() => {this.wantToDelete(5)}}        
                >  
                  <Text style= { styles.myBtnText} > call 5 </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style= { styles.myBtn}        
                  onPress = {() => {this.wantToDelete(10)}}        
                >  
                  <Text style= { styles.myBtnText} > call 10 </Text>
                </TouchableOpacity>
              </View>

                { !this.state.customNum ?  
                    <TouchableOpacity 
                    style= { styles.myBtnNew}   
                    onPress = { this.customNumberCall } >
                      <Text style= { styles.myBtnText} > your number </Text>
                    </TouchableOpacity>  :
                    <TouchableOpacity 
                    style= { styles.myBtnNew}  
                    onPress = { this.customNumberCall } >
                      <Text style= { styles.myBtnText}> call </Text>
                    </TouchableOpacity>
                }

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
        contentContainerStyle={{ paddingBottom: 600}}
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
    touch:{
        backgroundColor:'#Fedbd0',
        margin:10,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
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
    myBtnNew: {
      width: '100%',
      alignSelf:'center',
      height:60,
      borderRadius:20,
      backgroundColor:'#fedbd0',
      justifyContent:'center',
      marginTop:30,
      marginHorizontal:10,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
  myBtn: {
    width: '43%',
    alignSelf:'center',
    height:60,
    borderRadius:20,
    backgroundColor:'#fedbd0',
    justifyContent:'center',
    marginTop:30,
    marginHorizontal:10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
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

  btnGrid: {
    marginLeft: 0,
    paddingLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

})

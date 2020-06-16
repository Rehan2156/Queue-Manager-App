import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Alert,Button, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import * as firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

console.ignoredYellowBox = ['Setting a timer'];

export default class UserQ extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: firebase.auth().currentUser.email,
        queue:0,
        inQ: false,
        readError: null,
        writeError: null,
        userToken:0,
        loading:false, 
        isReady: false,
        myLoc: {},
        errMsg: "",
        dist: 0.0,
        bool: true,
        sameKey: true,
      };

    }

    _getPreciseDistance = (myLoc, loc) => {
      var pdis = getPreciseDistance(myLoc, loc);
      this.setState({ dist: pdis / 1000 });
      console.log(this.state.dist)
    };

  getTheLocationAtFirst = async () => {
      console.log('location at first')
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
          this.setState({errMsg: 'Permission to access location was denied'})
      }    

      var location = await Location.getCurrentPositionAsync({})
      this.setState({myLoc: location.coords})
      console.log(location)
  }

     async componentDidMount() {
      console.log('component mounted')

        //await this.getTheLocationAtFirst().then(() => {
       //     console.log('location mila')
       // })

        const key = this.props.navigation.getParam('key')
       // const loc = this.props.navigation.getParam('loc')

      //  console.log(loc)
       //console.log(this.state.myLoc)

       // this._getPreciseDistance(this.state.myLoc, loc)

        await firebase.database().ref('shop/' + key + '/line/').once('value', snapshot => {
            if(snapshot.exists()){
                var number = 0;
                snapshot.forEach(function(data){
                    number++;
                });
                this.setState({ queue: number })
            } else {
                this.setState({ queue: 0 })
            }
        });

        await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snap => {
            this.setState({ inQ: snap.toJSON().inQ })
        })

        if(this.state.inQ) {
            await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snap => {
                if(key === snap.toJSON().shopKey) {
                    this.setState({ sameKey: true })
                } else {
                    this.setState({ sameKey: false })
                }
            })
        }

        if(this.state.sameKey && this.state.inQ) {
            firebase.database().ref('shop/' + key + '/line/' + firebase.auth().currentUser.uid) .once('value', snap => {
                this.setState({ userToken: snap.toJSON().Token })
            })
        }

        this.setState({ isReady: true })
    }

    
  
    clickHandler = async () => {
      const userId = firebase.auth().currentUser.uid;  
      const shop = this.props.navigation.getParam('key')
      if(!this.state.inQ) {   
          var shopDetail
          await firebase.database().ref('shop/' + shop).once('value', function (snapshot) {
              shopDetail =  snapshot.toJSON()
          }) 

          var userDetail 
          await firebase.database().ref('users/' + userId).once('value', function (snapshot) {
              userDetail = snapshot.toJSON()
          })
          console.log(shopDetail)
          console.log(userDetail)
          var token

          if(shopDetail.line === undefined) {
              console.log('yes')
              token = 1;
          } else {
              var bigNum = 0;
              await firebase.database().ref('shop/' + shop + '/line/').once('value', function(snapshot){
                  if(snapshot.exists()){
                      snapshot.forEach(function(data){
                          var val = data.toJSON().Token;
                          if(bigNum < val) {
                              bigNum = val
                          }
                      });
                  }
              });
              token = bigNum + 1
          }
          this.setState({ userToken: token })

          if(userDetail.inQ === undefined || userDetail.inQ === 0) {
              await firebase.database().ref('users/' + userId).update({
                  inQ: 1,
                  shopKey: shop,
              })
              this.setState({ inQ: 1 })
              var time = Math.round((Math.ceil(token / shopDetail.qSize)) * 10) ;
              await firebase.database().ref('shop/' + shop + '/line/' + userId).set({
                      Name: userDetail.Full_Name,
                      Token: token,
                      Time_in_min: time
                  })
          } 

          console.log('done for one')
      } else {
          await firebase.database().ref('users/' + userId).update({
              inQ: 0,
          })
          await firebase.database().ref('users/' + userId + '/shopKey').remove()
          this.setState({ inQ: 0 })
          await firebase.database().ref('shop/' + shop + '/line/' + userId).remove()
      }

      await firebase.database().ref('shop/' + shop + '/line/').once('value', snapshot => {
          if(snapshot.exists()){
              var number = 0;
              snapshot.forEach(function(data){
                  number++;
              });
              this.setState({ queue: number })
          } else {
              this.setState({ queue: 0 })
          }
      });

      this.state.inQ ?  Alert.alert('You are added to the queue.') : Alert.alert('You have exited the queue.') 
  }
  
    
  render(){
    var inQbutton = this.state.inQ?"Exit the queue":"Join the queue";
    console.log('inQ :',this.state.inQ)
    console.log('button  :',inQbutton)
    if(!this.state.loading){

    if(!this.state.isReady) {
      return <ActivityIndicator  size='large' />
    }
    var wait = this.state.queue * 2
    return (
      <View style={globalStyles.body}>
      <View style={styles.box}>
        <Card>
          <Text style={styles.titleText}>
            { this.props.navigation.getParam('shopName') }
          </Text>
          <Text style={styles.waitingText}>{ this.props.navigation.getParam('body') }</Text>
          <Text style={styles.waitingText}>{wait} minutes waiting</Text>
        </Card>
        <Card><Text style={{fontFamily:'nunito-bold',fontSize:20}}> People in Queue : <Text style={styles.bold}>{this.state.queue}</Text></Text></Card>
        <Button onPress={this.clickHandler} title={inQbutton}/>
        {this.state.inQ?(
          <View>
        <Text style={styles.tokentext}>Your token number</Text>
        <Text style={styles.token}>{this.state.userToken}</Text>
        <FontAwesome name="circle-o" style={styles.icon}/>
        </View>
        )
        
        :(null)}

        </View>
      </View>
    );
  }else{
    return(
      <View style={globalStyles.loading}>
        <Text> Loading Please Wait ... </Text>
          <ActivityIndicator size = 'large' />
      </View>
    )
  }
  }
  }
  
  const styles = StyleSheet.create({

    textStyle:{
       padding:20,
       color:'#8D908E',
       backgroundColor:'#98F1BD'
      },
      bold:{
        fontWeight:'bold',
        fontSize:30
      },

      token:{
        fontFamily:'nunito-bold',
        position:'absolute',
        fontSize:80,
        marginTop:110,
        marginLeft:100,
        color:'#f9aa33'
      },
      tokentext:{
        fontFamily:'nunito-bold',
        fontSize:30,
        color:'#fff',
        marginTop:30
      },
      icon:{
      textAlign:'center',
      fontSize:200,
      color:'#fff',
      marginBottom:30
      },
      box:{
        padding:10,
        margin:5,
        marginTop:10,
        backgroundColor:'#424242',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderBottomEndRadius:15,
        // borderTopLeftRadius:15,
        elevation: 15,    
    },
    titleText:{
      fontFamily:'nunito-bold',
      fontSize:25
    },
    waitingText:{
      fontFamily:'nunito-bold',fontSize:20
    }
    
  })
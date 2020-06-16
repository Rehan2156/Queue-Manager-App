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
      };

    }

     componentDidMount() {
      console.log('component mounted')

      const shopName= this.props.navigation.getParam('shopName') 
      firebase.database().ref('/queueShop/'+shopName+'/qSize').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        
        this.setState({
           queue: data,
        });
        console.log('data is ',data)
      });
      this.setState({ isReady: true })
    }

    
  
     clickHandler = () => {
      var userId = firebase.auth().currentUser.uid;
      const shopName =  this.props.navigation.getParam('shopName') 
      
      if(!this.state.inQ){

      firebase.database().ref('/queueShop/'+shopName).update({
        qSize:this.state.queue + 1,
      })

      firebase.database().ref('queueShop/'+shopName+'/line/').push({  
        username:this.state.user,
        userToken:this.state.queue + 1,
      }).then(()=>{
        console.log('Inserted')
        this.setState(prevState=>
          ({inQ:!prevState.inQ,userToken:this.state.queue})
          )
      }).catch((error)=>{
        console.log(error);
      });
    }
    else{
      firebase.database().ref('/queueShop/'+shopName).update({
        qSize:this.state.queue - 1,
      })
      firebase.database().ref('queueShop/'+shopName+'/line/'+userId).remove()
      this.setState(prevState=>
        ({inQ:!prevState.inQ})
        )
    }

      this.state.inQ?Alert.alert('You have exited the queue.'):Alert.alert('You are added to the queue.');
    };
  
    
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
        marginLeft:125,
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
import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Alert,Button, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import * as firebase from 'firebase'
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

      firebase.database().ref('queueShop/'+shopName+'/line/'+userId).push({  
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

    if(!this.state.isReady) {
      return <ActivityIndicator  size='large' />
    }

    return (
      <View style={globalStyles.container}>
        <Card>
          <Text style={globalStyles.titleText}>
            { this.props.navigation.getParam('shopName') }
          </Text>
          <Text>{ this.props.navigation.getParam('body') }</Text>
          <Text>{ this.props.navigation.getParam('waiting') } minutes waiting</Text>
        </Card>
        <Text style={styles.textStyle}>People in Queue : <Text style={styles.bold}>{this.state.queue}</Text></Text>
        {this.state.inQ?(<Text style={styles.textStyle}>{this.state.user} your token number is <Text style={styles.bold}>{this.state.userToken}</Text></Text>):(null)}
        <Button onPress={this.clickHandler} title={inQbutton}/>
      </View>
    );
  }
  }
  
  const styles = StyleSheet.create({

    textStyle:{
       padding:20,
       color:'#8D908E',
       backgroundColor:'#98F1BD'
      },

      bold:{
        fontWeight:'bold'
      }
    
    
  })
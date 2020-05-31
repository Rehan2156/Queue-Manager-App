import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,Alert,Button } from 'react-native';
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
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

      };

    }

     componentDidMount() {
      console.log('component mounted')
      // firebase.database().ref('/queueShop').push({
      //   qSize:6,
      //   name:'shop'
      // }).then(()=>{
      //   console.log('Inserted')
      // }).catch((error)=>{
      //   console.log(error);
      // });
      const shopName= this.props.navigation.getParam('shopName') 
      firebase.database().ref('/queueShop/'+shopName+'/qSize').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        
        this.setState({
           queue: data,
        });
        console.log('data is ',data)
      });
      
      console.log('end of component mount')
      
    }

    
  
     clickHandler = () => {
      var userId = firebase.auth().currentUser.uid;
      const shopName =  this.props.navigation.getParam('shopName') 
      //function to handle click on floating Action Button
      // const inQadd = this.state.inQ?-1:1;
      
      if(!this.state.inQ){

      firebase.database().ref('/queueShop/'+shopName).update({
        qSize:this.state.queue + 1,
      })

      // this.setState({
      //   queue:this.state.queue,
      // })

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
      // console.log('queue is '+this.state.queue)
    }
    else{
      firebase.database().ref('/queueShop/'+shopName).update({
        qSize:this.state.queue - 1,
      })
      firebase.database().ref('queueShop/'+shopName+'/line/'+userId).remove()
      this.setState(prevState=>
        ({inQ:!prevState.inQ})
        )
        // console.log('state in else is '+this.state.queue)

    }

      this.state.inQ?Alert.alert('You have exited the queue.'):Alert.alert('You are added to the queue.');
    };
  
    
  render(){
    var inQbutton = this.state.inQ?"Exit the queue":"Join the queue";
    console.log('inQ :',this.state.inQ)
    console.log('button  :',inQbutton)
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
  
        {/* <TouchableOpacity style={styles.icon}>
      <MaterialIcons onPress={this.clickHandler} name='add' size={28}  style={styles.drawer} />
    </TouchableOpacity> */}
      </View>
    );
  }
  }
  
  const styles = StyleSheet.create({
    // TouchableOpacityStyle: {
    //   position: 'absolute',
    //   width: 50,
    //   height: 50,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   right: 30,
    //   bottom: 30,
    // },
  
    // FloatingButtonStyle: {
    //   resizeMode: 'contain',
    //   width: 50,
    //   height: 50,
    //   //backgroundColor:'black'
    // },
  
    // icon:{
    //   borderWidth:1,
    //   borderColor:'rgba(0,0,0,0.2)',
    //   alignItems:'center',
    //   justifyContent:'center',
    //   width:70,
    //   position: 'absolute',                                          
    //   bottom: 10,                                                    
    //   right: 10,
    //   height:70,
    //   backgroundColor:'#58D68D',
    //   borderRadius:100,
    // }


    textStyle:{
       padding:20,
       color:'#8D908E',
       backgroundColor:'#98F1BD'
      },

      bold:{
        fontWeight:'bold'
      }
    
    
  })
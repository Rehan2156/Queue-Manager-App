import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert,Dimensions } from 'react-native'
import { globalStyles } from '../../../styles/global';
import * as firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const {width:WIDTH}=Dimensions.get('window')
export default class account extends Component {
  state = {
    fullName: "",
    gmail: "",
    phoneNo: "",
    isReady: false,
    isWantToUpdate: false,
    isShopkeeper: false,
    isOpen: 0,
  }

  componentDidMount = () => {
    var myJSON
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', function (snapshot) {
      myJSON = snapshot.toJSON()
    })
    .then(() => {
        this.setState({
          fullName: myJSON.Full_Name,
          gmail: myJSON.email,
          phoneNo: myJSON.verified_phone_no,
          isReady: true,
          isShopkeeper: myJSON.userType === "Shopkeeper" ? true : false,
        })
    }).then(() => {
      if(this.state.isShopkeeper) {
        var shopDetail
        firebase.database().ref('shop/' + firebase.auth().currentUser.uid).once('value', data => {
          shopDetail = data.toJSON()
        })
        this.setState({ isOpen: shopDetail.isOpen })
      }
    })
  }

  componentWillUnmount = () => {
    console.log('tata')
  }

  updateData = () => {
    this.setState({ isReady: false })
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .update({
        Full_Name: this.state.fullName,
        email: this.state.gmail,
        verified_phone_no: this.state.phoneNo
      }).then(() => {
          Alert.alert('Data is Updated')
      })
      this.setState({ isReady: true })
  }

  wantToClose = async () => {
    await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({
        isOpen: 0
    })
    .then(() => {
        firebase.database().ref('shop/' + firebase.auth().currentUser.uid + '/line').remove()
        this.setState({ isOpen: 0 })
    })
    console.log('wantToClose')
  }

  wantToOpen = async () => {
    await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({
        isOpen: 1
    })
    .then(() => {
        firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({ 
            line: {}
         })
        this.setState({ isOpen: 1 })
    })
    console.log('wantToOpen')
  }

  toggleTheOpen = async () => {
    if(this.state.isOpen === 1) {
      await this.wantToClose() 
    } else {
      await this.wantToOpen()
    }
  }

  render() {

    if(!this.state.isReady) {
      return <ActivityIndicator size='large' />
    }

    return (
      <View style={styles.body}>

        { this.state.isShopkeeper && <Button  
          title = { this.state.isOpen ? "Close the Shop" : "Open the Shop" }
          onPress = {this.toggleTheOpen}
          style = {{ margin: 15 }}
        /> }  

        <Text> </Text>
        <Button
          title='Log Out'
          icon={
        <Icon
          name="sign-out"
          size={15}
          color="white"
          style={{paddingRight:20}}
        />
          }
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log('Logged Out')
              })
          }}
        />

        { !this.state.isWantToUpdate ?
        <View>
          {/* <Text style={styles.myLabel}>Full Name </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.fullName}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ fullName: val })}
              placeholder={'Full name'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />
            <Text style={styles.myLabel}>Gmail </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.gmail}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ gmail: val })}
              placeholder={'Email ID'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />
            <Text style={styles.myLabel}>Verified Phone Number </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.phoneNo}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ phoneNo: val })}
              placeholder={'Password'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />  */}
        </View> 
          :
        <View >
          <TextInput style={styles.myInput} 
            value = {this.state.fullName}
            editable = {this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ fullName: val })}
            placeholder={'Full name'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
          />
          <TextInput style={styles.myInput} 
            value = {this.state.gmail}
            editable = {this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ gmail: val })}
            placeholder={'Email ID'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
          />
          <Text style={styles.myAfterLabel}>Verified Phone Number </Text>
          <TextInput style={styles.myInput} 
            value = {this.state.phoneNo}
            editable = {!this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ phoneNo: val })}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
          />
        </View>
      }

        { !this.state.isWantToUpdate ?  
          <TouchableOpacity style={styles.myBtn} onPress={() => {this.setState({ isWantToUpdate: true })}}>
            <Text style={styles.myBtnText}>Update Info</Text>
          </TouchableOpacity> : 
          <View>
          <TouchableOpacity style={styles.myBtn} onPress={() => {
              this.updateData()
              this.setState({ isWantToUpdate: false })
            }}>
            <Text style={styles.myBtnText}>Update it </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myBtn} onPress={()=>this.setState({isWantToUpdate:false})}>
            <Text style={styles.myBtnText}>Cancel</Text>
          </TouchableOpacity>
          </View>
         }

    </View>
    )
  }
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'#424242',
    padding:50,
    height:'100%'
},
  myLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    padding: 10,
    margin: 8,
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

  myAfterLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
 
  },
  myAfterInput: {
    fontSize: 21,
    color: '#888',
    padding: 13,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 15,
    color: 'blue',
  },
  myAfterBtn: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: 'darkblue'
  },
  myAfterBtnText: {
    padding: 7,
    margin: 5,
    fontSize: 18,
    alignSelf: 'center',
    color: '#555',
    fontWeight: 'bold',
    color:'white'
  },

})

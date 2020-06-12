import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert } from 'react-native'
import { globalStyles } from '../../../styles/global';
import * as firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

export default class account extends Component {

  state = {
    fullName: "",
    gmail: "",
    phoneNo: "",
    isReady: false,
    isWantToUpdate: false,
  }

  componentDidMount() {
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
        })
    })
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

  wantToLogOut = async () => {
    var inQ
    await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snap => {
      inQ = snap.toJSON().inQ
    })

    if(!inQ) {
      firebase
              .auth()
              .signOut()
              .then(() => {
                console.log('Logged Out')
              })
    } else {
      Alert.alert(
        'Warning !!!',
        'if you log out then you will removed from queue also',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: async () => { 
                  await firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                      inQ: 0,
                  })
                  var shop
                  await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value' , snap => {
                    shop = snap.toJSON().shopKey
                  })
                  await firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/shopKey').remove()
                  this.setState({ inQ: 0 })
                  await firebase.database().ref('shop/' + shop + '/line/' + firebase.auth().currentUser.uid).remove()
                  firebase.auth().signOut().then(() => { console.log('Logged Out') })}                
                },
        ],
        { cancelable: false }
      );
    }

  }

  render() {

    if(!this.state.isReady) {
      return <ActivityIndicator size='large' />
    }

    return (
      <View style={globalStyles.container}>
        <Button
          title='Log Out' 
          onPress={this.wantToLogOut}
        />

        { !this.state.isWantToUpdate ?
        <View>
          <Text style={styles.myLabel}>Full Name </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.fullName}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ fullName: val })}
            />
            <Text style={styles.myLabel}>Email </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.gmail}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ gmail: val })}
            />
            <Text style={styles.myLabel}>Verified Phone Number </Text>
            <TextInput style={styles.myInput} 
              value = {this.state.phoneNo}
              editable = {this.state.isWantToUpdate}
              onChangeText = {val => this.setState({ phoneNo: val })}
            /> 
        </View> 
          :
        <View>
          <Text style={styles.myAfterLabel}>Full Name </Text>
          <TextInput style={styles.myAfterInput} 
            value = {this.state.fullName}
            editable = {this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ fullName: val })}
          />
          <Text style={styles.myAfterLabel}>Gmail </Text>
          <TextInput style={styles.myAfterInput} 
            value = {this.state.gmail}
            editable = {this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ gmail: val })}
          />
          <Text style={styles.myLabel}>Verified Phone Number </Text>
          <TextInput style={styles.myInput} 
            value = {this.state.phoneNo}
            editable = {!this.state.isWantToUpdate}
            onChangeText = {val => this.setState({ phoneNo: val })}
          />
        </View>
      }

        { !this.state.isWantToUpdate ?  
          <TouchableOpacity style={styles.myBtn} onPress={() => {this.setState({ isWantToUpdate: true })}}>
            <Text style={styles.myBtnText}>Update Info</Text>
          </TouchableOpacity> : 
          <TouchableOpacity style={styles.myAfterBtn} onPress={() => {
              this.updateData()
              this.setState({ isWantToUpdate: false })
            }}>
            <Text style={styles.myAfterBtnText}>Update it </Text>
          </TouchableOpacity>
         }

    </View>
    )
  }
}

const styles = StyleSheet.create({
  myLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    padding: 10,
    margin: 8,
  },
  myInput: {
    fontSize: 21,
    color: '#888',
    padding: 13,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 15
  },
  myBtn: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#222',
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
    color: '#555',
    padding: 10,
    margin: 8,
    color: 'red',
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

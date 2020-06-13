import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

export default class LoadingT extends Component {

  componentDidMount() {
    var myJSON
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', function (snapshot) {
        myJSON = snapshot.toJSON()
    })
    .then(() => this.userCheck(myJSON))
  }

  userCheck = async (myJSON) => {
    if(myJSON.userType === undefined) {
      this.props.navigation.navigate('Selection')
    } else {         
      this.props.navigation.navigate((myJSON.userType === "Shopkeeper") ? 'Shopkeeper' : 'Customer')
    }
  }

    render() {
        return (
            <View style={styles.container}>
                <Text> Loading For User Type </Text> 
                <ActivityIndicator size = 'large' />
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
})

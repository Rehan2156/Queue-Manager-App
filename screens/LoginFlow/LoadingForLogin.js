import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

export default class LoadingL extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      this.props.navigation.navigate( user ? 'UserFlow' : 'LoginFlow' )
    })
  }

  render() {
      return (
          <View style={styles.container}>
            <Text> Loading For Login </Text>
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

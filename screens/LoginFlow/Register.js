import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import GoogleSignIn from '../../methods/GoogleSignInMethod'
import EmailSignIn from '../../methods/EmailSignInMethod'

var GoogleSi
var EmailSi

export default class Register extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

  constructor(props) {
    super(props)
    GoogleSi = new GoogleSignIn();
    EmailSi = new EmailSignIn();
  }

    render() {
        return (
            <View style={styles.container}>

            <Text style={styles.myLabel}> Full Name </Text>
            <TextInput 
                style={styles.myInput}
                onChangeText={val => this.setState({ name: val })}
                value = {this.state.name}
            />

            <Text style={styles.myLabel}> Email </Text>
            <TextInput 
                style={styles.myInput} 
                autoCapitalize='none'
                onChangeText={val => this.setState({ email: val })}
                value = {this.state.email}
            />

            <Text style={styles.myLabel} > Password </Text>
            <TextInput 
                style={styles.myInput} 
                secureTextEntry 
                autoCapitalize='none'
                onChangeText={val => this.setState({ password: val })}
                value = {this.state.password}
            />

            <TouchableOpacity style={styles.myBtn} 
                onPress = {() => { 
                  EmailSi.handSignUp(this.state.name, this.state.email, this.state.password)
                }}
            >
              <Text style={styles.btnText}> Sign Up </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.myBtn} 
              onPress = {async () =>   {
                await GoogleSi.signInOnPress()
              }}
            >
              <Text style={styles.btnText} > Sign Up With Google </Text>
            </TouchableOpacity>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80,
    },
  
    myLabel: {
      fontSize:19,
      color: '#888',
      padding: 3,
      margin: 5,
    },
    myBtn: {
      padding: 15,
      margin: 10,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'coral',
      borderBottomWidth: 1,
      borderBottomColor: 'blue',
    },
    myInput: {
      fontSize: 15,
      padding: 9,
      margin: 7,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#999',
      marginBottom: 10,
    },
    btnText: {
      fontSize: 20,
      color: 'white',
    },  
  })
  
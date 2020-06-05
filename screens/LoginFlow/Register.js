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
        password: "",
        loading:false
    }

  constructor(props) {
    super(props)
    GoogleSi = new GoogleSignIn();
    EmailSi = new EmailSignIn();
  }

  handSignUp = async (name, email, password) => {
    console.log('pressed email sign in')
    this.setState({loading:true})
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("In Sign Up")
            this.setState({loading:false})
            firebase
            .database()
            .ref('/users/' + userCredential.user.uid)
            .set({
                gmail: email,
                profile_picture: "",
                Full_name: name,
                created_at: Date.now()
            })
            .then(function(snapshot) {                
                Alert.alert('Information','User is Successfully Signed Up')
            });
        })
        .catch(error => {console.log(error); this.setState({loading:false})})
}

    render() {
      if(!this.state.loading){
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
                onPress = {() => {this.setState({loading:true}),EmailSi.handSignUp(this.state.name, this.state.email, this.state.password)}}
            >
              <Text style={styles.btnText}> Sign Up </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.myBtn} 
              onPress = {() =>   GoogleSi.signInOnPress()}
            >
              <Text style={styles.btnText} > Sign Up With Google </Text>
            </TouchableOpacity>

        </View>
        )
      }else{
        return(
          <View style={styles.loading}>
                <ActivityIndicator 
                    size='large'
                />
            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    splash:{
      flex:1,
      fontSize:50,
      justifyContent:'center',
      alignItems:'center'
  },
  splashText: {
      color: 'darkslateblue',
      fontWeight: 'bold',
      fontSize: 30,
  },
  })
  
import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import GoogleSignIn from '../../methods/GoogleSignInMethod'
import EmailSignIn from '../../methods/EmailSignInMethod'

var GoogleSi
var EmailSi

export default class Login extends Component {

  state = {
    email: "",
    password: "",
    loading:false,
    error:""
  }

  constructor(props) {
    super(props)
    GoogleSi = new GoogleSignIn();
    EmailSi = new EmailSignIn();
  }


  

handSignIn = async (email, password) => {
  this.setState({loading:true,error:""})
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          this.setState({loading:false})
            firebase
                .database()
                .ref('/users/' + userCredential.user.uid)
                .update({
                    last_logged_in: Date.now()
                }).then(() => {
                    Alert.alert('Information','User is Successfully Signed In')
                })
        })
        .catch(error => {console.log(error),this.setState({error:error}), this.setState({loading:false})})
 }

    render() {
      if(!this.state.loading){
        return (
            <View style={styles.container}>
                <Text>{this.state.error}</Text>
                <Text style={styles.myLabel}> Email </Text>
                <TextInput style={styles.myInput} 
                   autoCapitalize='none'
                   onChangeText={val => this.setState({ email: val })}
                   value = {this.state.email}
                />

                <Text style={styles.myLabel} > Password </Text>
                <TextInput style={styles.myInput}
                  secureTextEntry 
                  autoCapitalize='none'
                  onChangeText={val => this.setState({ password: val })}
                  value = {this.state.password} 
                />

                <TouchableOpacity style={styles.myBtn} 
                onPress = {() => {this.setState({loading:true}),EmailSi.handSignIn(this.state.email, this.state.password)}}
                >
                  <Text style={styles.btnText}> Sign In </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.myBtn} 
                  onPress = {() =>   GoogleSi.signInOnPress()}
                >
                  <Text style={styles.btnText} > Sign In With Google </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.navBtn}> 
                  <Text style={styles.navText}> Want to start fresh '<Text style={styles.textBlue}> Sign Up </Text>' </Text>
                </TouchableOpacity>

            </View>
        )
      }else{
        return(
          <View style={styles.loading}>
            <Text> Loading Please Wait ... </Text>
              <ActivityIndicator size = 'large' />
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

  navBtn: {
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  navText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  textBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
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

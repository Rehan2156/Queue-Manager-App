import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,ImageBackground,ActivityIndicator } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import GoogleSignIn from '../../methods/GoogleSignInMethod'
import EmailSignIn from '../../methods/EmailSignInMethod'
import Icon from 'react-native-vector-icons/Ionicons'


var GoogleSi
var EmailSi

const {width:WIDTH}=Dimensions.get('window')

const getFonts = () => Font.loadAsync({
  'Righteous': require('../../assets/fonts/Righteous-Regular.ttf'),
  'Acme': require('../../assets/fonts/Acme-Regular.ttf'),
  'nunito-regular': require('../../assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('../../assets/fonts/Nunito-Bold.ttf'),
  'Metal-Mania': require('../../assets/fonts/MetalMania-Regular.ttf'),

});

export default class Register extends Component {


  constructor(props) {
    super(props)
    GoogleSi = new GoogleSignIn();
    EmailSi = new EmailSignIn();

    this.state = {
      name: "",
      email: "",
      password: "",
      loading:false,
      showPass:true

  }
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
          <ImageBackground style={styles.backgroundContainer} source={{uri:'https://wallpaperaccess.com/full/654232.png'}}>
          <Text style={styles.head}>Sign Up to QueT</Text>
                <Text>{this.state.error}</Text>

            <View style={styles.inputContainer}>
                <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
            <TextInput 
                style={styles.myInput}
                onChangeText={val => this.setState({ name: val })}
                value = {this.state.name}
                placeholder={'Full name'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'ios-at'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
            <TextInput 
                style={styles.myInput} 
                autoCapitalize='none'
                onChangeText={val => this.setState({ email: val })}
                value = {this.state.email}
                placeholder={'Email'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
            <TextInput 
                style={styles.myInput} 
                secureTextEntry={this.state.showPass}  
                autoCapitalize='none'
                onChangeText={val => this.setState({ password: val })}
                value = {this.state.password}
                placeholder={'Password'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
            />
            <Icon name={this.state.showPass?'ios-eye-off':'ios-eye'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.btnEye} onPress={()=>this.setState({showPass:!this.state.showPass})}/>

            </View>

            <TouchableOpacity style={styles.myBtn} 
                onPress = {() => {this.setState({loading:true}),EmailSi.handSignUp(this.state.name, this.state.email, this.state.password)}}
            >
              <Text style={styles.btnText}> Sign Up </Text>
            </TouchableOpacity>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity 
              style={styles.myGBtn} 
              onPress = {async () =>   {
                this.setState({loading:true})
                await GoogleSi.signInOnPress()
                this.setState({loading:false})
              }}
            >
              <Icon name={'logo-google'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.gIcon}/>
              <Text style={styles.btnText} > Sign Up With Google </Text>
            </TouchableOpacity>

        </ImageBackground>
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
  head:{
    fontFamily:'Acme',
    fontSize:45,
    marginBottom:30,
    color: '#FAF9F6',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer:{
    flex:1,
    width:null,
    height:null,
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fd2',
    paddingTop: 80,
  },
  inputContainer:{
    marginTop:20,
    
  },
  myLabel: {
    fontSize:19,
    color: '#888',
    padding: 3,
    margin: 5,
  },
  myBtn: {
    width:WIDTH - 55,
    height:45,
    borderRadius:25,
    backgroundColor:'#9D3B7E',
    justifyContent:'center',
    marginTop:20,
    marginHorizontal:25,
  },
  or:{
    fontSize: 16,
    color: '#FAF9F6',
    paddingTop:20,
    fontFamily:'nunito-bold'

  },
  myGBtn:{
    width:WIDTH - 55,
    height:45,
    borderRadius:25,
    backgroundColor:'#dd4b39',
    justifyContent:'center',
    marginTop:20,
    marginHorizontal:25
  },
  myInput: {
    width: WIDTH - 55,
    height:55,
    borderRadius:45,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal:25,
    fontFamily:'nunito-bold'

  },
  btnText: {
    fontSize: 20,
    textAlign:'center',
    color: '#FAF9F6',
    // fontWeight:'bold',
    fontFamily:'nunito-bold'

  },  

  navBtn: {
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  navText: {
    fontSize: 20,
    fontFamily:'nunito-bold',
    color: '#FAF9F6',
  },
  textBlue: {
    color: '#F0D219',
    fontSize: 15,
  },
  inputIcon:{
    position:'absolute',
    top:13,
    left:37
  },
  gIcon:{
    position:'absolute',
    top:8,
    left:40,
    color:'#FAF9F6'
  },
  btnEye:{
    position:'absolute',
    top:13,
    right:37
  }
  })
  
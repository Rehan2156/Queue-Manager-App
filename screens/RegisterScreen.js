import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import * as firebase from 'firebase'

export default class RegisterScreen extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        erromsg: null,
        loggedIn: null,
        loading:false
    }

    handSignUp = () => {
        this.setState({loading: true})
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredential => {
                this.setState({loggedIn: 'You are know a member', loading: false })
                return userCredential.user.updateProfile({
                    displayName: this.state.names
                })
            })
            .catch(error => this.setState({ erromsg: error.message, loading:false }))

            console.log('Pressed Register')
    }

    render() {
        if(!this.state.loading){
        return (
            <View style={styles.conatiner}>

            { this.state.erromsg && <Text style={styles.errormsg}>{ this.state.erromsg }</Text>}
            { this.state.loggedIn && <Text style={styles.yeyymsg}>{ this.state.loggedIn }</Text>}

                <View style={styles.from}>
                <Text style={styles.inputText}>Full Name</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={val => this.setState({ name: val })}
                        value = {this.state.name}
                    ></TextInput>

                    <Text style={styles.inputText}>Email Address</Text>
                    <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText={val => this.setState({ email: val })}
                        value = {this.state.email}
                    ></TextInput>

                    <Text style={styles.inputText}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize='none'
                        onChangeText={val => this.setState({ password: val })}
                        value = {this.state.password}
                    ></TextInput>
                </View>

                <TouchableOpacity 
                    style={styles.Btn}
                    onPress={this.handSignUp}
                >
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>

            </View>
        )}else{
            return(
                <View style={styles.splash}>
                <Text style={styles.splashText}>Loading...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },

    errormsg: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        color: 'red',
    },

    yeyymsg: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        color: 'green',
    },

    Btn: {
        marginTop: 50,
        marginHorizontal: 10,
        padding: 15,
        backgroundColor: 'orange',
        alignItems: 'center',        
    },

    myBtn: {
        marginTop: 20,
        marginHorizontal: 10,
        padding: 15,
        alignItems: 'center',
    },
    signuptext: {
        fontSize: 15,
    },

    maintext: {
        color: 'blue',
        fontWeight: 'bold',
    },

    text: {
        color: 'darkslateblue',
        fontWeight: 'bold',
        fontSize: 18,
    },

    from: {
        marginTop: 48,
        marginHorizontal: 30,
    },
    inputText: {
        marginTop: 5,
        color: '#8a8f9e',
        fontSize: 15,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8a8f9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 65,
        fontSize: 15,
        color: '#161f3d'
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

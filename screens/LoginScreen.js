import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import firebase from 'firebase'

export default class LoginScreen extends Component {

    state = {
        email: "",
        password: "",
        erromsg: null,
        loggedIn: null
    }

    handlingLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.setState({loggedIn: 'You are now logged in'}))
            .catch(error => this.setState({ erromsg: error.message }))
     }

    render() {
        return (
            <View style={styles.conatiner}>

            { this.state.erromsg && <Text style={styles.errormsg}>{ this.state.erromsg }</Text>}
            { this.state.loggedIn && <Text style={styles.yeyymsg}>{ this.state.loggedIn }</Text>}

                <View style={styles.from}>
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
                    onPress={this.handlingLogin}
                >
                    <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.myBtn} 
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={styles.signuptext}> Want to Start Fresh '<Text style={styles.maintext}> Sign Up </Text>' </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },

    errormsg: {
        height: 72,
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
})

import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import { globalStyles } from '../../styles/global'

export default class Selction extends Component {

    componentDidMount() {
        var myJSON
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', function (snapshot) {
            myJSON = snapshot.toJSON()
        })
        .then(() => this.phoneNumberCheck(myJSON))
    }

    phoneNumberCheck = async (myJSON) => {
        if( myJSON.verified_phone_no === undefined ) {
            console.log('Yo!!!')
            this.props.navigation.navigate('PhoneVeri')
        } else {         
            console.log('Verified Number is There')
        }
    }

    sendDataToDatabase = async ( type ) => {
        await firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .update({
                userType: type
            }).then(() => {
                Alert.alert('Inforemation','Data Is Updated')
                this.props.navigation.navigate((type === "Shopkeeper") ? 'Shopkeeper' : 'Customer')
            })
            .catch(e => {
                console.log('Error', e)
            })
    }

    render() {
        return (
            <View style={globalStyles.body}>
            <View style={styles.box}>
                <Text style={styles.label}> Who are you ? </Text>

                <TouchableOpacity 
                    style={styles.myBtn}
                    onPress = {() =>  this.sendDataToDatabase("Customer") }
                >
                    <Text style={styles.btnText}> Customer </Text> 
                </TouchableOpacity>
                <Text style={styles.label}>OR</Text>
                <TouchableOpacity 
                    style={styles.myBtn}
                    onPress = {() =>  this.sendDataToDatabase("Shopkeeper") }
                >
                    <Text style={styles.btnText}> ShopKeeper </Text> 
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'center',
      paddingBottom: 80,
    },

    label: {
        fontSize: 30,
        fontFamily:'nunito-bold',
        padding: 10,
        margin: 10,
        color:'#fff',
        textAlign:'center'
    },
    myBtn: {
        borderColor: '#999',
        borderWidth: 1,
        padding: 20,
        margin: 15,
        borderRadius: 15,
        backgroundColor:'#Fedbd0'
    },
    btnText: {
        fontSize: 25,
        fontFamily:'nunito-bold',
        textAlign:'center'
    },
    box:{
        padding:20,
        alignContent:'center',
        justifyContent:'center',
        textAlign:'center',
        marginTop:80,
        backgroundColor:'#424242',
        alignSelf:'center',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderBottomEndRadius:15,
        // borderTopLeftRadius:15,
        elevation: 10,    
    }

})

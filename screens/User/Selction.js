import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'

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
            <View style={styles.container}>
                <Text style={styles.label}> You Can't Change After so click correctly </Text>

                <TouchableOpacity 
                    style={styles.myBtn}
                    onPress = {() =>  this.sendDataToDatabase("Customer") }
                >
                    <Text style={styles.btnText}> Customer </Text> 
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.myBtn}
                    onPress = {() =>  this.sendDataToDatabase("Shopkeeper") }
                >
                    <Text style={styles.btnText}> ShopKeeper </Text> 
                </TouchableOpacity>

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
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        margin: 10,
    },
    myBtn: {
        borderColor: '#999',
        borderWidth: 1,
        padding: 20,
        margin: 15,
        borderRadius: 15,
    },
    btnText: {
        fontSize: 25,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

})

import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

export default class ShopeKeeperLoading extends Component {

    componentDidMount() {
        var myJSON
        firebase.database().ref('shop/' + firebase.auth().currentUser.uid).once('value', function (snapshot) {
            myJSON = snapshot.toJSON()
        })
        .then(() => {
            console.log(myJSON)
            this.props.navigation.navigate((myJSON === null) ? 'Details' : 'Shop')
        })
        .catch( e => {
            console.log('Error', e)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Shop Loading </Text>
                <ActivityIndicator size = 'large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
 
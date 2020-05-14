import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import '../config'
import * as firebase from 'firebase'

export default class LoadingScreen extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            console.log(user)
            this.props.navigation.navigate( user ? 'Root' : 'Login' )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator 
                    size='large'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

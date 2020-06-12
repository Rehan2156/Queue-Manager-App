import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert } from 'react-native'
import * as firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler'

export default class Shopkeeper extends Component {
    
    state = {
        isOpen: 0,
        body: "",
    }

    async componentDidMount() {
        await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).once('value' , snapshot => {
            this.setState({
                isOpen: snapshot.toJSON().isOpen, 
            })
        })

        console.log(this.state.isOpen)
    }

    wantToClose = async () => {
        await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({
            isOpen: 0
        })
        .then(() => {
            firebase.database().ref('shop/' + firebase.auth().currentUser.uid + '/line').remove()
            this.setState({ isOpen: 0 })
        })
        console.log('wantToClose')
    }

    wantToOpen = async () => {
        await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({
            isOpen: 1
        })
        .then(() => {
            firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({ 
                line: {}
             })
            this.setState({ isOpen: 1 })
        })
        console.log('wantToOpen')
    }

    bodyUpdate = async () => {
        if(this.state.body !== null && this.state.body !== "" && this.state.body !== undefined) {
            await firebase.database().ref('shop/' + firebase.auth().currentUser.uid).update({
                body: this.state.body
             }).then(() => {
                 Alert.alert('done')
             })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Shopkeeper </Text>
                <Button
                    title = "Log Out"
                    onPress = {() => firebase.auth().signOut()} 
                />
                <Text>  </Text>
                {
                    this.state.isOpen ?  
                    <Button
                        title = "Close the Store " 
                        onPress = { this.wantToClose }
                    /> : 
                    <Button
                        title = "Open the Store " 
                        onPress = { this.wantToOpen }
                    />  
                }

                <Text> Body </Text>
                <TextInput
                    style={styles.input}
                    placeholder = "Write about your shop"
                    value = {this.state.body}
                    onChangeText = { val => this.setState({ body: val })}
                />
                <Button 
                    title = "update Body"
                    onPress = {this.bodyUpdate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
        width: '95%',
        padding: 10,
        margin: 10,
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
    }
})

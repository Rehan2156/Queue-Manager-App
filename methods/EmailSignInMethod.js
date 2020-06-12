import React, { Component } from 'react'
import { Alert } from 'react-native';
import * as firebase from 'firebase'

export default class EmailSignInMethod {

    handSignUp = async(name, email, password) => {
        console.log('pressed email sign in')
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log("In Sign Up")
                firebase
                    .database()
                    .ref('users/' + userCredential.user.uid)
                    .set({
                        email: email,
                        Full_Name: name,
                        created_at: Date.now()
                    })
                    .then(function(snapshot) {
                        Alert.alert('Information', 'User is Successfully Signed Up')
                    });
            })
            .catch(error => console.log(error))
    }

    handSignIn = async(email, password) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                firebase
                    .database()
                    .ref('users/' + userCredential.user.uid)
                    .update({
                        last_logged_in: Date.now()
                    }).then(() => {
                        Alert.alert('Information', 'User is Successfully Signed In')
                    })
            })
            .catch(error => console.log(error))
    }
}
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'
import firebaseConfig from '../config'
import { Alert } from 'react-native';

  export default class GoogleSignIn {

    isUserEqual = (googleUser, firebaseUser) => {
        console.log("In Class is User Equal")
        if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (
            providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
            return true;
            }
        }
        }
        return false;
    }

    onSignIn =  googleUser => {
        console.log("In Class is on Sign In")
        console.log('Google Auth Response', googleUser);
        var unsubscribe = firebase.auth().onAuthStateChanged(
        function(firebaseUser) {
            unsubscribe();
            if (!this.isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(function(result) {
                console.log('user signed in ');
                if (result.additionalUserInfo.isNewUser) {
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        Full_Name: result.additionalUserInfo.profile.given_name + " " + result.additionalUserInfo.profile.family_name,
                        created_at: Date.now()
                    })
                    .then(function(snapshot) {                
                        Alert.alert('Information','User is Successfully Signed Up')
                    });
                } else {
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .update({
                        last_logged_in: Date.now()
                    }).then(() => {
                        Alert.alert('Information','User is Successfully Signed In')
                    })
                }
                })
                .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                });
            } else {
                console.log('User already signed-in Firebase.');      
            }
        }.bind(this)
        );
    }
    
    signInOnPress = async () => {
        console.log("In Class is Sign in on Press")
        const result = await Google.logInAsync(firebaseConfig);
        if (result.type === 'success') {
            this.onSignIn(result);
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${result.accessToken}` },
            });
            console.log(result.user)
        }
    }
}
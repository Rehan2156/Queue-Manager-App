import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/MainNav';
import * as firebase from 'firebase';
// import firebaseConfig from './config';

const firebaseConfig = {
  apiKey: "AIzaSyAPH6oiGujFFxMBgcOloqfaCQ6HUZaHyNE",
  authDomain: "lockscreen-963a0.firebaseapp.com",
  databaseURL: "https://lockscreen-963a0.firebaseio.com",
  projectId: "lockscreen-963a0",
  storageBucket: "lockscreen-963a0.appspot.com",
  messagingSenderId: "146232198529",
  appId: "1:146232198529:web:c654528010e2b10687d480",
  measurementId: "G-9NYMM82FZE"
};


firebase.initializeApp(firebaseConfig)

console.log(firebase)

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }

}
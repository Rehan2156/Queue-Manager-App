import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MainRoute from './routes/MainRoute';
import * as firebase from 'firebase';
import firebaseConfig from './config';


firebase.initializeApp(firebaseConfig)

const getFonts = () => Font.loadAsync({
  'Righteous': require('./assets/fonts/Righteous-Regular.ttf'),
  'Acme': require('./assets/fonts/Acme-Regular.ttf'),
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'Metal-Mania': require('./assets/fonts/MetalMania-Regular.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <MainRoute />
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

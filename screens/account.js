import React from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import * as firebase from 'firebase'

export default function Account() {
  return (
    <View style={globalStyles.container}>
      <Text>Account</Text>

      <Button
        title='Log Out' 
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log('Logged Out')
            })
        }}
      />
    </View>
  );
}
import React,{useState} from 'react';
import { View, Text, Button,ActivityIndicator,Alert } from 'react-native';
import { globalStyles } from '../../../styles/global';
import * as firebase from 'firebase'

export default function Account() {
  
  const [loading, setLoading] = useState(false)
  if(!loading){
  return (
    <View style={globalStyles.container}>
      <Text>Account</Text>
      <Button
        title='Log Out' 
        onPress={() => {
          setLoading(true)
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log('Logged Out');
              Alert.alert("Logged Out");
              setLoading(false)
            })
        }}
      />
    </View>
  );
      }else{
        return(
          <View style={globalStyles.loading}>
            <Text> Loading Please Wait ... </Text>
              <ActivityIndicator size = 'large' />
          </View>
        )
      }
}
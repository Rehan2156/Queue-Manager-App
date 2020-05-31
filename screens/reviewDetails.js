import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity,Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';


export default function ReviewDetails({ navigation }) {

  const clickHandler = () => {
    //function to handle click on floating Action Button
    Alert.alert('You are added to the queue. Your position is x.');
  };

  

  return (
    <View style={globalStyles.container}>
    <Text>Current Queue size : 'from firebase'</Text>
      <Card>
        <Text style={globalStyles.titleText}>
          { navigation.getParam('shopName') }
        </Text>
        <Text>{ navigation.getParam('body') }</Text>
        <Text>{ navigation.getParam('waiting') } minutes waiting</Text>
      </Card>
      <Text>Add to queue</Text>

      <TouchableOpacity style={styles.icon}>
    <MaterialIcons onPress={clickHandler} name='add' size={28}  style={styles.drawer} />
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },

  icon:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10,
    height:70,
    backgroundColor:'#58D68D',
    borderRadius:100,
  }
  
})
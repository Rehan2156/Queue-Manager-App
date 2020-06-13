import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';


export default function About() {

  const cust=[
    {content:'Search the shop you want to visit',key:1},
    {content:'Join the queue',key:2},
    {content:'Get your token number',key:3},
    {content:'Leave your home only when you are prompted that your turn will arrive shortly',key:4},
    {content:'No need to wait in long queues for hours in the sun',key:5},
    {content:'Thus without much contact with anyone you can purchase your items from the shop',key:6}
  ]

  const shop=[
    {content:'Open the shop window from the app',key:1},
    {content:'Customers will join the queue',key:2},
    {content:'Call next person in individually or in a group according to token numbers',key:3},
    {content:'No long waiting lines gathered outside your shop',key:4},
    {content:'Users only within an 8 km radius can join',key:5},
    {content:'Thus preventing spam people from joining the queue',key:6}
  ]

  return (
    <View style={globalStyles.body}>
    <ScrollView>
      <Card><Text style={styles.text}>QueT makes it possible to follow social distancing when you are standing in a shop queue.</Text></Card>
      <Card>
      <Text style={styles.label}>Customer :</Text>
      <FlatList data={cust} renderItem={({ item }) => (
        <View>
        
        <Text style={styles.text}><FontAwesome name="circle" style={styles.icon}/>  {item.content}</Text>
        </View>
      )}/>
      </Card>
      <Card>
      <Text style={styles.label}>ShopKeeper :</Text>
      <FlatList data={shop} renderItem={({ item }) => (
        <Text style={styles.text}><FontAwesome name="circle" style={styles.icon}/>  {item.content}</Text>
      )}/>
      </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    fontFamily:'nunito-bold',
    fontSize:20,
    // textAlign:'center'
    paddingTop:10,
    paddingBottom:10
  },
  label:{
    fontFamily:'Righteous',
    fontSize:25
  },
  icon:{
    marginRight:10
  }
})
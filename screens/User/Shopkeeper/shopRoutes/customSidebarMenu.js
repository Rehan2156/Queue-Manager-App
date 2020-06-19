//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'


export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://www.tensator.com/wp-content/uploads/ab8c99f7f70de8e3504651010adb7fb9.jpg';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'person-outline',
        navOptionName: 'Account',
        screenToNavigate: 'Account',
      },
      {
        navOptionThumb: 'error-outline',
        navOptionName: 'About QueT',
        screenToNavigate: 'About',
      },
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.qtext}>QueT</Text>
        <Text style={{fontFamily:'nunito-bold', fontSize:20,color:'#fff'}}>Hello, {firebase.auth().currentUser.displayName}</Text>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        <View style={{ width: '100%'}}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                // backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} style={{color:global.currentScreenIndex === key ?"#fff":"#fff"}}
                 color="#808080" 

                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? '#f9aa33' : '#fff',
                  fontFamily:'nunito-bold'
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#424242',
    alignItems: 'center',
    paddingTop: 20,
    fontFamily:'nunito-bold'
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 300,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
    opacity:0.8
  },
  qtext:{
      position:"absolute",
      marginTop:100,
      fontFamily:'Acme',
      fontSize:45,
      color: '#C2F2B0',
  }
});
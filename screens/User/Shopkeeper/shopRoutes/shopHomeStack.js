import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../../../../shared/header.js';
import Account from '../../../../screens/User/Customer/account';
import Shopkeeper from '../Shopkeeper';

const screens = {
  
  Home: {
    screen: Shopkeeper,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='QueT' navigation={navigation} />
      }
    },
  },
//   ReviewDetails: {
//     screen: UserQ,
//     navigationOptions: {
//       title: 'Shop Details',
//     }
//   },
  Account: {
    screen: Account,
    navigationOptions: {
      title: 'Account Details',
    }
  },
};

// home stack navigator screens
const shopHomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    // headerTintColor: '#444'
    headerStyle: { backgroundColor: '#Fedbd0', height: 80 }
  }
});

export default shopHomeStack;
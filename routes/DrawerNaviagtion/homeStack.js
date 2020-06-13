import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../../shared/header';
import Home from '../../screens/User/Customer/home';
import Account from '../../screens/User/Customer/account';
import UserQ from '../../screens/User/Customer/userQ';

const screens = {
  
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='QueT' navigation={navigation}/>
      }
    },
  },
  ReviewDetails: {
    screen: UserQ,
    navigationOptions: {
      title: 'Shop Details',

    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      title: 'Account Details',
    }
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    // headerTintColor: '#444'
    headerStyle: { backgroundColor: '#Fedbd0', height: 80 }
  }
});

export default HomeStack;
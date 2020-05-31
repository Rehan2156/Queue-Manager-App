import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import Account from '../screens/account';
import UserQ from '../screens/userQ';


const screens = {

  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='QueT' navigation={navigation} />
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
    headerTintColor: '#444',
    headerStyle: { backgroundColor: 'coral', height: 80,borderBottomLeftRadius:20,borderBottomRightRadius:20 }
  }
});

export default HomeStack;
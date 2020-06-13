import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../../shared/header';
import About from '../../screens/User/Customer/about';

const screens = {
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='About QueT' navigation={navigation} />
      }
    },
  },
}

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    // headerTintColor: '#444'
    headerStyle: { backgroundColor: '#Fedbd0', height: 80 }
  }
});

export default AboutStack;
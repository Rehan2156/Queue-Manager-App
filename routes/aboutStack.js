import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import About from '../screens/about';

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
    headerTintColor: '#444',
    headerStyle: { backgroundColor: 'coral', height: 80,borderBottomLeftRadius:20,borderBottomRightRadius:20 }
  }
});

export default AboutStack;
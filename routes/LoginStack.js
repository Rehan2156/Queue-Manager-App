import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import Header from '../shared/header';

const screens = {

  Login: {
    screen: LoginScreen,
    },

  Register: {
    screen: RegisterScreen,
  },
}

const LoginStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: 'coral', height: 80,borderBottomLeftRadius:20,borderBottomRightRadius:20 }
  }
})

export default LoginStack
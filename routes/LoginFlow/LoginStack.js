import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../screens/LoginFlow/Login';
import Register from '../../screens/LoginFlow/Register';

const LoginNav = createStackNavigator({
        Login: {
            screen: Login,
        },

        Register: {
            screen: Register,
        },
    },
    {
        defaultNavigationOptions: {
          headerTintColor: '#444',
          headerStyle: { backgroundColor: 'coral', height: 80,borderBottomLeftRadius:20,borderBottomRightRadius:20 }
        }
      }
)

export default LoginNav
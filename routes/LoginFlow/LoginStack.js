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
})

export default LoginNav
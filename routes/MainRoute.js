import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingL from '../screens/LoginFlow/LoadingForLogin'
import UserRoute from './LoginFlow/UserRoute';
import LoginNav from './LoginFlow/LoginStack';

const MainRoute = createSwitchNavigator({
    LoadingL: LoadingL,
    LoginFlow: LoginNav,
    UserFlow: UserRoute
})

export default createAppContainer(MainRoute)
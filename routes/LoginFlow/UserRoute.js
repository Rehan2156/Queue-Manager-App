import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingT from '../../screens/User/LoadingForType'
import Selcation from '../../screens/User/Selction'
import ShopRoute from './ShopeKeeperRoute';
import RootDrawerNavigator from '../DrawerNaviagtion/drawer'

const UserRoute = createSwitchNavigator({
    LoadingT: LoadingT,
    Selection: Selcation,
    Customer: RootDrawerNavigator,
    Shopkeeper: ShopRoute,
})

export default UserRoute
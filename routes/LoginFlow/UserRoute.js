import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingT from '../../screens/User/LoadingForType'
import User from '../../screens/User/Customer/User';
import Selcation from '../../screens/User/Selction'
import ShopRoute from './ShopeKeeperRoute';

const UserRoute = createSwitchNavigator({
    LoadingT: LoadingT,
    Selection: Selcation,
    Customer: User,
    Shopkeeper: ShopRoute,
})

export default UserRoute
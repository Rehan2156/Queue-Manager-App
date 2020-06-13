import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingT from '../../screens/User/LoadingForType'
import Selcation from '../../screens/User/Selction'
import ShopRoute from './ShopeKeeperRoute';
import RootDrawerNavigator from '../DrawerNaviagtion/drawer'
import PhoneNumVeriScreen from '../../screens/PhoneNumVeriScreen';

const UserRoute = createSwitchNavigator({
    LoadingT: LoadingT,
    PhoneVeri: PhoneNumVeriScreen,
    Selection: Selcation,
    Customer: RootDrawerNavigator,
    Shopkeeper: ShopRoute,
},
{
    defaultNavigationOptions: {
        // headerTintColor: '#444'
        headerStyle: { backgroundColor: '#Fedbd0', height: 80 }
      }
}
)

export default UserRoute
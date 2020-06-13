import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Shopkeeper from '../../screens/User/Shopkeeper/Shopkeeper'
import ShopeKeeperLoading from '../../screens/User/Shopkeeper/ShopeKeeperLoading';
import ShopeDetailes from '../../screens/User/Shopkeeper/ShopeDetailes';
import ShopLocationScreen from '../../screens/User/Shopkeeper/ShopLocationScreen';
import shopRootDrawerNavigator from '../../screens/User/Shopkeeper/shopRoutes/drawer';

const ShopRoute = createSwitchNavigator({
        Loading: ShopeKeeperLoading,
        Details: ShopeDetailes,
        ShopLocation: ShopLocationScreen,
        Shop: shopRootDrawerNavigator
    },
    {
        defaultNavigationOptions: {
            // headerTintColor: '#444'
            headerStyle: { backgroundColor: '#Fedbd0', height: 80 }
          }
    }
)

export default ShopRoute
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Shopkeeper from '../../screens/User/Shopkeeper/Shopkeeper'
import ShopeKeeperLoading from '../../screens/User/Shopkeeper/ShopeKeeperLoading';
import ShopeDetailes from '../../screens/User/Shopkeeper/ShopeDetailes';

const ShopRoute = createSwitchNavigator({
        Loading: ShopeKeeperLoading,
        Details: ShopeDetailes,
        Shop: Shopkeeper
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#444',
            headerStyle: { backgroundColor: 'coral', height: 80,borderBottomLeftRadius:20,borderBottomRightRadius:20 }
        }
    }
)

export default ShopRoute
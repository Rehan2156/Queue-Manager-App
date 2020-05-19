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
})

export default ShopRoute
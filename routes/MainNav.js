import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// stacks
import RootDrawerNavigator from './DrawerNaviagtion/drawer';
import LoadingScreen from '../screens/LoginFlow/LoadingForLogin';
import LoginStack from './LoginFlow/LoginStack';

// drawer navigation options
const MainNav = createSwitchNavigator({

        Loading: {
            screen: LoadingScreen,
        },

        Login: {
            screen: LoginStack,
        },

        Root: {
            screen:RootDrawerNavigator,
        },

    },
    {
        initialRouteName: 'Loading',
    }
);

export default createAppContainer(MainNav)
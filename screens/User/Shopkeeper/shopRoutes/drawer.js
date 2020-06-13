import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import {Dimensions} from 'react-native'

// stacks
import AboutStack from '../../../../routes/DrawerNaviagtion/aboutStack.js';
import shopHomeStack from './shopHomeStack.js';
import CustomSidebarMenu from './customSidebarMenu.js';

// drawer navigation options
const shopRootDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: shopHomeStack,
  },
  Account:{
    screen:shopHomeStack,
  },
  About: {
    screen: AboutStack,
  },
},
{
  contentComponent: CustomSidebarMenu,
  drawerWidth: Dimensions.get('window').width - 130,
}
);

export default shopRootDrawerNavigator
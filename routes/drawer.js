import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './homeStack';
import AboutStack from './aboutStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: HomeStack,
  },
  Account:{
    screen:HomeStack,
  },
  About: {
    screen: AboutStack,
  },
});

export default RootDrawerNavigator
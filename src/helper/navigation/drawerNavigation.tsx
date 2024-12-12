import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideDrawer from './drawer';
import BottomTabNavigator from './bottomBar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
      return (
            <Drawer.Navigator
                  screenOptions={{headerShown: false}}
                  initialRouteName="BottomNav" 
                  drawerContent={props => <SideDrawer {...props} />} 
            >
                  <Drawer.Screen name="BottomNav" component={BottomTabNavigator} />
            </Drawer.Navigator>
      );
};

export default DrawerNavigator;

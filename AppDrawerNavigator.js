import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import PetTransferScreen from '../screens/PetTransferScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import MyPetsScreen from '../screens/MyPetsScreen';
import PetDoctorScreen from '../screens/PetDoctorScreen';
import PetFoodScreen from '../screens/PetFoodScreen';
import {Icon} from 'react-native-elements';

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //second bg
var C5 = '#E7E5DF'; //text

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" color = {C2} type ="fontawesome5" />
    }
    },
  PetTransfers : {
    screen : PetTransferScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" color = {C2} type ="font-awesome" />,
      drawerLabel : "Pet Transfers"
    }
  },
  MyReceivedPets :{
    screen: MyPetsScreen,
    navigationOptions:{
      drawerIcon : <Icon name="pets" color = {C2} type ="materialicons" />,
      drawerLabel : "My Pets"
    }
  },
  Notification : {
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name="bell" color = {C2} type ="font-awesome" />,
      drawerLabel : "My Notifications"
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon : <Icon name="settings" color = {C2} type ="fontawesome5" />,
      drawerLabel : "Settings"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'

// create our app's navigation stack
const RouteConfigs = {
  Loading: Loading,
  SignUp: SignUp,
  Login: Login,
  Main: Main
}

var navigator = createAnimatedSwitchNavigator(
  { 
    Loading: {
      screen: Loading,
    },
    SignUp: {
      screen: SignUp,
    },
    Login: {
      screen: Login
    },
    Main: {
      screen: Main
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

const App = createAppContainer(navigator)
export default App
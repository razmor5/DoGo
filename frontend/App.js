import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, I18nManager } from "react-native";
import Button from "./components/UI/Button";
import { windowHeight, windowWidth } from './Dimensions'
import BG from './assets/bg.jpg'
import Background from "./components/UI/Background";
import LoginScreen from "./components/screens/LoginScreen";
import SMSCodeScreen from "./components/screens/SMSCodeScreen";
import * as Font from 'expo-font'
import PersonalInformationScreen from './components/screens/PersonalInformationScreen';
import firebase from 'firebase';
import Loading from './components/screens/Loading';
import HomeNavigator from './components/navigators/HomeNavigator';
import AuthNavigator from './components/navigators/AuthNavigator';

const getFonts = async () => Font.loadAsync({
  'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
  'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf')
})

const firebaseConfig = {
  apiKey: "AIzaSyCTUua-uIQfdEOGCeySYgTVQrfxoBpmKJI",
  authDomain: "dogo-f4209.firebaseapp.com",
  projectId: "dogo-f4209",
  storageBucket: "dogo-f4209.appspot.com",
  messagingSenderId: "748992465228",
  appId: "1:748992465228:web:93bf788965e7c3899ee7e9"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


I18nManager.forceRTL(true)
I18nManager.allowRTL(true)
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("notLoaded")

  useEffect(() => {
    setTimeout(() => {

      firebase.auth().onAuthStateChanged((user) => {
        !user ? setIsLoggedIn(false) : setIsLoggedIn(true)

      });
    }, 1500)
  }, [])
  const [fontsLoadded, setFontsLoaded] = useState(false)
  useEffect(() => {
    getFonts().then(() => {
      setFontsLoaded(true)
    })
  }, [])
  if (fontsLoadded) {
    if (isLoggedIn === "notLoaded") {
      return (
        <Loading />
      )
    }

    return (
      <Background BG={BG} >
        {isLoggedIn ?
          <HomeNavigator />
          :
          <AuthNavigator />
        }
      </Background >

    );
  }
  return (
    <Background BG={BG} />
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row-reverse',
  },
});

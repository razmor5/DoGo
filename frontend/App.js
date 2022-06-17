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

const getFonts = async () => Font.loadAsync({
  'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
  'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf')
})


I18nManager.forceRTL(true)
I18nManager.allowRTL(true)
export default function App() {
  const [fontsLoadded, setFontsLoaded] = useState(false)
  useEffect(() => {
    getFonts().then(() => {
      setFontsLoaded(true)
    })
  }, [])
  if (fontsLoadded) {
    return (
      <Background BG={BG} paddingTop={windowHeight * 0.1} >
        {/* <LoginScreen /> */}
        {/* <SMSCodeScreen /> */}
        {/* <PersonalInformationScreen /> */}
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

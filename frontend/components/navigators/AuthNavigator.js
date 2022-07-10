import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailAndPass from '../screens/EmailAndPass';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';


const AuthStack = createNativeStackNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const AuthNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthStack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        <AuthStack.Screen name="Login" component={EmailAndPass} />
        <AuthStack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        {/* <AppStack.Screen name="ForgotPassword" component={ForgotPassword} /> */}

      </AuthStack.Navigator>

    </NavigationContainer>
  )
}

export default AuthNavigator
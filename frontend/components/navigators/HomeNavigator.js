import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';

const HomeStack = createNativeStackNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const HomeNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <HomeStack.Navigator initialRouteName="Personal Info" screenOptions={{
        headerShown: false
      }}>
        <HomeStack.Screen name="Personal Info" component={PersonalInformationScreen} />
        {/* <AppStack.Screen name="Register" component={Register} /> */}
        {/* <AppStack.Screen name="ForgotPassword" component={ForgotPassword} /> */}

      </HomeStack.Navigator>

    </NavigationContainer>
  )
}

export default HomeNavigator
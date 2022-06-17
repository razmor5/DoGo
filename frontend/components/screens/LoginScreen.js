import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Logo from '../UI/Logo'
import Header from '../UI/Header'
import Input from '../UI/Input'
import Button from '../UI/Button'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lineWrapper}>
        <Logo />
        <Header bold>DoGo</Header>
      </View>
      <Input placeholderText="Enter Your Phone Number..." />
      <Button title="LOG IN" width={windowWidth * 0.4} />
    </View>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: 'row-reverse',
  },
  container: {
    alignItems: 'center',
  }
});


export default LoginScreen
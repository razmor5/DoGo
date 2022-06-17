import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'

const SMSCodeScreen = () => {
  return (
    <View style={styles.container}>
      <Header contrast fontSize={windowHeight * 0.056}>Enter the 6-digit code we sent you</Header>
      <Header fontSize={windowHeight * 0.03}>to +972543352083</Header>
      <Input width={windowWidth * 0.4} placeholderText="6-digit code..." />
      <Button contrast title="NEXT" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  }
});

export default SMSCodeScreen
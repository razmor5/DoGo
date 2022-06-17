import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'

const PersonalInformationScreen = () => {
  return (
    <View style={styles.container}>
      <Header contrast fontSize={windowHeight * 0.05}>Who are you?</Header>
      <View style={styles.wrapper}>
        <Input placeholderText="Name..." />
      </View>
      <Header contrast fontSize={windowHeight * 0.05}>And your best friend?</Header>
      <View style={styles.wrapper}>
        <Input placeholderText="Your Dog's Name..." />
        <Input placeholderText="Your Dog's Breed..." />
        <Input placeholderText="Your Dog'sGender..." />
        <Button contrast title="BARK" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
  },
  wrapper: {
    alignItems: 'center',
    marginTop: -5,
    marginBottom: -15,
  }
});


export default PersonalInformationScreen
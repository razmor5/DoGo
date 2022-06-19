import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Logo from '../UI/Logo'
import Header from '../UI/Header'
import Input from '../UI/Input'
import Button from '../UI/Button'
import firebase from 'firebase';
import Loading from './Loading'

const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const isPhoneValid = () => {
    return (
      (countryCode === "+972" && (parseInt(phoneNumber)).toString().length === 9) ||
      (countryCode === "+1" && (parseInt(phoneNumber)).toString().length === 10)
    )
  }

  const onPressHandler = () => {
    if (isPhoneValid()) {

      firebase.auth().signInAnonymously()
        .then((userCredential) => {
          console.log(userCredential)
          console.log(countryCode + (parseInt(phoneNumber)).toString())
          // this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert(
            "Oopsy",
            "Please recheck your phone number",
            [
              { text: "OK" }
            ]
          )
        })
    }
    else {
      Alert.alert(
        "Oopsy",
        "Please recheck your phone number",
        [
          { text: "OK" }
        ]
      )
    }
  }
  return (
    <View style={styles.container}>
      {/* <Loading /> */}
      <View style={styles.lineWrapper}>
        <Logo />
        <Header bold>DoGo</Header>
      </View>
      <View style={styles.lineWrapper}>
        <Input
          labelValue={countryCode}
          onChangeText={input => {
            if (countryCode.includes("+") || input.includes("+")) {
              setCountryCode(input)
            }
            else {
              setCountryCode("+" + input)
            }
          }
          }
          keyboardType='phone-pad'
          width={windowWidth * 0.3}
          placeholderText="Country Code"
        />
        <Input
          labelValue={phoneNumber}
          onChangeText={input => setPhoneNumber(input)}
          keyboardType='phone-pad'
          width={windowWidth * 0.6}
          placeholderText="Enter Your Phone Number..." />
      </View>
      <Button onPress={onPressHandler} title="LOG IN" width={windowWidth * 0.4} />
    </View>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: 'row-reverse',
  },
  container: {
    marginTop: windowHeight * 0.1,
    alignItems: 'center',
  }
});


export default LoginScreen
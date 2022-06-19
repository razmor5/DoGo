import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Logo from '../UI/Logo'
import Header from '../UI/Header'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from 'firebase';

const EmailAndPass = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const onLogIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert(
          "Oopsy",
          "Please recheck your details or join as a new member!",
          [
            {
              text: "Register",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Try Again" }
          ]
        )
      })
    // firebase.auth().signInAnonymously()
    //   .then((userCredential) => {
    //     console.log(userCredential)
    //     // this.props.navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     Alert.alert(
    //       "Oopsy",
    //       "Please recheck your details or join as a new member!",
    //       [
    //         {
    //           text: "Register",
    //           onPress: () => console.log("Cancel Pressed"),
    //           style: "cancel"
    //         },
    //         { text: "Try Again" }
    //       ]
    //     )
    //   })


    // console.log(email + (parseInt(password)).toString())
  }
  return (
    <View style={styles.container}>
      <View style={styles.lineWrapper}>
        <Logo />
        <Header bold>DoGo</Header>
      </View>
      {/* <View style={styles.lineWrapper}> */}
      <Input
        labelValue={email}
        onChangeText={input => setEmail(input)}
        keyboardType='email-address'
        width={windowWidth * 0.8}
        placeholderText="Email"
      />
      <Input
        labelValue={password}
        onChangeText={input => setPassword(input)}
        // keyboardType='visible-password'
        width={windowWidth * 0.8}
        secureTextEntry={hidePassword}
        placeholderText="Password">
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => {
            setHidePassword(prevState => !prevState)
          }}
        >
          <Entypo name={`${hidePassword ? "eye" : "eye-with-line"}`} size={20} color="#666" />
        </TouchableOpacity>
      </Input>
      {/* </View> */}
      <Button onPress={onLogIn} title="LOG IN" width={windowWidth * 0.4} />
    </View>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: 'row-reverse',
  },
  container: {
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
});


export default EmailAndPass
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Logo from '../UI/Logo'
import Header from '../UI/Header'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from 'firebase';

const EmailAndPass = (props) => {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(true)
  const [hidePassword, setHidePassword] = useState(true)

  const onLogIn = () => {
    let valid = true
    if (email === "") {
      valid = false
      setEmailValid(false)
    }
    if (password === "") {
      valid = false
      setPasswordValid(false)
    }
    if (valid) {

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid)
          // this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error.message)
          Alert.alert(
            "Oopsy",
            "Please recheck your details or join as a new member!",
            [
              {
                text: "Register",
                onPress: () => props.navigation.navigate('PersonalInformation', { email: email, password: password }),
                style: "cancel"
              },
              {
                text: "Try Again",
                onPress: () => console.log("Cancel Pressed")
              }
            ]
          )
        })
    }
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
        onChangeText={input => {
          setEmail(input)
          setEmailValid(true)
        }}
        keyboardType='email-address'
        width={windowWidth * 0.8}
        placeholderText="Email"
        unvalid={!emailValid}
      />
      <Input
        labelValue={password}
        onChangeText={input => {
          setPassword(input)
          setPasswordValid(true)
        }}
        // keyboardType='visible-password'
        width={windowWidth * 0.8}
        secureTextEntry={hidePassword}
        placeholderText="Password"
        unvalid={!passwordValid}
      >

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
      <Button onPress={onLogIn} title="SIGN IN/UP" width={windowWidth * 0.4} />
    </View>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: 'row-reverse',
  },
  container: {
    alignItems: 'center',
    marginTop: windowHeight * 0.1,
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

// {
//   "credential": null,
//     "operationType": "signIn",
//       "user": Object {
//     "apiKey": "AIzaSyCTUua-uIQfdEOGCeySYgTVQrfxoBpmKJI",
//       "appName": "[DEFAULT]",
//         "authDomain": "dogo-f4209.firebaseapp.com",
//           "createdAt": "1659079785453",
//             "displayName": null,
//               "email": "bar@gmail.com",
//                 "emailVerified": false,
//                   "isAnonymous": false,
//                     "lastLoginAt": "1659079785453",
//                       "multiFactor": Object {
//       "enrolledFactors": Array[],
//     },
//     "phoneNumber": null,
//       "photoURL": null,
//         "providerData": Array[
//           Object {
//       "displayName": null,
//         "email": "bar@gmail.com",
//           "phoneNumber": null,
//             "photoURL": null,
//               "providerId": "password",
//                 "uid": "bar@gmail.com",
//       },
//     ],
//     "redirectEventId": null,
//       "stsTokenManager": Object {
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZjYwYzE3ZTJkNmY4YWQ1MzRjNDAwYzVhMTZkNjc2ZmFkNzc3ZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG9nby1mNDIwOSIsImF1ZCI6ImRvZ28tZjQyMDkiLCJhdXRoX3RpbWUiOjE2NTkwNzk3ODUsInVzZXJfaWQiOiI3MDVoSlM0bXBJWk9mc2J2dUNNT0JjSHRaOEkyIiwic3ViIjoiNzA1aEpTNG1wSVpPZnNidnVDTU9CY0h0WjhJMiIsImlhdCI6MTY1OTA3OTc4NSwiZXhwIjoxNjU5MDgzMzg1LCJlbWFpbCI6ImJhckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYmFyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.knDiILNOcM0U67s7ZtigS45QG-3OJzEDD2UPtRKx0Q3_r93ZLgPIOpBb3o67_fdQvk0qhSjBkGYJBaJcIF2ciC2aF8pT9Z79f7xCF4td24pbndTZBkpbV2EVRL0FX-EKmVA0HMwPY0kjUzLSTCu4CPPJUJBqfwuyUprNfhtSmVZOtHNzfZEs7KZMgh5lT59qcjKdceFSIpVc72i1s9Cj6B0x--uNmx6nCk4aU4-EEmgMhsEZLzj3famTjYpIK33Npdln2Go5aDJ3YMgerRmqe40vov8aY9GGcV0QOaJC-_QQ7cK-AGrjsZrw0xT57HoRQIy-QWtE4w1U8aDYV0mKjQ",
//         "apiKey": "AIzaSyCTUua-uIQfdEOGCeySYgTVQrfxoBpmKJI",
//           "expirationTime": 1659083385791,
//             "refreshToken": "AOEOulZk7N_RHmXlRRKc493B_R51pcSjF547CT93Bg69_H9qlIq_zGWq05ClIkXid_RhHHHINIjDARta5WgeBbBlR_KS9aSqWXm-mRPhOgCUKoKUpBQu43xv9H7_x_4CiP3Vz-QSesyfO2XkByDs3pmTZ_tfL6nbfrtAnTLjjXE9sQItBOdi71VlnQ0EQ43r0W14GiSBNROF",
//     },
//     "tenantId": null,
//       "uid": "705hJS4mpIZOfsbvuCMOBcHtZ8I2",
//   },
// }
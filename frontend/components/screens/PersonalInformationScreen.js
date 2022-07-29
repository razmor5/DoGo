import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'
import firebase from 'firebase';
import url from '../../BaseURL'
import axios from 'axios';

const PersonalInformationScreen = ({ route }) => {
  const [name, setName] = useState("")
  const [nameValid, setNameValid] = useState(true)
  const [dogName, setDogName] = useState("")
  const [dogNameValid, setDogNameValid] = useState(true)
  const [dogBreed, setDogBreed] = useState("")
  const [dogBreedValid, setDogBreedValid] = useState(true)
  const [gender, setGender] = useState("")
  const [genderValid, setGenderValid] = useState(true)
  const barkPressedRegister = () => {
    let valid = true
    if (name === "") {
      valid = false
      setNameValid(false)
    }
    if (dogName === "") {
      valid = false
      setDogNameValid(false)
    }
    if (dogBreed === "") {
      valid = false
      setDogBreedValid(false)
    }
    if (gender === "") {
      valid = false
      setGenderValid(false)
    }
    if (valid) {
      firebase.auth().createUserWithEmailAndPassword(route.params.email, route.params.password)
        .then((userCredential) => {
          let data = JSON.stringify({
            email: route.params.email,
            name: name,
            dogsName: dogName,
            dogsBreed: dogBreed,
            dogsGender: gender,
            userID: userCredential.user.uid
          })
          let config =
          {
            method: "post",
            url: `${url}/users/sign-up`,
            headers: {
              "Content-Type": "application/json",
            },
            data: data
          }
          console.log(config);
          axios(config)
            .then((response) => { console.log("success:", response) })
            .catch((error) => { console.log("error:", error.message) })
          // console.log(userCredential.user.uid)
          //TODO: dispatch the userCredential.user.uid to mongo with all details needed
        })
        .catch((error) => {
          Alert.alert(
            "Something Went Wrong...",
            error.message,
            [
              {
                text: "OK",
                onPress: () => props.navigation.pop(),
                style: "cancel"
              },
            ]
          )
        })
      console.log(route.params)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Header contrast fontSize={windowHeight * 0.05}>Who are you?</Header>
      <View style={styles.wrapper}>
        <Input
          labelValue={name}
          onChangeText={input => {
            setName(input)
            setNameValid(true)
          }}
          unvalid={!nameValid}
          placeholderText="Name..."
        />
      </View>
      <Header contrast fontSize={windowHeight * 0.05}>And your best friend?</Header>
      <View style={styles.wrapper}>
        <Input
          labelValue={dogName}
          onChangeText={input => {
            setDogName(input)
            setDogNameValid(true)
          }}
          unvalid={!dogNameValid}
          placeholderText="Your Dog's Name..."
        />
        <Input
          labelValue={dogBreed}
          onChangeText={input => {
            setDogBreed(input)
            setDogBreedValid(true)
          }}
          unvalid={!dogBreedValid}

          placeholderText="Your Dog's Breed..."
        />
        <View style={styles.lineWrapper}>
          <Button
            contrast={gender === "M"}
            title="Male"
            width={windowWidth * 0.4}
            onPress={() => {
              setGender("M")
              setGenderValid(true)
            }}
            unvalid={!genderValid}
          />
          <Button
            contrast={gender === "F"}
            title="Female"
            width={windowWidth * 0.4}
            onPress={() => {
              setGender("F")
              setGenderValid(true)
            }}
            unvalid={!genderValid}
          />
        </View>
        {/* <Picker>
          <Picker.item label="Your Dog'sGender..." value="disables" color="#aaa" />
          <Picker.item label="Male" value="male" />
          <Picker.item label="Female" value="female" />
        </Picker> */}
        {/* <Input placeholderText="Your Dog'sGender..." /> */}
        <Button contrast title="BARK" onPress={barkPressedRegister} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: -7,
    // borderWidth: 1,
    // borderColor: 'black',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    // backgroundColor: 'green',
    // paddingBottom: 500,
    // height: windowHeight * 5,
    // marginTop: -80,
  },
  wrapper: {
    alignItems: 'center',
    marginRight: -10,
    marginTop: -5,
    // marginBottom: -15,
  },
  lineWrapper: {
    flexDirection: 'row-reverse',
  },
});


export default PersonalInformationScreen
import { View, Text, StyleSheet, Picker, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'
import firebase from 'firebase';

const PersonalInformationScreen = () => {
  const [gender, setGender] = useState("")
  return (
    <ScrollView style={styles.container}>
      <Header contrast fontSize={windowHeight * 0.05}>Who are you?</Header>
      <View style={styles.wrapper}>
        <Input placeholderText="Name..." />
      </View>
      <Header contrast fontSize={windowHeight * 0.05}>And your best friend?</Header>
      <View style={styles.wrapper}>
        <Input placeholderText="Your Dog's Name..." />
        <Input placeholderText="Your Dog's Breed..." />
        <View style={styles.lineWrapper}>
          <Button
            contrast={gender === "male"}
            title="Male"
            width={windowWidth * 0.4}
            onPress={() => { setGender("male") }}
          />
          <Button
            contrast={gender === "female"}
            title="Female"
            width={windowWidth * 0.4}
            onPress={() => { setGender("female") }}

          />
        </View>
        {/* <Picker>
          <Picker.item label="Your Dog'sGender..." value="disables" color="#aaa" />
          <Picker.item label="Male" value="male" />
          <Picker.item label="Female" value="female" />
        </Picker> */}
        {/* <Input placeholderText="Your Dog'sGender..." /> */}
        <Button contrast title="BARK" onPress={() => { firebase.auth().signOut() }} />
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
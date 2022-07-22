import { View, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header'
import Button from '../UI/Button'
import firebase from 'firebase';
import DogInformation from '../UI/DogInformation'


const MyDogs = (props) => {
  const [myDogs, setMyDogs] = useState({
    name: 'Raz',
    email: 'razmor5@gmail.com',
    dogs: [
      {
        name: 'Bell',
        breed: 'Mix',
        gender: 'Female',
      },
      {
        name: 'Toy',
        breed: 'Shitzu',
        gender: 'Male',
      }
    ]
  })

  return (
    <View style={styles.container}>
      <View style={styles.lineWrapper}>
        <Header contrast fontSize={windowHeight * 0.05}>Hi {myDogs.name}</Header>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              Alert.alert(
                "Sign Out",
                `Your'e About To Sign Out From ${myDogs.email}\n Are You Sure?`,
                [
                  {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "SURE",
                    onPress: () => { firebase.auth().signOut() }
                  }
                ]
              )
            }}
            // contrast
            borderRadius={50}
            title="Sign Out"
            width={windowWidth * 0.23} />
          <Button
            onPress={() => { props.navigation.pop() }}
            // contrast
            borderRadius={50}
            title="Back"
            width={windowWidth * 0.23} />
        </View>
      </View>
      <ScrollView style={styles.wrapper}>
        {myDogs.dogs.map((dog, i) =>
          <DogInformation key={i} name={dog.name} breed={dog.breed} gender={dog.gender} />
        )}
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: windowHeight,
    width: windowWidth,
    padding: 10,
    // justifyContent: 'center',
  },
  lineWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    paddingTop: 12,
  },
  wrapper: {
    marginTop: 10,
  }
})

export default MyDogs
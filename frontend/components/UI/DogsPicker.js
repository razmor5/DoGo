import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { windowHeight, windowWidth } from '../../Dimensions'


const DogsPicker = () => {
  const [myDogs, setMyDogs] = useState({
    name: 'Raz',
    email: 'razmor5@gmail.com',
    dogs: [
      {
        id: 0,
        name: 'Bell',
        breed: 'Mix',
        gender: 'female',
        checked: false,
      },
      {
        id: 1,
        name: 'Toy',
        breed: 'Shitzu',
        gender: 'male',
        checked: false,
      }
    ]
  })
  const [signDogs, setSignDogs] = useState()
  const onPressHandler = (toggledDog) => {
    let dogs = myDogs.dogs.map(dog => dog.id === toggledDog.id ? { ...toggledDog, checked: !toggledDog.checked } : dog)
    setMyDogs({ ...myDogs, dogs: dogs })
  }
  return (
    <ScrollView horizontal={true}>
      {myDogs.dogs.map((dog) =>
        <TouchableOpacity
          onPress={() => { onPressHandler(dog) }}
          style={{
            ...styles.headerBox,
            borderColor: dog.checked ? 'rgb(40, 170, 40)' : 'rgba(25, 25, 25,0.4)',
            borderWidth: dog.checked ? 8 : 3,
            padding: dog.checked ? 5 : 10,

          }}>
          <Header
            // bold
            marginTop={1}
            contrast
            fontSize={windowHeight * 0.04}
          >{dog.name}</Header>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerBox: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: (windowHeight * 0.15) / 4,
    borderRadius: 5,
    // paddingTop: -10,
  }
})

export default DogsPicker
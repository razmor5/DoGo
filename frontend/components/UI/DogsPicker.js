import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { windowHeight, windowWidth } from '../../Dimensions'


const DogsPicker = ({ setCanAdd, myDogs, setMyDogs }) => {
  // const [myDogs, setMyDogs] = useState({
  //   ...user,
  //   dogs: user.dogs.map(dog => { return { ...dog, checked: false } })
  // })
  const onPressHandler = (toggledDog) => {
    let can = false
    let dogs = myDogs.dogs.map(
      dog => {
        if (dog.id === toggledDog.id) {
          can = can || !toggledDog.checked
          return { ...toggledDog, checked: !toggledDog.checked }
        }
        else {
          can = can || dog.checked
          return dog
        }
      })
    setCanAdd(can)
    setMyDogs({ ...myDogs, dogs: dogs })

  }
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      {myDogs.dogs.map((dog) => {
        if (dog.gardenID === -1) {
          return <TouchableOpacity
            key={dog.id}
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
            >{dog.dogsName}</Header>
          </TouchableOpacity>
        }
      }
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
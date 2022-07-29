import { ScrollView, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from './Header'
import { createOpenLink } from 'react-native-open-maps';
import firebase from 'firebase';
import DogsPicker from './DogsPicker';
import url from '../../BaseURL'
import axios from 'axios';


const GardenInformation = ({ closeById, title, description, user, setUser, closeAll, id, amount }) => {
  const [myDogs, setMyDogs] = useState({
    ...user,
    dogs: user.dogs.map(dog => { return { ...dog, checked: false } })
  })
  const [canAdd, setCanAdd] = useState(false)
  const dogsAdd = () => {
    let data = JSON.stringify({
      userID: user.id,
      dogs: myDogs.dogs.map(dog => dog.checked && dog.id)
    })
    let config = {
      method: "post",
      url: `${url}/users/${id}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    }
    axios(config)
      .then((response) => {
        console.log(response.data)
        setUser(prev => { return { ...prev, dogs: myDogs.dogs.map(dog => dog.checked ? { ...dog, gardenID: id } : dog) } })
        setMyDogs(prev => { return { ...prev, dogs: myDogs.dogs.map(dog => dog.checked ? { ...dog, gardenID: id } : dog) } })
        setCanAdd(false)
        console.log(user)
      })
      .catch((error) => console.log(error.message))
    // alert("add")

  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      <Header fontSize={windowHeight * 0.035} contrast>{title}</Header>
      {/* <Header fontSize={windowHeight * 0.03} contrast>{description}</Header> */}
      <Header fontSize={windowHeight * 0.03} contrast>{amount} dogs</Header>
      <TouchableOpacity onPress={
        createOpenLink({
          // latitude: 31.274989,
          // longitude: 34.818367,
          provider: 'google',
          // start: "My Location",
          end: `${title}`,
          navigate: true,
          travelType: "walk"
        })}>
        <Header fontSize={windowHeight * 0.04} bold contrast>DIRECTIONS</Header>
      </TouchableOpacity>
      <DogsPicker myDogs={myDogs} setMyDogs={setMyDogs} setCanAdd={setCanAdd} />

      <TouchableOpacity disabled={!canAdd} onPress={dogsAdd}>
        <Header fontSize={windowHeight * 0.04} bold contrast style={{ color: canAdd ? 'black' : 'grey', }}>ADD MY DOG</Header>
      </TouchableOpacity>

      <TouchableOpacity style={styles.close} onPress={closeById}>
        <Header fontSize={windowHeight * 0.04} bold contrast>CLOSE</Header>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: 'black',
    // alignItems: 'center',
    // marginRight: 6,
    // flex: 1,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    minWidth: '90%',
    height: '50%',
    // zIndex: 10000000,
  },
  close: {
    paddingBottom: 15,
  }
})

export default GardenInformation
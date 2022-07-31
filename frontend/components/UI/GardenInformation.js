import { ScrollView, View, StyleSheet, TouchableOpacity, I18nManager } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from './Header'
import { createOpenLink } from 'react-native-open-maps';
import firebase from 'firebase';
import DogsPicker from './DogsPicker';
import url from '../../BaseURL'
import axios from 'axios';


const GardenInformation = ({ closeById, title, setGardens, markerPressed, user, setUser, closeAll, id, amount, users }) => {
  const [myDogs, setMyDogs] = useState({
    ...user,
    dogs: user.dogs.map(dog => { return { ...dog, checked: false } })
  })
  // users.map(user => {
  //   console.log(user)
  // })
  console.log("userrrrrrrsssssss:", users)
  // gardens.map(garden => {
  //   if (garden._id === id) {
  //     // return {...garden, users:}
  //     // console.log("garden: #################\n", garden.users)
  //     // console.log("newUser: #################\n", {
  //     //   name: user.name,
  //     //   userID: user.id,
  //     //   dog: {
  //     //     dogsBreed: "df",
  //     //     dogsGender: "fd",
  //     //     dogsName: "dsdsf",
  //     //     gardenID: "dfsgg",
  //     //     id: 12
  //     //   }
  //     // })
  //   }
  // })
  const [canAdd, setCanAdd] = useState(false)
  const [showDogs, setShowDogs] = useState(false)
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

        axios.get(`${url}/gardens`)
          .then(response => {
            setGardens(response.data.gardens)
            closeAll()
            markerPressed(id)

          }
          )
          .catch(err => console.log("mapsError", err.message))

        // setGardens(prev => {
        //   prev.map(garden => garden._id === id ? { ...garden, users: [...garden.users, users] } : garden)
        // })

        // console.log("this is users:", users)
        // setGardens(prev=>{return prev.map(garden=>{
        // })
        // })
        // gardens.map(garden => {
        //   console.log(garden)
        // })

        setCanAdd(false)
        // console.log(user)
      })
      .catch((error) => console.log(error.message))
    // alert("add")

  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      <Header fontSize={windowHeight * 0.035} contrast>{title}</Header>
      {/* <Header fontSize={windowHeight * 0.03} contrast>{description}</Header> */}
      <TouchableOpacity disabled={amount === 0} onPress={() => { setShowDogs(prev => !prev) }}>
        <Header fontSize={windowHeight * 0.03} contrast>{amount} dogs</Header>
      </TouchableOpacity>
      {showDogs &&
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}
          style={{
            maxHeight: windowHeight * 0.3,
            borderWidth: 1,
            borderRadius: 15,
            marginTop: 5

          }}>
          {users.map(user => <View key={{ id: user.id, dogID: user.dog.id }} style={{
            borderWidth: 1,
            margin: 5,
            padding: 7,
            borderRadius: 15,
            minWidth: '90%',
            // borderWidth: 1,
            borderColor: user.dog.dogsGender === 'M' ? 'rgb(0,168,243)' : 'rgb(255,174,200)',
            backgroundColor: user.dog.dogsGender === 'M' ? 'rgba(0,168,243, 0.2)' : 'rgba(255,174,200, 0.2)',
          }}>
            <Header fontSize={windowHeight * 0.03} contrast>Owner: {user.name}</Header>
            <Header fontSize={windowHeight * 0.03} contrast>Dog's Name: {user.dog.dogsName}</Header>
            <Header fontSize={windowHeight * 0.03} contrast>Breed: {user.dog.dogsBreed}</Header>
          </View>)}
        </ScrollView>
      }
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
    marginTop: windowHeight * 0.12,
    marginBottom: -(windowHeight * 0.115),
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
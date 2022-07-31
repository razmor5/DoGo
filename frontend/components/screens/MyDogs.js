import { View, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header'
import Button from '../UI/Button'
import firebase from 'firebase';
import DogInformation from '../UI/DogInformation'
import Input from '../UI/Input'
import url from '../../BaseURL'
import axios from 'axios';


const MyDogs = (props) => {
  const [addForm, setAddForm] = useState(false)
  const [dogGender, setDogGender] = useState("")
  const [dogBreed, setDogBreed] = useState("")
  const [dogName, setDogName] = useState("")
  const [genderValid, setGenderValid] = useState(true)
  const [dogBreedValid, setDogBreedValid] = useState(true)
  const [dogNameValid, setDogNameValid] = useState(true)
  const [myDogs, setMyDogs] = useState(props.route.params.user)

  const onUpdateDogs = (updatedDog) => {
    let dogs = myDogs.dogs.map(dog => dog.id === updatedDog.id ? updatedDog : dog)
    setMyDogs({ ...myDogs, dogs: dogs })
  }

  const onRemoveDog = (dogID, dogName) => {
    console.log(dogID, dogName)
    let data = JSON.stringify({
      userID: props.route.params.user.id,
      dogsName: dogName,
      dogsID: dogID
    })
    let config =
    {
      method: 'post',
      url: `${url}/users/delete-dog`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    }
    axios(config)
      .then(response => {
        let dogs = myDogs.dogs.filter(dog => dog.id !== dogID)
        setMyDogs({ ...myDogs, dogs: dogs })
        props.route.params.setUser({ ...props.route.params.user, dogs: dogs })
      })
      .catch((error) => { console.log("error:", error.message) })
  }

  const onAddNewDog = () => {
    let valid = true
    if (dogName === "") {
      valid = false
      setDogNameValid(false)
    }
    if (dogBreed === "") {
      valid = false
      setDogBreedValid(false)
    }
    if (dogGender === "") {
      valid = false
      setGenderValid(false)
    }
    if (valid) {
      let data = JSON.stringify({
        userID: props.route.params.user.id,
        dogsName: dogName,
        dogsBreed: dogBreed,
        dogsGender: dogGender
      })
      let config =
      {
        method: 'post',
        url: `${url}/users/add-dog`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      }
      axios(config)
        .then((response) => {
          console.log("success:", response)
          props.route.params.setUser({
            name: response.data.user.name,
            id: response.data.user.id,
            email: response.data.user.email,
            dogs: response.data.user.dogs
          })
          setMyDogs({
            name: response.data.user.name,
            id: response.data.user.id,
            email: response.data.user.email,
            dogs: response.data.user.dogs
          })
          setDogGender("")
          setDogBreed("")
          setDogName("")
          setAddForm(false)

        })
        .catch((error) => { console.log("error:", error.message) })
    }
  }

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
      {addForm ?
        <View>
          <View style={styles.formWrapper}>
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
                contrast={dogGender === "M"}
                title="Male"
                width={windowWidth * 0.4}
                onPress={() => {
                  setDogGender("M")
                  setGenderValid(true)

                }}
                unvalid={!genderValid}
              />
              <Button
                contrast={dogGender === "F"}
                title="Female"
                width={windowWidth * 0.4}
                onPress={() => {
                  setDogGender("F")
                  setGenderValid(true)

                }}
                unvalid={!genderValid}
              />
            </View>
            <View style={styles.lineWrapper}>
              <Button
                onPress={onAddNewDog}
                contrast
                title={"Save"}
                width={windowWidth * 0.4}
                style={{
                  backgroundColor: '#228B22',
                  borderColor: '#228B22'
                }}
              />
              <Button
                onPress={() => { setAddForm(false) }}
                contrast
                title={"Cancel"}
                width={windowWidth * 0.4}
                style={{
                  backgroundColor: '#B22222',
                  borderColor: '#B22222'
                }}
              />
            </View>
          </View>
        </View> :
        <Button onPress={() => { setAddForm(true) }} contrast title={"Add Dog"} style={styles.button} />
      }
      <ScrollView style={styles.wrapper}>
        {myDogs.dogs.map((dog) =>
          <DogInformation key={dog.id} id={dog.id} removeDog={onRemoveDog} onSave={onUpdateDogs} name={dog.dogsName} breed={dog.dogsBreed} gender={dog.dogsGender} />
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
    // backgroundColor: 'green',
  },
  button: {
    // borderWidth: 5,
    marginBottom: 10,
    padding: 7,
    borderRadius: 15,
    minWidth: '100%',
    // borderColor: 'rgb(14,168,0)',
    // backgroundColor: 'rgb(14,168,0)'
  },
  formWrapper: {
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: 'rgba(160,160,160,0.4)',
    alignItems: 'center',
    // marginRight: -10,
    marginTop: 5,
    paddingBottom: 15,
    // marginBottom: -15,
  },
  // lineWrapper: {
  //   flexDirection: 'row-reverse',
  // },
})

export default MyDogs
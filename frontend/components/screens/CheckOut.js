import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header'
import Button from '../UI/Button'
import DogInformation from '../UI/DogInformation'


const CheckOut = (props) => {
  const [myDogs, setMyDogs] = useState({
    ...props.route.params.user,
    dogs: props.route.params.user.dogs.filter(dog => dog.gardenID !== -1)
  })

  const onRemoveDog = (dogID) => {
    console.log("TODO")
    myDogs.dogs.map(dog => {
      if (dog.id === dogID) {
        // let data = JSON.stringify({
        //   userID: user.id,
        //   dogs: myDogs.dogs.map(dog => dog.checked && dog.id)
        // })
        // let config = {
        //   method: "post",
        //   url: `${url}/users/${id}`,
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   data: data
        // }
        // axios(config)
        // remove dog from garden
        // update dogs gardenID to -1
      }
    })
  }

  const checkoutAll = () => {
    console.log("TODO")
    myDogs.dogs.map(dog => {
      // remove dog from garden
      // update dogs gardenID to -1
    })
  }


  return (
    <View style={styles.container}>
      <View style={styles.lineWrapper}>
        <Header contrast fontSize={windowHeight * 0.05}>Check Out</Header>
        <Button
          onPress={() => { props.navigation.pop() }}
          // contrast
          borderRadius={50}
          title="Back"
          width={windowWidth * 0.23} />
      </View>
      <ScrollView style={styles.wrapper}>
        {myDogs.dogs.map((dog) =>
          <DogInformation checkout key={dog.id} id={dog.id} removeDog={onRemoveDog} name={dog.dogsName} breed={dog.dogsBreed} gender={dog.dogsGender} />
        )}
        <Button
          onPress={checkoutAll}
          contrast
          borderRadius={50}
          title="Check Out All"
          width={"100%"}
        />
      </ScrollView>
    </View>
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


export default CheckOut
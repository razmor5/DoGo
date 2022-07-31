import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { windowHeight, windowWidth } from '../../Dimensions'
import Input from './Input'
import Button from './Button'


const DogInformation = ({ name, breed, gender, onSave, removeDog, id, checkout }) => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dogGender, setDogGender] = useState(gender)
  const [dogBreed, setDogBreed] = useState(breed)
  const [dogName, setDogName] = useState(name)

  const onSaveHandler = () => {
    onSave({
      id: id,
      dogsName: dogName,
      dogsBreed: dogBreed,
      dogsGender: dogGender
    })
    setEdit(false)
  }

  const onDeleteHandler = () => {
    if (checkout) {
      removeDog(id)
      setOpen(false)
    }
    else {
      Alert.alert(
        "Are You Sure?",
        "After Deleting Your Dog The Data Will Lost!",
        [
          {
            text: "Cancel",
            onPress: () => { console.log("Cancel Pressed") },
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => {
              removeDog(id, name)
              setOpen(false)
            }
          }
        ]
      )
    }
  }

  return (
    <TouchableOpacity disabled={open} onPress={() => { setOpen(prev => !prev) }} >
      <View style={{
        ...styles.container,
        borderColor: gender === 'M' ? 'rgb(0,168,243)' : 'rgb(255,174,200)',
        backgroundColor: gender === 'M' ? 'rgba(0,168,243, 0.2)' : 'rgba(255,174,200, 0.2)',
      }}>
        <View style={styles.lineWrapper}>
          <View style={styles.colWrapper}>

            {edit ?
              <Input
                width={windowWidth * 0.3}
                height={windowHeight * 0.04}
                marginTop={1}
                labelValue={dogName}
                onChangeText={input => {
                  setDogName(input)
                  // setNameValid(true)
                }}
                // unvalid={!nameValid}
                placeholderText={dogName}
              /> :
              <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>{dogName}</Header>
            }
            {open &&
              <View>
                {edit ?
                  <Input
                    width={windowWidth * 0.3}
                    height={windowHeight * 0.04}
                    marginTop={1}
                    labelValue={dogBreed}
                    onChangeText={input => {
                      setDogBreed(input)
                      // setNameValid(true)
                    }}
                    // unvalid={!nameValid}
                    placeholderText={dogBreed}
                  /> :
                  <Header marginTop={1} fontSize={windowHeight * 0.035} contrast>{breed}</Header>
                }
              </View>
            }
            {open &&
              <View>
                {edit &&
                  <View style={styles.lineWrapper}>
                    <Button
                      contrast={dogGender === "M"}
                      title="Male"
                      width={windowWidth * 0.15}
                      height={windowHeight * 0.04}
                      marginTop={1}
                      onPress={() => {
                        setDogGender("M")
                      }}
                    />
                    <Button
                      contrast={dogGender === "F"}
                      title="Female"
                      width={windowWidth * 0.15}
                      height={windowHeight * 0.04}
                      marginTop={1}
                      onPress={() => {
                        setDogGender("F")
                      }}
                    />
                  </View>
                }
              </View>
            }
          </View>

          {open &&
            <View>
              {/* {edit ?
                <TouchableOpacity onPress={onSaveHandler}>
                  <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>Save</Header>
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => { setEdit(true) }}>
                  <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>Edit</Header>
                </TouchableOpacity>
              } */}
              <TouchableOpacity onPress={onDeleteHandler}>
                <Header marginTop={1} bold style={{ color: 'red' }} fontSize={windowHeight * 0.025} contrast>{`${checkout ? "Checkout" : "Remove"}`}</Header>
              </TouchableOpacity>
            </View>
          }
          {open &&
            <TouchableOpacity onPress={() => {
              if (!edit) {
                setOpen(false)
              }
              else {
                setDogName(name)
                setDogGender(gender)
                setDogBreed(breed)
              }
              setEdit(false)
            }}>
              <Header marginTop={1} fontSize={windowHeight * 0.025} contrast>{`${edit ? "Cancel" : "Close"}`}</Header>
            </TouchableOpacity>
          }
        </View>


      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    marginBottom: 10,
    padding: 7,
    borderRadius: 15,
    minWidth: '100%',
    // flexDirection: 'row-reverse',
    // justifyContent: 'space-between',
  },
  lineWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  colWrapper: {
    flexDirection: 'column',
    // minWidth: '10%',
    // justifyContent: 'space-between',
  },
})

export default DogInformation
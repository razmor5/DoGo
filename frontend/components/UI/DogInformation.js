import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { windowHeight, windowWidth } from '../../Dimensions'
import Input from './Input'
import Button from './Button'


const DogInformation = ({ name, breed, gender, onSave, id }) => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dogGender, setDogGender] = useState(gender)
  const [dogBreed, setDogBreed] = useState(breed)
  const [dogName, setDogName] = useState(name)

  const onSaveHandler = () => {
    onSave({
      id: id,
      name: dogName,
      breed: dogBreed,
      gender: dogGender
    })
    setEdit(false)
  }

  return (
    <TouchableOpacity disabled={open} onPress={() => { setOpen(prev => !prev) }} >
      <View style={{
        ...styles.container,
        borderColor: gender === 'male' ? 'rgb(0,168,243)' : 'rgb(255,174,200)',
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
                      contrast={dogGender === "male"}
                      title="Male"
                      width={windowWidth * 0.15}
                      height={windowHeight * 0.04}
                      marginTop={1}
                      onPress={() => {
                        setDogGender("male")
                      }}
                    />
                    <Button
                      contrast={dogGender === "female"}
                      title="Female"
                      width={windowWidth * 0.15}
                      height={windowHeight * 0.04}
                      marginTop={1}
                      onPress={() => {
                        setDogGender("female")
                      }}
                    />
                  </View>
                }
              </View>
            }
          </View>

          {open &&
            <View>
              {edit ?
                <TouchableOpacity onPress={onSaveHandler}>
                  <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>Save</Header>
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => { setEdit(true) }}>
                  <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>Edit</Header>
                </TouchableOpacity>
              }
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
              <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>{`${edit ? "Cancel" : "Close"}`}</Header>
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
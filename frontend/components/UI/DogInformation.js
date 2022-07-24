import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import { windowHeight, windowWidth } from '../../Dimensions'


const DogInformation = ({ name, breed, gender }) => {
  const [open, setOpen] = useState(false)
  return (
    <TouchableOpacity onPress={() => { setOpen(prev => !prev) }} style={styles.lineWrapper}>
      <View style={{
        ...styles.container,
        borderColor: gender === 'Male' ? 'rgb(0,168,243)' : 'rgb(255,174,200)',
      }}>
        <Header marginTop={1} fontSize={windowHeight * 0.04} contrast>{name}</Header>
        {open &&
          <Header marginTop={1} fontSize={windowHeight * 0.035} contrast>{breed}</Header>
        }

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
  }
})

export default DogInformation
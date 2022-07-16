import { ScrollView, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from './Header'


const GardenInformation = ({ closeById, title, description, amount }) => {
  // I18nManager.forceRTL(true)
  // I18nManager.allowRTL(true)
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      <Header fontSize={windowHeight * 0.035} contrast>{title}</Header>
      <Header fontSize={windowHeight * 0.03} contrast>{description}</Header>
      <Header fontSize={windowHeight * 0.03} contrast>{amount} dogs</Header>
      <TouchableOpacity onPress={closeById}>
        <Header fontSize={windowHeight * 0.04} bold contrast>ADD MY DOG</Header>
      </TouchableOpacity>
      <TouchableOpacity onPress={closeById}>
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
    minHeight: '50%',
    // zIndex: 10000000,
  }
})

export default GardenInformation
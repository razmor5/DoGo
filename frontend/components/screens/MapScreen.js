import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'
import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Header contrast fontSize={windowHeight * 0.05}>Search</Header>
      <View style={styles.wrapper}>

        <Input
          // labelValue={name}
          // onChangeText={input => {
          //   setName(input)
          //   setNameValid(true)
          // }}
          // unvalid={!nameValid}
          placeholderText="Search"
          width={windowWidth * 0.9}
        />
        <MapView
          showSearchBar
          showUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation
          style={styles.map}
        />
      </View>
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
  wrapper: {
    alignItems: 'center'
  },
  map: {
    marginTop: 10,
    width: '90%',
    height: '80%',
  },
})

export default MapScreen
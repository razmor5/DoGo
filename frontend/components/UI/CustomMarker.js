import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'


const CustomMarker = (props) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../assets/mapMarker128.png')}
      />

    </View >
  )
}

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48
  },
  container: {
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: 'black',
    // marginRight: 6,
    // flex: 1,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'blue',
    minWidth: windowWidth * 0.8,
    minHeight: windowHeight * 0.3,
    // zIndex: 10000000,
  }
})

export default CustomMarker
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '../../Dimensions'


const Logo = () => {
  return (
    <View>

      <Image
        source={require('../../assets/logo512.png')}
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: windowHeight * 0.15,
    width: windowHeight * 0.15,
    resizeMode: 'cover'
  }
})

export default Logo
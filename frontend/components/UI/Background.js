import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '../../Dimensions'



const Background = ({ children, BG, paddingTop, marginTop }) => {
  return (
    <ImageBackground
      source={BG}
      resizeMode="cover"
      style={{
        ...styles.container,
        paddingTop: paddingTop || 0,
        marginTop: marginTop || 0,
      }}
      blurRadius={1.5}
    >
      {children}
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});


export default Background
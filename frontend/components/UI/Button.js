import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react'
import { windowWidth, windowHeight } from '../../Dimensions'

const Button = ({ title, width, height, contrast, fontSize, unvalid, borderRadius, ...rest }) => {
  return (
    <TouchableOpacity style={{
      ...styles.buttonContainer,
      width: width || windowWidth * 0.8,
      height: height || windowHeight / 15,
      backgroundColor: contrast ? 'black' : 'white',
      borderWidth: unvalid ? 2 : 1.5,
      borderColor: unvalid ? 'red' : 'black',
      borderRadius: borderRadius || 3
    }} {...rest}>
      <Text style={{
        ...styles.buttonText,
        color: contrast ? 'white' : 'black',
        fontSize: fontSize || windowHeight * 0.02,
      }}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 3,
    // zIndex: 1,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default Button;
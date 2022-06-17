import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '../../Dimensions'


const Header = ({ fontSize, contrast, bold, children }) => {
  return (
    <View>
      <Text style={{
        ...styles.headerContainer,
        color: contrast ? 'black' : 'white',
        fontSize: fontSize || windowHeight * 0.08,
        fontFamily: bold ? 'Comfortaa-Bold' : 'Comfortaa-Regular',
      }}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: (windowHeight * 0.15) / 4,

  },

})

export default Header
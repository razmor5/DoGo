import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '../../Dimensions'


const Header = ({ fontSize, contrast, bold, children, marginTop, style }) => {
  return (
    <View>
      <Text style={{
        marginTop: marginTop || (windowHeight * 0.15) / 4,
        color: contrast ? 'black' : 'white',
        fontSize: fontSize || windowHeight * 0.08,
        fontFamily: bold ? 'Comfortaa-Bold' : 'Comfortaa-Regular',
        ...style
      }}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: (windowHeight * 0.15) / 4,
    // alignItems: 'center',

  },

})

export default Header
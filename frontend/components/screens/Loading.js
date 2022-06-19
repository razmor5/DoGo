import React, { useEffect } from 'react'
import { StatusBar, View, Text, StyleSheet, Button } from 'react-native'
import LottieView from 'lottie-react-native';
import { windowHeight, windowWidth } from '../../Dimensions';
import Header from '../UI/Header';


const Loading = () => {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, [])

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/loading.json')}
        autoPlay
        loop
      />
      <Header bold>WE ARE ON IT...</Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(140,250,160, 0.6)',
    flex: 1,
    alignItems: 'center',
  },
})

export default Loading

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../Dimensions';
// import AntDesign from 'react-native-vector-icons/AntDesign';

const Input = ({ width, height, contrast, fontSize, labelValue, placeholderText, iconType, ...rest }) => {
  return (
    <View style={{
      ...styles.inputContainer,
      width: width || windowWidth * 0.8,
      height: height || windowHeight / 15,
      backgroundColor: contrast ? 'black' : 'white',
    }}>
      {/* <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={20} color="#666" />
      </View> */}
      <TextInput
        value={labelValue}
        style={{
          ...
          styles.input,
          color: contrast ? 'white' : 'black',
          fontSize: fontSize || windowHeight * 0.02,

        }}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={contrast ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.27)"}
        returnKeyType='done'
        // require = {true}
        {...rest}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 3,
    borderColor: 'black',
  },
  input: {
    padding: 10,
    flex: 1,
    fontWeight: 'bold',
  },
});

export default Input;
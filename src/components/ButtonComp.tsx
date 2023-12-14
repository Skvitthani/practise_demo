import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface CustomButton {
  title?: string;
  onPress?: () => void;
}

const ButtonComp = ({title, onPress}: CustomButton) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle]} onPress={onPress}>
      <Text style={styles.textInput}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 30,
    backgroundColor: '#706233',
  },
  textInput: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

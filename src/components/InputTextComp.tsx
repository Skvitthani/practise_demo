import React from 'react';
import {StyleProp, StyleSheet, TextInput, TextStyle} from 'react-native';

export interface TextInputComp {
  placeholder?: string;
  value?: string | number;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string | number) => void;
}

const InputTextComp = ({
  value,
  inputStyle,
  placeholder,
  onChangeText,
}: TextInputComp) => {
  return (
    <TextInput
      value={value?.toString()}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={'black'}
      style={[styles.textInputStyle, inputStyle]}
    />
  );
};

export default InputTextComp;

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 15,
    backgroundColor: '#FCF5ED',
  },
});

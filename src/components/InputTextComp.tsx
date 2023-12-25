import React from 'react';
import {StyleProp, StyleSheet, TextInput, TextStyle} from 'react-native';

export interface TextInputComp {
  isEditable?: boolean;
  placeholder?: string;
  inputTestID?: string;
  value?: string | number;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string | number) => void;
}

const InputTextComp = ({
  value,
  inputStyle,
  placeholder,
  onChangeText,
  inputTestID,
  isEditable,
}: TextInputComp) => {
  return (
    <TextInput
      editable={isEditable}
      testID={inputTestID}
      selectionColor={'black'}
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

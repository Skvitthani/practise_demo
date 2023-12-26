import React from 'react';
import InputTextComp from './InputTextComp';
import {Text, View, StyleSheet} from 'react-native';

export interface TextInputComp {
  title?: string;
  isEditable?: boolean;
  value?: string | number;
  onChangeText?: (text: string | number) => void;
}

const RecoliDetailcomp = ({
  onChangeText,
  value,
  title,
  isEditable,
}: TextInputComp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.renderText}>{title} : </Text>

      <InputTextComp
        inputTestID={'test_input'}
        value={value}
        isEditable={isEditable}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
      />
    </View>
  );
};

export default RecoliDetailcomp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    color: 'white',
    backgroundColor: 'green',
  },
  renderText: {
    color: 'white',
  },
});

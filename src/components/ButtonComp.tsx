import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface CustomButton {
  title?: string;
  onPress?: () => void;
  ButtontestID?: string;
  TitleTestId?: string;
}

const ButtonComp: React.FC<CustomButton> = ({
  title,
  onPress,
  ButtontestID,
  TitleTestId,
}) => {
  return (
    <TouchableOpacity
      testID={ButtontestID}
      style={[styles.buttonStyle]}
      onPress={onPress}>
      <Text testID={TitleTestId} style={styles.textInput}>
        {title}
      </Text>
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

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface CustomButton {
  title?: string;
  onPress?: () => void;
  ButtontestID?: string;
  TitleTestId?: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
}

const ButtonComp: React.FC<CustomButton> = ({
  title,
  onPress,
  TitleTestId,
  ButtontestID,
  customTextStyle,
  customButtonStyle,
}) => {
  return (
    <TouchableOpacity
      testID={ButtontestID}
      style={[styles.buttonStyle, customButtonStyle]}
      onPress={onPress}>
      <Text testID={TitleTestId} style={[styles.textInput, customTextStyle]}>
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

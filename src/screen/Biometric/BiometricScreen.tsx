import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {NavigationType} from '../../navigation';
import ButtonComp from '../../components/ButtonComp';
import {useraction} from '../../redux/reducer/UserReducer';
import InputTextComp from '../../components/InputTextComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

type BiometricScreen = NativeStackScreenProps<
  NavigationType,
  'BiometricScreen'
> & {
  navigation: () => void;
};

const BiometricScreen: React.FC<BiometricScreen> = ({navigation}) => {
  const [age, setAge] = useState<string | number>('');
  const [city, setCity] = useState<string | number>('');
  const [name, setName] = useState<string | number>('');

  const dispatch = useDispatch();

  const onAddPress = () => {
    let userDetails = {
      age: age,
      name: name,
      city: city,
    };
    dispatch(useraction(userDetails));

    setAge('');
    setName('');
    setCity('');
  };

  const onPress = async () => {
    const response = await LocalAuthentication.authenticateAsync();
    console.log('response', response);
    if (response?.success) {
      navigation.navigate('PrivateDetailScreen');
    } else {
      Alert.alert('You need to Unloack');
    }
  };

  return (
    <View style={styles.container}>
      <InputTextComp
        value={name}
        placeholder="Enter Name"
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setName(txt)}
      />
      <InputTextComp
        value={age}
        placeholder="Enter Age"
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setAge(txt)}
      />
      <InputTextComp
        value={city}
        placeholder="Enter City"
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setCity(txt)}
      />
      <View style={styles.buttonView}>
        <ButtonComp onPress={onAddPress} title="Add" />
      </View>
      <View style={styles.buttonView}>
        <ButtonComp onPress={onPress} title="Go to next screen" />
      </View>
    </View>
  );
};

export default BiometricScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A4D39',
  },
  inputStyle: {
    padding: 10,
    fontSize: 15,
    color: 'black',
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonView: {
    marginTop: 20,
  },
});

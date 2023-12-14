import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {NavigationType} from '../../navigation';
import StringConst from '../../utils/StringConst';
import ButtonComp from '../../components/ButtonComp';
import {Alert, StyleSheet, View} from 'react-native';
import {useraction} from '../../redux/reducer/UserReducer';
import InputTextComp from '../../components/InputTextComp';
import * as LocalAuthentication from 'expo-local-authentication';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

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
  const {t} = useTranslation();

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
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (isEnrolled) {
      const response = await LocalAuthentication.authenticateAsync();
      if (response?.success) {
        navigation.navigate('PrivateDetailScreen');
      } else {
        Alert.alert(t(StringConst.You_need_to_Unloack));
      }
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <InputTextComp
        value={name}
        placeholder={t(StringConst.Enter_Name)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setName(txt)}
      />
      <InputTextComp
        value={age}
        placeholder={t(StringConst.Enter_Age)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setAge(txt)}
      />
      <InputTextComp
        value={city}
        placeholder={t(StringConst.Enter_City)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setCity(txt)}
      />
      <View style={styles.buttonView}>
        <ButtonComp onPress={onAddPress} title={t(StringConst.Add)} />
      </View>
      <View style={styles.buttonView}>
        <ButtonComp
          onPress={onPress}
          title={t(StringConst.Go_to_next_screen)}
        />
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

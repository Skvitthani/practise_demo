import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NavigationType} from '../../navigation';
import StringConst from '../../utils/StringConst';
import {View, Text, StyleSheet} from 'react-native';
import ButtonComp from '../../components/ButtonComp';
import InputTextComp from '../../components/InputTextComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type CreateAccountScreen = NativeStackScreenProps<
  NavigationType,
  'CreateAccountScreen'
> & {
  navigation: () => void;
};

const CreateAccountScreen: React.FC<CreateAccountScreen> = ({navigation}) => {
  const [name, setName] = useState<string | number>('');
  const [email, setEmail] = useState<string | number>('');
  const [password, setPassword] = useState<string | number>('');
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(StringConst.Sign_up)}</Text>
      <InputTextComp
        value={name}
        placeholder={t(StringConst.Enter_Name)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setName(txt)}
      />
      <InputTextComp
        value={email}
        placeholder={t(StringConst.Enter_Email_Id_Name)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setEmail(txt)}
      />
      <InputTextComp
        value={password}
        placeholder={t(StringConst.Enter_Password)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setPassword(txt)}
      />

      <View style={styles.loginBtn}>
        <ButtonComp
          title={t(StringConst.Sign_up)}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default CreateAccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginTop: 100,
    fontWeight: '800',
    alignSelf: 'center',
  },
  inputStyle: {
    height: 50,
    width: '90%',
    marginTop: 30,
    paddingLeft: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  loginBtn: {
    marginTop: 50,
  },
});

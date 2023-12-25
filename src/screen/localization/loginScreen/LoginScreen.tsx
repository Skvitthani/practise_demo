import i18n from '../../../i18n';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NavigationType} from '../../../navigation';
import StringConst from '../../../utils/StringConst';
import ButtonComp from '../../../components/ButtonComp';
import InputTextComp from '../../../components/InputTextComp';
import LanguageModal from '../../../components/LanguageModal';
import {lang, setItemInAsync} from '../../../utils/helperFunction';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type LoginScreen = NativeStackScreenProps<NavigationType, 'LoginScreen'> & {
  navigation: () => void;
};

const LoginScreen: React.FC<LoginScreen> = ({navigation}) => {
  const [email, setEmail] = useState<string | number>('');
  const [password, setPassword] = useState<string | number>('');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <InputTextComp
        inputTestID="name_input_text"
        value={email}
        placeholder={t(StringConst.Enter_Name)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setEmail(txt)}
      />
      <InputTextComp
        inputTestID="password_input_text"
        value={password}
        placeholder={t(StringConst.Enter_Password)}
        inputStyle={styles.inputStyle}
        onChangeText={(txt: string | number) => setPassword(txt)}
      />

      <View style={styles.loginBtn}>
        <ButtonComp title={t('Login')} />
      </View>

      <Text
        testID="create_account_screen_press"
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('CreateAccountScreen');
        }}>
        {t(StringConst.Create_New_Account)}
      </Text>
      <View style={styles.laugBtn}>
        <ButtonComp
          TitleTestId="select_language_button"
          title={t(StringConst.Select_Language)}
          onPress={() => {
            setLangModalVisible(!langModalVisible);
          }}
        />
      </View>
      <LanguageModal
        onApplyPress={selectedLang => {
          i18n.changeLanguage(selectedLang);
          setItemInAsync(lang, selectedLang);
          setLangModalVisible(!langModalVisible);
        }}
        modalVisible={langModalVisible}
        onRequestClose={() => {
          setLangModalVisible(!langModalVisible);
        }}
      />
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    marginTop: 50,
  },
  laugBtn: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },

  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
  },
});

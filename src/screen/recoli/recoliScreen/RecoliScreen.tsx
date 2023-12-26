import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {useSetRecoilState} from 'recoil';
import {UserListState} from '../recoilRoot';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {NavigationType} from '../../../navigation';
import StringConst from '../../../utils/StringConst';
import ButtonComp from '../../../components/ButtonComp';
import InputTextComp from '../../../components/InputTextComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RecoliScreen = NativeStackScreenProps<NavigationType, 'RecoliScreen'> & {
  navigation: () => void;
};

const RecoliScreen: React.FC<RecoliScreen> = ({navigation}) => {
  const [age, setAge] = useState<string | number>();
  const [name, setName] = useState<string | number>('Sanket');

  const {t} = useTranslation();
  const setTodoList = useSetRecoilState(UserListState);

  const onAddItemPress = () => {
    setTodoList(
      oldTodoList =>
        [
          ...oldTodoList,
          {
            age: age,
            name: name,

            id: uuid.v4(),
          },
        ] as any,
    );
  };

  const onNextScreenPress = () => {
    navigation.navigate('RecoliDeailScreen');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <InputTextComp
        value={name}
        inputStyle={styles.inputStyle}
        placeholder={t(StringConst.Enter_Name)}
        onChangeText={(txt: string | number) => setName(txt)}
      />
      <InputTextComp
        value={age}
        inputStyle={styles.inputStyle}
        placeholder={t(StringConst.enter_age)}
        onChangeText={(txt: string | number) => setAge(Number(txt))}
      />

      <View style={styles.loginBtn}>
        <ButtonComp
          onPress={onAddItemPress}
          title={t(StringConst.add_data)}
          customButtonStyle={styles.buttonStyle}
        />
      </View>
      <View style={styles.loginBtn}>
        <ButtonComp
          customButtonStyle={styles.buttonStyle}
          title={t(StringConst.next_screen)}
          onPress={onNextScreenPress}
        />
      </View>
    </View>
  );
};

export default RecoliScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputStyle: {
    padding: 10,
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
  buttonStyle: {
    padding: 10,
    marginHorizontal: 50,
  },
});

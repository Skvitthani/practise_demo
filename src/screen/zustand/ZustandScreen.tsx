import StringConst from '../../utils/StringConst';
import React, {useCallback, useState} from 'react';
import {usedataStore} from '../../zustand/DataStore';
import ButtonComp from '../../components/ButtonComp';
import InputTextComp from '../../components/InputTextComp';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface items {
  email: string | number;
  password: string | number;
}

const ZustandScreen = () => {
  const [email, setEmail] = useState<string | number>('');
  const [password, setPassword] = useState<string | number>('');
  const [tongglen, setTongglen] = useState(false);

  const store = usedataStore(state => state);
  const userData = usedataStore.getState().userData;

  const onAddDataPress = () => {
    if (email !== '' && password !== '') {
      store.addData({email: email, password: password});
      setEmail('');
      setPassword('');
    } else {
      setTongglen(!tongglen);
    }
  };

  const renderItem = useCallback(({item}: {item: items}) => {
    console.log('item', item);
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.itemText}>Email : {item?.email}</Text>
        <Text style={styles.itemText}>Password : {item?.password}</Text>
      </View>
    );
  }, []);

  const onResetDataPress = () => {
    store.reset();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <InputTextComp
        value={email}
        inputStyle={styles.inputStyle}
        placeholder={StringConst.Enter_Name}
        onChangeText={(txt: string | number) => setEmail(txt)}
      />
      <InputTextComp
        value={password}
        inputStyle={styles.inputStyle}
        placeholder={StringConst.Enter_Password}
        onChangeText={(txt: string | number) => setPassword(txt)}
      />

      <View style={styles.loginBtn}>
        <ButtonComp title={'Add Data'} onPress={onAddDataPress} />
      </View>
      <View style={styles.loginBtn}>
        <ButtonComp title={'Reset Data'} onPress={onResetDataPress} />
      </View>

      <FlatList data={userData} renderItem={renderItem} />
    </View>
  );
};

export default ZustandScreen;

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
  itemStyle: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: 'green',
  },
  itemText: {
    color: 'white',
  },
});

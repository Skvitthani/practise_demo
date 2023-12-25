import {UserListState} from './recoilRoot';
import {useTranslation} from 'react-i18next';
import StringConst from '../../utils/StringConst';
import React, {useCallback, useState} from 'react';
import ButtonComp from '../../components/ButtonComp';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecoliDetailcomp from '../../components/RecoliDetailcomp';

interface items {
  id: number;
  age: string | number;
  gender: string | number;
  name: string | number;
}

const RecoliDeailScreen = () => {
  const [age, setAge] = useState<string | number>('');
  const [name, setName] = useState<string | number>('');
  const [gender, setGender] = useState<string | number>('');
  const [isEdit, setIsEdit] = useState<number | null>(null);

  const {t} = useTranslation();
  const setTodoList = useSetRecoilState(UserListState);
  const todoList = useRecoilValue(UserListState);

  const renderItem = useCallback(
    ({item, index}: {item: items; index: number}) => {
      return (
        <View style={styles.renderItem}>
          <View style={{flex: 1.5}}>
            <RecoliDetailcomp
              title={t(StringConst?.Id)}
              value={item?.id}
              isEditable={false}
            />
            <RecoliDetailcomp
              title={t(StringConst?.Name)}
              isEditable={isEdit == index}
              value={isEdit == index ? name : item?.name}
              onChangeText={(txt: string | number) => setName(txt)}
            />
            <RecoliDetailcomp
              title={t(StringConst?.Age)}
              isEditable={isEdit == index}
              value={isEdit == index ? age : item?.age}
              onChangeText={(txt: string | number) => setAge(txt)}
            />
            <RecoliDetailcomp
              title={t(StringConst?.city)}
              isEditable={isEdit == index}
              value={isEdit == index ? gender : item?.gender}
              onChangeText={(txt: string | number) => setGender(txt)}
            />
          </View>
          <View>
            <ButtonComp
              title={
                isEdit == index ? t(StringConst?.Update) : t(StringConst?.Edit)
              }
              onPress={() => {
                isEdit == index
                  ? onUpdatePress(item)
                  : onEditPress(index, item);
              }}
              customButtonStyle={styles.buttonStyle}
              customTextStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
      );
    },
    [isEdit, age, name, gender],
  );

  const onEditPress = (index: number, item: items) => {
    setAge(item?.age);
    setName(item?.name);
    setGender(item?.gender);
    setIsEdit(index);
  };

  const onUpdatePress = (item: items) => {
    const filter = todoList.map((i: items) => {
      if (i?.id == item?.id) {
        return {
          ...i,
          name: name,
          age: age,
        };
      } else {
        return i;
      }
    });

    setTodoList(filter as any);
    setIsEdit(null);
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainerView}>
        <Text style={styles.noDataTextStyle}>
          {t(StringConst.no_Data_found)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todoList}
        renderItem={renderItem}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default RecoliDeailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  renderItem: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  renderText: {
    color: 'white',
  },
  buttonStyle: {
    padding: 10,
  },
  buttonTextStyle: {
    fontSize: 15,
  },
  inputStyle: {
    padding: 1,
    width: '90%',
    marginTop: 30,
  },
  emptyContainerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataTextStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

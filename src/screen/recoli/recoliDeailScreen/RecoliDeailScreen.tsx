import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';
import StringConst from '../../../utils/StringConst';
import ButtonComp from '../../../components/ButtonComp';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import FilterModal from '../../../components/FilterModal';
import {UserListState, todoListStatsState} from '../recoilRoot';
import RecoliDetailcomp from '../../../components/RecoliDetailcomp';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface items {
  id: number;
  age: string | number;
  name: string | number;
}

const RecoliDeailScreen = () => {
  const [age, setAge] = useState<string | number>('');
  const [name, setName] = useState<string | number>('');

  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {t} = useTranslation();
  const todoList = useRecoilValue(UserListState);
  const setTodoList = useSetRecoilState(UserListState);
  const {newData} = useRecoilValue(todoListStatsState) as any;

  const renderItem = useCallback(
    ({item, index}: {item: items; index: number}) => {
      return (
        <View style={styles.renderItem} key={index}>
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
          </View>
          <View>
            <ButtonComp
              ButtontestID="edit_update_button"
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
    [isEdit, age, name],
  );

  const onEditPress = (index: number, item: items) => {
    setAge(item?.age);
    setName(item?.name);
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
    <View style={styles.container} testID="RecoliDetailScreen">
      <SafeAreaView />
      <FlatList
        data={newData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item?.id?.toString()}
      />
      <ButtonComp
        customButtonStyle={styles.bottomBtn}
        title="Filter"
        onPress={() => {
          setIsVisible(true);
        }}
      />
      <FilterModal
        setIsVisible={setIsVisible}
        modalVisible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
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
  bottomBtn: {
    marginBottom: 10,
  },
});

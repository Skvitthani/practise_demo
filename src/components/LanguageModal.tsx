import {
  View,
  Text,
  Modal,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ButtonComp from './ButtonComp';
import StringConst from '../utils/StringConst';
import {useTranslation} from 'react-i18next';

const {height, width} = Dimensions.get('window');

interface LanguageModal {
  modalVisible: boolean;
  onRequestClose: () => void;
  onApplyPress: (selectedLang: string) => void;
}

interface item {
  id: number;
  title: string;
  value: string;
}

const LanguageModal = ({
  modalVisible,
  onRequestClose,
  onApplyPress,
}: LanguageModal) => {
  const languageData = [
    {
      id: 1,
      value: 'en',
      title: 'English',
    },
    {
      id: 2,
      value: 'hn',
      title: 'Hindi',
    },
    {
      id: 3,
      value: 'gj',
      title: 'Gujarati',
    },
  ];

  const {t} = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{t(StringConst.Select_Language)}</Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languageData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.languageItem}
                    onPress={() => {
                      onApplyPress(item?.value);
                    }}>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 18,
                        color: 'black',
                      }}>
                      {t(item.title)}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.btns}>
            <ButtonComp
              title={t(StringConst.Cancel)}
              onPress={onRequestClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    padding: 35,
    borderRadius: 20,
    width: width - 20,
    alignItems: 'center',
    backgroundColor: 'white',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    height: 50,
    width: '100%',
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn1: {
    height: 50,
    width: '40%',
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    height: 50,
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B68E9',
  },
});

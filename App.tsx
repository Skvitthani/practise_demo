import React, {useState} from 'react';
import {RecoilRoot} from 'recoil';
import {LogBox, StyleSheet, View} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import LanguageModal from './src/components/LanguageModal';
import i18n from './src/i18n';
import {lang, setItemInAsync} from './src/utils/helperFunction';
import ButtonComp from './src/components/ButtonComp';
import StringConst from './src/utils/StringConst';
import {useTranslation} from 'react-i18next';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const {t} = useTranslation();
  return (
    <RecoilRoot>
      {/* <View style={styles.laugBtn}>
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
      /> */}
      <StackNavigation />
    </RecoilRoot>
  );
};

export default App;

const styles = StyleSheet.create({
  laugBtn: {
    justifyContent: 'flex-end',
  },
});

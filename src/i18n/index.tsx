import i18n from 'i18next';
import hn from './hindi.json';
import en from './english.json';
import gj from './gujarati.json';
import {initReactI18next} from 'react-i18next';
import {getItemFromAsync, lang} from '../utils/helperFunction';

interface languageDetectorType {
  type: string;
  async: boolean;
  init: Function;
  cacheUserLanguage: () => void;
  detect: (callback: any) => Promise<void>;
}

const languageDetector: languageDetectorType = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const savedDataJSON = await getItemFromAsync(lang);
    console.log('savedDataJSON', savedDataJSON);
    const lng = savedDataJSON ? savedDataJSON : null;
    console.log('lng', lng);
    const selectLanguage = lng || 'en';
    console.log('selectLanguage', selectLanguage);
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en,
      hn,
      gj,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

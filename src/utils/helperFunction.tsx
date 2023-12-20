import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemInAsync = async (storageKey: string, value: any) => {
  return AsyncStorage.setItem(storageKey, JSON.stringify(value));
};

export const getItemFromAsync = async (itemName: string) => {
  const item = (await AsyncStorage.getItem(itemName)) as any;
  return item ? JSON.parse(item) : undefined;
};

export const lang = 'language';

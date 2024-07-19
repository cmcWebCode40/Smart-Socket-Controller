import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_SESSION = 'user_session';

export const saveToAsyncStore = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const deleteFromAsyncStore = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clearAsyncStore = async () => {
  await AsyncStorage.clear();
};

export const getFromAsyncStore = async <T>(key: string): Promise<T> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

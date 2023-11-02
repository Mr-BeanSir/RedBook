import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

const save = async (key, value) => {
  try {
    return await asyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const get = async key => {
  try {
    return await asyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const remove = async key => {
  try {
    return await asyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const clear = async () => {
  try {
    return await asyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

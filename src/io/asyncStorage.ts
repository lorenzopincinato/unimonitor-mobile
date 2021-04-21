import asyncStorage from '@react-native-community/async-storage';

const getUnimonitorApiToken = async () => {
  return await asyncStorage.getItem('UNIMONITOR_API_TOKEN');
};

const setUnimonitorApiToken = async (token: string | null | undefined) => {
  return await asyncStorage.setItem('UNIMONITOR_API_TOKEN', token ?? '');
};

export { getUnimonitorApiToken, setUnimonitorApiToken };

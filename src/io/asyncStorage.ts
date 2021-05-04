import asyncStorage from '@react-native-community/async-storage';
import { parseJwt } from '../utils/token';

const getUnimonitorApiToken = async () => {
  return await asyncStorage.getItem('UNIMONITOR_API_TOKEN');
};

const setUnimonitorApiToken = async (token: string | null | undefined) => {
  return await asyncStorage.setItem('UNIMONITOR_API_TOKEN', token ?? '');
};

const getUserId = async () => {
  return Number(await asyncStorage.getItem('USER_ID'));
};

const setUserId = async (userId: number) => {
  return await asyncStorage.setItem('USER_ID', userId.toString());
};

export { getUnimonitorApiToken, setUnimonitorApiToken, getUserId, setUserId };

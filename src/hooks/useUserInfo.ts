import { useEffect, useMemo, useState } from 'react';
import { getUnimonitorApiToken } from '../io/asyncStorage';
import { parseJwt } from '../utils/token';

const useUserInfo = () => {
  const [user, setUser] = useState(undefined);

  const hasRole = roleName => {
    if (!user) return false;

    return !!user?.roles.find(role => role.name === roleName);
  };

  const isStudent = useMemo(() => {
    return hasRole('Student');
  }, [user]);

  const isMonitor = useMemo(() => {
    return hasRole('Monitor');
  }, [user]);

  const isProfessor = useMemo(() => {
    return hasRole('Professor');
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const token = (await getUnimonitorApiToken()) || '';

        const user = parseJwt(token);

        setUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {
    isStudent,
    isMonitor,
    isProfessor,

    user,
  };
};

export default useUserInfo;

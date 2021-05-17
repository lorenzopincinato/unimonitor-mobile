import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import LoadingIndicator from '../../components/LoadingIndicator.component';
import Weekday from './Weekday.component';

import {
  getDayAndMonth,
  getDayMonthAndYear,
  getMinutesAndHours,
  getWeekdayName,
} from '../../utils/date';

import api from '../../io/api';
import colors from '../../styles/colors';
import MenuButtonHeader from '../../components/MenuButtonHeader';
import useUserInfo from '../../hooks/useUserInfo';

const NoticeBoard = () => {
  const navigation = useNavigation();

  const { isMonitor, isProfessor } = useUserInfo();

  const [weekdays, setWeekdays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const alert = useMemo(() => {
    if (!isLoading) {
      if (error) return error;

      if (weekdays.length === 0)
        return 'Nenhum aviso por enquanto.\nAtive as notificações para receber os\navisos quando forem publicados!';
    }

    return null;
  }, [weekdays, isLoading, error]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerLeft: (props: JSX.IntrinsicAttributes) => (
        <MenuButtonHeader {...props} />
      ),
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await api.get('notices');

        const weekdays = response.data.map(weekday => {
          const date = new Date(weekday.date);

          return {
            date: getDayAndMonth(date),
            name: getWeekdayName(date),
            notices: weekday.notices.map(notice => {
              const date = new Date(notice.date);

              return {
                ...notice,
                date: `${getDayMonthAndYear(date)} às ${getMinutesAndHours(
                  date,
                )}`,
                time: getMinutesAndHours(date),
              };
            }),
          };
        });

        setWeekdays(weekdays);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError('Erro ao buscar avisos, tente novamente mais tarde');
        setIsLoading(false);
      }
    })();
  }, []);

  function handleNewNotice() {
    navigation.navigate('Write');
  }

  return (
    <>
      {isLoading || alert ? (
        <View style={styles.container}>
          {isLoading ? <LoadingIndicator /> : null}
          {alert ? <Text style={styles.alert}>{alert}</Text> : null}
        </View>
      ) : null}
      {weekdays.length > 0 ? (
        <View style={styles.wrapper}>
          {weekdays.map((weekday, index) => (
            <Weekday
              key={`weekday-${weekday.date}`}
              navigation={navigation}
              index={index}
              name={weekday.name}
              date={weekday.date}
              notices={weekday.notices}
            />
          ))}
        </View>
      ) : null}

      {isMonitor || isProfessor ? (
        <View style={styles.plusButtonView}>
          <TouchableOpacity
            style={styles.plusButton}
            activeOpacity={0.7}
            onPress={handleNewNotice}
          >
            <AntDesign name="plus" style={styles.plusButtonIcon} />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#F7FAFC',
    height: '100%',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  plusButtonView: {
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  plusButton: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  plusButtonIcon: {
    fontSize: 32,
    color: colors.white,
    padding: 12,
    height: '100%',
  },
  alert: {
    textAlign: 'center',
  },
});

export default NoticeBoard;

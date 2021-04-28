import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import LoadingIndicator from '../../components/LoadingIndicator.component';
import Weekday from './Weekday.component';

import api from '../../io/api';
import colors from '../../styles/colors';

const NoticeBoard = ({ navigation }) => {
  const [weekdays, setWeekdays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation2 = useNavigation(); //FIXME const navigation
  const alert = useMemo(() => {
    if (!isLoading) {
      if (error) return error;

      if (weekdays.length === 0)
        return 'Nenhum aviso por enquanto.\nAtive as notificações para receber os\navisos quando forem publicados!';
    }

    return null;
  }, [weekdays, isLoading, error]);

  const getWeekdayName = weekdayNumber => {
    const weekdayNames = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    return weekdayNames[weekdayNumber];
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await api.get('notices');

        const weekdays = response.data.map(weekday => {
          const date = new Date(weekday.date);

          return {
            date: `${date.getDate().toString().padStart(2, '0')}/${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}`,
            name: getWeekdayName(weekday.weekdayNumber),
            notices: weekday.notices.map(notice => {
              const date = new Date(notice.date);

              return {
                ...notice,
                date: `${date.getDate().toString().padStart(2, '0')}/${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(
                    2,
                    '0',
                  )}/${date.getFullYear()} ás ${date
                  .getHours()
                  .toString()
                  .padStart(2, '0')}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}`,
                time: `${date
                  .getHours()
                  .toString()
                  .padStart(2, '0')}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}`,
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
    navigation2.navigate('NoticeWrite');
  }

  return (
    <>
      {isLoading || alert ? (
        <View style={styles.container}>
          {isLoading ? <LoadingIndicator /> : null}
          {alert ? <Text style={styles.alert}>{error}</Text> : null}
        </View>
      ) : null}
      {weekdays.length > 0 ? (
        <View style={styles.wrapper}>
          {weekdays.map((weekday, index) => (
            <Weekday
              key={weekday.date}
              navigation={navigation}
              index={index}
              name={weekday.name}
              date={weekday.date}
              notices={weekday.notices}
            />
          ))}
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.7}
        onPress={handleNewNotice}
      >
        <AntDesign name="plus" style={styles.plusButtonIcon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FAFC',
    height: '100%',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,
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

    backgroundColor: '#F7FAFC',
    height: '100%',
  },
  alert: {
    textAlign: 'center',
  },
});

export default NoticeBoard;

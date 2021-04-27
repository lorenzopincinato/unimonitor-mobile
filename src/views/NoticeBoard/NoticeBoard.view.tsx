import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator.component';
import api from '../../io/api';
import Weekday from './Weekday.component';

const NoticeBoard = ({ navigation }) => {
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    padding: 12,

    backgroundColor: '#F7FAFC',
    height: '100%',
  },
  alert: {
    textAlign: 'center',
  },
});

export default NoticeBoard;

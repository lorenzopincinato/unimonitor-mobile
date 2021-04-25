import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingIndicator from '../../components/LoadingIndicator.component';
import api from '../../io/api';
import Weekday from './Weekday.component';

const NoticeBoard = ({ navigation }) => {
  const [weekdays, setWeekdays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
                  )}/${date.getFullYear()} ${date
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
    <View style={styles.wrapper}>
      {isLoading ? <LoadingIndicator /> : null}
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
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,

    backgroundColor: '#F7FAFC',
    height: '100%',
  },
});

export default NoticeBoard;

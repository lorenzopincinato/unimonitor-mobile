import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { getWeekdayName, getDayAndMonth } from '../../utils/date';

import HomeHeaderLeft from './HomeHeaderLeft.component';
import HomeHeaderRight from './HomeHeaderRight.component';
import Weekday from './Weekday.component';

import colors from '../../styles/colors';
import WeekdaySelection from './WeekSelection.component';

const weekdays = [
  {
    name: getWeekdayName(new Date('2021-05-03')),
    date: getDayAndMonth(new Date('2021-05-03')),
    schedules: [
      {
        id: 1,
        begin: '17:00',
        end: '19:00',
        status: 'available',
        subject: {
          id: 1,
          name: 'Banco de Dados A',
        },
      },
    ],
  },
];

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: (props: JSX.IntrinsicAttributes) => (
        <HomeHeaderRight {...props} />
      ),
      // eslint-disable-next-line react/display-name
      headerLeft: (props: JSX.IntrinsicAttributes) => (
        <HomeHeaderLeft {...props} />
      ),
    });
  }, []);

  const { name, register, email, roles } = route.params;

  return (
    <View>
      <WeekdaySelection />
      <View style={styles.container}>
        {weekdays.map((weekday, index) => (
          <Weekday
            key={`weekday-${weekday.date}`}
            name={weekday.name}
            date={weekday.date}
            schedules={weekday.schedules}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: colors.backgroud,

    paddingHorizontal: 12,
    paddingVertical: 16,

    height: '100%',
  },
});

export default Home;

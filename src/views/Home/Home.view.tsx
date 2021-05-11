import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {
  getWeekdayName,
  getDayAndMonth,
  getLastMonday,
  getNextSaturday,
  addDays,
} from '../../utils/date';

import MenuButtonHeader from '../../components/MenuButtonHeader';
import HomeHeaderRight from './HomeHeaderRight.component';
import Weekday from './Weekday.component';

import WeekdaySelection from './WeekSelection.component';

import colors from '../../styles/colors';

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

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: (props: JSX.IntrinsicAttributes) => (
        <HomeHeaderRight {...props} />
      ),
      // eslint-disable-next-line react/display-name
      headerLeft: (props: JSX.IntrinsicAttributes) => (
        <MenuButtonHeader {...props} />
      ),
    });
  }, []);

  const [weekBeginDate, setWeekBeginDate] = useState(getLastMonday(new Date()));
  const [weekEndDate, setWeekEndDate] = useState(getNextSaturday(new Date()));

  const nextWeek = useCallback(() => {
    setWeekBeginDate(addDays(weekBeginDate, 7));
    setWeekEndDate(addDays(weekEndDate, 7));
  }, [setWeekBeginDate, weekBeginDate]);

  const previousWeek = useCallback(() => {
    setWeekBeginDate(addDays(weekBeginDate, -7));
    setWeekEndDate(addDays(weekEndDate, -7));
  }, [setWeekBeginDate, weekBeginDate]);

  return (
    <View>
      <WeekdaySelection
        onPressNext={nextWeek}
        onPressPrevious={previousWeek}
        weekBeginDate={weekBeginDate}
        weekEndDate={weekEndDate}
      />
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

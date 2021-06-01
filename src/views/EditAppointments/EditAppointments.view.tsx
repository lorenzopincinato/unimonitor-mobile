import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {
  getWeekdayName,
  getDayAndMonth,
  getLastMonday,
  getNextSaturday,
  getIsoDate,
  addDays,
} from '../../utils/date';

import MenuButtonHeader from '../../components/MenuButtonHeader';
import Weekday from './Weekday.component';

import WeekdaySelection from './WeekSelection.component';

import colors from '../../styles/colors';
import api from '../../io/api';

const EditAppointmentsView = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
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
    setWeekdays([]);
  }, [setWeekBeginDate, weekBeginDate]);

  const previousWeek = useCallback(() => {
    setWeekBeginDate(addDays(weekBeginDate, -7));
    setWeekEndDate(addDays(weekEndDate, -7));
    setWeekdays([]);
  }, [setWeekBeginDate, weekBeginDate]);

  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get(
        `schedules?begin=${getIsoDate(weekBeginDate)}&end=${getIsoDate(
          weekEndDate,
        )}`,
      );

      setWeekdays(response.data);
    })();
  }, [weekBeginDate, weekEndDate]);

  return (
    <View>
      <WeekdaySelection
        onPressNext={nextWeek}
        onPressPrevious={previousWeek}
        weekBeginDate={weekBeginDate}
        weekEndDate={weekEndDate}
      />
      <ScrollView style={styles.container}>
        {weekdays.map((weekday, index) => (
          <Weekday
            key={`weekday-${weekday.date}`}
            date={new Date(weekday.date)}
            schedules={weekday.schedules}
            index={index}
          />
        ))}
      </ScrollView>
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

export default EditAppointmentsView;

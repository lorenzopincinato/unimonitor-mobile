import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDayAndMonth, getWeekdayName } from '../../utils/date';
import Schedule from './Schedule.component';

type WeekdayProps = {
  index: number;
  date: Date;
  schedules: any;
};

const Weekday: FC<WeekdayProps> = ({ index, date, schedules }) => {
  const getHeaderStyle = (index: number) => {
    if (index === 0) {
      return StyleSheet.compose(styles.header, styles.headerFirst);
    }

    return styles.header;
  };

  return (
    <View>
      <View style={getHeaderStyle(index)}>
        <Text style={styles.headerText}>{getWeekdayName(date)}</Text>
        <Text style={styles.headerText}>{getDayAndMonth(date)}</Text>
      </View>
      {schedules.map((schedule, index) => (
        <Schedule
          id={schedule.id}
          key={`schedule-${schedule.id}`}
          index={index}
          begin={schedule.begin}
          end={schedule.end}
          status={schedule.status}
          monitoring={schedule.monitoring}
          appointments={schedule.appointments}
          date={date}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 12,
    marginBottom: 12,
  },
  headerFirst: {
    marginTop: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Weekday;

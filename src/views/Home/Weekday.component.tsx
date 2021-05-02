import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Schedule from './Schedule.component';

type WeekdayProps = {
  index: number;
  name: string;
  date: string;
  schedules: any;
};

const Weekday: FC<WeekdayProps> = ({ index, name, date, schedules }) => {
  const getHeaderStyle = (index: number) => {
    if (index === 0) {
      return StyleSheet.compose(styles.header, styles.headerFirst);
    }

    return styles.header;
  };

  return (
    <View>
      <View style={getHeaderStyle(index)}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      {schedules.map((schedule, index) => (
        <Schedule
          key={`schedule-${schedule.id}`}
          index={index}
          begin={schedule.begin}
          end={schedule.end}
          subject={schedule.subject}
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

    marginTop: 16,
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

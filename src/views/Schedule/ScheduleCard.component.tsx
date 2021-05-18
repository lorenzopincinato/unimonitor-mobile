import { format } from 'date-fns';
import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

type ScheduleCardProps = {
  begin: string;
  end: string;
  weekday: string;
};

const ScheduleCard: FC<ScheduleCardProps> = ({ begin, end, weekday }) => {
  return (
    <View style={styles.container}>
      <View style={styles.groupHour}>
        {/* <Text>{`${format(new Date(begin), 'HH:mm')}`}</Text> */}
        <Text style={styles.hour}>{begin}</Text>
        <Text style={styles.hourText}>Início</Text>
      </View>

      <View style={styles.groupHour}>
        {/* <Text>{`${format(new Date(end), 'HH:mm')}`}</Text> */}
        <Text style={styles.hour}>{end}</Text>
        <Text style={styles.hourText}>Fim</Text>
      </View>

      <View style={styles.groupWeekday}>
        <Text style={styles.weekday}>{weekday}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',

    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 20,

    backgroundColor: colors.grey300,
    borderRadius: 15,
    height: 85,
  },
  groupHour: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
  },
  hour: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hourText: {
    fontSize: 14,
    textAlign: 'center',
  },
  groupWeekday: {
    marginLeft: 65,
    justifyContent: 'center',
  },
  weekday: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ScheduleCard;

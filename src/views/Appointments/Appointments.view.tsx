import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDayAndMonth, getWeekdayName } from '../../utils/date';
import Appointment from './Appointment.component';

const Appointments = ({ route }) => {
  const { appointments, monitoring, date, scheduleId } = route.params;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getWeekdayName(new Date(date))}</Text>
        <Text style={styles.headerText}>{getDayAndMonth(new Date(date))}</Text>
      </View>
      <Text style={styles.subjectName}>{monitoring.subject.name}</Text>
      <View style={styles.details}>
        <View style={styles.inlineContent}>
          <Text style={styles.boldSmallText}>{'Monitor: '}</Text>
          <Text style={styles.smallText}>{monitoring.monitor.name}</Text>
        </View>
        <View style={styles.inlineContent}>
          <Text style={styles.boldSmallText}>{'Local: '}</Text>
          <Text style={styles.smallText}>{'Local da Monitoria'}</Text>
        </View>
      </View>
      {appointments.map(appointment => (
        <Appointment
          key={appointment.begin}
          begin={appointment.begin}
          end={appointment.end}
          status={appointment.status}
          id={appointment.id}
          scheduleId={scheduleId}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    padding: 12,

    backgroundColor: '#F7FAFC',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subjectName: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',

    paddingTop: 12,
  },
  details: {
    marginTop: 4,

    width: '100%',
  },
  inlineContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  boldSmallText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
    lineHeight: 16,
  },
});

export default Appointments;

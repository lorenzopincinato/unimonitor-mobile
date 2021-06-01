import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { getLocalTzDate, getMinutesAndHours } from '../../utils/date';

import colors from '../../styles/colors';

const Monitoring: FC = ({ subject, monitor, schedules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <TouchableOpacity style={styles.scheduleContainer} onPress={toggleOpen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <View style={styles.inlineContent}>
            <Text style={styles.boldSmallText}>{'Monitor: '}</Text>
            <Text style={styles.smallText}>{monitor.name}</Text>
          </View>
        </View>
      </View>
      {isOpen ? (
        <>
          <View style={styles.details}>
            <View style={styles.inlineContent}>
              <Text style={styles.boldSmallText}>{'Local: '}</Text>
              <Text style={styles.smallText}>{'Local da Monitoria'}</Text>
            </View>
            <View style={styles.inlineContent}>
              <Text style={styles.boldSmallText}>{'Horários: '}</Text>
            </View>
            {schedules.map(schedule => (
              <View key={schedule.id} style={styles.inlineContent}>
                <Text style={styles.smallText}>{`${schedule.weekday}: `}</Text>
                <Text style={styles.smallText}>{`${schedule.begin.slice(
                  0,
                  -3,
                )} - ${schedule.end.slice(0, -3)}`}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 8,

    marginBottom: 12,

    padding: 8,

    backgroundColor: colors.white,
  },
  header: {
    display: 'flex',

    flexDirection: 'row',

    width: '100%',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjectName: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subjectBeginEnd: {
    fontSize: 14,
    lineHeight: 16,
  },
  details: {
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

export default Monitoring;

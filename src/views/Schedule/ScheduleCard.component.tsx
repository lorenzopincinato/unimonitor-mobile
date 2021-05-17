import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import colors from '../../styles/colors';

type ScheduleCardProps = {
  begin: string;
  end: string;
  weekday: string;
};

const ScheduleCard: FC<ScheduleCardProps> = ({ begin, end, weekday }) => {
  return (
    <View style={styles.container}>
      {/* <Text>{`${format(new Date(begin), 'HH:mm')}`}</Text> */}
      <Text>{begin}</Text>

      {/* <Text>{`${format(new Date(end), 'HH:mm')}`}</Text> */}
      <Text>{end}</Text>

      <Text>{weekday}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 20,

    backgroundColor: colors.grey300,
    borderRadius: 15,
  },
});

export default ScheduleCard;

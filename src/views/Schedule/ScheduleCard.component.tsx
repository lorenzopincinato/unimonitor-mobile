import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';

type ScheduleCardProps = {
  begin: string;
  end: string;
  weekday: string; //FIXME: deve ser array
};

const ScheduleCard: FC<ScheduleCardProps> = ({ begin, end, weekday }) => {
  return (
    <View style={styles.container}>
      <Text>{begin}</Text>
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
  },
});

export default ScheduleCard;

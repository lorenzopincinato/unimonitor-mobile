import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';

type ScheduleCardProps = {
  index: number;
  begin: string;
  end: string;
  subject: {
    name: string;
  };
};

const ScheduleCard = () => {
  return (
    <View style={styles.container}>
      <Text>a</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,

    height: '100%',
  },
});

export default ScheduleCard;

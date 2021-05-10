import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../styles/colors';

const WeekdaySelection: FC = () => (
  <View style={styles.container}>
    <AntDesign name="caretleft" size={20} color={colors.white} />
    <Text style={styles.text}>{`Semana de 09/03 a 15/03`}</Text>
    <AntDesign name="caretright" size={20} color={colors.white} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    backgroundColor: colors.secondaryBlue,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default WeekdaySelection;

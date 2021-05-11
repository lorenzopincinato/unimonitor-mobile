import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../styles/colors';
import { getDayAndMonth } from '../../utils/date';

type WeekdaySelecioProps = {
  onPressPrevious: () => void;
  onPressNext: () => void;
  weekBeginDate: Date;
  weekEndDate: Date;
};

const WeekdaySelection: FC<WeekdaySelecioProps> = ({
  onPressPrevious,
  onPressNext,
  weekBeginDate,
  weekEndDate,
}) => (
  <View style={styles.container}>
    <AntDesign
      name="caretleft"
      size={20}
      color={colors.white}
      onPress={onPressPrevious}
    />
    <Text style={styles.text}>{`Semana de ${getDayAndMonth(
      weekBeginDate,
    )} a ${getDayAndMonth(weekEndDate)}`}</Text>
    <AntDesign
      name="caretright"
      size={20}
      color={colors.white}
      onPress={onPressNext}
    />
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
  },
});

export default WeekdaySelection;

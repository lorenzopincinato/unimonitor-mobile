import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton: FC<CustomButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    borderRadius: 4,
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignContent: 'center',
  },
  text: {
    color: colors.white,
    lineHeight: 16,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CustomButton;

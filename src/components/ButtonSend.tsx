import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ButtonSend({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBlue,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
});

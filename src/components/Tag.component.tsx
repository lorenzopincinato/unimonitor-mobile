import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../styles/colors';

type TagProps = {
  variant: string;
};

const Tag: FC<TagProps> = ({ variant, children }) => (
  <View style={styles.tag}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',

    height: 21,

    paddingHorizontal: 4,
    borderRadius: 2,

    backgroundColor: colors.primaryBlue,
  },
  text: {
    color: colors.white,

    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Tag;

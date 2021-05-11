import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../styles/colors';

type TagProps = {
  color: string;
};

const Tag: FC<TagProps> = ({ color, children }) => (
  <View style={{ ...styles.tag, backgroundColor: color }}>
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

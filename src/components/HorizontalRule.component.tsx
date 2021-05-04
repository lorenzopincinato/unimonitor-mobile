import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../styles/colors';

const HorizontalRule = () => <View style={styles.horizontalRule} />;

const styles = StyleSheet.create({
  horizontalRule: {
    borderBottomColor: colors.grey300,
    borderBottomWidth: 1,

    marginTop: 8,
  },
});

export default HorizontalRule;

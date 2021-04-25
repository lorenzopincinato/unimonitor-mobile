import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from '../styles/colors';

const LoadingIndicator = () => (
  <ActivityIndicator size="large" color={colors.primaryBlue} />
);

export default LoadingIndicator;

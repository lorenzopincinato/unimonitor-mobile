import 'react-native-gesture-handler';
import * as React from 'react';
import { registerRootComponent } from 'expo';

import Routes from './Routes';

const App = () => {
  return <Routes />;
};

export default registerRootComponent(App);

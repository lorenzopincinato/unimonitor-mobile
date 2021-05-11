import 'react-native-gesture-handler';
import * as React from 'react';
import { registerRootComponent } from 'expo';

import Routes from './routes';

const App = () => {
  return <Routes />;
};

export default registerRootComponent(App);

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MonitoringsView from '../views/Monitorings/Monitorings.view';

const Stack = createStackNavigator();

const MonitoringsRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Monitorings"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#165095',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Monitorings"
        component={MonitoringsView}
        options={{
          title: 'Monitorias Oferecidas',
        }}
      />
    </Stack.Navigator>
  );
};

export default MonitoringsRoute;

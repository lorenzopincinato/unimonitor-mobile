import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeView from '../views/Home/Home.view';
import AppointmentsView from '../views/Appointments/Appointments.view';

const Stack = createStackNavigator();

const SchedulesRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="All"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#165095',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="All"
        component={HomeView}
        options={{
          title: 'Monitorias',
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentsView}
        options={{
          title: 'Agendar Monitoria',
        }}
      />
    </Stack.Navigator>
  );
};

export default SchedulesRoute;

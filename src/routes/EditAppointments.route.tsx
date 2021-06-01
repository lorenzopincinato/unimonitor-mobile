import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EditAppointmentsView from '../views/EditAppointments/EditAppointments.view';

const Stack = createStackNavigator();

const EditAppointmentsRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="EditAppointments"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#165095',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="EditAppointments"
        component={EditAppointmentsView}
        options={{
          title: 'Monitorias Agendadas',
        }}
      />
    </Stack.Navigator>
  );
};

export default EditAppointmentsRoute;

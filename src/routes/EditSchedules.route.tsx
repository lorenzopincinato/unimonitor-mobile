import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SchedulesView from '../views/Schedule/Schedule.view';
import NewScheduleView from '../views/Schedule/ScheduleNew.view';

const Stack = createStackNavigator();

const SchedulesRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Schedules"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#165095',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="All"
        component={SchedulesView}
        options={{
          title: 'Horário da Monitoria',
        }}
      />

      <Stack.Screen
        name="New"
        component={NewScheduleView}
        options={{
          title: 'Novo Horário da Monitoria',
        }}
      />
    </Stack.Navigator>
  );
};

export default SchedulesRoute;

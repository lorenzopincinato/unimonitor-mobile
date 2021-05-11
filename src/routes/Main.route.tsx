import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Schedules from './Schedules.route';
import Notices from './Notices.route';
import EditSchedules from './EditSchedules.route';

const Drawer = createDrawerNavigator();

const MainRoute = () => {
  return (
    <Drawer.Navigator initialRouteName="Schedules">
      <Drawer.Screen
        name="Schedules"
        component={Schedules}
        options={{ title: 'Monitorias' }}
      />
      <Drawer.Screen
        name="Notices"
        component={Notices}
        options={{ title: 'Quadro de Avisos' }}
      />
      <Drawer.Screen
        name="EditSchedules"
        component={EditSchedules}
        options={{ title: 'Horário das Monitorias' }}
      />
    </Drawer.Navigator>
  );
};

export default MainRoute;

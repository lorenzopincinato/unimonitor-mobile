import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Schedules from './Schedules.route';
import Monitorings from './Monitorings.route';
import Notices from './Notices.route';
import EditSchedules from './EditSchedules.route';
import Logout from '../views/Logout/Logout.view';
import useUserInfo from '../hooks/useUserInfo';

const Drawer = createDrawerNavigator();

const MainRoute = () => {
  const { isMonitor } = useUserInfo();

  return (
    <Drawer.Navigator initialRouteName="Schedules">
      <Drawer.Screen
        name="Schedules"
        component={Schedules}
        options={{ title: 'Monitorias da Semana' }}
      />
      <Drawer.Screen
        name="Monitorings"
        component={Monitorings}
        options={{ title: 'Monitorias Oferecidas' }}
      />
      <Drawer.Screen
        name="Notices"
        component={Notices}
        options={{ title: 'Quadro de Avisos' }}
      />
      {isMonitor ? (
        <Drawer.Screen
          name="EditSchedules"
          component={EditSchedules}
          options={{ title: 'Horário das Monitorias' }}
        />
      ) : null}
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ title: 'Sair' }}
      />
    </Drawer.Navigator>
  );
};

export default MainRoute;

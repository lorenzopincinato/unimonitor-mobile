import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './views/Login/Login.view';
import Home from './views/Home/Home.view';
import NoticeBoard from './views/NoticeBoard/NoticeBoard.view';
import NoticeDetails from './views/NoticeDetails/NoticeDetails.view';
import NoticeWrite from './views/NoticeWrite/NoticeWrite.view';
import DebugToken from './views/DebugToken/DebugToken.viuew';
import Schedule from './views/Schedule/Schedule.view';
import ScheduleNew from './views/Schedule/ScheduleNew.view';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#165095',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="DebugToken"
          component={DebugToken}
          options={{
            title: 'Entrar com Token de Depuração',
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Monitorias',
            headerLeft: () => null,
          }}
        />

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{
            title: 'Horário da Monitoria',
          }}
        />

        <Stack.Screen
          name="ScheduleNew"
          component={ScheduleNew}
          options={{
            title: 'Novo Horário da Monitoria',
          }}
        />

        <Stack.Screen
          name="NoticeBoard"
          component={NoticeBoard}
          options={{
            title: 'Quadro de Avisos',
          }}
        />

        <Stack.Screen
          name="NoticeWrite"
          component={NoticeWrite}
          options={{
            title: 'Novo aviso',
          }}
        />

        <Stack.Screen
          name="NoticeDetails"
          component={NoticeDetails}
          options={{
            title: 'Aviso',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

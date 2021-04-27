import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './views/Login/Login.view';
import Home from './views/Home/Home.view';
import NoticeBoard from './views/NoticeBoard/NoticeBoard.view';
import NoticeDetails from './views/NoticeDetails/NoticeDetails.view';

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
          name="Home"
          component={Home}
          options={{
            title: 'Monitorias',
            headerLeft: () => null,
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

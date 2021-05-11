import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../views/Login/Login.view';
import DebugToken from '../views/DebugToken/DebugToken.view';

import MainRoute from './Main.route';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
          name="Main"
          component={MainRoute}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

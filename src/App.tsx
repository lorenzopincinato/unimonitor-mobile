import 'react-native-gesture-handler';
import * as React from 'react';
import { registerRootComponent } from 'expo'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '@views/Login/Login.view';
import Home from '@views/Home/Home.view';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'UNIMONITOR - LOGIN',
            headerStyle: {
              backgroundColor: '#165095',
            },
            headerTintColor: '#fff',
          }}/>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'UNIMONITOR - HOME',
            headerStyle: {
              backgroundColor: '#165095',
            },
            headerTintColor: '#fff',
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

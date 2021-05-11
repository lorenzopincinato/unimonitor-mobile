import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeView from '../views/Home/Home.view';

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
    </Stack.Navigator>
  );
};

export default SchedulesRoute;

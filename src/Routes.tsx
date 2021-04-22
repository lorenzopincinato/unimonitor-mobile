import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './views/Login/Login.view';
import Home from './views/Home/Home.view';
import NoticeBoard from './views/NoticeBoard/NoticeBoard.view';
import NoticeDetails from './views/NoticeDetails/NoticeDetails.view';

import BellIcon from './icons/BellIcon.icon';

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
          options={({ navigation }) => {
            return {
              title: 'Monitorias',
              headerRight: () => (
                <BellIcon onPress={() => navigation.navigate('NoticeBoard')} />
              ),
              headerLeft: () => null,
            };
          }}
        />
        <Stack.Screen
          name="NoticeBoard"
          component={NoticeBoard}
          options={{
            title: 'Quadro de avisos',
          }}
        />
        <Stack.Screen
          name="NoticeDetails"
          component={NoticeDetails}
          options={{
            title: 'Detalhes do Aviso',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

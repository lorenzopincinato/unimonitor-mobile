import 'react-native-gesture-handler';
import * as React from 'react';
import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/Login/Login.view';
import Home from './views/Home/Home.view';
import NoticeBoard from './views/NoticeBoard/NoticeBoard.view';
import NoticeDetails from './views/NoticeDetails/NoticeDetails.view';
import BellIcon from './icons/BellIcon.icon';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Unimonitor',
            headerStyle: {
              backgroundColor: '#165095',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => {
            return {
              title: 'Monitorias',
              headerStyle: {
                backgroundColor: '#165095',
              },
              headerTintColor: '#fff',
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
            headerStyle: {
              backgroundColor: '#165095',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="NoticeDetails"
          component={NoticeDetails}
          options={{
            title: 'Detalhes do Aviso',
            headerStyle: {
              backgroundColor: '#165095',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default registerRootComponent(App);

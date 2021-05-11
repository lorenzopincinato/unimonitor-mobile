import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import NoticeBoardView from '../views/NoticeBoard/NoticeBoard.view';
import NoticeWriteView from '../views/NoticeWrite/NoticeWrite.view';
import NoticeDetailsView from '../views/NoticeDetails/NoticeDetails.view';

const Stack = createStackNavigator();

const NoticesRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Board"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#165095',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Board"
        component={NoticeBoardView}
        options={{
          title: 'Quadro de Avisos',
        }}
      />

      <Stack.Screen
        name="Write"
        component={NoticeWriteView}
        options={{
          title: 'Novo aviso',
        }}
      />

      <Stack.Screen
        name="Details"
        component={NoticeDetailsView}
        options={{
          title: 'Aviso',
        }}
      />
    </Stack.Navigator>
  );
};

export default NoticesRoute;

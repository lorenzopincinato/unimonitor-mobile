import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { getWeekdayName, getDayAndMonth } from '../../utils/date';

import HomeHeaderLeft from './HomeHeaderLeft.component';
import HomeHeaderRight from './HomeHeaderRight.component';
import Weekday from './Weekday.component';

import colors from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const weekdays = [
  {
    name: getWeekdayName(new Date('2021-05-03')),
    date: getDayAndMonth(new Date('2021-05-03')),
    schedules: [
      {
        id: 1,
        begin: '17:00',
        end: '19:00',
        status: 'available',
        subject: {
          id: 1,
          name: 'Banco de Dados A',
        },
      },
    ],
  },
];

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: (props: JSX.IntrinsicAttributes) => (
        <HomeHeaderRight {...props} />
      ),
      // eslint-disable-next-line react/display-name
      headerLeft: (props: JSX.IntrinsicAttributes) => (
        <HomeHeaderLeft {...props} />
      ),
    });
  }, []);

  const { name, register, email, roles } = route.params;

  function goToSchedule() {
    navigation.navigate('Schedule');
  }

  return (
    <View style={styles.container}>
      {weekdays.map((weekday, index) => (
        <Weekday
          key={`weekday-${weekday.date}`}
          name={weekday.name}
          date={weekday.date}
          schedules={weekday.schedules}
          index={index}
        />
      ))}
      {/* TODO: passar para o Menu */}
      <TouchableOpacity style={styles.button} onPress={goToSchedule}>
        <Text style={styles.buttonText}>Horário Monitoria</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: colors.backgroud,

    paddingHorizontal: 12,
    paddingVertical: 16,

    height: '100%',
  },
  button: {
    // TODO: passar para o Menu
    backgroundColor: colors.grey300,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginVertical: 30,
  },
  buttonText: {
    // TODO: passar para o Menu
    fontSize: 16,
    color: colors.white,
  },
});

export default Home;

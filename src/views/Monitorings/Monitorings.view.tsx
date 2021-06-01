import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuButtonHeader from '../../components/MenuButtonHeader';
import Monitoring from './Monitoring.component';
import { getLastMonday, getNextSaturday, getIsoDate } from '../../utils/date';

import colors from '../../styles/colors';
import api from '../../io/api';
import { getUserId } from '../../io/asyncStorage';

const Monitorings = () => {
  const navigation = useNavigation();

  const [monitorings, setMonitorings] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerLeft: (props: JSX.IntrinsicAttributes) => (
        <MenuButtonHeader {...props} />
      ),
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const userId = await getUserId();

        const monitoringsResponse = await api.get(
          `monitorings?userId=${userId}`,
        );
        const schedules = [];

        for (const monitoring of monitoringsResponse.data) {
          const scheduleResponse = await api.get(
            `schedules?monitoringId=${monitoring.id}`,
          );

          console.log(scheduleResponse.data);

          if (scheduleResponse.data) {
            scheduleResponse.data.forEach(schedule => {
              schedules.push(schedule);
            });
          }
        }

        const monitorings = monitoringsResponse.data.map(monitoring => ({
          ...monitoring,
          schedules: schedules.filter(
            schedule => schedule.monitoring.id === monitoring.id,
          ),
        }));

        setMonitorings(monitorings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {monitorings.map(monitoring => (
        <Monitoring
          key={`monitoring-${monitoring.id}`}
          subject={monitoring.subject}
          monitor={monitoring.monitor}
          schedules={monitoring.schedules}
        />
      ))}
    </ScrollView>
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
});

export default Monitorings;

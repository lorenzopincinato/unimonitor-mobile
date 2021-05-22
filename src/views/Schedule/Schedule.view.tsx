import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/core';

import { AntDesign } from '@expo/vector-icons';

import LoadingIndicator from '../../components/LoadingIndicator.component';
import { getUserId } from '../../io/asyncStorage';
import api from '../../io/api';
import colors from '../../styles/colors';
import MenuButtonHeader from '../../components/MenuButtonHeader';
import ScheduleCard from './ScheduleCard.component';

const Schedule = () => {
  const [monitorings, setMonitorings] = useState([]);
  const [monitoringIdSelected, setMonitoringIdSelected] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

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
        setIsLoading(true);

        const userId = await getUserId();
        const monitoringsApi = await api.get(
          `/monitorings?monitorId=${userId}`,
        );
        setMonitorings(monitoringsApi.data);
        setMonitoringIdSelected(monitoringsApi.data[0].id);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert('Disciplinas', error.response.data.message);
        setIsLoading(false);
      }
    })();
  }, []);

  function handleNewSchedule() {
    navigation.navigate('New', { monitoringSelected: monitoringIdSelected });
  }

  useEffect(() => {
    if (monitoringIdSelected) {
      (async () => {
        try {
          setIsLoading(true);

          const schedulesApi = await api.get(
            `/schedules?monitoringId=${monitoringIdSelected}`,
          );
          setSchedules(schedulesApi.data);

          setIsLoading(false);
        } catch (error) {
          console.log(error);
          Alert.alert('Horários', error.response.data.message);
          setIsLoading(false);
        }
      })();
    }
  }, [monitoringIdSelected]);

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : null}

      <Text style={styles.monitoringText}>Monitoria:</Text>

      <DropDownPicker
        items={monitorings.map(monitoring => ({
          label: monitoring.subject.name + ' - ' + monitoring.monitor.name,
          value: monitoring.id,
        }))}
        containerStyle={{ height: 45 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        setValue={setMonitoringIdSelected}
        value={monitoringIdSelected}
        open={open}
        setOpen={setOpen}
      />

      <View style={styles.plusButtonView}>
        <TouchableOpacity
          style={styles.plusButton}
          activeOpacity={0.7}
          onPress={handleNewSchedule}
        >
          <AntDesign name="plus" style={styles.plusButtonIcon} />
        </TouchableOpacity>
      </View>

      {schedules.map(schedule => (
        <ScheduleCard
          key={`schedule-${schedule.id}`}
          begin={schedule.begin}
          end={schedule.end}
          weekday={schedule.weekday}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    paddingHorizontal: 12,
    paddingVertical: 16,

    height: '100%',
  },
  monitoringText: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  plusButtonView: {
    alignItems: 'flex-end',
  },
  plusButton: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    marginTop: 70,
    marginBottom: 10,
    height: 46,
    width: 46,
  },
  plusButtonIcon: {
    fontSize: 32,
    color: colors.white,
    padding: 6,
    height: '100%',
  },
});

export default Schedule;

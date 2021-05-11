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

const Schedule = () => {
  const [monitorings, setMonitorings] = useState([]);
  const [monitoringSelected, setMonitoringSelected] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

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

        const userId = await getUserId(); //TODO use to filter the monitorings
        const monitoringsApi = await api.get(`/monitorings`);
        setMonitorings(monitoringsApi.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Disciplinas',
          'Erro ao buscar monitorias, tente novamente mais tarde',
        );
        setIsLoading(false);
      }
    })();
  }, []);

  function handleNewSchedule() {
    navigation.navigate('New', { monitoringSelected });
  }

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : null}

      <Text>Monitoria:</Text>
      <DropDownPicker
        items={monitorings.map(monitoring => ({
          label: monitoring.subject.name + ' - ' + monitoring.monitor.name,
          value: monitoring.id,
        }))}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={item => setMonitoringSelected(item.value)}
      />

      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.7}
        onPress={handleNewSchedule}
      >
        <AntDesign name="plus" style={styles.plusButtonIcon} />
      </TouchableOpacity>
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
  plusButton: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
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

import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePiker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { weekdayNames, getMinutesAndHours } from '../../utils/date';
import { ButtonSend } from '../../components/ButtonSend';
import api from '../../io/api';

type ScheduleCardProps = {
  index: number;
  begin: string;
  end: string;
  subject: {
    name: string;
  };
};

const ScheduleNew = ({ route }) => {
  const [weekdayName, setWeekdayName] = useState<string>();
  const [hourBegin, setHourBegin] = useState(new Date());
  const [hourEnd, setHourEnd] = useState(new Date());
  const [showDatePikerBegin, setShowDatePikerBegin] = useState(false);
  const [showDatePikerEnd, setShowDatePikerEnd] = useState(false);

  const { monitoringSelected } = route.params;
  const navigation = useNavigation();

  function handleChangeTimeBegin(event: Event, dateTime: Date | undefined) {
    setShowDatePikerBegin(oldState => !oldState);

    if (dateTime) {
      setHourBegin(dateTime);
    }
  }

  function handleOpenDatetimePickerBegin() {
    setShowDatePikerBegin(oldState => !oldState);
  }

  function handleChangeTimeEnd(event: Event, dateTime: Date | undefined) {
    setShowDatePikerEnd(oldState => !oldState);

    if (dateTime) {
      setHourEnd(dateTime);
    }
  }

  function handleOpenDatetimePickerEnd() {
    setShowDatePikerEnd(oldState => !oldState);
  }

  async function handleSave() {
    const schedule = {
      weekday: weekdayName,
      begin: getMinutesAndHours(hourBegin),
      end: getMinutesAndHours(hourEnd),
      monitoring: {
        id: monitoringSelected,
      },
    };
    console.log(schedule);

    try {
      await api.post('/schedules', schedule);
      Alert.alert('Horários', 'Horário criado', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('All');
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Horários', error.response.data.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Dia da semana:</Text>
      <DropDownPicker
        items={weekdayNames.map(weekdayName => ({
          label: weekdayName,
          value: weekdayName,
        }))}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={item => setWeekdayName(item.value)}
      />

      <Text>Hora de início:</Text>
      <TouchableOpacity
        // style={styles.dataTimePickerButton}
        onPress={handleOpenDatetimePickerBegin}
      >
        <Text>{`${format(hourBegin, 'HH:mm')}`}</Text>
      </TouchableOpacity>

      {showDatePikerBegin && (
        <DateTimePiker
          value={hourBegin}
          mode="time"
          display="spinner"
          onChange={handleChangeTimeBegin}
        />
      )}

      <Text>Hora de fim:</Text>
      <TouchableOpacity
        // style={styles.dataTimePickerButton}
        onPress={handleOpenDatetimePickerEnd}
      >
        <Text>{`${format(hourEnd, 'HH:mm')}`}</Text>
      </TouchableOpacity>

      {showDatePikerEnd && (
        <DateTimePiker
          value={hourEnd}
          mode="time"
          display="spinner"
          onChange={handleChangeTimeEnd}
        />
      )}

      <ButtonSend title="Salvar" onPress={handleSave} />
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
});

export default ScheduleNew;

import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePiker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { weekdayNames, getMinutesAndHours } from '../../utils/date';
import { ButtonSend } from '../../components/ButtonSend';
import api from '../../io/api';
import colors from '../../styles/colors';

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
      <Text style={styles.weekdayText}>Dia da semana:</Text>

      <DropDownPicker
        items={weekdayNames.map(weekdayName => ({
          label: weekdayName,
          value: weekdayName,
        }))}
        containerStyle={{ height: 40, width: '80%' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={item => setWeekdayName(item.value)}
        defaultValue={weekdayNames[0]}
      />

      <Text style={styles.hourText}>Hora de início:</Text>
      <TouchableOpacity
        // style={styles.dataTimePickerButton}
        onPress={handleOpenDatetimePickerBegin}
      >
        <Text style={styles.hour}>{`${format(hourBegin, 'HH:mm')}`}</Text>
      </TouchableOpacity>

      {showDatePikerBegin && (
        <DateTimePiker
          value={hourBegin}
          mode="time"
          display="spinner"
          onChange={handleChangeTimeBegin}
        />
      )}

      <Text style={styles.hourText}>Hora de fim:</Text>
      <TouchableOpacity
        // style={styles.dataTimePickerButton}
        onPress={handleOpenDatetimePickerEnd}
      >
        <Text style={styles.hour}>{`${format(hourEnd, 'HH:mm')}`}</Text>
      </TouchableOpacity>

      {showDatePikerEnd && (
        <DateTimePiker
          value={hourEnd}
          mode="time"
          display="spinner"
          onChange={handleChangeTimeEnd}
        />
      )}

      <View style={styles.btnSave}>
        <ButtonSend title="Salvar" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingVertical: 16,

    height: '100%',
  },
  weekdayText: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  hourText: {
    marginTop: 30,
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  hour: {
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: colors.white,
  },
  btnSave: {
    marginTop: 30,
  },
});

export default ScheduleNew;

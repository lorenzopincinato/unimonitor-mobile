import React, { FC, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tag from '../../components/Tag.component';
import api from '../../io/api';
import { getUserId } from '../../io/asyncStorage';

import colors from '../../styles/colors';
import { getIsoDateTime, getMinutesAndHours } from '../../utils/date';
import CustomButton from '../Home/CustomButton.component';

const translateStatus = (status: string) => {
  switch (status) {
    case 'available':
      return 'Disponível';
    case 'unavailable':
      return 'Indisponível';
    case 'past':
      return 'Passada';
    case 'booked':
      return 'Agendada';
    case 'withBooking':
      return 'Com Agendamento';
    default:
      return '';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return colors.green;
    case 'unavailable':
      return colors.red;
    case 'past':
      return colors.orange;
    case 'booked':
    case 'withBooking':
      return colors.secondaryBlue;
    default:
      return colors.primaryBlue;
  }
};

type AppointmentProps = {
  begin: string;
  end: string;
  status: string;
  id: string;
  scheduleId: string;
};

const Appointment: FC<AppointmentProps> = ({
  begin,
  end,
  status,
  id,
  scheduleId,
}) => {
  const handleNewAppointment = useCallback(() => {
    (async () => {
      try {
        await api.post(`appointments`, {
          student: { id: await getUserId() },
          schedule: { id: scheduleId },
          begin: new Date(begin),
          end: new Date(end),
        });

        alert('Agendamento feito!');
      } catch (error) {
        alert(error.response.data.message);
      }
    })();
  }, []);

  const handleCancelAppointment = useCallback(() => {
    (async () => {
      try {
        await api.delete(`appointments/${id}`);

        alert('Agendamento desmarcado!');
      } catch (error) {
        alert(error.response.data.message);
      }
    })();
  }, []);

  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.beginEnd}>{`${getMinutesAndHours(
            new Date(begin),
          )} - ${getMinutesAndHours(new Date(end))}`}</Text>
          <Tag color={getStatusColor(status)}>{translateStatus(status)}</Tag>
        </View>
        {status === 'available' ? (
          <CustomButton title={'Agendar'} onPress={handleNewAppointment} />
        ) : null}
        {status === 'booked' ? (
          <CustomButton title={'Desmarcar'} onPress={handleCancelAppointment} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 8,

    marginTop: 12,

    padding: 8,

    backgroundColor: colors.white,
  },
  header: {
    display: 'flex',

    flexDirection: 'row',

    width: '100%',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  beginEnd: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Appointment;

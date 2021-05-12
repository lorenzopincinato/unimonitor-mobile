import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton.component';
import HorizontalRule from '../../components/HorizontalRule.component';
import Tag from '../../components/Tag.component';

import colors from '../../styles/colors';
import { getMinutesAndHours } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import useUserInfo from '../../hooks/useUserInfo';

type ScheduleProps = {
  id: string;
  index: number;
  begin: string;
  end: string;
  status: string;
  date: Date;
  monitoring: {
    subject: { name: string };
    monitor: { name: string };
  };
  appointments: {
    id: number;
    begin: string;
    end: string;
  }[];
};

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

const Schedule: FC<ScheduleProps> = ({
  index,
  id,
  begin,
  end,
  monitoring,
  appointments,
  status,
  date,
}) => {
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const { isProfessor } = useUserInfo();

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <TouchableOpacity style={styles.scheduleContainer} onPress={toggleOpen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subjectName}>{monitoring.subject.name}</Text>
          <Text>{`${begin} - ${end}`}</Text>
        </View>
        <Tag color={getStatusColor(status)}>{translateStatus(status)}</Tag>
      </View>
      {isOpen ? (
        <>
          <HorizontalRule />
          <View style={styles.details}>
            <View style={styles.inlineContent}>
              <Text style={styles.boldSmallText}>{'Monitor: '}</Text>
              <Text style={styles.smallText}>{monitoring.monitor.name}</Text>
            </View>
            <View style={styles.inlineContent}>
              <Text style={styles.boldSmallText}>{'Local: '}</Text>
              <Text style={styles.smallText}>{'Local da Monitoria'}</Text>
            </View>
            <View
              style={{ marginTop: 12, display: 'flex', flexDirection: 'row' }}
            >
              <View>
                <Text style={styles.boldSmallText}>{'Horários: '}</Text>
                {appointments.map(appointment => (
                  <Text
                    key={`appointment-${monitoring.subject.name}-${appointment.begin}`}
                    style={{ ...styles.smallText, paddingTop: 4 }}
                  >
                    {`${getMinutesAndHours(
                      new Date(appointment.begin),
                    )} - ${getMinutesAndHours(new Date(appointment.end))}${
                      isProfessor ? ` - ${appointment.student.name}` : ''
                    }`}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  display: 'flex',
                  flex: 1,

                  justifyContent: 'flex-end',
                }}
              >
                {(status === 'available' || status === 'booked') &&
                !isProfessor ? (
                  <CustomButton
                    title={status === 'booked' ? 'Alterar' : 'Agendar'}
                    onPress={() =>
                      navigation.navigate('Appointments', {
                        appointments,
                        monitoring,
                        date: date.toString(),
                        scheduleId: id,
                      })
                    }
                  />
                ) : null}
              </View>
            </View>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
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
  subjectName: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subjectBeginEnd: {
    fontSize: 14,
    lineHeight: 16,
  },
  details: {
    marginTop: 4,

    width: '100%',
  },
  inlineContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  boldSmallText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
    lineHeight: 16,
  },
});

export default Schedule;

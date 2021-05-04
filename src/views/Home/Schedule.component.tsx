import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import HorizontalRule from '../../components/HorizontalRule.component';
import Tag from '../../components/Tag.component';

import colors from '../../styles/colors';

type ScheduleProps = {
  index: number;
  begin: string;
  end: string;
  subject: {
    name: string;
  };
};

const Schedule: FC<ScheduleProps> = ({ index, begin, end, subject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <TouchableOpacity style={styles.scheduleContainer} onPress={toggleOpen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text>{`${begin} - ${end}`}</Text>
        </View>
        <Tag variant={'test'}>{'disponível'}</Tag>
      </View>
      {isOpen ? (
        <>
          <HorizontalRule />
          <View style={styles.details}>
            <View style={styles.inlineContent}>
              <Text style={styles.boldSmallText}>{'Monitor: '}</Text>
              <Text style={styles.smallText}>{'Nome do Monitor'}</Text>
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
                <Text style={{ ...styles.smallText, paddingTop: 4 }}>
                  {'19:00 - 20:00'}
                </Text>
                <Text style={{ ...styles.smallText, paddingTop: 4 }}>
                  {'20:30 - 21:00'}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  title={'Titulo'}
                  onPress={() => console.log('pressionou')}
                >
                  {'Agendar'}
                </Button>
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

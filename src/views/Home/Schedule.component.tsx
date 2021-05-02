import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Tag from '../../components/Tag.component';

type ScheduleProps = {
  index: number;
  begin: string;
  end: string;
  subject: {
    name: string;
  };
};

const Schedule: FC<ScheduleProps> = ({ index, begin, end, subject }) => {
  // const openNoticeDetails = () => {
  //   navigation.navigate('NoticeDetails', { notice });
  // };

  return (
    <TouchableOpacity style={styles.scheduleContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text>{`${begin} - ${end}`}</Text>
        </View>
        <Tag variant={'test'}>{'disponível'}</Tag>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 8,

    marginTop: 12,

    padding: 8,

    backgroundColor: '#FFFFFF',
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
  subject: {
    fontSize: 16,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    marginTop: 4,
  },
  author: {
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Schedule;

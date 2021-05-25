import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Notice = ({ navigation, index, length, notice }) => {
  const openNoticeDetails = () => {
    navigation.navigate('Details', { notice });
  };

  return (
    <TouchableOpacity
      key={`notice-${notice.id}`}
      style={styles.noticeContainer}
      onPress={() => openNoticeDetails()}
    >
      <>
        <Text style={styles.title}>{notice.title}</Text>

        <Text style={styles.subject}>{notice.subject.name}</Text>

        <View style={styles.footer}>
          <Text style={styles.author}>{notice.author.name}</Text>
          <Text style={styles.time}>{notice.time}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 9,

    marginBottom: 12,

    padding: 8,

    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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

export default Notice;

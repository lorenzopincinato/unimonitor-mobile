import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoticeDetails = ({ route, navigation }) => {
  const { notice } = route.params;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{notice.title}</Text>
      <Text style={styles.subject}>{notice.subject.name}</Text>

      <Text style={styles.author}>{notice.author.name}</Text>

      <Text style={styles.body}>{notice.body}</Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{`Publicado em ${notice.date}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    padding: 12,

    backgroundColor: '#F7FAFC',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subject: {
    fontSize: 18,
  },
  author: {
    fontSize: 18,

    marginTop: 14,
  },
  body: {
    fontSize: 18,

    marginTop: 14,
  },
  footer: {
    marginTop: 8,

    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default NoticeDetails;

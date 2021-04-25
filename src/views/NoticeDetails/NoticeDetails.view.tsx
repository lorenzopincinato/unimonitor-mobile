import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoticeDetails = ({ route, navigation }) => {
  const { notice } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: notice.title,
    });
  }, []);

  return (
    <View>
      <Text style={styles.boldText}>{notice.author.name}</Text>

      <View style={styles.inlineText}>
        <Text style={styles.boldText}>Disciplina: </Text>
        <Text>{notice.subject.name}</Text>
      </View>

      <View style={styles.inlineText}>
        <Text style={styles.boldText}>Assunto: </Text>
        <Text>{notice.title}</Text>
      </View>

      <View style={styles.inlineText}>
        <Text style={styles.boldText}>Aviso: </Text>
        <Text>{notice.body}</Text>
      </View>

      <View style={styles.rightText}>
        <Text style={styles.italicText}>Publicado em </Text>
        <Text style={styles.italicText}>{notice.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdayHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noticeContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 9,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  inlineText: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default NoticeDetails;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notice from './Notice.component';

const Weekday = ({ navigation, index, date, name, notices }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      {notices.map((notice, index) => (
        <Notice
          key={`notice-${notice.id}`}
          navigation={navigation}
          index={index}
          length={notice.length}
          notice={notice}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Weekday;

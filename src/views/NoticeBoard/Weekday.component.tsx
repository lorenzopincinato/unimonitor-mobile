import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notice from './Notice.component';

const Weekday = ({ navigation, index, date, name, notices }) => {
  const getHeaderStyle = (index: number) => {
    if (index === 0) {
      return StyleSheet.compose(styles.header, styles.headerFirst);
    }

    return styles.header;
  };

  return (
    <View>
      <View style={getHeaderStyle(index)}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      {notices.map((notice, index) => (
        <Notice
          key={notice.id}
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 16,
  },
  headerFirst: {
    marginTop: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Weekday;

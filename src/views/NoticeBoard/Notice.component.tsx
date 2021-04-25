import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Notice = ({ navigation, index, length, notice }) => {
  const openNoticeDetails = () => {
    navigation.navigate('NoticeDetails', { notice });
  };

  return (
    <TouchableOpacity
      key={notice.id}
      style={styles.noticeContainer}
      onPress={() => openNoticeDetails()}
    >
      <>
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
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.noticePreview}
          >
            {notice.body}
          </Text>
        </View>

        <View style={styles.rightText}>
          <Text style={styles.italicText}>Publicado em </Text>
          <Text style={styles.italicText}>{notice.date}</Text>
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

    marginTop: 12,

    padding: 8,

    backgroundColor: '#FFFFFF',
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
    alignSelf: 'flex-start',
  },
  noticePreview: {
    flex: 1,
    flexWrap: 'wrap',
  },
  rightText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Notice;

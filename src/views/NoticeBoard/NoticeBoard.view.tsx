import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const weekdays = [
  {
    weekday: 'monday',
    date: '2021-04-21',
    notices: [
      {
        id: 1,
        title: 'Vagas para monitores',
        body:
          'Esta aberto as vagas para alunos que querem se candidatar para dar minitoria de Banco de dados B.',
        date: '2021-04-21 T23:00:00',
        author: {
          // TODAS AS INFOS DO USUARIO
          name: 'Israel Geraldi',
          roles: [
            {
              name: 'Professor',
            },
          ],
        },
        subject: {
          // TODAS AS INFOS DA DISCIPLINA
          name: 'Banco de dados B',
        },
      },
      {
        id: 3,
        title: 'Vagas para monitores de Projeto Integrado',
        body:
          'Esta aberto as vagas para alunos que querem se candidatar para dar minitoria de projeto integrado.',
        date: '2021-04-21 T19:00:00',
        author: {
          // TODAS AS INFOS DO USUARIO
          name: 'Renata',
          roles: [
            {
              name: 'Professor',
            },
          ],
        },
        subject: {
          // TODAS AS INFOS DA DISCIPLINA
          name: 'Projeto integrado',
        },
      },
    ],
  },
  {
    weekday: 'tuesday',
    date: '2021-04-22',
    notices: [
      {
        id: 2,
        title: 'Vagas para monitores',
        body:
          'Esta aberto as vagas para alunos que querem se candidatar para dar minitoria de POO.',
        date: '2021-04-21 T23:00:00',
        author: {
          // TODAS AS INFOS DO USUARIO
          name: 'André',
          roles: [
            {
              name: 'Professor',
            },
          ],
        },
        subject: {
          // TODAS AS INFOS DA DISCIPLINA
          name: 'POO',
        },
      },
    ],
  },
];

const NoticeBoard = ({ navigation }) => {
  const openNoticeDetails = notice => {
    navigation.navigate('NoticeDetails', { notice });
  };

  return (
    <View>
      {weekdays.map(weekday => (
        <View key={weekday.date}>
          <View style={styles.weekdayHeader}>
            <Text style={styles.headerText}>{weekday.weekday}</Text>
            <Text style={styles.headerText}>{weekday.date}</Text>
          </View>
          {weekday.notices.map(notice => (
            <TouchableHighlight
              key={notice.id}
              onPress={() => openNoticeDetails(notice)}
            >
              <View style={styles.noticeContainer}>
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
            </TouchableHighlight>
          ))}
        </View>
      ))}
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

export default NoticeBoard;

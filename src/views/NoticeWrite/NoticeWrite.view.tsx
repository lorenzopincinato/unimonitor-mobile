import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/core';

import { getUserId } from '../../io/asyncStorage';
import LoadingIndicator from '../../components/LoadingIndicator.component';
import api from '../../io/api';
import colors from '../../styles/colors';

const NoticeWrite = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectSelected, setSubjectsSelected] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const userId = await getUserId();
        const subjectsApi = await api.get(`/subjects?userId=${userId}`);
        setSubjects(subjectsApi.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Disciplinas',
          'Erro ao buscar disciplinas, tente novamente mais tarde',
        );
        setIsLoading(false);
      }
    })();
  }, []);

  function handleTitleInputChange(value: string) {
    setTitle(value);
  }

  function handleBodyInputChange(value: string) {
    setBody(value);
  }

  async function handleSend() {
    console.log(title);
    console.log(body);
    console.log(subjectSelected);
    const notice = {
      title: title,
      body: body,
      subjectId: subjectSelected,
    };

    try {
      await api.post('/notices', notice);
      Alert.alert('Avisos', 'Aviso enviado', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('NoticeBoard');
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Avisos',
        'Erro ao publicar aviso, tente novamente mais tarde',
      );
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : null}

      <Text>Disciplina:</Text>
      <DropDownPicker
        items={subjects.map(subject => ({
          label: subject.name,
          value: subject.id,
        }))}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={item => setSubjectsSelected(item.value)}
      />
      <Text>Assunto:</Text>
      <TextInput
        style={styles.titleInput}
        onChangeText={handleTitleInputChange}
      />

      <Text>Aviso:</Text>
      <TextInput
        style={styles.bodyInput}
        multiline={true}
        numberOfLines={7}
        onChangeText={handleBodyInputChange}
      />

      <TouchableOpacity
        //style={styles.plusButton}
        activeOpacity={0.7}
        onPress={handleSend}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: colors.grey300,
    width: '100%',
    padding: 10,
    fontSize: 15,
  },
  bodyInput: {
    borderWidth: 1,
    width: '100%',
    borderColor: colors.grey300,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default NoticeWrite;

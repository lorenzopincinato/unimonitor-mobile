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
import LoadingIndicator from '../../components/LoadingIndicator.component';
import colors from '../../styles/colors';

const NoticeWrite = () => {
  const [disciplina, setDiscipline] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async () => {
      try {
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Disciplinas',
          'Erro ao buscar disciplinas, tente novamente mais tarde',
        );
        setIsLoading(false);
      }
    };
  }, []);

  function handleTopicInputChange(value: string) {
    setTopic(value);
  }

  function handleNoticeInputChange(value: string) {
    setNotice(value);
  }

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : null}

      <Text>Disciplina:</Text>
      <DropDownPicker
        items={[
          { label: 'Banco de Dados B', value: 'bdb' },
          {
            label: 'Interação Humano Computador',
            value: 'interacao_humano_computador',
          },
          { label: 'Análise de Sistemas A', value: 'analise_sistemas_a' },
        ]}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}

        // onChangeItem={item => this.setState({
        //     setDiscipline(item.value)
        // })}
      />
      <Text>Assunto:</Text>
      <TextInput
        style={styles.topicInput}
        onChangeText={handleTopicInputChange}
      />

      <Text>Aviso:</Text>
      <TextInput
        style={styles.noticeInput}
        multiline={true}
        numberOfLines={7}
        onChangeText={handleNoticeInputChange}
      />

      <TouchableOpacity
        //style={styles.plusButton}
        activeOpacity={0.7}
        onPress={() => {}}
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
  topicInput: {
    borderWidth: 1,
    borderColor: colors.grey300,
    width: '100%',
    padding: 10,
    fontSize: 15,
  },
  noticeInput: {
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

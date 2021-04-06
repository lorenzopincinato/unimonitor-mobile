import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [numero, setMeuNumero] = useState(0);
  const [ehPar, setEhPar] = useState(false);

  const incrementarNumero = () => {
    setMeuNumero(numero + 1)
  }

  useEffect(() => {
    setEhPar(numero % 2 === 0);
  }, [numero])

  return (
    <View style={styles.container}>
      <Text>{numero}</Text>
      <Button title="BOTÃO" onPress={incrementarNumero} />
      {ehPar ? <Text>Numero é par</Text> : <Text>Número é ímpar</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

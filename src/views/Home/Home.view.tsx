import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const IoniconsHeaderButton = props => (
  <HeaderButton IconComponent={Ionicons} iconSize={24} {...props} />
);

const Home = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="notice board"
            iconName="notifications"
            color="white"
            onPress={() => navigation.navigate('NoticeBoard')}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            color="white"
            onPress={() => alert('open menu')}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const { name, register, email, roles } = route.params;

  return (
    <View style={styles.container}>
      <Text>{`Nome: ${name}`}</Text>
      <Text>{`Registro: ${register}`}</Text>
      <Text>{`Email: ${email}`}</Text>
      <Text>{`Permissões: ${roles.map(role => role.name).join(', ')}`}</Text>
    </View>
  );
};

export default Home;

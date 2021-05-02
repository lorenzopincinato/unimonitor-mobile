import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/core';

import IoniconsHeaderButton from '../../components/IoniconsHeaderButton.component';

const HomeHeaderRight = () => {
  const navigation = useNavigation();

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="notice board"
        iconName="notifications"
        color="white"
        onPress={() => navigation.navigate('NoticeBoard')}
      />
    </HeaderButtons>
  );
};

export default HomeHeaderRight;

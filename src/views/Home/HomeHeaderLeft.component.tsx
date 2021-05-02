import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import IoniconsHeaderButton from '../../components/IoniconsHeaderButton.component';

const HomeHeaderLeft = () => {
  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="menu"
        iconName="menu"
        color="white"
        onPress={() => alert('open menu')}
      />
    </HeaderButtons>
  );
};

export default HomeHeaderLeft;

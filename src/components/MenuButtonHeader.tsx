import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import IoniconsHeaderButton from './IoniconsHeaderButton.component';

const MenuButtonHeader = () => {
  const navigation = useNavigation();

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="menu"
        iconName="menu"
        color="white"
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer);
        }}
      />
    </HeaderButtons>
  );
};

export default MenuButtonHeader;

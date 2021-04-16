import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const MicrosoftLoginButton = ({ onPress }) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <Svg width="21" height="21" viewBox="0 0 21 21">
                    <Rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                    <Rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                    <Rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                    <Rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </Svg>
                <Text style={styles.text}>{'Entrar com sua conta Microsoft'}</Text>
            </View>
      </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',

        height: 41,
        paddingHorizontal: 12,

        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        borderColor: '#8C8C8C',

        borderWidth: 1
    },
    text: {
        color: '#5E5E5E',
        fontSize: 15,
        fontWeight: '600',

        marginLeft: 12
    }
  });


export default MicrosoftLoginButton;

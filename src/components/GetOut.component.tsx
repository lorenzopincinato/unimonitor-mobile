import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class GetOut extends Component {

    static navigationOptions = {
        drawerLabel: "Sair"
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: "#2c3e50",
        justifyContent: "center",
        alignItems: "center"

        borderWidth: 411,
        borderHeight: 646,

        backgroundColor: '#FFFFFF',
    }
})

export default GetOut;
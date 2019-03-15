import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { Input } from 'native-base';

export default class FormSignIn extends Component {
    dashboard() {
        Actions.dashboard();
    }
    forgot() {
        Actions.forgot();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor="#333"
                    ref={input => (this.password = input)}
                />
                <TouchableOpacity onPress={this.forgot}>
                    <Text style={{ marginRight: 10 }} style={styles.signupButton}>
                        Forgot
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.dashboard} style={styles.buttonText}>
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },

    inputBox: {
        width: 300,
        backgroundColor: "rgba(255, 255,255,0.2)",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 13,

        fontSize: 16,
        color: "#fff",
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center"
    },
    signupButton: {
        color: "#000",
        fontSize: 16,
        fontWeight: "500"
    }
});


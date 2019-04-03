import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity,AsyncStorage } from "react-native";

import Logo from "../../../Logo";
import FormSignIn from "../auth-from/FormSignIn";
import { Actions } from "react-native-router-flux";
const HOUSE_TOKEN = 'house_id';
export default class Signin extends Component {
  signup() {
    Actions.signup();
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <FormSignIn type="Signin"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={this.signup} >
            <Text style={styles.signupButton}> Signup </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#20d2bb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 16
  },
  signupButton: {
    color: "#000",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "500"
  }
});

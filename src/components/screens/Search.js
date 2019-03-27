import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

export default class Search extends Component {
  searchInput = text => {
    this.setState({ input: text });
  };
  render() {
    return (
      <View style={styles.inputBoxBlock}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Search"
          placeholderTextColor="#333"
          selectionColor="#fff"
          onChangeText={this.searchInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBoxBlock: {
    paddingHorizontal: 10
  },
  inputBox: {
    width: "100%",
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 0.5,
    borderColor: "#000",
    fontSize: 16,
    color: "#000",
    marginVertical: 10
  }
});

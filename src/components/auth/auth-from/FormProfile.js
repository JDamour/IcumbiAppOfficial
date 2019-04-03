import React, { Component } from "react";

import {
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { Actions } from "react-native-router-flux";
import ProfileHeader from './ProfileHeader';
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      todo: {}
    };
  }

  render() {
    return (
      <View style={styles.containerBg}>
        <ProfileHeader />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerBg: {
    flex: 1,
  },
  textContent: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold"
  },
  hScroll: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "red"
  },
  headTxt: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5
  },
  titleSecond: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10
  },
  toLogin: {
    marginTop: 10
  }

});

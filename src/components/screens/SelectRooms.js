import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import HeaderBar from "./HeaderBar";
import VListRoom from "./VListRoom";
import Search from "./Search";
import { Actions } from "react-native-router-flux";

export default class SelectRooms extends Component {
  deshboard() {
    Actions.deshboard();
  }
  render() {
    const id = this.props.id;
    const up_to = this.props.up_to;
    const from = this.props.from;
    console.log("GUHERA::::"+up_to);
    console.log("KUGEZA::::"+from);
    return (
      <View style={styles.container}>
        <HeaderBar />
        <Search />
        <VListRoom id={id} up_to={up_to} from={from}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  mapView: {
    height: 500
  }
});
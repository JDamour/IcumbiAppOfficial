import React, { Component } from "react";
import { Container, Header } from "native-base";
import { StyleSheet } from "react-native";
import SelectRoomsHeader from "./SelectRoomHeader";
import BodyLanding from "./BodyLanding";
import FooterBar from "./FooterBar";

export default class LandingScreen extends Component {
  render() {
    const id = this.props.id;
    return (
      <Container style={styles.containerBg}>
        <SelectRoomsHeader />
        <BodyLanding id={id} />
        {/* <FooterBar /> */}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  containerBg: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 10
  }
});

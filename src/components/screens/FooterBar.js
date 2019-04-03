import React, { Component } from "react";
import { Button, Footer, FooterTab } from "native-base";
import { Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FooterBar extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={styles.foot}>
          <Button active>
            <Text>Apps</Text>
            <Ionicons name="ios-square-outline" size={22} />
          </Button>
          <Button>
            <Text>Camera</Text>
            <Ionicons name="ios-camera" size={22} />
          </Button>
          <Button>
            <Text>Navigate</Text>
            <Ionicons name="ios-compass" size={22} />
          </Button>
          <Button>
            <Text>Contact</Text>#32B76C
            <Ionicons name="md-contacts" size={22} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  foot: {
    backgroundColor: "#20d2bb",
    color: "#32B76C"
  }
});

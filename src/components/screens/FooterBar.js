import React, { Component } from "react";
import { Button, Footer, FooterTab } from "native-base";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class FooterBar extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active>
            <Text>Apps</Text>
            <Ionicons name="ios-square-outline" size={22} color="#32B76C" />
          </Button>
          <Button>
            <Text>Camera</Text>
            <Ionicons name="ios-camera" size={22} color="#32B76C" />
          </Button>
          <Button>
            <Text>Navigate</Text>
            <Ionicons name="ios-compass" size={22} color="#32B76C" />
          </Button>
          <Button>
            <Text>Contact</Text>
            <Ionicons name="md-contacts" size={22} color="#32B76C" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

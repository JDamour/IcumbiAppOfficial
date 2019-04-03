import React, { Component } from "react";
import { Button, Footer, FooterTab } from "native-base";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import{Actions} from 'react-native-router-flux';

export default class FooterBar extends Component {
 home=()=>{
   Actions.dashboard();
 }
   selectRooms(){
    Actions.selectRooms();
   }
   profile(){
     Actions.profile();
   }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active onPress={this.home}>
            <Text>Home</Text>
            <Ionicons name="ios-home" size={22} color="#32B76C" />
          </Button>
          <Button active onPress={this.selectRooms}>
            <Text>Houses</Text>
            <Ionicons name="ios-book" size={22} color="#32B76C" />
          </Button>
          <Button active onPress={this.profile}>
            <Text>Profile</Text>
            <Ionicons name="md-contacts" size={22} color="#32B76C" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

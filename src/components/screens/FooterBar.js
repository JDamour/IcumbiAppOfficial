import React, { Component } from "react";
import { Button, Footer, FooterTab } from "native-base";
import { Text, StyleSheet } from "react-native";
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
        <FooterTab style={styles.foot}>
        <Button onPress={this.home}>
            <Text style={{color:"white"}}>Home</Text>
            <Ionicons name="ios-home" size={22} color="white" />
          </Button>
          <Button  onPress={this.selectRooms}>
            <Text style={{color:"white"}}>Houses</Text>
            <Ionicons name="ios-book" size={22} color="white"  />
          </Button>
          <Button  onPress={this.profile}>
            <Text style={{color:"white"}}>Profile</Text>
            <Ionicons name="md-contacts" size={22} color="white"  />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  foot: {
    backgroundColor: "#20d2bb",
    // color: "#32B76C",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  }
});

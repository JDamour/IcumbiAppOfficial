import React, { Component } from "react";
import { Button, Footer, FooterTab } from "native-base";
import { Text, AsyncStorage, View,StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Actions } from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';
export default class ProfileFooterBar extends Component {
    home = () => {
        Actions.dashboard();
    }
    showBookedHouse=()=>{
        Actions.showBookedHouse();
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoggenIn: "",
            showProgress: false,
            accessToken: "",
        }
    }
    async deleteToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN)
            console.log('Token deleted successfully!');
            Actions.startup();
        } catch (error) {
            console.log("Something went wrong");
        }
    }
    onLogout = () => {
        this.deleteToken();
    }
    render() {
        return (
            <Footer>
                <FooterTab style={styles.foot}>
                    <Button onPress={this.home}>
                        <Text>Home</Text>
                        <Ionicons name="ios-home" size={22} color="#32B76C" />
                    </Button>
                    <Button  onPress={this.showBookedHouse}>
                        <Text>Booked Houses</Text>
                        <Ionicons name="ios-book" size={22} color="#32B76C" />
                    </Button>

                    {/* <Button active onPress={this.profile}>
                        <Text>Profile</Text>
                        <Ionicons name="md-contacts" size={22} color="#32B76C" />
                    </Button> */}
                    <Button  onPress={() => {
                        this.onLogout();
                         }}>
                        <Text>Logout</Text>
                        <Ionicons name="ios-log-out" size={22} color="#32B76C" />
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
  
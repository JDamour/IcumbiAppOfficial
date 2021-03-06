import React, { Component } from "react";
import { Container, Header } from "native-base";
import { StyleSheet,Text,AsyncStorage} from "react-native";
import SelectRoomsHeader from "./SelectRoomHeader";
import BodyLanding from "./BodyLanding";
import HouseDetails from "./HouseDetails";
import ProfileFooterBar from "./ProfileFooterBar";
const ACCESS_TOKEN = 'access_token';
export default class DetailsLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggenIn: false,
      accessToken:"",
    };
  }
  async componentDidMount() {
    try {
     
       this.getToken();
    } catch (error) {
      console.log('error getting the token', error);
    }
  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        console.log("Token not set");
      } else {
        // this.verifyToken(accessToken)
        console.log("Here we are");
        console.log(accessToken);
        this.setState({ isLoggenIn: true ,accessToken:accessToken});
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }
  render() {
    return (
      <Container style={styles.containerBg}>
        <SelectRoomsHeader />
        <HouseDetails/>
        <ProfileFooterBar/>
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

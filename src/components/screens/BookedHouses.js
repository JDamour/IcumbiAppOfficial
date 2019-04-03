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
import { StyleSheet, Text, FlatList, View, AsyncStorage } from "react-native";
import HListLanding from "./HListLanding";
import { Actions } from "react-native-router-flux";

const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";
const ACCESS_TOKEN = 'access_token';
const HOUSE_TOKEN = 'house_id';
export default class BookedHouses extends Component {


  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      isLoggenIn: false,
      hid: this.props.id,
      logedIn: '',
      todo: {}
    };
  }
  componentWillMount() {
      this.showBookedHouse();
  }
  async showBookedHouse() {
    try {
        var accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log('::Access token show  is available::'+accessToken);
        var houseToken = await AsyncStorage.getItem(HOUSE_TOKEN);

        console.log('::::House id booked show  is available::::'+houseToken);
        if (!houseToken && !accessToken) {
            console.log('Something wrong');
        } else {
            console.log("House details you want is here::" + houseToken);
            fetch(`http://icumbi.tres.rw/api/service/show/${houseToken}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`,
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            "POST Response",
                "Response Body -> " + JSON.stringify(responseData),
                console.log("[OBJECT HERE ]"+responseData.status);

           if(responseData.status==404){
            console.log("SERVICES DESCRIPTION "+responseData.description);
            // Actions.signin();
        }else{  
            // var objCopy = {}; // objCopy will store a copy of the mainObj
            // let key;
    
            // for (key in responseData) {
            //   objCopy[key] = responseData[key]; // copies each property to the objCopy object
            // }
    
            console.log(
              "Here We are::::::" +
              responseData.id +
              "::" +
              responseData.house.housePrice +
              ":::" +
              responseData.house.houseLocation
            );
            // this.setState({ todo: objCopy });
            // console.log(
            //   "::STATE OBJECT VALUE::Id:" +
            //   this.state.todo.id +
            //   "::Province:" +
            //   this.state.todo.housePrice +
            //   "::district:" +
            //   this.state.todo.houseLocation);
        }
        })

        .catch((error) => {
            console.log(error);
            
        })
        }
    } catch (error) {
        console.log("Something went wrong");
    }
  }
  render() {
    const { todo } = this.state;
    return (
      <Content style={{ marginTop: 10 }}>
        <View>
          <Text style={styles.textContent}>
            {" "}
            {todo.id} | {todo.street}
            {"  "}
            <Icon
              onPress={this.goBack}
              style={styles.iconStyles}
              name="ios-locate"
              size={18}
              color="#000"
            />
          </Text>
        </View>

        <View>
          <View>
            <Text style={styles.titleSecond}> House details</Text>
          </View>
          {/* <HListLanding todo={todo} /> */}
        </View>

        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>Price: {todo.housePrice}</Text>
                <Text>Rooms: {todo.rooms}</Text>
                <Text>
                  Location(Sector/District): {todo.district}/{todo.province}
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 12 }}>Extra</Text>
                <Text>
                  Area: {todo.length}x{todo.width}
                </Text>
                <Text style={{ marginTop: 10 }}>Water inside: {todo.water == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                <Text style={{ marginTop: 10 }}>Toilet inside: {todo.toilet == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                <Text style={{ marginTop: 10 }}>Bathroom inside: {todo.bathroom == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                <Text style={{ marginTop: 10 }}>Fenced: {todo.fenced == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                <Button transparent onPress={() => {
                  console.log("House Id transfered::"+this.state.hid);
                 this.storeHouseToken(JSON.stringify(this.state.hid));
                  Actions.signin();
                }} style={styles.toLogin}>
                  <Icon active name="ios-information-circle-outline" />
                  <Text style={{ color: "blue" }}>More details</Text>
                </Button>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  containerBg: {
    backgroundColor: "#20d2bb"
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

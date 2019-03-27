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

import HListLanding from "./HListLanding";
const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";

import { Actions } from "react-native-router-flux";

export default class BodyLanding extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      hid: this.props.id,
      todo: {}
    };
  }
  componentWillMount() {
    this.showHouse();
  }

  async showHouse() {
    fetch(`http://icumbi.tres.rw/api/houses/show/${this.state.hid}`)
      .then(response => response.json())
      .then(responseJson => {
        var objCopy = {}; // objCopy will store a copy of the mainObj
        let key;

        for (key in responseJson) {
          objCopy[key] = responseJson[key]; // copies each property to the objCopy object
        }

        console.log(
          "Here We are::::::" +
            objCopy.id +
            "::" +
            objCopy.province +
            ":::" +
            objCopy.district
        );
        this.setState({ todo: objCopy });
        console.log(
          "::STATE OBJECT VALUE::Id:" +
            this.state.todo.id +
            "::Province:" +
            this.state.todo.province +
            "::district:" +
            this.state.todo.district
    goBack() {
        Actions.pop();
    }
    login(){
        Actions.signin();
    }
    render() {
        return (
            <Content style={{ marginTop: 10 }}>
                <View>
                    {/* <View>
                        <Text style={styles.textContent}>
                            {" "}
                            Bangalore | Boys
        {"  "}
                            <Icon
                                onPress={this.goBack}
                                style={styles.iconStyles}
                                name="edit"
                                size={18}
                                color="#000"
                            />
                        </Text>
                    </View> */}

                    {/* <Search /> */}
                    <View>
                        <View>
                            <Text style={styles.titleSecond}> House details</Text>
                        </View>
                        <HListLanding />
                    </View>

                    {/* <ADVBanner /> 

                    <View>
                        <View>
                            <Text style={styles.titleSecond}>Cluster Citys</Text>
                        </View>
                        <ClusterCity />
                    </View>

                    <AVDBannerSecond />*/}

                    <Card>
                        <CardItem>
                            <Left>
                    <Body>
                            <Text>Price: 30,000</Text>
                            <Text>Number of Rooms: 3</Text>
                            <Text>Location(Sector/District): Kacyiru/GASABO</Text>
                            <Text style={{fontSize:20,marginBottom:15}}>Extra</Text>
                            <Text>Area:         10.0x 5.0</Text>
                            <Text>Water inside: True</Text>
                            <Text>Toilet inside: True</Text>
                            <Text>Bathroom inside: True</Text>
                            <Text>Fenced:    True</Text>
                     <Button  transparent onPress={this.login} style={styles.toLogin}>
                       {/* <Icon active name="chatbubbles" /> */}
                       <Text style={{color:'blue'}}>More details</Text>
                       
                     </Button>
                            </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        );
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  }

  goBack() {
    Actions.pop();
  }
  login() {
    Actions.signin();
  }
  render() {
    const { todo } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textContent}>
            {" "}
            {todo.province} | {todo.district}
            {"  "}
            <Icon
              onPress={this.goBack}
              style={styles.iconStyles}
              name="ios-arrow-back"
              size={18}
              color="#000"
            />
          </Text>
        </View>

        <View>
          <View>
            <Text style={styles.titleSecond}> House details</Text>
          </View>
          <HListLanding todo={todo} />
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
                <Text>Water inside: {todo.water}</Text>
                <Text>Toilet inside: {todo.toilet}</Text>
                <Text>Bathroom inside: {todo.bathroom}</Text>
                <Text>Fenced: {todo.fenced}</Text>
                <Button transparent onPress={this.login} style={styles.toLogin}>
                  <Icon active name="ios-information-circle-outline" />
                  <Text style={{ color: "blue" }}>More details</Text>
                </Button>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
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

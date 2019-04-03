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

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image
} from "react-native";
const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";

import { Actions } from "react-native-router-flux";

const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";
const ACCESS_TOKEN = 'access_token';
const HOUSE_TOKEN = 'house_id';
export default class BodyLanding extends Component {
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
      this.showHouse();
  }
 
  storeHouseToken(responseData) {
    AsyncStorage.setItem(HOUSE_TOKEN, responseData, (err) => {
        if (err) {
            console.log("an error");
            throw err;
        }
        console.log("House stored success with house id::"+responseData);
    }).catch((err) => {
        console.log("error is: " + err);
    });
}
  showHouse() {
    
    fetch(`http://icumbi.tres.rw/api/houses/show/${this.state.hid}`)
      .then(response => response.json())
      .then(responseJson => {
        var objCopy = {}; // objCopy will store a copy of the mainOb
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
          this.state.todo.district);

      })
      .catch(error => {
        console.log(error);
      })
      .done();
  }

  goBack() {
    Actions.pop();
  }
  // login(){
  //     Actions.signin();
  // }

  render() {
    const { todo } = this.state;
    return (
      <Content style={{ marginTop: 10 }}>
        <View>
          <Text style={styles.textContent}>
            {" "}
            {todo.province} | {todo.district}
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
          <FlatList
            horizontal
            data={todo.photos}
            renderItem={({ item: rowData }) => {
              return (
                <Card title={null} image={{ url: rowData.source }}>
                  {/* <CardItem> */}
                  <TouchableOpacity>
                    <CardItem cardBody>
                      <Image
                        style={{ height: 150, width: 250, flex: 1 }}
                        source={{ uri: rowData.source }}
                        {...this.props}
                      />
                    </CardItem>
                  </TouchableOpacity>
                  {/* </CardItem> */}
                </Card>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
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

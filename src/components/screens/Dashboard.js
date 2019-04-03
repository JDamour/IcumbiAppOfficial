import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from "react-native";
import {
  Container, Header, Content, List, ListItem, Text,
  Left, Body, Title, Item, Input, Right, Icon, Button
} from "native-base";
import { Font } from "expo";
import Districts from "../Districts";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import PostList from "../posts/PostList";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      tasks: [],
      districts: [],
      loader: true
    };
  }
  componentWillMount() {
    setTimeout(()=>{
      this.setState({
        loader: false
      })
    }, 3000)
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.timer = setInterval(() => this.getTasks(), 1000);
  }
  async getTasks() {
    return fetch("http://icumbi.tres.rw/api/provinces")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            tasks: responseJson.data
          },
          function() {
            //commentcl
          }
        );
      })
      .catch(error => {
        null;
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>List of provinces</Title>
          </Body>
        </Header>
        <View>
          {this.state.loader ? (
            <ActivityIndicator style={styles.load} size="large" color="blue"/>
          ) : (
            <List
              dataArray={this.state.tasks}
              renderRow={item => (
                <ListItem>
                  <TouchableOpacity
                    style={styles.Opacity}
                    onPress={() => {
                      Actions.districts({ id: item.id });
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </ListItem>
              )}
            />
          )}
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Opacity: {
    flex:1,
    fontSize: 23,
    width: 500,
    margin: 5
  },
  load:{
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    color:"blue"
  },
});

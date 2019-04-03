import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Title,
  Item,
  Input,
  Right,
  Icon,
  Button
} from "native-base";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      tasks: [],
      districts: []
    };
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
        <Header style={styles.head}>
          <Body>
            <Title>List of provinces</Title>
          </Body>
        </Header>
        <List
          dataArray={this.state.tasks}
          renderRow={item => (
            <ListItem>
              <Left>
                <TouchableOpacity
                  onPress={() => {
                    Actions.districts({ id: item.id });
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </Left>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleMain: {
    fontSize: 18,
    fontWeight: "bold"
  },
  head: {
    backgroundColor: "#20d2bb"
  }
});

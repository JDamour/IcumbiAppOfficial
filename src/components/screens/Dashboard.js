import React, { Component } from "react";
 
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from "react-native";
import {
  Container, Header, Content, List, ListItem, Text,
  Left, Body, Title, Item, Input, Right, Icon, Button, Footer, FooterTab 
} from "native-base";
import { Font } from "expo";
import ProfileFooterBar from "./ProfileFooterBar";
 
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import FooterBar from "./FooterBar";
// import PostList from "../posts/PostList";

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
    var url="http://icumbi.tres.rw/api/provinces"
    // var url=require('../posts/db.json');
    return fetch(url)
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
        <View style={styles.body}>
          {this.state.loader ? (
            <ActivityIndicator style={styles.load} size="large" color="#20d2bb"/>
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
        <FooterBar/>
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
    justifyContent:"space-around",
    alignItems: "center",
    color:"blue"
  },
  head: {
    backgroundColor: "#20d2bb"
  },
 body: {
  flex: 5
 }
});

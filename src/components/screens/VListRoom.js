import React, { Component } from "react";
import {
  Text,
  StyleSheet, 
  ActivityIndicator,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";

export default class VListLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: this.data,
      houses: [],
      id: this.props.id, 
      loader: true, 
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
    this.timer = setInterval(() => this.getHouses(), 1000);
    this.setState({
      loading: false,
      function() {
        // In this block you can do something with new state.
      }
    });
  }

  async getHouses() {
    return fetch("http://icumbi.tres.rw/api/houses/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page: 1,
        size: 5,
        // district: this.state.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        "POST Response",
          "Response Body -> " + JSON.stringify(responseJson),
          this.setState({
            houses: responseJson.data,
            count: responseJson.meta.count
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

      {this.state.loader ? (
        <ActivityIndicator style={styles.load} size="large" color="blue"/>
      ) : (
        <FlatList
 
        data={this.state.houses}
        renderItem={({ item: rowData }) => {
          return (
            <Card title={null} image={{ uri: rowData.photos[0].source }}>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={{ uri: rowData.photos[0].source }}
                    {...this.props}
                  />
                  <Body>
                    <Text style={styles.titleSecond}>Available rooms</Text>
                    <Text style={styles.subTitle}>EXPLORE HOMES</Text>
                  </Body>
                </Left>
              </CardItem>
              <TouchableOpacity
                onPress={() => {
                  Actions.landingScreen({ id: rowData.id });
                }}
              >
                <CardItem cardBody>
                  <Image
                    style={{ height: 150, width: null, flex: 1 }}
                    source={{ uri: rowData.photos[0].source }}
                    {...this.props}
                  />
                </CardItem>
              </TouchableOpacity>

              <CardItem>
                <Left>
                  <Body>
                    <Text style={styles.place}>{rowData.district}</Text>
                    <Text style={styles.bhk}> {rowData.rooms} Rooms </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={styles.place}>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{rowData.views} Views</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>1 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>1 Week ago</Text>
                </Right>
              </CardItem>
            </Card>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
        )}

 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
 
  horiScroll: {
    borderRadius: 5,
    backgroundColor: "red"
  },
  load:{
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    color:"blue"
  },
 
  subTitle: {
    fontSize: 12,
    color: "#32B76C",
    fontWeight: "bold",
    marginTop: 5
  },
  titleSecond: {
    fontSize: 16,
    fontWeight: "bold"
  },
  place: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: -15
  },
  bhk: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: -15,
    marginTop: 5,
    color: "#32B76C"
  }
});

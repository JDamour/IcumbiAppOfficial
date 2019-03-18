import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import {
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BodyLanding from "./BodyLanding";

export default class VListLanding extends Component {
  data = [
    {
      imageUrl: require("../../assets/images/room1.jpeg"),
      title: "Available Rooms (Shared Room)",
      title2: "EXPLORE HOMES",
      likeCount: "12",
      comments: "4",
      time: "11h ago",
      price: "6000",
      place: "Whitefield",
      bhk: 3
    },
    {
      imageUrl: require("../../assets/images/room2.jpeg"),
      title: "Available Rooms (Shared Room)",
      title2: "EXPLORE HOMES",
      likeCount: "59",
      comments: "12",
      time: "1 Days ago",
      price: "9000",
      place: "Whitefield",
      bhk: 3
    },
    {
      imageUrl: require("../../assets/images/room3.jpeg"),
      title: "Available Rooms (Private Room)",
      title2: "EXPLORE HOMES",
      likeCount: "102",
      comments: "102",
      time: "2 Week ago",
      price: "12000",
      place: "Hoodi",
      bhk: 4
    },
    {
      imageUrl: require("../../assets/images/room4.jpeg"),
      title: "Available Rooms (Private Room)",
      title2: "EXPLORE HOMES",
      likeCount: "83",
      comments: "102",
      time: "2 Week ago",
      price: "50000",
      place: "Phoinex market city",
      bhk: 5
    },
    {
      imageUrl: require("../../assets/images/room5.jpeg"),
      title: "Available Rooms (Full House)",
      title2: "EXPLORE HOMES",
      likeCount: "84",
      comments: "102",
      time: "2 Week ago",
      price: "45000",
      place: "jay Nagar",
      bhk: 2
    },
    {
      imageUrl: require("../../assets/images/room6.jpeg"),
      title: "Available Rooms (Private Room)",
      title2: "EXPLORE HOMES",
      likeCount: "98",
      comments: "102",
      time: "2 Week ago",
      price: "7000",
      place: "jay Nagar",
      bhk: 2
    },
    {
      imageUrl: require("../../assets/images/room7.jpeg"),
      title: "Available Rooms (Full House)",
      title2: "EXPLORE HOMES",
      likeCount: "2038",
      comments: "102",
      time: "2 Week ago",
      price: "7000",
      place: "jay Nagar",
      bhk: 4
    },
    {
      imageUrl: require("../../assets/images/room8.jpeg"),
      title: "Available Rooms (Full House)",
      title2: "EXPLORE HOMES",
      likeCount: "1003",
      comments: "102",
      time: "2 Week ago",
      price: "7000",
      place: "jay Nagar",
      bhk: 2
    },
    {
      imageUrl: require("../../assets/images/room9.jpeg"),
      title: "Available Rooms (Shared Room)",
      title2: "EXPLORE HOMES",
      likeCount: "3032",
      comments: "102",
      time: "2 Week ago",
      price: "7000",
      place: "jay Nagar",
      bhk: 4
    },
    {
      imageUrl: require("../../assets/images/room10.jpeg"),
      title: "Available Rooms (Private Room)",
      title2: "EXPLORE HOMES",
      likeCount: "430",
      comments: "102",
      time: "2 Week ago",
      price: "1300",
      place: "ram murthi nagar",
      bhk: 1
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: this.data
    };
  }
  selectRooms() {
    Actions.landingScreen();
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
              <Card title={null} image={{ url: rowData.imageUrl }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={rowData.imageUrl} {...this.props} />
                    <Body>
                      <Text style={styles.titleSecond}>{rowData.title}</Text>
                      <Text style={styles.subTitle}>{rowData.title2}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <TouchableOpacity onPress={this.selectRooms}>
                  <CardItem cardBody>
                    <Image
                      style={{ height: 150, width: null, flex: 1 }}
                      source={rowData.imageUrl}
                      {...this.props}
                    />
                  </CardItem>
                </TouchableOpacity>

                <CardItem>
                  <Left>
                    <Body>
                      <Text style={styles.place}>{rowData.place}</Text>
                      <Text style={styles.bhk}> {rowData.bhk} BHK </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem style={styles.place}>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>{rowData.likeCount} Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>{rowData.comments} Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>{rowData.time}</Text>
                  </Right>
                </CardItem>
              </Card>
            );
          }}
          keyExtractor={item => item.likeCount}
        />
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
  price: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 0,
    padding: 0
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

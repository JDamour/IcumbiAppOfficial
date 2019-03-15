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
export default class HListLanding extends Component {
  data = [
    {
      imageUrl: require("../../assets/images/share.jpeg"),
      title: "Shared Room",
      title2: "EXPLORE HOMES",
      likeCount: "12",
      comments: "4",
      time: "11h ago"
    },
    {
      imageUrl: require("../../assets/images/Private.jpg"),
      title: "Private Room",
      title2: "EXPLORE HOMES",
      likeCount: "59",
      comments: "12",
      time: "1 Days ago"
    },
    {
      imageUrl: require("../../assets/images/full-home.jpg"),
      title: "Full House",
      title2: "EXPLORE HOMES",
      likeCount: "98",
      comments: "102",
      time: "2 Week ago"
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: this.data
    };
  }
  selectRooms() {
    Actions.selectRooms();
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
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
          keyExtractor={item => item.title}
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
  }
});

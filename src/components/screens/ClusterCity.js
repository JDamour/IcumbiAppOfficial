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
export default class ClusterCity extends Component {
  data = [
    {
      imageUrl: require("../../assets/images/1.png"),
      title: "Bangalore",
      title2: "10686 houses"
    },
    {
      imageUrl: require("../../assets/images/2.png"),
      title: "Gurgaon",
      title2: "686 houses"
    },
    {
      imageUrl: require("../../assets/images/3.png"),
      title: "Noida",
      title2: "70686 houses"
    },
    {
      imageUrl: require("../../assets/images/4.png"),
      title: "Pune",
      title2: "3686 houses"
    },
    {
      imageUrl: require("../../assets/images/5.png"),
      title: "Delhi",
      title2: "1686 houses"
    },
    {
      imageUrl: require("../../assets/images/6.png"),
      title: "Ghaziabad",
      title2: "86 houses"
    },
    {
      imageUrl: require("../../assets/images/2.png"),
      title: "Greater Noida",
      title2: "2489 houses"
    },
    {
      imageUrl: require("../../assets/images/8.jpeg"),
      title: "Faridabad",
      title2: "4002houses"
    },
    {
      imageUrl: require("../../assets/images/9.png"),
      title: "Mumbai",
      title2: "80323houses"
    },
    {
      imageUrl: require("../../assets/images/10.jpeg"),
      title: "Navi Mumbai",
      title2: "19086 houses"
    },
    {
      imageUrl: require("../../assets/images/11.png"),
      title: "Thane",
      title2: "8600 houses"
    },
    {
      imageUrl: require("../../assets/images/12.png"),
      title: "Hyderabad",
      title2: "2086 houses"
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
              <TouchableOpacity onPress={this.selectRooms}>
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
                </Card>
              </TouchableOpacity>
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

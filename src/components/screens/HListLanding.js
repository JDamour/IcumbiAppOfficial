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
  constructor(props) {
    super(props);
    this.state = {
      Housedata: this.props.todo
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
          data={this.state.Housedata}
          renderItem={({ item: rowData }) => {
            return (

              <Card title={null} image={{ url: rowData.photos.source }}>
                {/* <CardItem> */}

              
                <TouchableOpacity onPress={this.selectRooms}>
                  <CardItem cardBody>
                    <Image
                      style={{ height: 150, width: 250, flex: 1 }}

                      source={{ uri: rowData.photos.source }}

//                       source={rowData.imageUrl}
                      {...this.props}
                    />
                  </CardItem>
                </TouchableOpacity>

                {/* </CardItem> */}

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

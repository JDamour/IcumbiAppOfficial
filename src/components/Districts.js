import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  StyleSheet
} from "react-native";
import { List, ListItem, Text, Title, Header } from "native-base";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
export default class Districts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.id,
      prov: null,
      provinces: {},
      c_tasks: []
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.timer = setInterval(() => this.getProvinces(), 3000);
  }

  async getProvinces() {
    fetch(`http://192.168.1.143:8000/api/province/${this.state.pid}`)
      .then(response => response.json())
      .then(responseJson => {
        var objCopy = {};
        let key;
        for (key in responseJson) {
          objCopy[key] = responseJson[key];
        }
        this.setState({
          provinces: objCopy
        });
      })
      .catch(error => {
        null;
      });
  }
  render() {
    const { provinces } = this.state;
    return (
      <View style={styles.container}>
        <Header style={styles.head}>
          <Title style={styles.h2text}>
            List of districts in {provinces.name}
          </Title>
        </Header>
        <List>
          <ScrollView>
            <View>
              <ListItem>
                <Text style={styles.pro} />
              </ListItem>
              {typeof provinces.districts == "object" ? (
                <View>
                  {provinces.districts.map(dis => (
                    <ListItem key={dis.id}>
                      <TouchableOpacity
                        onPress={() => {
                          Actions.selectRooms({ id: dis.id });
                        }}
                      >
                        <Text style={styles.dis}>{" " + dis.name}</Text>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
                </View>
              ) : null}
            </View>
          </ScrollView>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  h2text: {
    margin: 10,
    alignItems: "center",
    fontSize: 28,
    fontWeight: "bold",
    width: 450
  },
  head: {
    backgroundColor: "#20d2bb"
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  dis: {
    fontSize: 22,
    alignItems: "center",
    width: 400
  },
  pro: {
    color: "red",
    alignItems: "center"
  }
});

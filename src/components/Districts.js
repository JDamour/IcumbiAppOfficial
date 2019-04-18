import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  List,
  ListItem,
  Text,
  Body,
  Title,
} from "native-base";
import FooterBar from "./screens/FooterBar";
// import ProfileFooterBar from "./screens/ProfileFooterBar";
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
      c_tasks: [],
      dis: {},
      loader: true
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loader: false
      });
    }, 5000);
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
    // fetch(`http://192.168.1.129:8000/api/province/${this.state.pid}`)
    fetch(`https://icumbi.tres.rw/api/province/${this.state.pid}`)
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
    const { dis } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {this.state.loader ? (
            <ActivityIndicator style={styles.load} size="large" color="#20d2bb" />
          ) : (
            <View>
              <Header style={styles.head}>
                <Body>
                    <Title> List of districts in {provinces.name}</Title>
                </Body>
              </Header>
              <List>
                <ScrollView>
                  <View>
                    <ListItem>
                      <Text style={styles.pro} />
                    </ListItem>
                    {typeof provinces.districts == "object" ? (
                      <View>
                        {provinces.districts.map((dis) => (
                          <View>
                            <ListItem>
                              <TouchableOpacity
                                onPress={() => {
                                  Actions.selectRooms({ id: dis.id });
                                }}
                              >
                                <Text style={styles.dis}>{" " + dis.name}</Text>
                              </TouchableOpacity>
                            </ListItem>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </ScrollView>
              </List>
            </View>
          )}
        </View>
        <FooterBar />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  h2text: {
    margin: 10,
    alignItems: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
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
  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "blue"
  },
  dis: {
    fontSize: 22,
    alignItems: "center",
    width: 400
  },
  pro: {
    color: "red",
    alignItems: "center"
  },
  body: {
    flex: 5
  }
});

import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    AsyncStorage
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
    Content
  } from "native-base";
import HListLanding from "./HListLanding";
import { Actions } from "react-native-router-flux";

const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";
const ACCESS_TOKEN = 'access_token';
const HOUSE_TOKEN = 'house_id';
export default class BookedHousesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      isLoggenIn: false,
      logedIn: '',
      houses: [],
    };
    this.showListBookedHouse=this.showListBookedHouse.bind(this);
  }
  componentWillMount() {
      this.showListBookedHouse();
  }
  async showListBookedHouse() {
    try {
        var accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log('::Access token for users booking  is available::'+accessToken);
        if (!accessToken) {
            console.log('Something wrong');
        } else {
            fetch(`http://icumbi.tres.rw/api/service/list`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                size:2,
                page:1
              })
        })
        .then((response) => response.json())
        .then((responseData) => {
            "POST Response",
                "Response Body -> " + JSON.stringify(responseData),
                console.log("ARRAY DATA"+responseData.data);
                 this.setState({
                    houses: responseData.data
                  });
                })

        .catch((error) => {
            console.log(error);
            
        })
        }
    } catch (error) {
        console.log("Something not good");
    }
  }
  render() {
    const { houses } = this.state;         
    return (
        <Content style={{ marginTop: 10 }}>
        <View style={styles.container}>
        <FlatList
          data={this.state.houses}
          renderItem={({ item: rowData }) => {
            return (
              <Card title={null} image={{ uri: rowData.house.photos[0].source }}>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{ uri: rowData.house.photos[0].source }}
                      {...this.props}
                    />
                    <Body>
                      <Text style={styles.titleSecond}>Available rooms</Text>
                      <Text style={styles.subTitle}>EXPLORE HOMES</Text>
                    </Body>
                  </Left>
                </CardItem>
                <TouchableOpacity
                //   onPress={() => {
                //     Actions.landingScreen({ id: rowData.house.id });
                //   }}
                >
                  <CardItem cardBody>
                    <Image
                      style={{ height: 150, width: null, flex: 1 }}
                      source={{ uri: rowData.house.photos[0].source }}
                      {...this.props}
                    />
                  </CardItem>
                </TouchableOpacity>

                <CardItem>
                  <Left>
                    <Body>
                      <Text style={styles.place}>{rowData.house.country}|{rowData.house.province}|{rowData.house.district}</Text>
                      <Text style={styles.bhk}> {rowData.house.rooms} Rooms </Text>
                      <Text style={styles.bhk}> Area: {rowData.house.length}x{rowData.house.width}</Text>
                      <Text style={styles.bhk}>Water inside: {rowData.house.water == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text style={{backgroundColor: "#ff6400", color: "white", padding: 5}}>False</Text>}</Text>
                      <Text style={styles.bhk}>Fenced: {rowData.house.fenced == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text style={{backgroundColor: "#ff6400", color: "white", padding: 5}}>False</Text>}</Text>
                      <Text style={styles.bhk}>Bathroom: {rowData.house.bathroom}  </Text>
                      <Text style={styles.bhk}> Toilet: {rowData.house.toilet}</Text>
                      <Text style={styles.bhk}>Refunded: {rowData.refunded} </Text>
                      <Text style={styles.bhk}>Booking pay Id:{rowData.paymentID} </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem style={styles.place}>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>{rowData.house.views} Views</Text>
                    </Button>
                  </Left> 
                  <Body>
                    <Button transparent>
                      <Text>Price:{rowData.house.housePrice}</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>Payment:{rowData.house.paymentfrequency}</Text>
                  </Right> 
                </CardItem>
              </Card>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      </Content>
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

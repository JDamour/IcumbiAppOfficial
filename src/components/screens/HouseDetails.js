import React, { Component } from "react";

import {
    Content,
    Card,
    CardItem,
    Left,
    Body,
    Right,
    Button,
    Icon
} from "native-base";
import { StyleSheet, Text, FlatList, View, AsyncStorage } from "react-native";
import Loading from 'react-native-whc-loading';
import Spinner from 'react-native-loading-spinner-overlay';
const API_KEY = "f0cb6490af1043818c8d444d2e70cce7";

import { Actions } from "react-native-router-flux";
const ACCESS_TOKEN = 'access_token';
const HOUSE_TOKEN = 'house_id';
export default class HouseDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggenIn: false,
            hid: '',
            logedIn: '',
            todo: {},
            isBooked:false,
            bookmsg:'',
            spinner: false
        };
    }
   
    componentDidMount() {
        setTimeout(() => {
            this.setState({
              spinner: !this.state.spinner,
            });
          }, 6000);
        this.showHouse();
       
    }
    
    async BookHouses(){
        try {
            var accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log('::Access token is available::'+accessToken);
            var houseToken = await AsyncStorage.getItem(HOUSE_TOKEN);

            console.log('::::House id to book is available::::'+houseToken);
            if (!houseToken && !accessToken) {
                console.log('Something wrong');
            } else {
                console.log("House details you want is here::" + houseToken);
                fetch(`http://icumbi.tres.rw/api/service/book`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    "house": houseToken,
                }),
            })
            .then((response) => response.json())
            .then((responseData) => {
                "POST Response",
                    "Response Body -> " + JSON.stringify(responseData),
                    console.log("[OBJECT HERE ]"+responseData);

               if(responseData.status==400){
                console.log("SERVICES DESCRIPTION "+responseData.description);
                // Actions.signin();
            }else{  
               console.log("SERVICES ID::"+responseData.serviceID);
            //    this.setState({bookmsg:responseData.message,loading:true});
            Actions.showBookedHouse();
            }
            })

            .catch((error) => {
                console.log(error);
                
            })
            }
        } catch (error) {
            console.log("Something went wrong");
        }

    }
    async showHouse() {
        try {
            var houseToken = await AsyncStorage.getItem(HOUSE_TOKEN);
            if (!houseToken) {
                console.log('Something wrong');
            } else {
                console.log("House details you want is here::" + houseToken);
                fetch(`http://icumbi.tres.rw/api/houses/show/${houseToken}`)
                    .then(response => response.json())
                    .then(responseJson => {
                        var objCopy = {}; // objCopy will store a copy of the mainObj
                        let key;

                        for (key in responseJson) {
                            objCopy[key] = responseJson[key]; // copies each property to the objCopy object
                        }

                        console.log(
                            "Here We are::::::" +
                            objCopy.id +
                            "::" +
                            objCopy.province +
                            ":::" +
                            objCopy.district
                        );
                        this.setState({ todo: objCopy,spinner:true });
                        console.log(
                            "::STATE OBJECT VALUE::Id:" +
                            this.state.todo.id +
                            "::Province:" +
                            this.state.todo.province +
                            "::district:" +
                            this.state.todo.district);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .done();
            }
        } catch (error) {
            console.log("Something went wrong");
        }

    }
    goBack() {
        Actions.pop();
    }
    render() {
        const { todo } = this.state;
        return (
            <Content style={{ marginTop: 10 }}>
            {this.state.spinner ?(
           <Spinner
           visible={this.state.spinner}
           textContent={'Loading...'}
           size="large" 
           color="#0000ff"
           animation="fade"
           textStyle={styles.spinnerTextStyle}
         />
         ) : (
        <Content style={{ marginTop: 10 }}>
                <View>
                    <Text style={styles.textContent}>
                        {" "}
                        {todo.province} | {todo.district}
                        {"  "}
                        <Icon
                            onPress={this.goBack}
                            style={styles.iconStyles}
                            name="ios-locate"
                            size={18}
                            color="#000"
                        />
                    </Text>
                </View>

                <View>
                    <View>
                        <Text style={styles.titleSecond}> House details</Text>
                    </View>
                  
                </View>

                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Price: {todo.housePrice}</Text>
                                <Text>Rooms: {todo.rooms}</Text>
                                <Text>
                                    Location(Sector/District): {todo.district}/{todo.province}
                                </Text>
                                <Text style={{ fontSize: 20, marginBottom: 12 }}>Extra</Text>
                                <Text>
                                    Area: {todo.length}x{todo.width}
                                </Text>
                                <Text style={{ marginTop: 10 }}>Water inside: {todo.water == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>Toilet inside: {todo.toilet == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>Bathroom inside: {todo.bathroom == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                                <Text style={{ marginTop: 10 }}>Fenced: {todo.fenced == 1 ? <Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text> : <Text>False</Text>}</Text>
                                <Button  onPress={() => {
                                   this.BookHouses();
                                }} style={styles.toLogin}>
                                   
                                    <Text style={{ color: "white" }}>Book this house</Text>
                                </Button>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
         )}
           </Content>
           
        );
    }
}
const styles = StyleSheet.create({
    containerBg: {
        backgroundColor: "#20d2bb"
    },
    textContent: {
        padding: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    hScroll: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "red"
    },
    headTxt: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 5
    },
    titleSecond: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10
    },
    toLogin: {
        marginTop: 10,
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
      },

});

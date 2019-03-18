import React, { Component } from "react";
import { Content, Card, CardItem, Left, Body, Right, Button,Icon } from "native-base";
import { StyleSheet, Text, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import Search from "./Search";
import HListLanding from "./HListLanding";
import ClusterCity from "./ClusterCity";
import ADVBanner from "./ADVBanner";
import AVDBannerSecond from "./AVDBannerSecond";

import { Actions } from "react-native-router-flux";

export default class BodyLanding extends Component {
    goBack() {
        Actions.pop();
    }
    login(){
        Actions.signin();
    }
    render() {
        return (
            <Content style={{ marginTop: 10 }}>
                <View>
                    {/* <View>
                        <Text style={styles.textContent}>
                            {" "}
                            Bangalore | Boys
        {"  "}
                            <Icon
                                onPress={this.goBack}
                                style={styles.iconStyles}
                                name="edit"
                                size={18}
                                color="#000"
                            />
                        </Text>
                    </View> */}

                    {/* <Search /> */}
                    <View>
                        <View>
                            <Text style={styles.titleSecond}> House details</Text>
                        </View>
                        <HListLanding />
                    </View>

                    {/* <ADVBanner /> 

                    <View>
                        <View>
                            <Text style={styles.titleSecond}>Cluster Citys</Text>
                        </View>
                        <ClusterCity />
                    </View>

                    <AVDBannerSecond />*/}

                    <Card>
                        <CardItem>
                            <Left>
                    <Body>
                            <Text>Price: 30,000</Text>
                            <Text>Number of Rooms: 3</Text>
                            <Text>Location(Sector/District): Kacyiru/GASABO</Text>
                            <Text style={{fontSize:20,marginBottom:15}}>Extra</Text>
                            <Text>Area:         10.0x 5.0</Text>
                            <Text>Water inside: True</Text>
                            <Text>Toilet inside: True</Text>
                            <Text>Bathroom inside: True</Text>
                            <Text>Fenced:    True</Text>
                     <Button  transparent onPress={this.login} style={styles.toLogin}>
                       {/* <Icon active name="chatbubbles" /> */}
                       <Text style={{color:'blue'}}>More details</Text>
                       
                     </Button>
                            </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </View>
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
        marginTop: 10
    }
});


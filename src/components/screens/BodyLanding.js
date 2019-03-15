import React, { Component } from "react";
import { Content } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
    render() {
        return (
            <Content style={{ marginTop: 10 }}>
                <View>
                    <View>
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
                    </View>

                    <Search />
                    <View>
                        <View>
                            <Text style={styles.titleSecond}> What We Offer</Text>
                        </View>
                        <HListLanding />
                    </View>

                    <ADVBanner />

                    <View>
                        <View>
                            <Text style={styles.titleSecond}>Cluster Citys</Text>
                        </View>
                        <ClusterCity />
                    </View>

                    <AVDBannerSecond />
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
    }
});


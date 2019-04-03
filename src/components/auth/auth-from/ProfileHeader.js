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
import { StyleSheet, Text, FlatList, View, Image, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
const ACCESS_TOKEN = 'access_token';
export default class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            accountConfirmationCode: '',
            amount: '',
            email: '',
            details: [],
        }
    }

    async componentDidMount() {
        try {
            var accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                console.log('Something wrong');
            } else {
                console.log("Token details you want is here::" + accessToken);
                fetch(`http://icumbi.tres.rw/api/user`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${accessToken}`,
                    }
                })
                    .then(response => response.json())
                    .then(responseJson => {
                          "GET Response",
                            "Response Body -> " + JSON.stringify(responseJson),
                            console.log("JSON RESPONSE HERE:::::" + responseJson.success.email);
                            this.setState({
                                details:responseJson.success    
                            }); 
                    })
                    .catch((error) => {
                        this.setState({
                            error: 'Error retrieving data',
                            loading: false
                        });
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log("Something went wrong"+error);
        }
    }


    render() {
        const { loading, details, error } = this.state;
        return (
            <Content style={{ marginTop: 10 }}>
                <View>
                    <Text style={styles.textContent}>
                        {" "}
                        {details.firstName} | {details.lastName}
                        {"  "}
                        <Icon
                            onPress={this.goBack}
                            style={styles.iconStyles}
                            name="md-contacts"
                            size={18}
                            color="#000"
                        />
                    </Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.profilepicwrap}>
                        <Image style={styles.profilepic} source={require('../../../assets/images/profileicon.png')} />
                    </View>
                    <Text style={styles.name}>{details.firstName} | {details.lastName}</Text>
                    <Text style={styles.pos}>- ICUMBI CLIENT -</Text>
                </View>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={styles.text}>FirstName:{details.firstName}</Text> 
                                
                                <Text style={styles.text}>LastName:{details.lastName} </Text>
                                <Text style={styles.text}>Email:{details.email} </Text>
                                <Text style={styles.text}>PhoneNumber:{details.phoneNumber} </Text>
                                <Text style={styles.text}>AccountConfirmation:{details.accountConfirmationCode==1?<Text style={{ backgroundColor: "green", color: "white", padding: 5 }}>True</Text>:<Text></Text>}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    headerBackground: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    profilepicwrap: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 16,
    },
    profilepic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 4,
    },
    name: {
        marginTop: 20,
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    pos: {
        fontSize: 14,
        color: '#0394C0',
        fontWeight: '300',
        fontStyle: 'italic',
      
    },
    text: {
        fontSize: 16,
        padding:5,
        color: '#000',
        fontWeight: '300',
        fontStyle: 'italic',
        alignItems:'center',
        
    },
    containerBg: {
        backgroundColor: "#20d2bb"
    },
    textContent: {
        padding: 5,
        fontSize: 18,
        fontWeight: "bold",
        textTransform: 'capitalize',

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

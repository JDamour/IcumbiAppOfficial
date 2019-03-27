import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';
const EMAIL_TOKEN = 'email_token';
export default class FormSignIn extends Component {
    dashboard() {
        Actions.dashboard();
    }
    forgot() {
        Actions.forgot();
    }
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            error: "",
            showProgress: false,
            emailToken: "",
        }
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }
    componentWillMount() {
        this.getEmailToken();
    }
    async getEmailToken() {
        try {
            let emailToken = await AsyncStorage.getItem(EMAIL_TOKEN);
            if (!emailToken) {
                //this.redirect('login');
            } else {
                this.setState({ emailToken: emailToken })
            }
        } catch (error) {
            console.log("Something went wrong");
            //this.redirect('login');
        }
    }
    storeToken(responseData) {
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    }
    storeEmailToken(responseData) {
        AsyncStorage.setItem(EMAIL_TOKEN, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("email stored success");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    }
    async onLoginPressed() {
        const { email, password } = this.state;
        this.setState({ error: '', showProgress: true });
        try {
            fetch('http://icumbi.tres.rw/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    "POST Response",
                        "Response Body -> " + JSON.stringify(responseData),
                        console.log(responseData);
                    // deviceStorage.saveKey('id_token',responseData.success.token);
                    // this.props.newJWT(responseData.success.token);
                    //  this.onRegistrationSucceed(responseData);
                    let accessToken = responseData.success.token;
                    
                    console.log(accessToken);
                    this.storeToken(accessToken);
                    this.storeEmailToken(email);
                    Actions.landingScreen();
                })

                .catch((error) => {
                    console.log(error);
                    // this.onRegistrationFail();
                })
        } catch (error) {
            this.setState({ error: error });
            console.log("error " + error);
            this.setState({ showProgress: false });
        }

    };

    render() {
        const { email, password } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Your email :{this.state.emailToken}  </Text>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    value={email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor="#333"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity onPress={this.forgot}>
                    <Text style={{ marginRight: 10 }} style={styles.signupButton}>
                        Forgot
                    </Text>
                </TouchableOpacity>
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed} >
                    <Text style={styles.buttonText}>
                        {this.props.type}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },

    inputBox: {
        width: 300,
        backgroundColor: "rgba(255, 255,255,0.2)",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 13,

        fontSize: 16,
        color: "#fff",
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: "#1c313a",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center"
    },
    signupButton: {
        color: "#000",
        fontSize: 16,
        fontWeight: "500"
    },
    title: {
        fontSize: 15,
        marginRight: 40,
        fontWeight: "500",
        color: "#333",
    },
   
    heading: {
        fontSize: 30,
        fontWeight: "500",
        color: "#fff",
    },
});


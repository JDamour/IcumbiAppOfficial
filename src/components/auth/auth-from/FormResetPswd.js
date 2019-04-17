import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { Actions } from "react-native-router-flux";
const ACCESS_TOKEN = 'access_token';
const RESET_TOKEN = 'reset_token';
export default class FormResetPswd extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            errors: [],
            error: '',
            loading: false,
            successmsg: '',
            accessToken:'',
        }
        this.onRessetPswdPressed = this.onRessetPswdPressed.bind(this);
    }
    
    async onRessetPswdPressed () {
        const { email, password, password_confirmation,accessToken} = this.state;
        this.setState({ error: '', showProgress: true });
        try {
            var resetToken = await AsyncStorage.getItem(RESET_TOKEN);
            console.log("Reset token is here::"+resetToken);
            if (!resetToken) {
                console.log('Something wrong');
            } else {
            fetch(`http://icumbi.tres.rw/api/password/reset`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "password_confirmation": password_confirmation,
                    "token":resetToken
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    "POST Response",
                        "Response Body -> " + JSON.stringify(responseData),
                        console.log("[OBJECT HERE ]"+responseData);
    
                   if(responseData.data===null){
                    console.log("MESSAGE RESSETING "+responseData.message);
                    Actions.signin();
                }else{  
                   console.log("FOUNDED MSG::"+responseData.message);
                   console.log("FOUNDED DATA::"+responseData.data);
                   this.setState({error:responseData.message,loading:true});
                }
                })

                .catch((error) => {
                    console.log(error);
                    
                })
            }
        } catch (errors) {
            console.log(error);
           
        }

    };

    render() {
        const { email, password, password_confirmation, error, loading } = this.state;
        return (
            <View style={styles.container}>
            {loading ?
                    <Text style={styles.errorTextStyle}>
                        {error}
                    </Text>
                    :
                    <Text></Text>
                }
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Your email"
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
                    placeholder="Your new password"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => this.setState({ password })}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Confirm password"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    value={password_confirmation}
                    onChangeText={password_confirmation => this.setState({ password_confirmation })}
                />
                <TouchableOpacity style={styles.button} onPress={this.onRessetPswdPressed} >
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}
const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:50,
    },
    inputBox: {
        width: 300,
        backgroundColor: "rgba(255, 255,255,0.2)",
        borderRadius: 25,
        paddingHorizontal: 14,
        paddingVertical: 7,
        fontSize: 16,
        color: "#ffffff",
        marginVertical: 8
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
        color: "#ffffff",
        textAlign: "center"
    },
    errorTextStyle: {
        alignSelf: 'center',
        color: "#ff6400",
        fontSize: 18,
        fontWeight: "500"
    },
    successTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: "500"
    }
});

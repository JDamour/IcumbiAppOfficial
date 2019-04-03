import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
const RESET_TOKEN = 'reset_token';
export default class FormForgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: '',
            email: '',
        }
        this.onCheckEmailPressed=this.onCheckEmailPressed.bind(this);
    }
    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(RESET_TOKEN, accessToken);
            console.log(" Reset Token was stored successfull ");
        } catch (error) {
            console.log("Something went wrong");
        }
    }
    onCheckEmailPressed = () => {
        const {email, error} = this.state;
        try {
            fetch('http://icumbi.tres.rw/api/password/email', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    "POST Response",
                        "Response Body -> " + JSON.stringify(responseData),
                        console.log("[OBJECT HERE ]"+responseData);
    
                   if(responseData.data!=null){
                    let resetpswdToken = responseData.data.token;
                    console.log(resetpswdToken);
                    this.storeToken(resetpswdToken);
                    Actions.resetpswd();
                }else{  
                   console.log("TOKEN NOT FOUNDED MSG::"+responseData.message);
                   this.setState({error:responseData.message,loading:true});
                }   
                })

                .catch((error) => {
                    console.log(error.message);
                    // // this.onRegistrationFail();
                    // this.setState({ error: 'Registration Failed', showProgress: true });
                })
        } catch (errors) {
            console.log(error);
        }

    };

    render() {
        const { email, error,loading} = this.state;
        return (
            <View style={styles.container}>
             {this.state.loading ?
                    <Text style={styles.errorTextStyle}>
                        {error}
                    </Text>
                    :
                    <Text></Text>
                }
                 <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Your email to reset password"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    value={email}
                    onChangeText={email => this.setState({ email })}
                />
                <TouchableOpacity style={styles.button} onPress={this.onCheckEmailPressed}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    errorTextStyle: {
        alignSelf: 'center',
        color: "#ff6400",
        fontSize: 18,
        fontWeight: "500"
    },

});
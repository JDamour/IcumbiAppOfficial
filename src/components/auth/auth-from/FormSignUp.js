import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
const ACCESS_TOKEN = 'access_token';
const EMAIL_TOKEN = 'email_token';
export default class FormSignUp extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password_confirmation: "",
            phoneNumber: "",
            roleId: 3,
            errors: [],
            error: '',
            showProgress: false,
            loading: false,
            successmsg: '',
        }
        this.onRegisterPressed = this.onRegisterPressed.bind(this);
    }
    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            console.log("Token was stored successfull ");
        } catch (error) {
            console.log("Something went wrong");
        }
    }
    async storeEmailToken(emailaccessToken) {
        try {
            await AsyncStorage.setItem(EMAIL_TOKEN, emailaccessToken);
            console.log("Email  was stored successfull ");
        } catch (error) {
            console.log("Something went wrong");
        }
    }
    onRegisterPressed = () => {
        const { firstName, lastName, email, password, password_confirmation, phoneNumber, roleId } = this.state;
        this.setState({ error: '', showProgress: true });
        try {
            fetch('http://icumbi.tres.rw/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "password_confirmation": password_confirmation,
                    "phoneNumber": phoneNumber,
                    "roleId": roleId,
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
                    let emailaccessToken = responseData.success.email;
                    console.log(accessToken);
                    this.storeToken(accessToken);
                    this.storeEmailToken(emailaccessToken);
                    //Actions.login();
                    this.setState({ successmsg: 'Successfully registered!!', loading: true });
                })

                .catch((error) => {
                    console.log(error);
                    // this.onRegistrationFail();
                    this.setState({ error: 'Registration Failed', showProgress: true });
                })
        } catch (errors) {
            console.log(error);
            this.setState({ error: 'Registration Failed', showProgress: true });
        }

    };

    render() {
        const { firstName, lastName, email, password, password_confirmation, phoneNumber, error, loading, showProgress } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="First name"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    value={firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Last name"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    value={lastName}
                    onChangeText={lastName => this.setState({ lastName })}>
                </TextInput>


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
                    placeholder="Phone number"
                    placeholderTextColor="#333"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                    value={phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                >
                </TextInput>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
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
                <TouchableOpacity style={styles.button} onPress={this.onRegisterPressed} >
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
                {this.state.showProgress ?
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    :
                    <Text></Text>
                }
                {this.state.showProgress ?
                    <Text style={styles.successTextStyle}>
                        {this.state.successmsg}
                    </Text>
                    :
                    <Text></Text>
                }
                <Errors errors={this.state.errors} />
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
        alignItems: "center"
    },

    inputBox: {
        width: 300,
        backgroundColor: "rgba(255, 255,255,0.2)",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 13,

        fontSize: 16,
        color: "#ffffff",
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

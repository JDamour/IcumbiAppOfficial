import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import { Actions } from "react-native-router-flux";
const ACCESS_TOKEN = 'access_token';
export default class AppStartUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      isLoggenIn: false,
    };
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
    Actions.dashboard();
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
    Actions.dashboard();
  };
  async componentDidMount() {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      });
      
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }
  render() {
        return (
          <AppIntroSlider
            textStyle={styles.textStyle}
            slides={slides}
            onDone={this._onDone}
            showSkipButton={true}
            onSkip={this._onSkip}
          />);
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  },
  text: {
    color: "#000000",
    fontSize: 22
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "center",
    marginTop: 16
  },
  container: {
    flex: 1
  }
});

const slides = [
  {
    key: "s1",
    text: "Best Way To Find Rentel Home",
    title: "welcome Home",
    titleStyle: styles.title,
    textStyle: styles.text,
    image: require("../src/assets/images/step1.png"),
    imageStyle: styles.image,
    backgroundColor: "#20d2bb"
  },
];

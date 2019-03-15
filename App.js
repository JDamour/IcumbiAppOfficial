import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Routes from "./src/Routes";
// { Font, AppLoading } from "expo";

import { Root } from "native-base";
import { Font, AppLoading } from "expo";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    };
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
 async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      });
      //this.setState({ showRealApp: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    /*if (!this.state.showRealApp) {
      return (
        <Root>
          <AppLoading />
        </Root>
        
      );
    }*/
    if (this.state.showRealApp) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
          <Routes />
          <AppLoading />
  
        </View>
      );
    } else {
      return (
        <AppIntroSlider
          textStyle={styles.textStyle}
          slides={slides}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
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
    image: require("./src/assets/images/step1.png"),
    imageStyle: styles.image,
    backgroundColor: "#20d2bb"
  },
  {
    key: "s2",
    title: "Find Your Home",
    titleStyle: styles.title,
    textStyle: styles.text,
    text: "Near By Option To Find Home",
    image: require("./src/assets/images/step2.png"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  },
  {
    key: "s3",
    title: "Schedule Visit",
    titleStyle: styles.title,
    textStyle: styles.text,
    text: "Overall possible Home Visit",
    image: require("./src/assets/images/step3.png"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  },
  {
    key: "s4",
    title: "Great Offer",
    titleStyle: styles.title,
    textStyle: styles.text,
    text: "Enjoy the great offer",
    image: require("./src/assets/images/step4.png"),
    imageStyle: styles.image,
    backgroundColor: "#40739e"
  },
  {
    key: "s5",
    title: "Refer Friends",
    titleStyle: styles.title,
    textStyle: styles.text,
    text: "Enjoy Refral Bonus",
    image: require("./src/assets/images/step5.png"),
    imageStyle: styles.image,
    backgroundColor: "#60a3bc"
  },
  {
    key: "s6",
    title: "Room Amenities",
    titleStyle: styles.title,
    textStyle: styles.text,
    text: " All Amenities Available",
    image: require("./src/assets/images/step6.png"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  }
];

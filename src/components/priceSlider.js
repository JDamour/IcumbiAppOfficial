import React from "react";
import { Slider, Text, View, StyleSheet } from "react-native";

export default class SliderExample extends React.Component {
  static defaultProps = {
    value: 'range[0,10]'
  };
  state = {
    value: this.props.value
  };
  render() {
    return (
      <View>
        <Text style={styles.text}>
          {this.state.value && +this.state.value.toFixed(3)}
        </Text>
        <Slider
          {...this.props}
          onValueChange={value => this.setState({ value })}
        />
      </View>
    );
  }
}


// class SlidingCompleteExample extends React.Component {
//   state = {
//     slideCompleteValue: 0,
//     slideCompleteCount: 0
//   };

//   render() {
//     return (
//       <View>
//         <SliderExample
//           {...this.props}
//           onSlidingComplete={value =>
//             this.setState({
//               slideCompleteValue: value,
//               slideCompleteCount: this.state.slideCompleteCount + 1,
//             })
//           }
//         />
//         <Text>
//           Completions:{this.state.slideCompleteCount} value: {""}
//           {this.state.slideCompleteValue}
//         </Text>
//       </View>
//     );
//   }
// }

var styles = StyleSheet.create({
  slider: {
    height: 10,
    width: 100,
    margin: 10
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    margin: 10
  },
})

exports.title = '<Slider>';
exports.displayName = 'SliderExample';
exports.discription = 'Slider input for numeric values';
exports.example = [
  {
    title: "default settings",
    render() {
      return <SliderExample />;
    }
  },
//   {
//     title: "Initial value: 0.5",
//     render() {
//       return <SliderExample value={0.5} />;
//     }
//   }
];

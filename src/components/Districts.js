

import FooterBar from "./screens/FooterBar";
import React, { Component } from "react";
import { TouchableOpacity, View, FlatList, ScrollView, StyleSheet, Text, TextInput,Slider,ActivityIndicator } from "react-native";
import { Container, Header, Content, Index, List, ListItem, Left, Body, Title, Item, Right, Icon, Button, Row } from "native-base";
import createReactContext from 'create-react-context'; 
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-simple-modal";
import { Actions } from "react-native-router-flux";

export default class Districts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.id,
      prov: null,
      tableHead: ['', '', ''],
      provinces: {},
      c_tasks: [],
      dis: {},
      from: 10000,
      up_to: 180000,
      value: 50,
      loader: true
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loader: false
      });
    }, 5000);
  }
  state = { open: false };
  modalDidOpen = () => console.log("Modal did open.");
  modalDidClose = () => {
    this.setState({ open: false });
    console.log("Modal did close.");
  }
  handleFrom = () => {
    this.setState({ from: 10 })
  }
  handleup_to = () => {
    this.setState({ up_to:10 })
  }
  apply = (from, up_to) => {
     alert('from: ' + from + '\n up to: ' + up_to)
  }
 enableScroll = () => this.setState({ scrollEnabled: true });
 disableScroll = () => this.setState({ scrollEnabled: false });
    
  moveUp = () => this.setState({ offset: -100 });
  resetPosition = () => this.setState({ offset: 0 });
  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.timer = setInterval(() => this.getProvinces(), 3000);
  }

  async getProvinces() {
    // fetch(`http://192.168.1.129:8000/api/province/${this.state.pid}`)
    fetch(`https://icumbi.tres.rw/api/province/${this.state.pid}`)
      .then(response => response.json())
      .then(responseJson => {
        var objCopy = {};
        let key;
        for (key in responseJson) {
          objCopy[key] = responseJson[key];
        }
        this.setState({
          provinces: objCopy
        });
      })
      .catch(error => {
        null;
      });
  }
  getVal(val){
    console.warn(val);
    }
  render() {
    const { provinces } = this.state;
    const { dis } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          {this.state.loader ? (
            <ActivityIndicator style={styles.load} size="large" color="#20d2bb" />
          ) : (
            <View>
              <Header style={styles.head}>
                <Body>
                    <Title> List of districts in {provinces.name}</Title>
                </Body>
              </Header>
              <List>
                <ScrollView>
                  <View>
                    <ListItem>
                      <Text style={styles.pro} />
                    </ListItem>
                    {typeof provinces.districts == "object" ? (
                      <View>
                        {provinces.districts.map((dis) => (
                          <View>
                          <ListItem>
                            <TouchableOpacity onPress={this.openModal}>
                              <Text style={styles.dis}>{" " + dis.name}</Text>
                            </TouchableOpacity>
                          </ListItem>
                        </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </ScrollView>
              </List>
              <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{ alignItems: "center" }}
        >
          <View style={{height: 250, width: 260,alignItems:'center'}}>
          <Text style={{ fontSize: 20, marginBottom: 10,textAlign:"center"}}>Range of prices</Text>
        {/* <View style={styles.containerr}> */}
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={10000}
         maximumValue={90000}
         value={this.state.from}
         onValueChange={val => this.setState({ from: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          From : {this.state.from}
        </Text> 
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={this.state.from}
         maximumValue={180000}
         value={this.state.up_to}
         onValueChange={val => this.setState({ up_to: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.instructions}>
         Up to : {this.state.up_to}
        </Text> 
      {/* </View> */}
      <View  style={styles.forpopup}>
            <TouchableOpacity
              style={styles.submitButton}
              // onPress={
              //   () => this.apply(this.state.from, this.state.up_to) }
              onPress={()=>{
                Actions.selectRooms({id:dis.id, up_to:this.state.up_to, from:this.state.up_to});
              }}
              >
              <Text style={styles.submitButtonText}> OK </Text>
            </TouchableOpacity>
            </View>

      <View style={styles.row}>
           <TouchableOpacity style={{ margin: 25 }} onPress={this.moveUp}>
              <Text>Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 25 }}
              onPress={this.resetPosition}
            >
              <Text>Down </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 25}} onPress={this.closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
           </View>
          </View>
        </Modal>
            </View>
          )}
        </View>
        <FooterBar />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  h2text: {
    margin: 10,
    alignItems: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    width: 450
  },
  head: {
    backgroundColor: "#20d2bb"
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "blue"
  },
  dis: {
    fontSize: 22,
    alignItems: "center",
    width: 400
  },
  pro: {
    color: "red",
    alignItems: "center"
  },
  body: {
    flex: 5
  },
  input: {
    margin: 15,
    height: 40,
    width: 80,
    borderColor: '#7a42f4',
    borderWidth: 2
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    marginTop: 15,
    height: 40,
    width: 80,
    alignItems: "center",
 },
 submitButtonText:{
    color: 'white'
 },
 row: {
  flex: 1,
  flexDirection: "row",
  marginBottom:-10,
  alignItems: 'center',
  justifyContent:'center'

},
inputWrap: {
  flex: 1,
  marginBottom: 10,
  flexDirection: "row",
},
forpopup: {
  flex: 1,
  marginBottom: 10,
  justifyContent:'center'
},
containerr: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 15,
  textAlign: 'center',
  margin: 10,
},
instructions: {
  textAlign: 'center',
  //color: '#333333',
  fontSize: 15,
  marginBottom: 5,
},
  
});

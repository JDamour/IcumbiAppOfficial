import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity
  } from "react-native";
import PostData from '../LocalJson';

export default class PostList extends Component {
    render(){
        return(
            <View>
                {PostData.map((postDatail, index)=>{
                    return <View>{postDatail.name}</View>
                })}
            </View>
        )
    }
}
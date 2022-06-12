import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles'; 

class ServicesLayout extends Component {
  render() {
    return (
      <View style={[styles.container,{backgroundColor:'#ffffff' , overflow:'hidden' , borderRadius:5}]}>
        <View style={{ backgroundColor: "#000" }}>
          <ImageBackground
            style={{ height: 120, opacity: 0.6, zIndex: 1 }}
            source={this.props.imageUri_banner}
          >
          </ImageBackground>
        </View>
        <Image
          style={{
            height: 40, 
            marginLeft: 10, 
            width: 40, 
            borderRadius: 20, 
            borderColor: '#fff', 
            borderWidth: 2, 
            marginTop: -20,
          }}
          source={this.props.imageUri_profile}
        />
        <View style={{ margin: 10,}}>
          <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:5 }}>
            <AntIcon
              name="check"
              color={"#0ed200"}
              size={12}
            />
            <Text style={styles.NameTextStyle}>{this.props.service_name}</Text>
          </View>
          <Text style={[styles.SectionHeadingTextStyle, {marginBottom:5}]}>{this.props.service_title}</Text>
          <View style={{ flexDirection: 'row', marginBottom: 5 , alignItems: 'center',}}>
            <Text style={[styles.OtherTextStyle, {marginRight:5}]}>{CONSTANT.HomeServiceStartingFrom}</Text>
            <Text style={[styles.SectionHeadingTextStyle,{color: '#fe736e'}]}>{this.props.service_price}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <AntIcon
              name="star"
              color={"#FECB02"}
              size={12} />
            <Text style={styles.OtherTextStyle}>{this.props.service_rating}/5</Text>
            <Text style={[styles.OtherTextStyle, {marginLeft:10}]}>{this.props.service_queue}{' '}{CONSTANT.HomeServiceinqueue}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default ServicesLayout;

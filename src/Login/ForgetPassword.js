import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import RNRestart from 'react-native-restart';
import { CalloutSubview } from "react-native-maps";
import axios from "axios";
import home from "../Home/home";
import SimpleHeader from "../Header/SimpleHeader";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as CONSTANT from '../Constants/Constant';
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }
  RestPassword = () => {
    const { username } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == "") {
      this.setState({ email: "Please enter Email address" });
    } else if (reg.test(username) === false) {
      this.setState({ email: "Email is Not Correct" });
      return false;
    } else {
      axios
        .post(
          CONSTANT.BaseUrl + "user/forgot_password",
          {
            email: username,
          }
        )
        .then(async response => {
          if (response.status == 200) {
            Alert.alert(response.data.message);
          } else if (response.status == 203) {
            Alert.alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={{ flex: 1 ,backgroundColor:"#FFFFFF"}}>
        <SimpleHeader HeaderText={"Şifre sıfırla"}/>
        <View style={styles.container}>
         
          <View
            style={{
              width: "90%",
              borderWidth: 0.8, borderRadius: 4, margin: 10, borderColor: '#dddddd'
            }}
          >
            <TextInput
              style={{ fontSize: 15, padding: 5, height: 40 }}
              underlineColorAndroid="transparent"
              name="username"
              placeholder={CONSTANT.ForgetEmail}
              placeholderTextColor="#807f7f"
              onChangeText={username => this.setState({ username })}
            />
            
          </View>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "#807f7f",
              marginBottom:5,paddingLeft:10,paddingRight:10
            }}
          >
            {CONSTANT.Forgetmain}
          </Text>

          <TouchableOpacity
            onPress={this.RestPassword}
            style={{
              alignItems: "center",
              height: 40,
              margin: 10,
              borderRadius: 4,
              width: "40%",
              alignSelf: "center",
              backgroundColor: CONSTANT.primaryColor
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                paddingTop: 9,
                fontFamily:"Poppins-Medium",
                fontSize:15
              }}
            >
              {CONSTANT.ForgetButton}
            </Text>
          </TouchableOpacity>
        </View>

        {params.RegistrationOption != 'disable' &&
          <View style={{ height: 55,backgroundColor:"white" }}>
            <Text
              onPress={() => this.props.navigation.navigate("Signup")}
              style={{
                textAlign: "center",
                alignSelf: "center",
                justifyContent: "center",
                color: "#000",
                fontSize: 18,
                margin: 15
              }}
            >
              {CONSTANT.ForgetMoveSignup}
            </Text>
          </View>
        }
      </View>
    );
  }
}
export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    height: "40%",
    marginBottom: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FFFFFF"
  },
  container1: {
    height: "40%",
    marginBottom: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"red"
  }
});

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
  Platform
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
class EmployerHeader extends Component {
  state = {
    NotificationCount: '',
  };
  // componentDidMount() {
  //   this.CheckNotificationCount();
  // }
  // CheckNotificationCount = async () => {
  //   const Uid = await AsyncStorage.getItem('projectUid');
  //   const response = await fetch(CONSTANT.BaseUrl + 'user/notification_count?user_id=' + Uid);
  //   const json = await response.json();
  //   this.setState({NotificationCount: json.unread_notification_count});
  //   console.log('NotificationCount', this.state.NotificationCount)
  // };
  showSearch = () => {
    this.props.navigation.navigate("SearchScreenEmployer");
  };
  showNotification = () => {
    this.props.navigation.navigate("Notification");
  };
  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }
  render() {
    return (
      <View>
      {/* {Platform.OS === "android" ? */}
        <StatusBar backgroundColor="#f7f7f7" barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
         {/* : 
        <StatusBar hidden /> */}
      {/* } */}
      <View
        style={{  height: 60,
          paddingVertical:10,
          backgroundColor:"#f7f7f7",
          flexDirection: "row",}}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.HeaderSection2}
        >
          <Text
            style={[styles.SectionHeadingTextStyle,{color:CONSTANT.TextColorLight, fontWeight:'500'}]}
          >
            {CONSTANT.employerHeader}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}
export default withNavigation(EmployerHeader);
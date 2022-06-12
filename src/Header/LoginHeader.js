import React, {Component} from 'react';
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
  TextInput,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import {I18nManager} from 'react-native';
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';

class LoginHeader extends Component {
  render() {
    return (
      <View>
        {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
        <StatusBar   hidden = {false} networkActivityIndicatorVisible = {true} backgroundColor="transparent" barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
        <View
          style={[{
            height: 80,
            paddingVertical:10,
            backgroundColor: "white",
            flexDirection: "row",
          }]}
        >
          <TouchableOpacity style={styles.HeaderSection1}/>
        </View>
      </View>
      // </TouchableOpacity>
    );
  }
}
export default withNavigation(LoginHeader);

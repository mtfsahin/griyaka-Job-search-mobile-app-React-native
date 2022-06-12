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

class SearchHeader extends Component {
  render() {
    return (
      <View>
        {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
        <StatusBar backgroundColor={CONSTANT.headerColor1} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
        <View
          style={styles.HeaderMainArea1}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.HeaderSection1}
          >
            <AntIcon name="arrowleft" size={25} color={"#000"} 
              style={{
                transform:I18nManager.isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]
              }} />
          </TouchableOpacity>
          <View
            style={[styles.HeaderSection2,{backgroundColor:CONSTANT.headerColor1}]}>
            <Text
              style={[styles.SectionHeadingTextStyle,{color:CONSTANT.TextColorDark, fontWeight:'500',fontFamily:"Poppins-Medium"}]}
            >  
              {this.props.HeaderText}
            </Text>
          </View>
          <TouchableOpacity style={styles.HeaderSection1}/>
        </View>
      </View>
      // </TouchableOpacity>
    );
  }
}
export default withNavigation(SearchHeader);

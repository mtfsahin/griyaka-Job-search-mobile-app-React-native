import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Share } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
class EmployerLayout extends Component {
  state = {
    default_color_badge: "",
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    iconColor: '#dddddd',
    showAlert: false,
    isLoading: false,
  };
  componentDidMount() {
    this.getUser();
    var user_id = this.props.fav_user_id;
  }
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
    }
  };
  render() {
    const { showAlert, storedType, iconColor, isLoading } = this.state;
    var fav_color = this.props.Fav_Color;
    return (
      <View style={styles.section}>
        <View style={[styles.EmployerLayoutMainArea, styles.Elevation]}>
          <Image
            style={styles.EmployerLayoutBannerArea}
            source={this.props.companBannerImage}
          />
          <View
            style={[styles.EmployerLayoutDetailArea, {width: '100%'}]}
          >
            <View
              style={[styles.EmployerLayoutImgArea, styles.Elevation]}
            >
              <Image
                style={styles.EmployerLayoutImgStyle}
                source={this.props.companyProfileImage}
              />
            </View>
            <View
              style={[styles.EmployerLayoutNameArea, {width: '70%'}]}
            >
              <Text
                style={[styles.NameTextStyle, {paddingBottom: 2,}]}
              >
                {this.props.companyName}
              </Text>
              <Text
                numberOfLines= {1}
                style={[styles.SectionHeadingTextStyle, {paddingBottom: 3}]}
              >
                {this.props.companyTitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[styles.OtherTextStyle, {color:CONSTANT.TextColorBlue}]}
                >
                  {CONSTANT.EmployersOpenJobs}
                </Text>
                <Text
                  style={[styles.OtherTextStyle, {color:CONSTANT.TextColorBlue, marginLeft:10}]}
                >
                  {CONSTANT.EmployersFullProfile}
                </Text>
              </View>
            </View>
          </View>
          {/*<View
            style={styles.EmployerLayoutIconArea}
          >
            {storedType != "" ? (
              <View>
                {fav_color == "yes" ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#fff'
                    }}
                  >
                    <AntIcon
                      name="heart"
                      color={CONSTANT.primaryColor}
                      size={17}
                      style={styles.EmployerLayoutIconStyle}
                    />
                  </View>
                ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={this.UpdateFav}
                    >
                      <AntIcon
                        name="heart"
                        color={this.state.iconColor}
                        size={17}
                        style={styles.EmployerLayoutIconStyle}
                      />
                    </TouchableOpacity>
                  )}
              </View>
            ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(CONSTANT.AwesomeAlertMessage3);
                  }}
                >
                  <AntIcon
                    name="heart"
                    color={"#dddddd"}
                    size={17}
                    style={styles.EmployerLayoutIconStyle}
                  />
                </TouchableOpacity>
              )}
          </View>*/}
        </View>
      </View>
    );
  }
}
export default EmployerLayout;

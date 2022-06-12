import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import AntIcon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import ViewOverflow from 'react-native-view-overflow';

import * as CONSTANT from "../Constants/Constant";
import styles from '../Constants/Styles';
class FreelancerCategory extends Component {
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
  UpdateFav = async () => {
    var user_id = this.props.fav_user_id;
    const fav_id = await AsyncStorage.getItem("projectUid");
    axios
      .post(
        CONSTANT.BaseUrl + "user/favorite",
        {
          id: fav_id,
          favorite_id: user_id,
          type: "_saved_freelancers"
        }
      )
      .then(async response => {
        if (response.status == "200") {
          this.setState({
            iconColor: CONSTANT.primaryColor,
            isLoading: false
          });
          alert("Favorite Updated Successfully");
        } else if (response.status == "203") {
          alert("Cannot update favorite/ Network Error");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  render() {
    const { showAlert, storedType, iconColor, isLoading } = this.state;
    var fav_color = this.props.Fav_Color;
    return (
      <View>
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}
        <View style={[styles.section, {paddingRight:0}]}>
          <ViewOverflow horizontal={true} style={{
            position: 'relative',
            flexDirection: "row",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.2,
            backgroundColor: (this.props.isFeatured && this.props.isFeatured != "") ?  "#fffdf3" : "#ffffff",
            overflow: "visible",
            marginBottom: 10,
            marginRight: 14,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#ddd",
            shadowRadius: 2,
            elevation: 2,
            zIndex: -1,
          }}>
              <View
                style={{
                  overflow: 'visible',
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderRightWidth: 25,
                  borderTopWidth: 25,
                  borderTopLeftRadius: 4,
                  borderRightColor: "transparent",
                  borderTopColor: this.props.featuredColor != "" ? this.props.featuredColor : "#ffffff"
                }}
              />
            <Image
              style={styles.FreelancerCategoryFeaturedImgStyle}
              source={this.props.imageUrifeatured}
            />
            <Image
              style={styles.FreelancerCategoryImageStyle}
              source={this.props.imageUrifreelancer}
            />
            <View style={styles.FreelancerCategoryviewStyle}>
              <Text style={styles.NameTextStyle}>{this.props.freelancername}</Text>
              {this.props.title != "" && 
              <Text numberOfLines={1} style={styles.SectionHeadingTextStyle}>{this.props.title}</Text>
              }
              <View
                horizontal={true}
                style={{ flexDirection: "row", marginTop: 2 }}>
                {this.props.rate != "" ? (
                  <Text style={styles.OtherTextStyle}>{this.props.rate}</Text>
                ) : (
                    <Text style={styles.OtherTextStyle}>{CONSTANT.DetailFreelancerNoPriceYet}</Text>
                )}

                <Text style={styles.OtherTextStyle}>{this.props.country}</Text>
              </View>
            </View>

           {/* <View
              style={styles.FreelancerCategoryIconArea}
            >
              {storedType != "" ? (
                <>
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
                        style={styles.FreelancerCategoryIconStyle}
                      />
                    </View>
                  ) : (
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:'#fff'
                        }}
                        activeOpacity={0.7}
                        onPress={this.UpdateFav}
                      >
                        <AntIcon
                          name="heart"
                          color={CONSTANT.primaryColor}
                          size={17}
                          style={styles.FreelancerCategoryIconStyle}
                        />
                      </TouchableOpacity>
                  )}
                </>
              ) : (
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#fff'
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                      Alert.alert(CONSTANT.AwesomeAlertMessage4);
                    }}
                  >
                    <AntIcon
                      name="heart"
                      color={"#dddddd"}
                      size={17}
                      style={styles.FreelancerCategoryIconStyle}
                    />
                  </TouchableOpacity>
              )}
            </View>*/}
            
          </ViewOverflow>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={CONSTANT.AwesomeAlertTitle}
          message={CONSTANT.AwesomeAlertMessage3}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={CONSTANT.AwesomeAlertConfirmText}
          confirmButtonColor={CONSTANT.primaryColor}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}
export default FreelancerCategory;

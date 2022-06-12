import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image , Alert } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

import * as CONSTANT from "../Constants/Constant";
import styles from '../Constants/Styles';
import HTML from 'react-native-render-html';

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class LatestJobs extends Component {
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
    var user_id = this.props.fav_job_user_id;
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
    var user_id = this.props.fav_job_user_id;
    const fav_id = await AsyncStorage.getItem("projectUid");
    axios
      .post(
        CONSTANT.BaseUrl + "user/update-favourite",
        {
          id: fav_id,
          favorite_id: user_id,
          type: "saved_jobs"
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
  FeaturedStyle = (featuredJObColor) => {
    return {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderRightWidth: 25,
      borderTopWidth: 25,
      borderTopLeftRadius: 4,
      borderRightColor: "transparent",
      borderTopColor: featuredJObColor != "" ? featuredJObColor : "#fff"
    }
  }
  render() {
    const { showAlert, storedType, iconColor, isLoading } = this.state;
    var fav_color = this.props.Fav_Color;
    return (
      <View>
        <View cardElevation={2} cardMaxElevation={2} cornerRadius={5} style={styles.LatestJobsshadow(this.props.featuredJObColor)}>
          <View
            style={this.FeaturedStyle(this.props.featuredJObColor)}
          />
          <Image
            style={{
              width: 10,
              marginTop: -23,
              marginLeft: 3,
              marginBottom: 23,
              position: "relative",
              height: 10
            }}
            source={this.props.imageUrijobfeatured}
          />
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignSelf: "auto",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Text
              style={styles.NameTextStyle}
            >
              {this.props.jobname}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignSelf: "auto",
              overflow: "hidden",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Text
              style={styles.SectionHeadingTextStyle}
            >
              {this.props.jobtitle}
            </Text>
          </View>
          { this.props.joblevel != '' &&
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              <Text style={{ color: "#00cc8d", fontSize: 20 }}>$</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "300",
                  overflow: "hidden",
                  marginLeft: 13,
                  color: "#323232",
                  textAlign: "left",
                }}
              >
                {this.props.joblevel}
              </Text>
            </View>
          }
          {this.props.jobcountry != '' &&
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  paddingLeft: 10,
                  height: 8,
                  width: 15,
                  marginTop: 5,
                  alignItems: "center",
                  alignItems: "center"
                }}
                source={this.props.homejobflagimageUri}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "300",
                  overflow: "hidden",
                  color: "#323232",
                  marginLeft: 12,
                  textAlign: "left",
                }}
              >
                {this.props.jobcountry}
              </Text>
            </View>
          }
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: "flex-start",
              alignItems: "center"
            }}>
            <AntIcon
              name="folder1"
              color={"#3498db"}
              size={13}
              style={{ alignItems: "center" }}
            />
            {this.props.jobrate === "" ?
              <View 
              style={{
                flexDirection:"row", 
                justifyContent:"flex-start", 
                paddingLeft:10
              }}>
              <HTML
                containerStyle={{marginRight: 4,}}
                baseFontStyle={styles.ParagraphTextStyle}
                html={this.props.jobhourlyhours}
              />
              <Text style={styles.ParagraphTextStyle}>
                {CONSTANT.HomeCompleteJobLayoutRate}
              </Text>
              <Text style={styles.ParagraphTextStyle}>
                {this.props.jobestimatedhours}
              </Text>
              <Text style={styles.ParagraphTextStyle}>
                {CONSTANT.HomeCompleteJobLayoutHours}
              </Text>
            </View>
            :
              <View style={{paddingLeft:10}}>
                <HTML
                containerStyle={{marginRight: 4,}}
                baseFontStyle={styles.ParagraphTextStyle}
                html={this.props.jobrate}
              />
              </View>
            }
          </View>
          { this.props.jobduration != '' &&
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AntIcon
                name="clockcircleo"
                color={CONSTANT.primaryColor}
                size={13}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "300",
                  overflow: "hidden",
                  marginTop: 1,
                  marginLeft: 10,
                  color: "#323232",
                  textAlign: "left",
                  alignSelf: "center",
                  alignItems: "center",
                }}>
                {this.props.jobduration}
              </Text>
            </View>
          }
        </View>
      </View>
    );
  }
}
export default LatestJobs;
     
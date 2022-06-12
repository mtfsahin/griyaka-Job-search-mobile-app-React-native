import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, ActivityIndicator } from "react-native";
import axios from "axios";
import ViewOverflow from 'react-native-view-overflow';
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import PTRView from 'react-native-pull-to-refresh';
import HTML from 'react-native-render-html';
class CompleteJobLayout extends Component {
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
    var user_id = this.props.fav_job_user_id;
    const fav_id = await AsyncStorage.getItem("projectUid");
    axios
      .post(
        CONSTANT.BaseUrl + "user/favorite",
        {
          id: fav_id,
          favorite_id: user_id,
          type: "_saved_projects"
        }
      )
      .then(async response => {
        if (response.status == "200") {
          this.setState({
            iconColor: CONSTANT.primaryColor,
            isLoading: false
          });
          alert("Başarı ile kaydediledi.");
        } else if (response.status == "203") {
          alert("Kaydedilemedi internet bağlantınızı kontrol edin.");
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
        <View style={[styles.section, { paddingRight: 0, flexDirection: 'column' }]}>
          <ViewOverflow style={[styles.CompleteJobLayoutmainStyle(this.props.featuredCompleteJobColor), { borderRadius: 12, borderColor:"#FFFFFF"}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: 0,
                height: 5,
                backgroundColor: "transparent",
                borderRadius: 12,
                borderTopWidth: 20,
                marginBottom: 7,
                borderRightColor: "transparent",
                borderTopColor: this.props.featuredCompleteJobColor != "" ? this.props.featuredCompleteJobColor : "#fff"
              }}
            ></View>
            <Text style={styles.CompleteJobLayoutFeaturedText}></Text>
            <View style={[styles.CompleteJobLayoutshadow, {flexDirection:"column",display:"flex",alignItems:"flex-start" }]}>
              <View style={{ flexDirection: 'row' }} >
                {/* isveren foto */}
                <View>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8}}
                    source={this.props.imageEmployerAvatar}
                  />
                </View>
                {/* iş adi */}
                <View style={{marginTop:-6,width:"90%"}}>
                  <Text
                    style={{fontWeight:"600",fontSize: 17, fontWeight: '700', color: '#181A1F', fontFamily: 'Poppins-SemiBold' }}
                  >
                    {this.props.Completejobtitle}
                  </Text>

                  {/* isveren adi */}
                  <View style={{width:"90%"}}>
                  <Text numberOfLines={1}
                    style={{fontWeight:"500",fontSize: 13, opacity: 0.8, color: '#181A1F', fontFamily: 'Poppins-Medium' }}
                  >
                    {this.props.Completejobname}
                  </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 16, alignItems: 'flex-end'}} >
                <View style={{display:"flex",height:21,paddingLeft:8,paddingRight:8,paddingBottom:6,backgroundColor: '#F5F7FC', borderRadius: 25, alignItems: 'flex-start', flexDirection: 'row',marginRight:5}}>
                  <Text style={{fontWeight:"500",fontSize: 13, opacity: 0.8, color: '#181A1F',fontFamily: 'Poppins-Medium'}}> {this.props.ComplateJobType} </Text>
                </View>
                <View style={{display:"flex",height:21,paddingLeft:8,paddingRight:8,paddingBottom:4,backgroundColor: '#F5F7FC', borderRadius: 25, alignItems: 'flex-start', flexDirection: 'row',marginRight:5}}>
                  <Text style={{fontWeight:"500",fontSize: 13, opacity: 0.8, color: '#181A1F',fontFamily: 'Poppins-Medium'}}> {this.props.Completejobcountry} </Text>
                </View>

              </View>
            </View>
          </ViewOverflow>
        </View>
      </View>
    )
   
  }
}
export default CompleteJobLayout;
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import * as CONSTANT from "../Constants/Constant";
import styles from "../Constants/Styles";
import SimpleHeader from "../Header/SimpleHeader";
import MultiSelect from "react-native-multiple-select";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons1 from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import DocumentPicker from "react-native-document-picker";
import HTML from "react-native-render-html";
import RBSheet from "react-native-raw-bottom-sheet";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class Notification extends Component {
  state = {
    isLoading: true,
    isLoadingRBS: true,
    NotificationListing: [],
    refreshNotificationListing: false,
    NotificationDetail: [],
    storedType: "",
  };

  componentDidMount() {
    this.getUser();
    this.fetchNotificationListing();
  }

  getUser = async () => {
    try {
      const storedType = await AsyncStorage.getItem("user_type");

      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {}
  };


  fetchNotificationListing = async () => {
    const Uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
      "notification/get_notification?user_id=" +
      Uid +
      "&listing_type=listing"
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ NotificationListing: [] }); // empty data set
    } else {
      this.setState({ NotificationListing: json, isLoading: false });
    }
    console.log(this.state.NotificationListing);
  };
  fetchNotificationDetail = async (id) => {
    this.setState({ isLoadingRBS: true, refreshNotificationListing: true });
    const Uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
      "notification/get_notification?user_id=" +
      Uid +
      "&listing_type=single&id=" +
      id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ NotificationDetail: [] }); // empty data set
    } else {
      this.setState({ NotificationDetail: json[0], isLoadingRBS: false, refreshNotificationListing: true });
    }
    console.log(this.state.NotificationDetail);

    axios
      .post(
        CONSTANT.BaseUrl +
        "notification/view_notification?user_id=" +
        Uid +
        "&notify_id=" +
        id,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Success", response.data.message);
          this.setState({ refreshNotificationListing: true });
          this.fetchNotificationListing();
        } else if (response.status === 203) {
          console.log("Error", response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getDashboardData = async () => {
    const User_Type = await AsyncStorage.getItem("user_type");
    if (User_Type == "freelancer") {
      const Pid = await AsyncStorage.getItem("projectUid");
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/get_freelancer_insights?user_id=" + Pid
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json[0].type &&
        json[0].type === "error"
      ) {
        this.setState({ fetchDashboardData: "", isLoading: false }); // empty data set
      } else {
        this.setState({ fetchDashboardData: json, isLoading: false });
        this.setState({
          fetchDashboardPackage: json.packages,
          isLoading: false,
        });
      }
    } else if (User_Type == "employer") {
      const Pid = await AsyncStorage.getItem("projectUid");
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/get_employer_insights?user_id=" + Pid
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json[0].type &&
        json[0].type === "error"
      ) {
        this.setState({ fetchDashboardData: "", isLoading: false }); // empty data set
      } else {
        this.setState({ fetchDashboardData: json, isLoading: false });
        this.setState({
          fetchDashboardPackage: json.packages,
          isLoading: false,
        });
      }
    }
  };

  _listEmptyComponent = () => {
    return (
      <View style={styles.NoDataMainArea}>
        <Image
          style={styles.NoDataImageStyle}
          source={require("../Images/nodata.png")}
        />
      </View>
    );
  };

  render() {
    const { isLoading, isLoadingRBS,} = this.state;
    const regex = /br|\n |(<([^>]+)>)/gi;
    // const regex = /(<([^>]+)>)/ig;
    // const regex = /<\/?[^>]+(>|$)/g;
    //const regex = /br|&lt;|[/]|&gt;|\t?|\n?|\r?/g;
    return (
      <View style={styles.container}>
        <SimpleHeader HeaderText={"Bildirimler"} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.storedType !== "" ? (
          <>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={this.state.NotificationListing}
            ListEmptyComponent={this._listEmptyComponent}
            extraData={this.state.refreshNotificationListing}
            listKey={(x, i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() =>
                // 	this.props.navigation.navigate("PortfolioDetail", {
                // 		portfolio_id: item.ID,
                // 	})
                // }
                onPress={() => {
                  this.fetchNotificationDetail(item.ID),
                    this.NotificationRBSheet.open();
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    backgroundColor: "#fff",
                    borderColor: "#dddddd",
                    borderWidth: 1,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    height: 70,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ paddingRight: 5 }}>
                      {item.post_status == "pending" ? (
                        <MaterialCommunityIcons1
                          name="email"
                          size={20}
                          color={"#e67e22"}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="envelope-open-text"
                          size={20}
                          color={"#767676"}
                        />
                      )}
                    </View>
                    <View>
                      <View style={{ width: "95%", marginLeft: 5, marginTop: 2 }}>
                        <Text numberOfLines={1}>
                          {item.content.replace(regex, " ")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", width: "87%", marginTop: 10, marginLeft: -23, height: "38%" }}>
                        <Text></Text>
                        <Text>{item.human_time} önce</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <RBSheet
          ref={(ref) => {
            this.NotificationRBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: "transparent",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: CONSTANT.primaryColor,
                height: 55,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 20, textAlign: "center" }}
              >
                {CONSTANT.NotificationDetailHeading}
              </Text>
            </View>
            {isLoadingRBS ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={CONSTANT.primaryColor}
                  style={styles.ActivityIndicatorStyle}
                />
              </View>
            ) : null}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                height: "100%",
                width: "98%",
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <HTML
                html={this.state.NotificationDetail.content}
                baseFontStyle={styles.ParagraphTextStyle}
              />
            </ScrollView>
          </View>
        </RBSheet>
         </>
         ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <Image
              style={{
                alignSelf: "center",
                alignItems: "center"
              }}
              source={require("../Images/loginFirst.png")}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen", {
                RegistrationOption: this.state.themeSettingsRegistrationOption,
                LoginSignupType: this.state.themeSettingsLoginSignupType,
                DefaultRole: this.state.themeSettingsDefaultRole,
                RemoveUsername: this.state.themeSettingsRemoveUsername,
                HideLoaction: this.state.themeSettingsHideLoaction,
                TermText: this.state.themeSettingsTermText,
                TermPageLink: this.state.themeSettingsTermPageLink,
                RemoveRegistration: this.state.themeSettingsRemoveRegistration,
                PhoneOptionReg: this.state.themeSettingsPhoneOptionReg,
                PhoneMandatory: this.state.themeSettingsPhoneMandatory,
                HideDepartments: this.state.themeSettingsHideHideDepartments,
              })}
              style={styles.MainButtonArea}
            >
              <Text style={styles.ButtonText}>
                {CONSTANT.ProfileSettignLogin}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default Notification;
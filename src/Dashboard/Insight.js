import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  FlatList,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
  ViewBase,
  Dimensions,
  StatusBar,
} from "react-native";
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import AntIcon from "react-native-vector-icons/AntDesign";
import RNRestart from "react-native-restart";
import { CalloutSubview } from "react-native-maps";
import axios from "axios";
import home from "../Home/home";
import CustomHeader from "../Header/CustomHeader";
import Icon from "react-native-vector-icons/EvilIcons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Insightstar from "./Insightstar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HTML from "react-native-render-html";
import RBSheet from "react-native-raw-bottom-sheet";
import * as CONSTANT from "../Constants/Constant";

import { Table, Row, Rows } from "react-native-table-component";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class Insight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isProgress: false,
      fetchDashboardData: "",
      fetchDashboardPackage: [],
      fetchDashboardOngoingJob: [],
      storedValue: "",
      storedType: "",
      profileImg: "",
      type: "",
      id: "",
      permissionChat: "",
      showAlert: false,
      tableHead: ["Project Title", "Date", "Earnings"],
      tableData: [
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
      ],
      fetchEarningsData: [],
      isLoading: true,
      themeSettingsInsight: []
    };
  }
  componentDidMount() {
    this.getUser();
    this.CheckApplicationAccess();
    this.getDashboardData();
    this.fetchOngoingJobs();
    this.fetchEarningData();

  }
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem("chatPermission");
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
        console.log('store_type in get_user', this.state.storedType)
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
      if (permissionChat !== null) {
        this.setState({ permissionChat });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
    this.ApplicationThemeSettings();
  };
  toDateTime = () => {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt("2070-01-23"));
    var date = epoch.toISOString();
    date = date.replace("T", " ");
    var t =
      date.split(".")[0].split(" ")[0] +
      " " +
      epoch.toLocaleTimeString().split(" ")[0];
    return t;
  };
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_access");
    const json = await response.json();
    this.setState({
      ApplicationAccessServcie: json.access_type.service_access,
    });
    this.setState({ ApplicationAccessJob: json.access_type.job_access });
  };
  fetchEarningData = async () => {
    const Pid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "dashboard/get_my_earnings?user_id=" + Pid
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ fetchEarningsData: "", isLoading: false }); // empty data set
    } else {
      this.setState({ fetchEarningsData: json, isLoading: false });
    }
  };
  fetchOngoingJobs = async () => {
    const Pid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "dashboard/get_ongoing_jobs?user_id=" + Pid
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
      this.setState({ fetchDashboardOngoingJob: json, isLoading: false });
    }
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
  ApplicationThemeSettings = async () => {
    console.log('store', this.state.storedType)
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({
      themeSettingsInsight: json.freelancers_settings.freelancer_insights,
      isLoading: false
    });
    console.log('Insight', this.state.themeSettingsInsight);
  };

  async login() {
   
    try {
    const username = await AsyncStorage.getItem('username');
    console.log(username);
    const password = await AsyncStorage.getItem('password');
    console.log(password);
    const url = 'https://griyaka.com/wp-json/api/v1/user/mustafa?username='+username+'&password='+password
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
  };


  render() {
    const {
      storedValue,
      storedType,
      profileImg,
      permissionChat,
      showAlert,
      isLoading,
    } = this.state;
    return this.state.isProgress ? (
      <CustomProgressBar />
    ) : (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor={CONSTANT.headerColor1} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
        <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "black",
                height: 30,
                marginTop: 9,
                fontFamily: "Poppins-Medium"
              }}
            >
              {CONSTANT.InsightHeaderTitle}
            </Text>
          </View>

        </View>
        {isLoading && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                backgroundColor: "#ffffff",
                elevation: 5,
              }}
            />
          </View>
        )}
        {this.state.storedType !== "" ? (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {!this.state.themeSettingsInsight.includes('messages') &&
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.login}
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    marginTop: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#909090",
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  <View>
                  <View >
                          <MatIcon
                            name="android-messages"
                            size={60}
                            color="#ffffff"
                          />
                        </View>

                  </View>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700",marginLeft:-70 }}>
                      {CONSTANT.InsightNewMessages}
                    </Text>
                  <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={this.login} style={{
                      flex: 1, justifyContent: "center", alignItems: "center", height: 40, weight: 60, backgroundColor: "#f1b403", borderRadius: 8, shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>

                      <Text style={{ color: "#FFFFFF", fontFamily: "Poppins-Medium", fontWeight: "500", fontSize: 15, }} >Görüntüle</Text>

                    </TouchableOpacity>

                  </View>
                </TouchableOpacity>
              }
              <View style={styles.insightgrid}>
                {
                  storedType == "freelancer" ? (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("LatestProposals")}
                      activeOpacity={0.7}
                      style={styles.insightdetails}
                    >
                      <View style={styles.insighticon}>
                        <MatIcon
                          name="text-box-multiple-outline"
                          size={40}
                          color="#909090"
                        />
                      </View>
                      <Text style={styles.insighttitle}>
                        {CONSTANT.InsightLatestProposals}
                      </Text>
                      <Text style={styles.insightinfo}>
                        {CONSTANT.InsightClickToView}
                      </Text>
                    </TouchableOpacity>
                  ) : (!this.state.themeSettingsInsight.includes('PostJob') &&
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("PostJob")}
                      activeOpacity={0.7}
                      style={styles.insightdetails}
                    >
                      <View style={styles.insighticon}>
                        <MatIcon
                          name="publish"
                          size={40}
                          color="#909090"
                        />
                      </View>
                      <Text style={styles.insighttitle}>
                        {CONSTANT.InsightJobPost}
                      </Text>
                      <Text style={styles.insightinfo}>
                        {CONSTANT.InsightClickToView}
                      </Text>

                    </TouchableOpacity>
                  )}

                {storedType != "freelancer" &&
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("PostedJobs")}
                    activeOpacity={0.7}
                    style={[styles.insightdetails, styles.styleinbox]}
                  >
                    <View style={[styles.insighticon]}>
                      <FontAwesome5 name="wpforms" size={40} color="#909090" />
                    </View>
                    <Text style={styles.insighttitle}>
                      {CONSTANT.DrawerYayinlananJobs}
                    </Text>
                    <Text style={styles.insightinfo}>
                      {CONSTANT.InsightTotalPostedProjects}
                    </Text>

                  </TouchableOpacity>
                }
                {storedType === "freelancer" &&
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("OngoingJobs")}
                    activeOpacity={0.7}
                    style={[styles.insightdetails, styles.styleincompletedProject]}
                  >
                    <View style={[styles.insighticon]}>
                      <MatIcon name="text-box-search-outline" size={40} color="#909090" />
                    </View>
                    <Text style={styles.insighttitle}>
                      {CONSTANT.InsightTotalOngoingJobsFreelancer}
                    </Text>
                    <Text style={styles.insightinfo}>
                      {CONSTANT.InsightClickToView}
                    </Text>
                  </TouchableOpacity>
                }
                {!this.state.themeSettingsInsight.includes('jobs') &&
                  <>
                    {storedType === "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CompletedJobs")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleincompletedProject]}
                      >
                        <View style={[styles.insighticon]}>
                          <MatIcon name="text-box-check-outline" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.ManageJobsCompletedJobsEmployer}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>
                      </TouchableOpacity>
                    }

                    {storedType === "employer" &&
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.props.navigation.navigate("OngoingJobs")}
                        style={[styles.insightdetails, styles.styleincompletedProject]}
                      >
                        <View style={[styles.insighticon]}>
                          <FontAwesome5 name="user-clock" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle1}>
                          {CONSTANT.InsightTotalOngoingJobs}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }

                    {storedType === "employer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CompletedJobs")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleincompletedProject]}
                      >
                        <View style={[styles.insighticon]}>
                          <FontAwesome5 name="user-check" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.ManageJobsCompletedJobsFreelancer}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>
                      </TouchableOpacity>
                    }

                    {storedType === "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CancelledJobs")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleinbox]}
                      >
                        <View style={[styles.insighticon]}>
                          <MatIcon name="text-box-remove-outline" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.DrawerCancelledJobs}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }
                    {storedType === "employer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("CancelledJobs")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleinbox]}
                      >
                        <View style={[styles.insighticon]}>
                          <FontAwesome5 name="user-times" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.DrawerCancelledJobsFreelancer}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }


                    {!this.state.themeSettingsInsight.includes('saved_items') &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Favorite")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleinavailable]}
                      >
                        <View style={styles.insighticon}>
                          <MatIcon name="star-outline" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.InsightViewSavedItems}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }



                    {storedType === "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("AddPortfolio")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleinbox]}
                      >
                        <View style={[styles.insighticon]}>
                          <MatIcon name="form-dropdown" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.InsightPortfolio}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }
                    {storedType === "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("PortfolioListings")}
                        activeOpacity={0.7}
                        style={[styles.insightdetails, styles.styleinbox]}
                      >
                        <View style={[styles.insighticon]}>
                          <MatIcon name="form-select" size={40} color="#909090" />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.DrawerListortfolio}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>

                      </TouchableOpacity>
                    }

                    {/*Faturalar*/}
                    
                    {/* 
                     {storedType != "freelancer" &&
                      <TouchableOpacity
                        //onPress={() => this.props.navigation.navigate("Invoices")}
                        activeOpacity={1}
                        style={styles.insightdetails}
                      >
                        <View style={{}} style={styles.insighticon}>
                          <FontAwesome5
                            name="file-invoice"
                            size={40}
                            color="#909090"
                          />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.InsightInvoice}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>
                      </TouchableOpacity>}
                      */}
                   

                    {storedType != "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("IdentityVerification")}
                        activeOpacity={0.7}
                        style={styles.insightdetails}
                      >
                        <View style={styles.insighticon}>
                          <AntIcon
                            name="idcard"
                            size={40}
                            color="#909090"
                          />
                        </View>
                        <Text style={styles.insighttitle1}>
                          {CONSTANT.InsightTax}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>
                      </TouchableOpacity>
                    }
                    {storedType != "freelancer" &&
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("SecuritySettings")}
                        activeOpacity={0.7}
                        style={styles.insightdetails}
                      >
                        <View style={styles.insighticon}>
                          <AntIcon
                            name="setting"
                            size={40}
                            color="#909090"
                          />
                        </View>
                        <Text style={styles.insighttitle}>
                          {CONSTANT.InsightAccountSettings}
                        </Text>
                        <Text style={styles.insightinfo}>
                          {CONSTANT.InsightClickToView}
                        </Text>
                      </TouchableOpacity>
                    }

                  </>
                }


              </View>
              
             {/*   
              {storedType != "freelancer" && !this.state.themeSettingsInsight.includes('expiry_box') &&
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Packages")}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    marginBottom: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#909090",
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  <View>
                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: -5 }}>
                      {CONSTANT.InsightCheckPackageExpiry}
                    </Text>

                    
                    <Text style={{ color: "#f1b403", fontSize: 17, fontWeight: "700", marginTop: 10, marginLeft: 35 }}>
                      {CONSTANT.InsightUpgradeNow}
                    </Text>
                  </View>

                  <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => this.RBSheet.open()} style={{
                      flex: 1, justifyContent: "center", alignItems: "center", height: 40, weight: 60, backgroundColor: "#f1b403", borderRadius: 8, shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>

                      <Text style={{ color: "#FFFFFF", fontFamily: "Poppins-Medium", fontWeight: "500", fontSize: 15, }} >Detaylar</Text>

                    </TouchableOpacity>

                  </View>




                </TouchableOpacity>
              }
             */}
             

              {(this.state.fetchDashboardOngoingJob.length >= 1 && !this.state.themeSettingsInsight.includes('jobs')) && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                      {CONSTANT.InsightOngoingProjects}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("OngoingJobs")}
                    >
                      <Text>{CONSTANT.InsightShowAll}</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.fetchDashboardOngoingJob}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("DetailOngoing", {
                            ID: item.ID,
                            title: item.title,
                            level: item.project_level,
                            location_name: item.location_name,
                            location_flag: item.location_flag,
                            employer_name: item.employer_name,
                            employer_img: item.employer_avatar,
                            employer_verified: item.employer_verified,
                          })
                        }
                        activeOpacity={0.7}
                        style={{ marginHorizontal: 10, marginBottom: 20 }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            shadowOffset: { width: 0, height: 2 },
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            elevation: 6,
                          }}
                        >
                          <View
                            style={{
                              margin: 10,
                              borderRadius: 6,
                              backgroundColor: "#d7f3ff",
                              height: 130,
                              overflow: "hidden",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              resizeMode={"contain"}
                              style={{ width: 140, marginTop: -15 }}
                              source={require("../Images/demo.png")}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontWeight: "700",
                              fontSize: 16,
                              marginHorizontal: 10,
                              marginTop: 10,
                              color: "#323232",
                            }}
                          >
                            {item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginHorizontal: 10,
                              marginTop: 5,
                            }}
                          >
                            {item.employer_verified == "yes" && (
                              <AntIcon
                                name="checkcircle"
                                size={12}
                                color={"#00cc67"}
                              />
                            )}

                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                marginHorizontal: 10,
                                color: "#676767",
                                fontWeight: "700",
                              }}
                            >
                              {item.employer_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginLeft: 10,
                              top: 5,
                              marginBottom: 20,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <AntIcon name="folder1" size={12} color={"#47C3EE"} />
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 14,
                                  marginHorizontal: 10,
                                  color: "#676767",
                                }}
                              >
                                {item.project_level}
                              </Text>
                            </View>

                            <View style={{ flexDirection: "row" }}>
                              <AntIcon
                                name="flag"
                                size={12}
                                color={CONSTANT.primaryColor}
                              />
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 14,
                                  marginHorizontal: 10,
                                  color: "#676767",
                                }}
                              >
                                {item.location_name}
                              </Text>
                            </View>

                            {/* <View style={{flexDirection:'row'}}>
                                    <AntIcon name="checkcircle" size={12} color={"#00cc67"} /> 
                                    <Text numberOfLines={1} style={{ fontSize:14 , marginHorizontal:10  , color:'#676767'}}>{item.employer_name}</Text>
                                    </View> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    horizontal={true}
                  />
                </View>
              )}

            </ScrollView>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.getAnswersRBSheetMainArea}
              >
                <View
                  style={{
                    backgroundColor: CONSTANT.primaryColor,
                    height: 55,
                    justifyContent: "center",
                    fontWeight: "700",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20, textAlign: "center" }}
                  >
                    {CONSTANT.InsightPackageTitle}
                  </Text>
                </View>
                <View style={styles.getAnswersRBSheetSpecialityArea}>
                  
                  <FlatList
                    data={this.state.fetchDashboardPackage}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={{ justifyContent: "space-between" }}
                        activeOpacity={0.9}
                      >
                        {index % 2 === 0 ? (
                          <View style={styles.amenetiesarea}>
                            <Text style={styles.amenetiestext}>{item.title}</Text>
                            <HTML
                              containerStyle={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              html={item.value}
                              imagesMaxWidth={Dimensions.get("window").width}
                            />
                          </View>
                        ) : (
                          <View style={styles.amenetiesarea2}>
                            <Text style={styles.amenetiestext}>{item.title}</Text>
                            <HTML
                              containerStyle={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              html={item.value}
                              imagesMaxWidth={Dimensions.get("window").width}
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </ScrollView>
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

export default Insight;
const styles = StyleSheet.create({
  container: {
    height: "77%",
    marginBottom: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  Insightcontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Insightmember: {
    position: "relative",
    backgroundColor: "#f7f8f9",
    flexDirection: "column",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  amenetiestext: {
    fontSize: 14,
    color: "#484848",
    paddingLeft: 20,
    paddingVertical: 20,
    fontFamily: "Poppins-Medium"
  },
  amenetiesarea: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    justifyContent: "space-between",
    marginRight: 10,
  },
  amenetiesarea2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "space-between",
    marginRight: 10,
  },
  Insightimg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 3,
    marginBottom: 5,
  },
  Insighttitle: {
    fontSize: 15,
    marginTop: 5,
    color: "#24355a",
    fontWeight: "700",
  },
  editicon: {
    position: "absolute",
    right: -17,
    top: -16,
    backgroundColor: "#f7395a",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderTopStartRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Insightreview: {
    color: "#767676",
    fontWeight: "400",
    fontSize: 12,
  },
  pictureicon: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2ecc71",
    padding: 3,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 5,
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    left: 1,
  },
  starrating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileimg: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
  },
  insightdetails: {
    position: "relative",
    backgroundColor: "white",
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    width: "48.3%",

  },
  insightgrid: {
    flexDirection: "row",
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexWrap: "wrap",
  },
  insighttitle: {
    color: "#343435",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  insighttitle1: {
    color: "#343435",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "700",
  },
  insighttitlebalance: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  insightinfo: {
    color: "#909090",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  insighticon: {
    opacity: 0.6,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    bottom: 0,
  },
  styleinbox: {
    backgroundColor: "white",
  },
  styleinavailable: {
    backgroundColor: "white",
  },
  styleinpending: {
    backgroundColor: "white",
  },
  styleOngoingProject: {
    backgroundColor: "white",
  },
  styleincompletedProject: {
    backgroundColor: "white",
  },
  styleOngoingService: {
    backgroundColor: "white",
  },
  styleincompletedService: {
    backgroundColor: "white",
  },
  styleincancelledService: {
    backgroundColor: "white",
  },
  styleinsoldService: {
    backgroundColor: "white",
  },
  stylesoledservice: {
    backgroundColor: "white",
  },
  ButtonContainer: {
    paddingVertical: 10,
    width: "35%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  getAnswersRBSheetMainArea: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: "hidden",
  },
  getAnswersRBSheetSpecialityArea: {
    height: 500,
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  ButtonText: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins-Bold"
  },
  MainButtonArea: {
    height: 40,
    marginVertical: 10,
    borderRadius: 5,
    width: "40%",
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: CONSTANT.primaryColor
  },
});

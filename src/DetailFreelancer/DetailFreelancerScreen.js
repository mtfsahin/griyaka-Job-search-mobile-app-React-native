import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  AsyncStorage,
  Alert,
  TextInput,
  Linking
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';

import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import ServiceLayout from '../Home/ServicesLayout';
import MultiSelect from 'react-native-multiple-select';
import axios from "axios";
import Zocial from "react-native-vector-icons/Zocial";
import SkillCard from "../DetailFreelancer/SkillCard";
import AwardCard from "../DetailFreelancer/AwardCard";
import FeedbackCard from "../DetailFreelancer/FeedbackCard";
import ProjectsCard from "../DetailFreelancer/ProjectsCard";
import ExperienceCard from "../DetailFreelancer/ExperienceCard";
import EducationCard from "../DetailFreelancer/EducationCard";
import AwesomeAlert from "react-native-awesome-alerts";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import HTML from 'react-native-render-html';
const Entities = require("html-entities").XmlEntities;
import { NavigationEvents } from 'react-navigation';
const entities = new Entities();
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SimpleHeader from '../Header/SimpleHeader';
import StarRating from 'react-native-star-rating';
class DetailFreelancerScreen extends Component {
  static navigationOptions = {
    title: "Home",
    headerTintColor: "#ffffff",
    headerStyle: {
      backgroundColor: CONSTANT.primaryColor
    },
    headerTitleStyle: {
      fontSize: 18
    }
  };
  state = {
    data: [],
    isLoading: true,
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    showAlert: false,
    themeSettingsStats: '',
    themeSettingsEarnings: '',
    themeSettingsSkillsDisplayType: '',
    new_fetchReportReasons: [],
    selectedReason: '',
    reportDesc: '',
    fetchServices: []
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
  componentDidMount() {
    this.CheckApplicationAccess();
    this.ApplicationThemeSettings();
    this.fetchFreelancerData();
    this.fetchPostedServices();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationAccessServcie: json.access_type.service_access});
    this.setState({ApplicationAccessJob: json.access_type.job_access});
  };
  ApplicationThemeSettings = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({
      themeSettingsStats: json.freelancers_settings.detail_page_stats,
      themeSettingsEarnings: json.freelancers_settings.hide_detail_page_earning,

      themeSettingsExperience: json.freelancers_settings.frc_remove_experience,
      themeSettingsEducation: json.freelancers_settings.frc_remove_education,
      themeSettingsPortfolio: json.freelancers_settings.portfolio.enable.others,
      themeSettingsAwards: json.freelancers_settings.frc_remove_awards,
      themeSettingsSkillsDisplayType: json.freelancers_settings.skills_display_type,

      themeSettingsDetailFreelancerFAQs: json.freelancers_settings.freelancer_faq_option,
    });
    console.log('1', this.state.themeSettingsStats);
  }
  fetchFreelancerData = async () => {
    const { params } = this.props.navigation.state;
    //Alert.alert('hello', JSON.stringify(params.profile_id) )
    const response = await fetch(
      CONSTANT.BaseUrl +
      "listing/get_freelancers?listing_type=single&profile_id=" +
      params.profile_id
    );
    const json = await response.json();
    this.setState({ fetchFreelancer: json });
    this.setState({ fetchSkills: json[0].skills });
    this.setState({ fetchAwards: json[0]._awards });
    this.setState({ fetchReviews: json[0].reviews });
    this.setState({ fetchProjects: json[0]._projects });
    this.setState({ fetchExperience: json[0]._experience });
    this.setState({ fetchContent: json[0].content });
    this.setState({ fetchPerHourRate: json[0]._perhour_rate });
    this.setState({ fetchLocation: json[0].location._country });
    this.setState({ fetchRating: json[0].wt_average_rating });
    this.setState({ fetchFAQs: json[0].faqs });
    this.setState({ fetchSocialShares: json[0].social_shares });
    this.setState({ fetchLanguages: json[0].languages });
    this.setState({ fetchReportTitle: json[0].report_freelancer.report_title });
    this.setState({ fetchReportReasons: json[0].report_freelancer.reasons });
    this.setState({ fetchProfileHealth: json[0].profile_health_percent });
    this.setState({ fetchEducation: json[0]._educations, isLoading: false });
    this.getUser();
    console.log('Report Reasons', JSON.stringify(this.state.fetchReportReasons));
    for (const [key, value] of Object.entries(this.state.fetchReportReasons)) {
      console.log(`${key}: ${value}`);
      this.state.new_fetchReportReasons.push({
        name: `${value}`,
        slug: `${key}`,
      });
    }
    console.log("New Report Reasons", this.state.new_fetchReportReasons);
    //Alert.alert('content', JSON.stringify(this.state.fetchFreelancer[0].content) )
  };
  fetchPostedServices = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "services/get_services?listing_type=user&user_id=" + params.user_id
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchServices: [] }); // empty data set 
    } else {
      this.setState({ fetchServices: json });
    }
  };
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
      console.log(error);
    }
  };

  reportFreelancer = async () => {
    const {
      selectedReason,
      reportDesc,
    } = this.state;
    console.log(
      selectedReason.toString(),
      reportDesc,
    )
    const Uid = await AsyncStorage.getItem('projectUid');
    if(selectedReason == '' || reportDesc == ''){
      alert('All the fields are required')
    }else{
      this.setState({ isLoading: true });
      axios
      .post(CONSTANT.BaseUrl + "user/reporting?user_id=" + Uid + "&type=" + "freelancer",{
        description: reportDesc,
        reason: selectedReason.toString()
      })
      .then(async response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Success, response.data.message);
          console.log("Başarılı", response.data.message)
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log("Hata", response.data.message)
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
    }  
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const { fetchFreelancer, isLoading, showAlert } = this.state;
    const { id, storedValue, storedType, profileImg, type } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SimpleHeader
          HeaderText={ this.state.fetchFreelancer ? 
            this.state.fetchFreelancer[0].name : ""
          }
        />
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.state.fetchFreelancer && (
            <Image
              style={{ height: 200 }}
              source={{ uri: `${this.state.fetchFreelancer[0].banner_img}` }}
            />
          )}
          <View style={styles.section}>
            <View
              style={[styles.FeedbackCardMainArea, styles.Elevation, {marginTop:-80}]}
            >
              <View style={styles.FeedbackCardInfoArea}>
                {this.state.fetchFreelancer && (
                  <Image
                    style={styles.FeedbackCardImageStyle}
                    source={{
                      uri: `${this.state.fetchFreelancer[0].profile_img}`
                    }}
                  />
                )}
                <View style={styles.viewStyle}>
                  {this.state.fetchFreelancer && (
                    <Text style={styles.NameTextStyle}>
                      {this.state.fetchFreelancer[0].name}
                    </Text>
                  )}
                  {this.state.fetchFreelancer && (
                    <Text style={styles.SectionHeadingTextStyle}>
                      {this.state.fetchFreelancer[0]._tag_line}
                    </Text>
                  )}
                </View>
              </View>
              
              <View
                style={styles.DetailFreelancerMainDetailArea}
              >
                <Text
                  style={styles.ParagraphTextStyle}
                >
                  {CONSTANT.DetailFreelancerLocation}
                </Text>
                {this.state.fetchLocation != '' ? 
                  <Text
                    style={styles.NameTextStyle}
                  >{`${entities.decode(
                    this.state.fetchLocation
                  )}`}</Text>
                  :
                  <Text style={styles.ParagraphTextStyle}>{CONSTANT.DetailFreelancerNoLocationYet}</Text>
                }
              </View>
              <View
                style={styles.DetailFreelancerMainDetailArea}
              >
                <Text
                  style={styles.ParagraphTextStyle}
                >
                  {CONSTANT.DetailFreelancerFeedback}
                </Text>
                <View style={{flexDirection:'row'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={16}
                    fullStarColor={"#fecb02"}
                    emptyStarColor={"#fecb02"}
                    rating={this.state.fetchRating}
                    //selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                  {this.state.fetchFreelancer && (
                    <View style={{flexDirection:'row', marginLeft:5}}>
                      <Text
                        style={styles.NameTextStyle}
                      >
                        { this.state.fetchRating != '' ?
                         "( " + `${entities.decode(
                            this.state.fetchRating
                          )}`
                          :
                          "( "+0
                        }
                      </Text>
                      <Text>/5 {")"}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={styles.DetailFreelancerMainDetailArea}>
                <Text
                  style={styles.ParagraphTextStyle}>
                  {CONSTANT.DetailFreelancerMember}
                </Text>
                {this.state.fetchFreelancer && (
                  <Text
                    style={styles.NameTextStyle}
                  >{`${entities.decode(
                    this.state.fetchFreelancer[0].member_since
                  )}`}</Text>
                )}
              </View>
              <View
                style={styles.DetailFreelancerMainDetailArea}>
                <Text
                  style={styles.ParagraphTextStyle}>
                  {CONSTANT.DetailFreelancerEnglishLevel}
                </Text>
                {this.state.fetchFreelancer && (
                  <Text
                    style={styles.NameTextStyle}
                  >{`${entities.decode(
                    this.state.fetchFreelancer[0].english_level
                  )}`}</Text>
                )}
              </View>
              {this.state.fetchProfileHealth != '' &&
                <View style={{width: '100%'}}>
                  <View style={styles.DetailFreelancerMainDetailArea}>
                    <Text
                      style={styles.ParagraphTextStyle}>
                      {CONSTANT.DetailFreelancerPhealth}
                    </Text>
                    {this.state.fetchFreelancer && (
                      <Text
                        style={styles.NameTextStyle}
                      >{this.state.fetchProfileHealth}%</Text>
                    )}
                  </View>
                  <View style={{width: '100%', paddingHorizontal: 10}}>
                    {this.state.fetchFreelancer &&
                      <ProgressBarAnimated
                        backgroundColor= {CONSTANT.TextColorGreen}
                        borderRadius= {4}
                        borderColor= {'#ddd'}
                        width={Dimensions.get('screen').width - 45}
                        height={7}
                        value={this.state.fetchProfileHealth}
                        backgroundColorOnComplete="#6CC644"
                        barAnimationDuration={3000}
                      />
                    }
                  </View>
                </View>
              }
            </View>
          </View>
          { this.state.fetchContent != '' &&
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerAbout}
              </Text>
              {this.state.fetchFreelancer && (
                // <Text
                //   style={{
                //     marginBottom: 10,
                //     color: "#323232",
                //     fontSize: 15,
                //   }}
                // >{`${entities.decode(
                //   this.state.fetchFreelancer[0].content
                // )}`}</Text>
                <HTML
                  baseFontStyle={styles.ParagraphTextStyle}
                  html={ this.state.fetchContent} imagesMaxWidth={Dimensions.get('window').width} />
              )}
            </View>
          }
          { this.state.themeSettingsStats === 'show' &&
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerStatus}
              </Text>
              <View
                style={styles.DetailFreelancerStatusMainArea}
              >
                {this.state.ApplicationAccessJob === 'yes' &&
                  <>
                  <View
                    style={[styles.DetailFreelancerStatusInfoArea, {backgroundColor:'#fafafa'}]}
                  >
                    {this.state.fetchFreelancer && (
                      <Text
                        style={[styles.SectionHeadingTextStyle, {color: "#2ecc71"}]}
                      >
                        {this.state.fetchFreelancer[0].ongoning_jobs}
                      </Text>
                    )}
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerOngoing}
                    </Text>
                  </View>
                  <View
                    style={styles.DetailFreelancerStatusInfoArea}>
                    {this.state.fetchFreelancer && (
                      <Text
                        style={[styles.SectionHeadingTextStyle, {color: "#3498db"}]}
                      >
                        {this.state.fetchFreelancer[0].completed_jobs}
                      </Text>
                    )}
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerCompleted}
                    </Text>
                  </View>
                  <View
                    style={styles.DetailFreelancerStatusInfoArea}
                  >
                    {this.state.fetchFreelancer && (
                      <Text
                        style={[styles.SectionHeadingTextStyle, {color: "#e67e22"}]}
                      >
                        {this.state.fetchFreelancer[0].cancelled_jobs}
                      </Text>
                    )}
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerCancelled}
                    </Text>
                  </View>
                  </>
                }
                {this.state.ApplicationAccessServcie === 'yes' &&
                  <>
                  <View
                    style={[styles.DetailFreelancerStatusInfoArea, {backgroundColor:'#fafafa'}]}
                  >
                    <Text
                      style={[styles.SectionHeadingTextStyle, {color: "#2ecc71"}]}
                    >
                      0
                    </Text>
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerOngoingServices}
                    </Text>
                  </View>
                  <View
                    style={[styles.DetailFreelancerStatusInfoArea, {backgroundColor:'#fafafa'}]}
                  >
                    <Text
                      style={[styles.SectionHeadingTextStyle, {color: "#3498db"}]}
                    >
                      0
                    </Text>
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerCompletedServices}
                    </Text>
                  </View>
                  <View
                    style={styles.DetailFreelancerStatusInfoArea}
                  >
                    {this.state.fetchFreelancer && (
                      <Text
                        style={[styles.SectionHeadingTextStyle, {color: "#e67e22"}]}
                      >
                        0
                      </Text>
                    )}
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerCancelledServices}
                    </Text>
                  </View>
                  </>
                }
                { this.state.themeSettingsEarnings === 'no' &&
                  <View
                    style={styles.DetailFreelancerStatusInfoArea}
                  >
                    {this.state.fetchFreelancer && (
                      <Text
                        style={[styles.SectionHeadingTextStyle, {color: "#9B59B6"}]}
                      >
                        $0.00
                      </Text>
                    )}
                    <Text
                      style={[styles.NameTextStyle, {textAlign:'center'}]}
                    >
                      {CONSTANT.DetailFreelancerTotalEarnings}
                    </Text>
                  </View>
                }
              </View>
            </View>
          }
          {type == "success" && storedType == "employer" ? (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("SendOffer", {
                  user_id: params.user_id
                })
              }
              style={styles.MainButtonArea}
            >
              <Text
                style={styles.ButtonText}
              >
                {CONSTANT.DetailFreelancerSave}
              </Text>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={() => { this.showAlert(); }}
                style={styles.MainButtonArea}
              >
                <Text style={styles.ButtonText}>
                  {CONSTANT.DetailFreelancerSave}
                </Text>
              </TouchableOpacity>
          )}
          {this.state.ApplicationAccessServcie === "yes" && this.state.fetchServices.length >= 1 ?
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}>
                {CONSTANT.DetailFreelancerServices}
              </Text>
              <FlatList
                data={this.state.fetchServices}
                listKey={(a, b) => b.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity 
                    style={{
                      backgroundColor: '#fff', 
                      flexDirection: 'column', 
                      borderRadius: 4,  
                      flex: 1, 
                      flexDirection: 'column', 
                      marginRight: index % 2 ? 0 : 10, 
                      marginBottom: 10,
                      elevation: 5,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowColor: "#000",
                    }}
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate(
                        "DetailServiceScreen",
                        { service_id: item.service_id }
                      )
                    }
                  >
                    <ServiceLayout
                      imageUri_banner={{ uri: `${item.images.length >= 1 ? item.images[0].url : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'}` }}
                      imageUri_profile={{ uri: `${item.auther_image != "" ? item.auther_image : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'}` }}
                      service_name={`${entities.decode(item.auther_title)}`}
                      service_title={`${entities.decode(item.title)}`}
                      service_price={`${entities.decode(item.formated_price)}`}
                      service_rating={`${entities.decode(item.total_rating)}`}
                      service_queue={item.queue}
                    />
                  </TouchableOpacity>
                )}
                numColumns={2}
                //keyExtractor={(item, index) => index}
              />
            </View> 
            : null
          }
          {this.state.fetchSkills != "" && (
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerSkills}
              </Text>
              <View style={styles.Elevation}>
                <FlatList
                  style={styles.SkillCardFlatlistStyle}
                  data={this.state.fetchSkills}
                  listKey={(a, b) => b.toString()}
                  renderItem={({ item }) => (
                    <SkillCard
                      skillname={`${entities.decode(item.skill_name)}`}
                      skillValue={item.skill_val}
                      skillDisplayType={this.state.themeSettingsSkillsDisplayType}
                    />
                  )}
                />
              </View>
            </View>
          )}
          {this.state.fetchLanguages != '' &&
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerLanguages}
              </Text>
              <View style={styles.Elevation}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal= {true}
                  data={this.state.fetchLanguages}
                  listKey={(a, b) => b.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{flexDirection: 'row', borderColor: '#ddd', borderWidth: 1, borderRadius:20, padding: 10, marginRight: 5, backgroundColor: '#fff', marginBottom: 10}}
                    >
                      <Text style={[styles.NameTextStyle, {}]}>{item.name}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          }
          {(this.state.fetchAwards != "" && this.state.themeSettingsAwards === 'no') && (
            <>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerAward}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchAwards}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <AwardCard
                  AwardDate={`${entities.decode(item.date)}`}
                  AwardTitle={`${entities.decode(item.title)}`}
                  //AwardImage={{ uri: `${item.image.url}` }}
                  AwardImage={{ uri: `${item.image.url != "" ? item.image.url : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'}` }}
                />
              )}
            />
            </>
          )}
          {this.state.fetchReviews != "" && (
            <>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerClient}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchReviews}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <FeedbackCard
                  Reviewname={`${entities.decode(item.employer_name)}`}
                  Reviewtitle={`${entities.decode(item.project_title)}`}
                  Reviewlevel={`${entities.decode(item.level_title)}`}
                  ReviewLocation={`${entities.decode(
                    item.project_location
                  )}`}
                  ReviewDate={`${entities.decode(item.post_date)}`}
                  ReviewRating={`${entities.decode(item.project_rating)}`}
                  ReviewContent={`${entities.decode(item.review_content)}`}
                  ReviewImage={{ uri: `${item.employer_image}` }}
                />
              )}
            />
            </>
          )}
          {(this.state.fetchProjects != "" && this.state.themeSettingsPortfolio === 'no') && (
            <>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailFreelancerCrafted}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchProjects}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <ProjectsCard
                  projectTitle={`${entities.decode(item.title)}`}
                  projectlink={`${entities.decode(item.link)}`}
                  projectImage={{ uri: `${item.image.url != '' ? item.image.url : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'}` }}
                />
              )}
            />
            </>
          )}
          {(this.state.fetchExperience != "" && this.state.themeSettingsExperience === 'no') && (
            <>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}>
                {CONSTANT.DetailFreelancerExperience}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchExperience}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <ExperienceCard
                  title={`${entities.decode(item.title)}`}
                  company={`${entities.decode(item.company)}`}
                  date={`${entities.decode(item.startdate)}`}
                  content={`${entities.decode(item.description)}`}
                />
              )}
            />
            </>
          )}
          {(this.state.fetchEducation != "" && this.state.themeSettingsEducation === 'no') && (
            <>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}>
                {CONSTANT.DetailFreelancerEducation}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchEducation}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <EducationCard
                  title={`${entities.decode(item.title)}`}
                  company={`${entities.decode(item.institute)}`}
                  date={`${entities.decode(item.startdate)}`}
                  content={`${entities.decode(item.description)}`}
                />
              )}
            />
            </>
          )}
          {(this.state.themeSettingsDetailFreelancerFAQs == 'yes' && this.state.fetchFAQs != '') &&
            <View style={styles.section}>    
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailServiceFAQ}
              </Text>
              
              <FlatList
                data={this.state.fetchFAQs}
                listKey={(a, b) => b.toString()}
                renderItem={({ item }) => (
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={[styles.PersonalDetailCollapseHeaderArea, {alignItems: 'center', backgroundColor:'#ddd', paddingLeft :10}]}
                      >
                          <Text
                            style={
                              styles.NameTextStyle
                            }
                          >
                            {`${entities.decode(item.faq_question)}`}
                          </Text>
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View style={[styles.PersonalDetailCollapseBodyArea, {marginBottom: 10, marginTop: 0}]}>
                        <Text style={styles.ParagraphTextStyle}>
                          {`${entities.decode(item.faq_answer)}`}
                        </Text>
                      </View>
                    </CollapseBody>
                  </Collapse>
                )}
                //horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          }
          {storedType != '' &&
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}>
                {"Şikayet et"}
              </Text>
              <View style={styles.MultiSelectArea}>
                <MultiSelect
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({selectedReason: value})
                  }
                  uniqueKey="slug"
                  items={this.state.new_fetchReportReasons}
                  selectedItems={this.state.selectedReason}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText="Şikayet sebebi"
                  selectText={'Şikayet sebebi'}
                  styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                  styleDropdownMenuSubsection={
                    styles.MultiSelectstyleDropdownMenuSubsection
                  }
                  onChangeInput={text => console.log(text)}
                  displayKey="name"
                  submitButtonText="Submit"
                />
              </View>
              <TextInput
                multiline= {true}
                placeholderTextColor="#7F7F7F"
                underlineColorAndroid="transparent"
                placeholder={'Şikayet açıklaması.'}
                onChangeText={reportDesc =>
                  this.setState({ reportDesc })
                }
                //value={this.state.ExpJobTitle}
                style={styles.TextInputLayoutStyleForDetail}
              />
              <TouchableOpacity
                onPress={() => this.reportFreelancer()}
                style={styles.MainButtonArea}
              >
                <Text
                  style={styles.ButtonText}
                >
                  {'Şikayet et'}
                </Text>
              </TouchableOpacity>
            </View>
          }
          <View style={styles.section}>
            <Text
              style={styles.MainHeadingTextStyle}>
              {'Aday profilini paylaş'}
            </Text>
            <FlatList
              data={this.state.fetchSocialShares}
              listKey={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => Linking.openURL(item.social_url.slice(0,5) == 'https' ? item.social_url : 'https:' + item.social_url)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10
                  }}
                >
                  <View style={{width :'8%', justifyContent: 'flex-start',}}>
                    <Zocial
                      name={item.social_type}
                      color={item.social_color}
                      size={18}
                    />
                  </View>
                  <Text style={[styles.NameTextStyle, {marginLeft: 5, marginRight:10}]}>
                    {item.social_title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>  
        </ScrollView>
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
      </SafeAreaView>
    );
  }
}
export default DetailFreelancerScreen;

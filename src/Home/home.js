import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";

import JobCategory from "./JobCategory";
import FreelancerCategory from "./FreelancerCategory";
import CustomHeader from "../Header/CustomHeader";
import LatestJobs from "./LatestJobs";
import ServiceLayout from './ServicesLayout';

import { StackNavigator, NavigationEvents } from "react-navigation";
import DetailFreelancerScreen from "../DetailFreelancer/DetailFreelancerScreen";
import * as CONSTANT from "../Constants/Constant";
import styles from '../Constants/Styles';
import GeneralStatusBarColor from "../styles/GeneralStatusBarColor";
import PTRView from "react-native-pull-to-refresh";
import Img01 from '../Images/slideone.jpg';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
export default class home extends React.Component {
  state = {
    data: [],
    default_color: "#fff",
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    Pid: "",
    spinner: true, 
    fetchServices: [],
    fetchFreelancer: [],
    fetchJobs:[],
    NotificationCount: '',
    spinnerCategory: true,
    spinnerFreelancer: true,
    spinnerJobs: true,
    spinnerServices: true,
  };
  componentDidMount() {
    this.CheckApplicationAccess();
    this.getUser();
    this.CheckNotificationCount();
  }
  CheckNotificationCount = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(CONSTANT.BaseUrl + 'user/notification_count?user_id=' + Uid);
    const json = await response.json();
    this.setState({NotificationCount: json.unread_notification_count});
    console.log('NotificationCount', this.state.NotificationCount)
  };
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_access");
    const json = await response.json();
    this.setState({ ApplicationAccessServcie: json.access_type.service_access });
    this.setState({ ApplicationAccessJob: json.access_type.job_access });
  }
  fetchData = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "list/get_categories");
    const json = await response.json();
    this.setState({ data: json, spinnerCategory: false });
    //alert(JSON.stringify(json[2].image))
  };
  fetchFreelancerData = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl +
      "listing/get_freelancers?listing_type=featured&show_users=5&profile_id=" +
      Pid
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchFreelancer: [], spinnerFreelancer: false }); // empty data set 
    } else {
      this.setState({ fetchFreelancer: json, spinnerFreelancer: false });
    }
  };
  fetchLatestPostedJobs = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_jobs?listing_type=latest"
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchJobs: [], spinnerJobs: false }); // empty data set 
    } else {
      this.setState({ fetchJobs: json, spinnerJobs: false });
    }
  };
  fetchLatestPostedServices = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "services/get_services?listing_type=latest"
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchServices: [], spinnerServices: false }); // empty data set 
    } else {
      this.setState({ fetchServices: json, spinnerServices: false });
    }
  };
  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      const Pid = await AsyncStorage.getItem("projectProfileId");
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
      if (Pid !== null) {
        this.setState({ Pid });
      } else {
        //  alert('something wrong')
      }
      this.fetchData();
      this.fetchFreelancerData();
      this.fetchLatestPostedJobs();
      this.fetchLatestPostedServices();
    } catch (error) {
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    const { 
      spinner, 
      spinnerCategory,
      spinnerFreelancer,
      spinnerJobs,
      spinnerServices
    } = this.state;
    return (
      <Text>Home page</Text>
    );
  }
}

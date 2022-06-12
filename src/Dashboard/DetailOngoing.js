import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Share,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  Image,
  CameraRoll,
  Dimensions,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import AntIcon from "react-native-vector-icons/AntDesign";
import JobAttachments from "../DetailJobs/JobAttachments";

import JobSkill from "../DetailJobs/JobSkill";
import AwesomeAlert from "react-native-awesome-alerts";
import * as CONSTANT from "../Constants/Constant";
import { NavigationEvents } from "react-navigation";
import HTML from "react-native-render-html";
import DocumentPicker from "react-native-document-picker";
import SelectedDocLayout from "../CompleteEmployers/SelectedDocLayout";
import SimpleHeader from "../Header/SimpleHeader";
import RBSheet from "react-native-raw-bottom-sheet";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import axios from "axios";
import { Table, Row, Rows } from "react-native-table-component";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class DetailOngoing extends Component {
  static navigationOptions = {
    title: "Home",
    headerTintColor: "#ffffff",
    headerStyle: {
      backgroundColor: CONSTANT.primaryColor,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
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
    image: null,
    images: null,
    Description: "",
    fetchHistory: [],
    fetchBudget: {},
    fetchMilestone: [],
    tableHead: ["Milestone Title:", "Due Date:", "Budget:", "Action:"],
    attachmentArrey: [],
    ServiceStatus:[],
    new_ServiceStatus:[],
    ServiceStatusKnown:'',
    ServiceRating:[],
    new_ServiceRating:[],
    score:'1',
    addFeedback:'',
    addCancelService:'',
    index_v:'',
    score1:'1',
    refresh_ServiceRating: false,
    ratingArray: [],
    ratings:{},
    New_ratingArray:[],
  };
  componentDidMount() {
    const { params } = this.props.navigation.state;
    //alert(params.milestone_option)
    this.fetchProjectHistory();
    this.fetchJobDetail();
    this.fetchJobRating();
    this.getUser();
    if (params.milestone_option && params.milestone_option == "on") {
      this.fetchbudgetDetail();
      this.fetchMilestones();
      this.fetchJobStatusMilestone();
    }else{
      this.fetchJobStatus();
    }
  }
  fetchJobStatus = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_theme_settings");
    const json = await response.json();
    this.setState({ServiceStatus: json.job_status, isLoading: false });
    console.log('Service Status', JSON.stringify(this.state.ServiceStatus));
    for (const [key, value] of Object.entries(this.state.ServiceStatus)) {
      console.log(`${key}: ${value}`);
      this.state.new_ServiceStatus.push({
        name: `${value}`,
        slug: `${key}`,
      });
    }
  };
  fetchJobStatusMilestone = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "proposal/proposal_options?proposal_id=" + params.Proposal_id
    );
    const json = await response.json();
    this.setState({ServiceStatus: json.status_array, isLoading: false });
    console.log('Service Status', JSON.stringify(this.state.ServiceStatus));
    for (const [key, value] of Object.entries(this.state.ServiceStatus)) {
      console.log(`${key}: ${value}`);
      this.state.new_ServiceStatus.push({
        name: `${value}`,
        slug: `${key}`,
      });
    }
    console.log("New Required Array", this.state.new_ServiceStatus);
  };
  fetchJobRating = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + "user/get_theme_settings"
    );
    const json = await response.json();
    this.setState({ServiceRating: json.project_ratings, isLoading: false });
    console.log('Service Status', JSON.stringify(this.state.ServiceRating));
    for (const [key, value] of Object.entries(this.state.ServiceRating)) {
      this.state.new_ServiceRating.push({
        questions: `${value}`,
        key: `${key}`
      });
    }
    console.log("New Required Array", this.state.new_ServiceRating);
  };
  fetchJobDetail = async () => {
    const { params } = this.props.navigation.state;
    // Alert.alert('project ID', params.ID)
    // Alert.alert('Proposal_id_2', params.Proposal_id)
    // Alert.alert('Freelancer_id', params.Freelance_id)
    const response = await fetch(
      CONSTANT.BaseUrl +
        "dashboard/job_details_information?project_id=" +
        params.ID +
        "&proposal_id=" +
        params.Proposal_id +
        "&freelance_id=" +
        params.Freelance_id
    );
    const json = await response.json();
    this.setState({ JobDetail: json, isLoading: false });
  };
  fetchProjectHistory = async () => {
    const { params } = this.props.navigation.state;
    const Pid = await AsyncStorage.getItem("projectUid");
    // Alert.alert('ID_2', params.ID)
    // Alert.alert('Proposal_id_2', params.Proposal_id)
    // Alert.alert('Pid', Pid)
    const response = await fetch(
      CONSTANT.BaseUrl +
        "dashboard/get_ongoing_job_chat?id=" +
        params.ID +
        "&user_id=" +
        Pid
    );
    const json = await response.json();
    this.setState({ fetchHistory: json, isLoading: false });

    if(params.attachments){for (const [key, value] of Object.entries(params.attachments)) {
      console.log("value", `${value}`);
      this.state.attachmentArrey.push({
        url: `https:${value}`,
      });
    }}
    console.log("attachment arrey", this.state.attachmentArrey);
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      const Address = await AsyncStorage.getItem("Address");
      const Location = await AsyncStorage.getItem("Location");
      const s_address1 = await AsyncStorage.getItem("shipping_address1");
      const s_city = await AsyncStorage.getItem("shipping_city");
      const s_company = await AsyncStorage.getItem("shipping_company");
      const s_country = await AsyncStorage.getItem("shipping_country");
      const s_first_name = await AsyncStorage.getItem("shipping_first_name");
      const s_last_name = await AsyncStorage.getItem("shipping_last_name");
      const s_state = await AsyncStorage.getItem("shipping_state");
      const b_address1 = await AsyncStorage.getItem("billing_address_1");
      const b_city = await AsyncStorage.getItem("billing_city");
      const b_conpany = await AsyncStorage.getItem("billing_company");
      const b_country = await AsyncStorage.getItem("billing_country");
      const b_email = await AsyncStorage.getItem("billing_email");
      const b_first_name = await AsyncStorage.getItem("billing_first_name");
      const b_last_name = await AsyncStorage.getItem("billing_last_name");
      const b_phone = await AsyncStorage.getItem("billing_phone");
      const b_state = await AsyncStorage.getItem("billing_state");
      if (storedValue !== null) {
        this.setState({ Name: storedValue });
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
        this.setState({ Customerid: id });
      } else {
        //  alert('something wrong')
      }
      if (Address !== null) {
        this.setState({ address: Address });
      } else {
        //  alert('something wrong')
      }
      if (Location !== null) {
        this.setState({ location: Location });
      } else {
        //  alert('something wrong')
      }
      if (s_address1 !== null) {
        this.setState({ S_address1: s_address1 });
      } else {
        //  alert('something wrong')
      }
      if (s_city !== null) {
        this.setState({ S_city: s_city });
      } else {
        //  alert('something wrong')
      }
      if (s_company !== null) {
        this.setState({ S_company: s_company });
      } else {
        //  alert('something wrong')
      }
      if (s_country !== null) {
        this.setState({ S_country: s_country });
      } else {
        //  alert('something wrong')
      }
      if (s_first_name !== null) {
        this.setState({ S_first_name: s_first_name });
      } else {
        //  alert('something wrong')
      }
      if (s_last_name !== null) {
        this.setState({ S_last_name: s_last_name });
      } else {
        //  alert('something wrong')
      }
      if (s_state !== null) {
        this.setState({ S_state: s_state });
      } else {
        //  alert('something wrong')
      }
      if (b_address1 !== null) {
        this.setState({ B_address1: b_address1 });
      } else {
        //  alert('something wrong')
      }
      if (b_city !== null) {
        this.setState({ B_city: b_city });
      } else {
        //  alert('something wrong')
      }
      if (b_conpany !== null) {
        this.setState({ B_conpany: b_conpany });
      } else {
        //  alert('something wrong')
      }
      if (b_country !== null) {
        this.setState({ B_country: b_country });
      } else {
        //  alert('something wrong')
      }
      if (b_email !== null) {
        this.setState({ B_email: b_email });
      } else {
        //  alert('something wrong')
      }
      if (b_first_name !== null) {
        this.setState({ B_first_name: b_first_name });
      } else {
        //  alert('something wrong')
      }
      if (b_last_name !== null) {
        this.setState({ B_last_name: b_last_name });
      } else {
        //  alert('something wrong')
      }
      if (b_phone !== null) {
        this.setState({ B_phone: b_phone });
      } else {
        //  alert('something wrong')
      }
      if (b_state !== null) {
        this.setState({ B_state: b_state });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
      console.log(error);
    }
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  onClick = () => {
    Share.share(
      {
        message: this.state.fetchJob[0].job_link,
        url: this.state.fetchJob[0].job_link,
        title: "Şuna bir bakar mısın ?",
      },
      {
        // Android only:
        dialogTitle: "Paylaş",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    );
  };

  pickMultiple() {
    try {
      DocumentPicker.pickMultiple({})
        .then((images) => {
          this.setState({
            image: null,
            images: images,
          });
        })
        .catch((e) => alert(e));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  SubmitMessage = async () => {
    const Uid = await AsyncStorage.getItem("projectUid");
    const { params } = this.props.navigation.state;
    const { Description, images } = this.state;
    const formData = new FormData();
    formData.append("sender_id", Uid);
    formData.append("id", params.Proposal_id);
    formData.append("chat_desc", Description);
    formData.append("size", images.length >= 1 ? images.length : 0);
    images.forEach((item, i) => {
      var path = item.uri;
      var filename = item.name;
      formData.append("project_files" + i, {
        uri: path,
        type: item.type,
        name: filename || `filename${i}.jpg`,
      });
    });
    fetch(CONSTANT.BaseUrl + "proposal/sendproposal_chat", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        if (response.status == "200") {
          this.fetchProjectHistory();
          Alert.alert("Başarılı", "Mesaj başarı ile gönderildi.");
          // this.showSuccessAlert();
        } else if (response.status == "203") {
          Alert.alert("Üzgünüm..", "Bir hata ile karşılaştık.");
          // this.showAlert();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchbudgetDetail = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "milestone/milestones_details?proposal_id=" +
        params.Proposal_id
    );
    const json = await response.json();
    this.setState({ fetchBudget: json, isLoading: false });
  };
  
  fetchMilestones = async () => {
    const { params } = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "milestone/list_milestone?id=" + params.Proposal_id + "&user_id=" + Uid
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ fetchMilestone: [], isLoading: false });
    } else {
      this.setState({ fetchMilestone: json, isLoading: false });
    }
    console.log(JSON.stringify(this.state.fetchMilestone))
  };
  openFile = (url) => {
    Linking.openURL(url);
  };

  payNow = async (Mid)=>{
    this.setState({ isLoading: true });
    const Uid = await AsyncStorage.getItem("projectUid");
    const {
      Notes,
      Customerid,
      S_address1,
      S_city,
      S_company,
      S_country,
      S_first_name,
      S_last_name,
      S_state,
      B_address1,
      B_city,
      B_conpany,
      B_country,
      B_email,
      B_first_name,
      B_last_name,
      B_phone,
      B_state,
    } = this.state;
    var billing_info_map = {};
    billing_info_map["address_1"] = B_address1;
    billing_info_map["city"] = B_city;
    billing_info_map["company"] = B_conpany;
    billing_info_map["country"] = B_country;
    billing_info_map["email"] = B_email;
    billing_info_map["first_name"] = B_first_name;
    billing_info_map["last_name"] = B_last_name;
    billing_info_map["phone"] = B_phone;
    billing_info_map["state"] = B_state;
    var shipping_info_map = {};
    shipping_info_map["address_1"] = S_address1;
    shipping_info_map["city"] = S_city;
    shipping_info_map["company"] = S_company;
    shipping_info_map["country"] = S_country;
    shipping_info_map["first_name"] = S_first_name;
    shipping_info_map["last_name"] = S_last_name;
    shipping_info_map["state"] = S_state;
    var pay_now_array = {};
    pay_now_array["order_type"] = "milestone";
    pay_now_array["milestone_id"] = Mid;
    pay_now_array["customer_id"] = Uid;
    pay_now_array["customer_note"] = Notes;
    pay_now_array["shipping_methods"] = "stripe";
    pay_now_array["sameAddress"] = "1";
    pay_now_array["billing_info"] = billing_info_map;
    pay_now_array["shipping_info"] = shipping_info_map;
    var payment_data = JSON.stringify(pay_now_array);
    axios
      .post(
        CONSTANT.BaseUrl + "dashboard/create_checkout_page", {
          payment_data: payment_data
        }
      )
      .then(async response => {
        console.log(response)
        if (response.status === 200) {
          Alert.alert(response.data.message);
          this.setState({ isLoading: false });
          this.props.navigation.navigate("BuyServiceWebview", {
            url: response.data.url,
            headerName: 'Şimdi öde'
          });
          console.log('url package', response.data.url)
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Hata", response.data.message);
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  completeNow = async (Mid)=>{
    this.setState({ isLoading: true });
    axios
      .post(
        CONSTANT.BaseUrl + "milestone/complete_milestone", {
          milestone_id: Mid
        }
      )
      .then(async response => {
        console.log(response)
        if (response.status === 200) {
          Alert.alert(response.data.message);
          this.setState({ isLoading: false });
          this.fetchbudgetDetail();
          this.fetchMilestones();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Hata", response.data.message);
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }
  openFeedback = () => {
    console.log('service Known', this.state.ServiceStatusKnown)
    if(this.state.ServiceStatusKnown == 'completed'){
      this.onCompleteRBSheet.open()
    }else if(this.state.ServiceStatusKnown == 'cancelled'){
      this.onCancelledRBSheet.open()
    }else null;
  }
  closeFeedback = async () => {
    this.onCompleteRBSheet.close()

    this.setState({ isLoading: true });
    const {
      addFeedback,
      ratingArray
    } = this.state;
    
    const Uid = await AsyncStorage.getItem('projectUid');
    const { params } = this.props.navigation.state;
    console.log(
      addFeedback,
      JSON.stringify(ratingArray),
      Uid,
      params.ID
    );
    axios
      .post(CONSTANT.BaseUrl + "dashboard/complete_project?user_id=" + Uid + '&project_id=' + params.ID,{
        feedback_description: addFeedback,
        feedback: ratingArray,
      })
      .then(async response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ isLoading: false });
          Alert.alert("Başarılı", response.data[0].message);
          console.log("Başarılı", response.data[0].message);
          this.props.navigation.navigate('CompletedJobs')
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Hata", response.data[0].message);
          console.log("Hata", response.data[0].message)
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  }
  cancelReason = async () => {
    const {
      addCancelService
    } = this.state;
    if(addCancelService == ''){
      alert('Lütfen iptal etme nedenini giriniz.')
    }else{
      this.onCancelledRBSheet.close()
      this.setState({ isLoading: true });
      const Uid = await AsyncStorage.getItem('projectUid');
      const { params } = this.props.navigation.state;
      
      console.log(
        params.ID,
        addCancelService
      );
      axios
        .post(CONSTANT.BaseUrl + "dashboard/cancelled_project?project_id=" + params.ID,{
          cancelled_reason: addCancelService,
        })
        .then(async response => {
          console.log(response);
          if (response.status === 200) {
            this.setState({ isLoading: false });
            Alert.alert("Başarılı", response.data[0].message);
            console.log("Başarılı", response.data[0].message)
          } else if (response.status === 203) {
            this.setState({ isLoading: false });
            Alert.alert("Hata", response.data[0].message);
            console.log("Hata", response.data[0].message)
          }
        })
        .catch(error => {
          Alert.alert(error);
          console.log(error);
        });
    }
  }

  onStarRatingPress(rating, index, key_value) {

    this.setState({
      ratings:{
        ...this.state.ratings,
        [index]:{key_value, rating}
      }
    })
    //console.log('my rating', this.state.ratings)
    
    // if(this.state.ratingArray != []){
    //   for (var i = 0 ; i <= this.state.ratingArray.length() ; i++){
    //     console.log("This is my new loop" , this.state.ratingArray)
    //   }
    // } else {
      // for (const [key, value] of Object.entries(this.state.ServiceRating)) {
        // console.log(`${key}: ${value}`);

        // this.state.ratingArray.push({${key_value} : `${rating}`})
        this.state.ratingArray.push({[key_value] : rating})
      // }
      console.log('rating array', this.state.ratingArray)
      //this.setState({index_v: index});
    // }
  }

  render() {
    const { isLoading, showAlert } = this.state;
    const { id, storedValue, storedType, profileImg, type } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        {/* <NavigationEvents onWillFocus={this.fetchJObData} /> */}
        <SimpleHeader HeaderText={CONSTANT.DetailjobHadder} />
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ marginLeft: 20, marginTop: 20 ,width:"80%"}}>
            {params.employer_name}
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              marginRight: 10,
              marginBottom: 20,
            }}
          >
            {params.title}
          </Text>

          <View style={{ flexDirection: "column", backgroundColor: "#FFFFFF" }}>
            <View
              style={{
                borderBottomColor: "#dddddd",
                borderBottomWidth: 0.6,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={{ marginLeft: 20 }}>{CONSTANT.DetailjobCarrer}</Text>

              <Text style={{ paddingRight: 20 }}>{params.level}</Text>
            </View>
            <View
              style={{
                borderBottomColor: "#dddddd",
                borderBottomWidth: 0.6,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={{ marginLeft: 20 }}>
                {CONSTANT.Detailjoblocation}
              </Text>
              <Text style={{ paddingRight: 20 }}>{params.location_name}</Text>
            </View>
            
           

            {params.duration && (
              <>
                <View
                  style={{
                    borderBottomColor: "#dddddd",
                    borderBottomWidth: 0.6,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ marginLeft: 20 }}>
                    {CONSTANT.DetailjobDuration}
                  </Text>
                  <Text style={{ paddingRight: 20 }}>{params.duration}</Text>
                </View>
              </>
            )}
            <View
              style={{
                borderBottomColor: "#dddddd",
                borderBottomWidth: 0.6,
              }}
            />
          </View>
          {(this.state.attachmentArrey && this.state.attachmentArrey.length >= 1) ? (
            <View>
              <View
                style={{
                  height: 60,
                  justifyContent: "center",
                  marginVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                  borderLeftWidth: 5,
                  marginHorizontal: 10,
                  borderLeftColor: CONSTANT.primaryColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  {CONSTANT.DetailOngoingAttachments}
                </Text>
              </View>
              <FlatList
                style={{ paddingBottom: 5, paddingTop: 10 }}
                data={this.state.attachmentArrey}
                listKey={(y, z) => z.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    elevation={5}
                    style={styles.container}
                    onPress={() => this.openFile(item.url)}
                  >
                    <View
                      style={{
                        backgroundColor:'#fff',
                        padding: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        borderRadius: 10,
                        borderColor:'#ddd',
                        borderWidth: 1,
                        marginBottom: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text style={{color: CONSTANT.TextColorBlue}}>{item.url}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null}
          {
            <View>
              <View
                style={{
                  height: 60,
                  justifyContent: "center",
                  marginVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                  borderLeftWidth: 5,
                  marginHorizontal: 10,
                  borderLeftColor: CONSTANT.primaryColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  {this.state.storedType != "freelancer" ? CONSTANT.DetailOngoingHiredFreelancer : CONSTANT.DetailOngoingEmployer}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                  source={{ uri: this.state.storedType != "freelancer" ? `${params.freelancer_img}` : `${params.employer_img}` }}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.NameTextStyle,
                    { marginLeft: 10, marginRight: 5 ,width:"85%"},
                  ]}
                >
                  {this.state.storedType != "freelancer" ? params.freelancer_name : params.employer_name}
                </Text>
              </View>
              {(this.state.storedType != "freelancer" && params.type == 'hired') &&
                <View style={{marginVertical: 10, marginHorizontal: 20, flexDirection:'row' }}>
                  <MultiSelect
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({ ServiceStatusKnown: value })
                    }
                    uniqueKey="slug"
                    items={this.state.new_ServiceStatus}
                    selectedItems={this.state.ServiceStatusKnown}
                    borderBottomWidth={0}
                    single={true}
                    searchInputPlaceholderText={'Pick Service Status'}
                    selectText={'Hired'}
                    styleMainWrapper={{
                      backgroundColor: "#ffffff",
                      borderRadius: 5,
                      marginTop:10,
                      width:'84%'
                    }}
                    styleDropdownMenuSubsection={{
                      backgroundColor: "#ffffff",
                      paddingRight: -10,
                      height: 60,
                      paddingLeft: 10,
                      borderWidth: 0.5,
                      borderColor: "#dddddd",
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                    onChangeInput={text => console.log(text)}
                    displayKey="name"
                    submitButtonText={CONSTANT.Submit}
                  />
                  <TouchableOpacity 
                    onPress={this.openFeedback}
                    style={{justifyContent: 'center', alignItems:'center', backgroundColor: CONSTANT.primaryColor, height:60, width:60, borderTopRightRadius:5, borderBottomRightRadius:5}}>
                    <AntIcon
                      name="check"
                      color={'#fff'}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              }
              {params.type == 'completed' &&
               <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>     
                <View style={{
                  marginVertical: 10, 
                  marginHorizontal: 20, 
                  flexDirection:'row', 
                  backgroundColor:CONSTANT.TextColorGreen,
                  height:40,
                  width: 150,
                  borderRadius:5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{fontWeight:'700', color: CONSTANT.TextColorLight}}>Kabul Edildi</Text>
                </View>
                </View>  

              }
              {params.type == 'cancelled' &&
               <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>     
                <View style={{
                  marginVertical: 10, 
                  marginHorizontal: 20, 
                  flexDirection:'row', 
                  backgroundColor:CONSTANT.TextColorRed,
                  height:40,
                  width: 150,
                  borderRadius:5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{fontWeight:'700', color: CONSTANT.TextColorLight1,}}>Reddedildi</Text>
                </View>
                </View>  
              }
            </View>
          }
          {params.milestone_option == "on" ? (
            <View>
              <View
                style={{
                  height: 60,
                  justifyContent: "center",
                  marginVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                  borderLeftWidth: 5,
                  marginHorizontal: 10,
                  borderLeftColor: CONSTANT.primaryColor,
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 10 }}>
                  {CONSTANT.DetailOngoingProjectBudgetDetails}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                {this.state.fetchBudget && (
                  <View
                    style={{
                      width: "50%",
                      paddingVertical: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ height: 50, width: 50 }}
                      source={{ uri: this.state.fetchBudget.total_budget }}
                    />
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {this.state.fetchBudget.total_price}
                    </Text>
                  </View>
                )}
                {this.state.fetchBudget && (
                  <View
                    style={{
                      width: "50%",
                      paddingVertical: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fcfcfc",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ height: 50, width: 50 }}
                      source={{ uri: this.state.fetchBudget.in_escrow }}
                    />
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {this.state.fetchBudget.completed_price}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                {this.state.fetchBudget && (
                  <View
                    style={{
                      width: "50%",
                      paddingVertical: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fcfcfc",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ height: 50, width: 50 }}
                      source={{ uri: this.state.fetchBudget.milestone_paid }}
                    />
                    <Text
                      style={{
                        marginTop: 15,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {this.state.fetchBudget.hired_price}
                    </Text>
                  </View>
                )}
                {this.state.fetchBudget && (
                  <View
                    style={{
                      width: "50%",
                      paddingVertical: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ height: 50, width: 50 }}
                      source={{ uri: this.state.fetchBudget.remainings }}
                    />
                    {/* <Text
                      style={{
                        marginTop: 15,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {this.state.fetchBudget.pending_price}
                    </Text> */}
                    <HTML
                      containerStyle={{marginTop: 15,}}
                      baseFontStyle={{fontSize: 15, fontWeight: "700",}}
                      html={this.state.fetchBudget.pending_price}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  height: 60,
                  justifyContent: "center",
                  marginVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                  borderLeftWidth: 5,
                  marginHorizontal: 10,
                  borderLeftColor: CONSTANT.primaryColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  {CONSTANT.DetailOngoingMilestones}
                </Text>
              </View>

              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#ddd" }}>
                  <Row
                    data={this.state.tableHead}
                    style={{
                      height: 40,
                      backgroundColor: CONSTANT.primaryColor,
                    }}
                    textStyle={{
                      color: "#fff",
                      marginLeft: 6,
                      fontSize: 13,
                      fontWeight: "700",
                    }}
                  />
                  {this.state.fetchMilestone != [] && this.state.fetchMilestone.slice(0).reverse().map((item, index) => (
                    <Row
                      key={index}
                      data={[
                        item.milestone_title,
                        item.milestone_due_date,
                        entities.decode(item.milestone_price),
                        <View style={{ padding: 5 }}>
                          <TouchableOpacity 
                            activeOpacity= {(this.state.storedType != "freelancer" && item.status_text == 'Pay Now') ? 0 : 1}
                            style={{
                              alignItems:'center',
                              borderRadius: 3,
                              paddingVertical: 5,
                              backgroundColor: item.status_text == 'Pending' ? CONSTANT.TextColorGrey : item.status_text == 'Hired' ? CONSTANT.TextColorYellow : CONSTANT.TextColorGreen
                            }}
                            onPress={() => (this.state.storedType != "freelancer" && item.status_text == 'Pay Now') &&
                              this.payNow(JSON.stringify(item.milestone_id))
                            }
                          >
                            <Text style={{color: '#fff', fontWeight: '700', textAlign: 'center'}}>{item.status_text}</Text>
                          </TouchableOpacity>
                          {(item.status_text == 'Hired' && this.state.storedType != "freelancer") &&
                            <TouchableOpacity 
                              style={{
                                alignItems:'center',
                                borderRadius: 3,
                                marginTop: 5,
                                paddingVertical: 5,
                                backgroundColor: CONSTANT.TextColorGreen
                              }}
                              onPress={() => this.completeNow(JSON.stringify(item.milestone_id))}
                            >
                              <Text style={{color: '#fff', fontWeight: '700', textAlign: 'center'}}>Complete Now</Text>
                            </TouchableOpacity>
                          }
                          {(item.order_id != 0 && this.state.storedType != "freelancer") &&
                            <TouchableOpacity 
                              style={{
                                alignItems:'center',
                                borderRadius: 3,
                                marginTop: 5,
                                paddingVertical: 5,
                                backgroundColor: CONSTANT.TextColorBlue
                              }}
                              onPress={ () => {this.props.navigation.navigate("InvoiceDetailPage", { post_id: JSON.stringify(item.order_id) })}}
                            >
                              <Text style={{color: '#fff', fontWeight: '700', textAlign: 'center'}}>Check Invoice</Text>
                            </TouchableOpacity>
                          }
                        </View>,
                      ]}
                      textStyle={{
                        margin: 6,
                        color: "#323232",
                        fontSize: 13,
                      }}
                    />
                  ))}
                </Table>
              </View>
            </View>
          ) : null}

          {this.state.fetchHistory.length >= 1 && (
            <View>
              <View
                style={{
                  height: 60,
                  justifyContent: "center",
                  marginVertical: 10,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                  borderLeftWidth: 5,
                  marginHorizontal: 10,
                  borderLeftColor: CONSTANT.primaryColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  {CONSTANT.DetailOngoingProjectHistory}
                </Text>
              </View>

              {this.state.fetchHistory.length >= 1 ? (
                <FlatList
                  data={this.state.fetchHistory}
                  listKey={(x, i) => i.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{ justifyContent: "space-between" }}
                      activeOpacity={0.9}
                    >
                      {index % 2 === 0 ? (
                        <View style={styles.amenetiesarea}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginRight: 15,
                              width: "85%",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginRight: 15,
                              }}
                            >
                              <Image
                                resizeMode={"contain"}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 15,
                                }}
                                source={{ uri: item.sender_image }}
                              />
                            </View>
                            <View>
                              <Text>{item.date_sent}</Text>
                              <HTML
                                containerStyle={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                html={item.message}
                                imagesMaxWidth={Dimensions.get("window").width}
                              />
                            </View>
                          </View>
                          {/* <TouchableOpacity
                            // onPress={() => this.props.navigation.goBack(null)}
                            style={{
                              flexDirection: "column",
                              display: "flex",
                              alignContent: "center",
                              alignSelf: "center",
                              justifyContent: "center"
                            }}
                          >
                            <AntIcon
                              name="download"
                              size={25}
                              color={"#000"}
                            />
                          </TouchableOpacity> */}
                        </View>
                      ) : (
                        <View style={styles.amenetiesarea2}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginRight: 15,
                              width: "85%",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginRight: 15,
                              }}
                            >
                              <Image
                                resizeMode={"contain"}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 15,
                                }}
                                source={{ uri: item.sender_image }}
                              />
                            </View>
                            <View>
                              <Text>{item.date_sent}</Text>
                              <HTML
                                containerStyle={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                html={item.message}
                                imagesMaxWidth={Dimensions.get("window").width}
                              />
                            </View>
                          </View>
                          <TouchableOpacity
                          // onPress={() => this.props.navigation.goBack(null)}
                          >
                            <AntIcon
                              name="download"
                              size={25}
                              color={"#323232"}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ resizeMode: "contain", height: 150, width: 150 }}
                    source={require("../Images/nodata.png")}
                  />
                </View>
              )}

              <View />
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.RBSheet.open()}
          style={{
            alignItems: "center",
            height: 50,
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: CONSTANT.primaryColor,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {CONSTANT.DetailOngoingSendMessage}
          </Text>
        </TouchableOpacity>

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
                {CONSTANT.DetailOngoingTypeMessage}
              </Text>
            </View>
            <View style={styles.getAnswersRBSheetSpecialityArea}>
              <TextInput
                underlineColorAndroid="transparent"
                multiline={true}
                style={{
                  borderColor: "#807f7f",
                  width: "90%",
                  borderWidth: 0.3,
                  borderRadius: 3,
                  fontSize: 15,
                  padding: 5,
                  height: 150,
                }}
                name="username"
                onChangeText={(Description) => this.setState({ Description })}
                placeholder="Description"
                placeholderTextColor="#807f7f"
              />
              {this.state.images != null ? (
                <FlatList
                  style={{ paddingBottom: 5, paddingTop: 10 }}
                  data={this.state.images}
                  listKey={(y, z) => z.toString()}
                  renderItem={({ item }) => (
                    <SelectedDocLayout docName={item.name} />
                  )}
                />
              ) : null}
              <View
                style={{
                  width: "90%",
                  marginBottom: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.SubmitMessage()}
                  style={{
                    alignItems: "center",
                    height: 40,
                    borderRadius: 4,
                    marginRight: 5,
                    width: "45%",
                    alignSelf: "center",
                    backgroundColor: CONSTANT.primaryColor,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: "#fff",
                      paddingTop: 10,
                    }}
                  >
                    {CONSTANT.DetailOngoingUpdate}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.pickMultiple()}
                  style={{
                    alignItems: "center",
                    height: 40,
                    borderRadius: 4,
                    marginLeft: 5,
                    width: "45%",
                    alignSelf: "center",
                    backgroundColor: "#00cc8d",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: "#fff",
                      paddingTop: 10,
                    }}
                  >
                    {CONSTANT.DetailOngoingSelectFile}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </RBSheet>
        <RBSheet
          ref={ref => {
            this.onCompleteRBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'transparent',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
          }}>
          <View style={{
              width: '100%',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              backgroundColor: CONSTANT.primaryColor,
              height: 55,
              justifyContent: 'center',
              fontWeight: '700',
            }}>
            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
              {CONSTANT.OngoingServicesDetailCompleteService}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              overflow: 'hidden',
              paddingHorizontal:10,
            }}>
           
            <FlatList
              data={this.state.new_ServiceRating}
              extraData={this.state.refresh_ServiceRating}
              listKey={(x, i) => i.toString()}
              renderItem={({ item, index }) => (
                <View style={{flex: 1,}}>
                  <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#f7f7f7', padding:10, marginRight:10, marginVertical:5, borderRadius:5}}>
                      {/* {this.state.index_v === index ? ( */}
                        <View style={{flexDirection:'row'}}>
                          <View style={{borderColor:'#ddd', borderWidth:1, borderRadius:5, width:30, height:30, justifyContent: 'center', alignItems:'center', backgroundColor:CONSTANT.primaryColor, marginRight:5}}>
                            <Text style={[styles.SectionHeadingTextStyle,{color: CONSTANT.TextColorLight}]}>{this.state.ratings[index] != null ? this.state.ratings[index].rating : 0}</Text>
                          </View>
                          <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={24}
                            fullStarColor={"#fecb02"}
                            emptyStarColor={"#fecb02"}
                            rating={this.state.ratings[index] != null ? this.state.ratings[index].rating : 0}
                            selectedStar={(rating) => this.onStarRatingPress(rating, index, item.key)}
                          />
                        </View>
                         {/* ) : (
                        <View style={{flexDirection:'row'}}>
                          <View style={{borderColor:'#ddd', borderWidth:1, borderRadius:5, width:30, height:30, justifyContent: 'center', alignItems:'center', backgroundColor:CONSTANT.primaryColor, marginRight:5}}>
                            <Text style={[styles.SectionHeadingTextStyle,{color: CONSTANT.TextColorLight}]}>{this.state.score1}</Text>
                          </View>
                          <StarRating
                             disabled={false}
                            maxStars={5}
                            starSize={24}
                            fullStarColor={"#fecb02"}
                            emptyStarColor={"#fecb02"}
                            rating={this.state.score1}
                            selectedStar={(rating) => this.onStarRatingPress(rating, index , item.key)}
                          />
                        </View>
                      )} */}
                    </View>
                    <View style={{flex: 1,}}>
                      <Text style={styles.NameTextStyle}>{item.questions}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <TextInput
              multiline={true}
              placeholderTextColor="#7F7F7F"
              underlineColorAndroid="transparent"
              placeholder={CONSTANT.OngoingServicesDetailAddFeedback}
              onChangeText={addFeedback =>
                this.setState({ addFeedback })
              }
              //value={this.state.addFeedback}
              style={{
                height: 150,
                backgroundColor:'#ffffff',
                borderRadius: 5,
                borderWidth: 0.7,
                borderColor: "#dddddd",
                color: "#323232",
                paddingHorizontal:10,
                marginBottom: 10,
                justifyContent:'center',
                fontSize:14,
              }}
            />
            <TouchableOpacity 
              onPress={this.closeFeedback}
              style={{
                height: 40,
                marginVertical: 10,
                borderRadius: 5,
                width: "40%",
                marginHorizontal:5,
                flexDirection:'row',
                alignItems: "center",
                justifyContent:"center",
                alignSelf: "center",
                backgroundColor: CONSTANT.primaryColor,
              }}>
              <Text style={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight:'700',
                textAlign:"center",
              }}>{CONSTANT.OngoingServicesDetailSendFeedback}</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* <View style={{width:'100%', backgroundColor:'#fff'}}>
            <TouchableOpacity 
              onPress={() => this.onCompleteRBSheet.close()}
              style={{
                height: 40,
                marginVertical: 10,
                borderRadius: 5,
                width: "40%",
                marginHorizontal:5,
                flexDirection:'row',
                alignItems: "center",
                justifyContent:"center",
                alignSelf: "center",
                backgroundColor: CONSTANT.primaryColor
              }}>
              <Text style={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight:'700',
                textAlign:"center",
              }}>SEND FEEDBACK</Text>
            </TouchableOpacity>
          </View> */}
        </RBSheet>
        <RBSheet
          ref={ref => {
            this.onCancelledRBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'transparent',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
          }}>
          <View style={{
              width: '100%',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              backgroundColor: CONSTANT.primaryColor,
              height: 55,
              justifyContent: 'center',
              fontWeight: '700',
            }}>
            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
              {CONSTANT.OngoingServicesDetailCancelReason}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              overflow: 'hidden',
              padding:10
            }}>
            <TextInput
              multiline={true}
              placeholderTextColor="#7F7F7F"
              underlineColorAndroid="transparent"
              placeholder={CONSTANT.OngoingServicesDetailAddCReason}
              onChangeText={addCancelService =>
                this.setState({ addCancelService })
              }
              //value={this.state.addCancelService}
              style={{
                height: 150,
                backgroundColor:'#ffffff',
                borderRadius: 5,
                borderWidth: 0.7,
                borderColor: "#dddddd",
                color: "#323232",
                paddingHorizontal:10,
                marginBottom: 10,
                justifyContent:'center',
                fontSize:14,
              }}
            />
          </ScrollView>
          <View style={{width:'100%', backgroundColor:'#fff'}}>
          <TouchableOpacity 
              onPress={this.cancelReason}
              style={{
                height: 40,
                marginVertical: 10,
                borderRadius: 5,
                width: "40%",
                marginHorizontal:5,
                flexDirection:'row',
                alignItems: "center",
                justifyContent:"center",
                alignSelf: "center",
                backgroundColor: CONSTANT.primaryColor
              }}>
              <Text style={{
                color: "#ffffff",
                fontSize: 12,
                fontWeight:'700',
                textAlign:"center",
              }}>{CONSTANT.OngoingServicesDetailCancelService}</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
export default DetailOngoing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  amenetiesarea: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    marginRight: 10,
    padding: 15,
    justifyContent: "space-between",
    width: "100%",
  },
  amenetiesarea2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    padding: 15,
    justifyContent: "space-between",
    width: "100%",
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
    alignItems: "center",
    top: 10,
  },
});

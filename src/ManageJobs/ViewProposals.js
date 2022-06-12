import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import * as CONSTANT from "../Constants/Constant";
import styles from '../Constants/Styles';
import SimpleHeader from "../Header/SimpleHeader";
const Entities = require("html-entities").XmlEntities;
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import AntIcon from "react-native-vector-icons/AntDesign";
const entities = new Entities();
class ViewProposals extends Component {
  state = {
    data: [],
    fetchProposal: [],
    isLoading: true,
    Message: ""
  };
  componentDidMount() {
    this.fetchProposalData();
    this.getUser();
  }
  fetchProposalData = async () => {
    const { params } = this.props.navigation.state;
    const uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "dashboard/manage_job_proposals?user_id=" +
        uid +
        "&job_id=" +
        params.my_id
    );
    const json = await response.json();
    this.setState({ fetchProposal: json, isLoading: false });
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
  SendMessage = async () => {
    this.RBSheet.close();
    const Uid = await AsyncStorage.getItem("projectUid");
    if (this.state.Message == "") {
      Alert.alert("Hata", "Lütfen mesaj yazınız.");
    } else {
      this.setState({
        Message: ""
      });
      axios
        .post(CONSTANT.BaseUrl + "chat/sendUserMessage", {
          sender_id: Uid,
          receiver_id: this.state.fetchProposal[0].user_id,
          message: this.state.Message
        })
        .then(async response => {
          Alert.alert("Başarılı", "Başarılı bir şekilde gönderildi.");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  // SendMilestonerequest = async(
  //   freelancer_title,
  //   freelancer_total_rating,
  //   proposed_amount,
  //   duration,
  //   freelancer_reviews_rate,
  //   content,
  //   proposal_docs,
  //   freelancer_avatar,
  //   proposal_id,
  //   project_id
  //   )=>{
  //   const { params } = this.props.navigation.state;
  //   this.setState({isLoading: true});
  //     axios
  //       .post(CONSTANT.BaseUrl + "milestone/send_milestone_request", { // listing
  //         id : proposal_id,
  //       })
  //       .then(async response => {
  //         if (response.status == 200) {
  //           console.log(response);
  //           this.setState({isLoading: false});
  //           Alert.alert("Success", response.data[0].message)
  //         } else if (response.status == 203) {
  //           console.log(response);
  //           this.setState({isLoading: false});
  //           Alert.alert("Error", response.data[0].message)
  //         }
  //         this.props.navigation.navigate("ManageMilestones" ,
  //         {
  //           id : params.my_id,
  //           title: params.title,
  //           employer_name: params.employer_name,
  //           project_type: params.project_type,
  //           project_level: params.project_level,
  //           location_name: params.location_name,
  //           freelancer_title: freelancer_title,
  //           freelancer_total_rating: freelancer_total_rating,
  //           proposed_amount: proposed_amount,
  //           duration: duration,
  //           freelancer_reviews_rate: freelancer_reviews_rate,
  //           content: content,
  //           proposal_docs: proposal_docs,
  //           freelancer_avatar: freelancer_avatar,
  //           proposal_id: proposal_id,
  //           project_id: project_id
  //         })
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  // }

  hireNow = async (Pid, Jid)=>{
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
    pay_now_array["order_type"] = "hiring";
    pay_now_array["proposal_id"] = Pid;
    pay_now_array["job_id"] = Jid;
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
         
          this.setState({ isLoading: false });
          this.props.navigation.navigate("BuyServiceWebview", { 
            url: response.data.url,
            headerName: 'Değerlendirme'
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

  _listEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center',}}>
        <Image style={{ resizeMode: 'contain', height: 150, width: 150 }}
          source={require('../Images/nodata.png')}
        />
      </View>
    )
  }
  render() {
    const { isLoading } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <SimpleHeader HeaderText={CONSTANT.Viewproposals} />
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={this.state.fetchProposal}
            ListEmptyComponent={ this._listEmptyComponent }
            listKey={(a, b) => b.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  borderColor: "#ddd",
                  borderWidth: 0.6,
                  borderRadius: 4,
                  elevation: 3,
                  shadowOffset: { width: 0, height: 2 },
                  shadowColor: "#000000",
                  shadowOpacity: 0.2,
                  margin: 10
                }}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    padding: 10,
                    alignItems: "flex-start"
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      resizeMode={"contain"}
                      style={{ height: 60, width: 60, marginRight: 10 }}
                      source={{ uri: item.freelancer_avatar }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ fontSize: 18, fontWeight: "700" }}>
                        {item.freelancer_title}
                      </Text>
                      <Text style={{ fontSize: 15 }}>
                        {"("}
                        {item.freelancer_reviews_rate} / 5{")"}{" "}
                        {item.freelancer_total_rating} {CONSTANT.ViewProposalsFeedbackFound}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    
                    {item.duration != '' &&
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: "center",
                          color: "green",
                          marginVertical: 10,
                          marginLeft: 5
                        }}
                      >
                        ({item.duration})
                      </Text>
                    }
                  </View>
                  
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    {item.milestone != 'off' ?
                      <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("ManageMilestones", {
                          id : params.my_id,
                          title: params.title,
                          employer_name: params.employer_name,
                          project_type: params.project_type,
                          project_level: params.project_level,
                          location_name: params.location_name,
                          freelancer_title: item.freelancer_title,
                          freelancer_total_rating: item.freelancer_total_rating,
                          proposed_amount: item.proposed_amount,
                          duration: item.duration,
                          freelancer_reviews_rate: item.freelancer_reviews_rate,
                          content: item.content,
                          proposal_docs: item.proposal_docs,
                          freelancer_avatar: item.freelancer_avatar,
                          proposal_id: item.proposal_id,
                          project_id: item.project_id
                        })}
                        // onPress={()=> this.SendMilestonerequest(
                        //   item.freelancer_title,
                        //   item.freelancer_total_rating,
                        //   item.proposed_amount,
                        //   item.duration,
                        //   item.freelancer_reviews_rate,
                        //   item.content,
                        //   item.proposal_docs,
                        //   item.freelancer_avatar,
                        //   item.proposal_id,
                        //   item.project_id
                        // )}
                        style={{
                          alignItems: "center",
                          height: 40,
                          margin: 10,
                          borderRadius: 4,
                          width: "60%",
                          alignSelf: "center",
                          backgroundColor: CONSTANT.primaryColor
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            alignItems: "center",
                            textAlign: "center",
                            color: "#fff",
                            paddingTop: 10,
                            fontWeight:'700'
                          }}
                        >
                          {CONSTANT.ViewProposalsHireSetMilestones}
                        </Text>
                      </TouchableOpacity>
                      :
                      <>
                        {/* {item.job_hiring_status != 'hired' ? */}
                          <TouchableOpacity
                            //onPress={()=> Alert.alert(CONSTANT.ViewProposalsHireFreelancer, CONSTANT.ViewProposalsSureHireFreelancer)}
                            onPress={() => this.hireNow(JSON.stringify(item.proposal_id), JSON.stringify(item.project_id))}
                            style={{
                              alignItems: "center",
                              height: 40,
                              marginTop:10,
                              marginLeft:"20%",
                              borderRadius: 4,
                              width: "60%",
                              alignSelf: "center",
                              backgroundColor: CONSTANT.primaryColor
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                alignItems: "center",
                                textAlign: "center",
                                color: "#fff",
                                paddingTop: 10,
                                fontWeight:'700'
                              }}
                            >
                              {"Değerlendirmeye Al"}
                            </Text>
                          </TouchableOpacity>
                          {/* :
                          <TouchableOpacity
                            onPress={()=> Alert.alert('hello', 'im hired')}
                            style={{
                              alignItems: "center",
                              height: 40,
                              margin: 10,
                              borderRadius: 4,
                              width: "60%",
                              alignSelf: "center",
                              backgroundColor: CONSTANT.primaryColor
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                alignItems: "center",
                                textAlign: "center",
                                color: "#fff",
                                paddingTop: 10,
                                fontWeight:'700'
                              }}
                            >
                              {CONSTANT.ViewProposalsViewHistory}
                            </Text>
                          </TouchableOpacity>
                        } */}
                      </>
                    }
                  </View>
                  <View
                    style={{
                      height: 40,
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: "#323232",
                          alignSelf: "center",
                          fontSize: 12
                        }}
                      >
                        {item.proposal_docs == 0
                          ? item.proposal_docs + " File"
                          : item.proposal_docs + " Files"}{" "}
                       {CONSTANT.ViewProposalsAttached}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

        <RBSheet
          ref={ref => {
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
              overflow: "hidden"
            }
          }}
        >
          <View
            style={{
              height: 45,
              width: "100%",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: CONSTANT.primaryColor,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
                textAlign: "center"
              }}
            >
              {CONSTANT.ViewProposalsSendMessage}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: "#fff",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                multiline={true}
                style={{
                  borderColor: "#807f7f",
                  borderWidth: 0.3,
                  borderRadius: 3,
                  fontSize: 15,
                  padding: 5,
                  height: 150,
                  margin: 10,
                  padding: 10
                }}
                name="username"
                onChangeText={ Message => this.setState({ Message }) }
                placeholder={CONSTANT.ViewProposalsTypeMessage}
                placeholderTextColor="#807f7f"
              />
            </View>
            <TouchableOpacity
              onPress={() => this.SendMessage()}
              style={{
                alignItems: "center",
                height: 40,
                margin: 10,
                borderRadius: 4,
                width: "30%",
                alignSelf: "center",
                backgroundColor: CONSTANT.primaryColor
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  paddingTop: 10
                }}
              >
                {CONSTANT.ViewProposalsSendNow}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}
export default ViewProposals;

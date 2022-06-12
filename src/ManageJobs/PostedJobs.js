import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Image
} from "react-native";

import CustomHeader from "../Header/CustomHeader";
import PostedJobsCard from "./PostedJobsCard";
import { NavigationEvents } from 'react-navigation';
import * as CONSTANT from '../Constants/Constant';
import styles from "../Constants/Styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontA from "react-native-vector-icons/FontAwesome5";
import SimpleHeader from '../Header/SimpleHeader';
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class PostedJobs extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
    data: [],
    isLoading: true,
    Toataldata: "",
    page: 1,
    fetching_from_server: false,
    //listRefresh: false
    };
    this.offset = 1;
  }
  componentDidMount() {
    this.fetchCompleteJobData();
  }
  fetchCompleteJobData = async() => {
    const Pid = await AsyncStorage.getItem("projectUid");
    //alert(Pid)
    const response = await fetch(
      CONSTANT.BaseUrl + "dashboard/manage_employer_jobs?user_id=" +
      Pid+ "&page_number=" +
      this.offset
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ data: [], isLoading: false });
    } else {
      this.setState({ data: json, isLoading: false });
      // this.offset = this.offset + 1;
      // this.setState({
      //   data: [...this.state.data, ...this.state.data.concat(json)],
      //   isLoading: false
      // });
    }
  };
  // loadMoreData = async() => {
  //   const Pid = await AsyncStorage.getItem("projectProfileId");
  //   //On click of Load More button We will call the web API again
    
  //   this.setState({ fetching_from_server: true }, () => {
  //     fetch(
  //       CONSTANT.BaseUrl + "dashboard/manage_employer_jobs?user_id=" +
  //       Pid+ "&page_number=" +
  //       this.offset
  //     )
  //       //Sending the currect offset with get request
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         //Successful response from the API Call
  //         //After the response increasing the offset for the next API call.
  //         if (
  //           Array.isArray(responseJson) &&
  //           responseJson[0] &&
  //           responseJson[0].type &&
  //           responseJson[0].type === "error"
  //         ) {
  //           this.setState({ data: [], isLoading: false }); // empty data set
  //         } else {
  //           this.offset = this.offset + 1;
  //           this.setState({
  //             data: this.state.data.concat(responseJson),
  //             isLoading: false,
  //             fetching_from_server: false
  //           });
  //           // this.setState({Toataldata: responseJson[0].totals , isLoading: false});
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   });
  // };
  renderFooter() {
    return (
      //Footer View with Load More button
      <View>
        {/* {this.state.Toataldata.toString() != this.state.data.length ? (
          <View style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: CONSTANT.primaryColor,
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text style={{
                color: "white",
                fontSize: 15,
                textAlign: "center",
                fontFamily:CONSTANT.PoppinsMedium,
              }}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null} */}
      </View>
    );
  }


  _deletePostAlert(ID) {
    Alert.alert(
      "İşi sil",
      "İşi silmek üzeresiniz ?",
      [
        {
          text: "İptal",
          onPress: () => console.log("iptale basıldı"),
          style: "cancel",
        },
        { text: "Tamam", onPress: () => this._deletePost(ID) },
      ],
      { cancelable: false }
    );
  }
  _deletePost = async (ID) => {
    this.setState({ isLoading: true})
    const Uid = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'listing/delete_listing', {
        current_user_id: Uid,
        project_id: JSON.stringify(ID)
      })
      .then(async response => {
        console.log(response);
        if (response.status === 200) {
          // this.setState({ isLoading: false });
          //this.setState({ listRefresh: true });
          Alert.alert(CONSTANT.Success, response.data[0].message);
          console.log("Başarılı", response.data[0].message)
          this.fetchCompleteJobData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Error, response.data[0].message);
          console.log("Hata", response.data[0].message)
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        alert(error);
        console.log(error);
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <SimpleHeader HeaderText={CONSTANT.PostedJob} />
        {isLoading && (
          <View style={{ justifyContent: "center", height: "100%" }}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={{
                height: 30,
                width: 30,
                borderRadius: 60,
                alignContent: "center",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                elevation: 5
              }}
            />
          </View>
        )}
        {
          this.state.data != "" &&
          <View>
            {/* <Text style={{fontSize:18 , margin:10 , fontWeight:'700'}}>{this.state.data[0].count_totals} PostedJobs found:</Text> */}
          </View>
        }
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          //extraData={this.state.listRefresh}
          style={{marginTop: 10}}
          keyExtractor={(a, b) => b.toString()}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   activeOpacity={0.9}
            //   // onPress={() =>
            //   //   this.props.navigation.navigate("DetailJobScreen", {
            //   //     job_id: item.ID
            //   //   })
            //   // }
            // >
            //   <PostedJobsCard
            //     Completejobname={`${entities.decode(item.employer_name)}`}
            //     featuredCompleteJobColor={`${entities.decode(
            //       item.color
            //     )}`}
            //     type={`${entities.decode(item.project_type)}`}
            //     count={item.proposals_count}
            //     freelancerImages={item.freelancer_imges}
            //     imageUriCompleteJobfeatured={{ uri: "https:" + `${item.tag}` }}
            //     Completejobtitle={`${entities.decode(item.title)}`}
            //     jobflagimageUri={{ uri: `${item.location_flag}` }}
            //     Completejoblevel={`${entities.decode(
            //       item.project_level
            //     )}`}
            //     Completejobcountry={`${entities.decode(
            //       item.location_name
            //     )}`}
            //     Completejobrate={(item.project_cost)}
            //     Completejobhourlyhours={(item.hourly_rate)}
            //     Completejobestimatedhours={(item.estimated_hours)}
            //     fav_job_user_id={item.ID.toString()}
            //     Fav_Color={`${entities.decode(item.favorit)}`}
            //     Completejobduration={`${entities.decode(
            //       item.project_duration
            //     )}`}
            //     deleteJobStatus={item.delete_job_status}
            //   />
            // </TouchableOpacity>
            <View>
              <View style={[styles.section, styles.Elevation]}>
                <View style={[styles.CompleteJobLayoutmainStyle(item.color), {overflow: 'hidden', marginRight: 0}]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ViewProposals", {
                        my_id: item.ID.toString(),
                        title: `${entities.decode(item.title)}`,
                        employer_name: item.employer_name,
                        project_type: item.project_type,
                        project_level: `${entities.decode(item.project_level)}`,
                        location_name: item.location_name,
                      })
                    }
                    style={{flexDirection: 'row'}}
                  >
                    <View style={{width: '70%'}}>
                      <View
                        style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 25,
                          borderTopWidth: 25,
                          borderTopLeftRadius: 4,
                          borderRightColor: "transparent",
                          borderTopColor: item.color != "" ? item.color : "#fff"
                        }}
                      />
                      <Image
                        style={styles.CompleteJobLayoutFeaturedImgStyle}
                        source={{ uri: "https:" + `${item.tag}` }}
                      />
                      <View style={[styles.CompleteJobLayoutshadow, {width: '70%'}]}>
                        <View>
                          <Text numberOfLines={1} style={styles.NameTextStyle}>
                            {item.employer_name}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.SectionHeadingTextStyle}>
                            {`${entities.decode(item.title)}`}
                          </Text>
                        </View>
                        <View style={styles.CompleteJobLayoutInfoArea}>
                        <MaterialIcons name="work" color={'#4F4F4F'} size={14} />
                          <Text
                            style={[styles.ParagraphTextStyle, { paddingLeft: 10 }]}
                          >
                            {`${entities.decode(item.project_level)}`}
                          </Text>
                        </View>
                        <View style={styles.CompleteJobLayoutInfoArea}>
                        <FontA name="location-arrow" color={'#4F4F4F'} size={14} />
                          <Text
                            style={[styles.ParagraphTextStyle, { paddingLeft: 10 }]}
                          >
                            {item.location_name}
                          </Text>
                        </View>
                       
                      </View>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        paddingHorizontal: 10,
                        borderLeftColor: "#ddd",
                        borderLeftWidth: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {item.freelancer_imges.length >= 1 ? (
                        // <FlatList
                        //   horizontal
                        //   data={item.freelancer_imges}
                        //   keyExtractor={(a, b) => b.toString()}
                        //   renderItem={({ item }) => (
                            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                              <View style={{justifyContent:'center', alignItems:'center', marginBottom: 5}}>
                                <Text style={[styles.SectionHeadingTextStyles, {color: CONSTANT.TextColorGreen, fontSize: 18}]}>
                                  {item.proposals_count}
                                </Text>
                                <Text
                                  style={styles.NameTextStyle}
                                >
                                  {item.proposals_count == "1"
                                    ? CONSTANT.PostedJobsCardProposal
                                    : CONSTANT.PostedJobsCardProposals}
                                </Text>
                              </View>
                              <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Image
                                  style={{
                                    height: 22,
                                    width: 22,
                                    borderRadius: 11,
                                    backgroundColor: "transparent",
                                    borderColor: "#000",
                                    borderWidth: 0.6,
                                  }}
                                  source={{ uri: item.freelancer_imges[0].url }}
                                />
                                {item.freelancer_imges.length >= 2 &&
                                  <Image
                                    style={{
                                      height: 22,
                                      width: 22,
                                      borderRadius: 11,
                                      backgroundColor: "transparent",
                                      borderColor: "#000",
                                      borderWidth: 0.6,
                                      marginLeft: -5
                                    }}
                                    source={{ uri: item.freelancer_imges[1].url }}
                                  />
                                }
                                {item.freelancer_imges.length >= 3 &&
                                  <Image
                                    style={{
                                      height: 22,
                                      width: 22,
                                      borderRadius: 11,
                                      backgroundColor: "transparent",
                                      borderColor: "#000",
                                      borderWidth: 0.6,
                                      marginLeft: -5
                                    }}
                                    source={{ uri: item.freelancer_imges[0].url }}
                                  />
                                }
                                {item.freelancer_imges.length >= 4 &&
                                  <Text style={{fontSize: 16, marginLeft: 3}}>+</Text>
                                }
                              </View>
                            </View>
                        //   )}
                        // />
                      ): 
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                          <Text style={[styles.SectionHeadingTextStyles, {color: CONSTANT.TextColorGreen, fontSize: 18}]}>
                            {item.proposals_count}
                          </Text>
                          <Text style={styles.NameTextStyle}>
                            {CONSTANT.PostedJobsCardProposal}
                          </Text>
                        </View>
                      }
                    </View>
                  </TouchableOpacity>
                  {item.delete_job_status == 'yes' &&
                    <TouchableOpacity 
                      onPress={() => this._deletePostAlert(item.ID)}
                      activeOpacity={0.7}
                      style={{backgroundColor: CONSTANT.TextColorRed, height: 40, justifyContent: 'center',}}>
                      <Text style={[styles.ButtonText, {fontSize: 14}]}>Delete Post</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
}
export default PostedJobs;

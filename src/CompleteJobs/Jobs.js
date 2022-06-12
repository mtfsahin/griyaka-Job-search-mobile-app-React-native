import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Alert,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Search, Searchwhite, Stick, Filter, Notification } from '../components/icons'
import CustomHeader from "../Header/CustomHeader";
import CompleteJobLayout from "../Home/CompleteJobLayout";
import NotificationCounter from "../CompleteJobs/NotificationCounter";
import { NavigationEvents } from 'react-navigation';
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AntIcon from 'react-native-vector-icons/AntDesign';


const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class Jobs extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      data: [],
      isLoading: true,
      Toataldata: "",
      page: 1,
      fetching_from_server: false,
      spinnerJobs: true,
    };
    this.offset = 1;
  }
  componentDidMount() {
    this.CheckApplicationAccess();
  }
  /*
    handleRefresh=()=>{
      this.setState({
       page:1,
       fetching_from_server:true,
       seed:this.state.seed+1
      },
      ()=>{
        this.loadMoreData();
      }
      )
    }
  */
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_access");
    const json = await response.json();
    this.setState({ ApplicationAccessServcie: json.access_type.service_access });
    this.setState({ ApplicationAccessJob: json.access_type.job_access });
    this.fetchCompleteJobData();
  }
  fetchCompleteJobData = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_jobs?listing_type=search&profile_id=" +
      Pid + "&page_number=" +
      this.offset
    );

    // const json = await response.json();
    // this.setState({ fetchJobs: json, isLoading: false });
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({
        data: [], spinnerJobs: false, fetching_from_server: false,
      }); // empty data set 
    } else {
      this.offset = this.offset + 1;
      this.setState({
        data: [...this.state.data, ...this.state.data.concat(json)],
        spinnerJobs: false,
        fetching_from_server: false,
      });
      this.setState({
        Toataldata: json[0].count_totals, spinnerJobs: false, fetching_from_server: false,
      });
    }
  };


  loadMoreData = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl + "listing/get_jobs?listing_type=search&profile_id=" +
        Pid + "&page_number=" +
        this.offset
      )
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          //Successful response from the API Call
          //After the response increasing the offset for the next API call.
          if (
            Array.isArray(responseJson) &&
            responseJson[0] &&
            responseJson[0].type &&
            responseJson[0].type === "error"
          ) {
            this.setState({ data: [], spinnerJobs: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              data: this.state.data.concat(responseJson),
              spinnerJobs: false,
              fetching_from_server: false
            });
            //                   this.setState({Toataldata: responseJson[0].totals , spinnerJobs: false});
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  renderFooter() {
    return (
      //Footer View with Load More button
      <View>
        {this.state.Toataldata.toString() != this.state.data.length ? (
          <TouchableOpacity onPress={this.loadMoreData} style={styles.MainButtonArea}>
            <Text style={styles.ButtonText}>{CONSTANT.LoadMore}</Text>
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  render() {
    const { isLoading, ApplicationAccessJob, spinnerJobs } = this.state;

    return (

      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#f7f7f7"} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft: 12, paddingBottom: -10 }}>
          <View style={{ flexDirection: 'row', marginTop: -10 }}>
            <Text style={{ color: "#909090", fontFamily: "Poppins-Medium", fontSize: 25, marginTop: 13 }}>gri</Text>
            <Text style={{ color: "#696969", fontFamily: "Poppins-Medium", fontSize: 40 }}>Y</Text>
            <Text style={{ color: "#909090", fontFamily: "Poppins-Medium", fontSize: 25, marginTop: 13, marginLeft: -3 }}>aka.com</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "center", flexDirection: "row",alignItems:"center"}} onPress={() => this.props.navigation.navigate("Notification")}>
            <View style={{ marginRight:-20 }} ><NotificationCounter /></View>

            <View style={{ marginRight: 20, marginTop: 5 }} >
              <Notification />
            </View>
          </TouchableOpacity>
        </View>
        {/* {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
          <ActivityIndicator
            size="small"
            color={CONSTANT.primaryColor}
            style={styles.ActivityIndicatorStyle}
          />
        </View>
        )} */}

        {spinnerJobs ?

          <View style={{ flex: 1 }}>

            <View style={[styles.section1, { flexDirection: 'row' }]}>
              <SkeletonPlaceholder>
                <View style={{ marginTop: 10, marginBottom: 10, width: 120, height: 20, borderRadius: 5 }} />
              </SkeletonPlaceholder>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}

              style={{
                marginTop: 5, shadowOffset: { width: 0, height: 1 },
                shadowColor: "#000",

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, marginLeft: 13, marginBottom: 15, marginRight: 13, backgroundColor: CONSTANT.primaryColor, height: 52, borderRadius: 12, padding: 15, flexDirection: 'row', justifyContent: 'space-between'
              }}
              onPress={() => this.props.navigation.navigate('SearchScreen')} >
              <View style={{
                flexDirection: 'row',
              }} >
                <Searchwhite style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', fontFamily: 'Poppins-Medium' }} >Pozisyon,firma adı,sektör</Text>
              </View>
              <View style={{ flexDirection: 'row' }} >
                <Stick />
                <Filter />

              </View>


            </TouchableOpacity>


            <View style={styles.section}>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
              }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "column", }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8, marginTop: 10 }} />
                      <View style={{ flexDirection: "column", }} >
                        <View style={{ marginTop: -4, width: 140, height: 10, borderRadius: 4 }} />
                        <View style={{ width: 70, height: 10, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginBottom: 10 }} />
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginLeft: 5, marginBottom: 10 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
              }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "column", }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8, marginTop: 10 }} />
                      <View style={{ flexDirection: "column", }} >
                        <View style={{ marginTop: -4, width: 140, height: 10, borderRadius: 4 }} />
                        <View style={{ width: 70, height: 10, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginBottom: 10 }} />
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginLeft: 5, marginBottom: 10 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
              }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "column", }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8, marginTop: 10 }} />
                      <View style={{ flexDirection: "column", }} >
                        <View style={{ marginTop: -4, width: 140, height: 10, borderRadius: 4 }} />
                        <View style={{ width: 70, height: 10, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginBottom: 10 }} />
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginLeft: 5, marginBottom: 10 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
              }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "column", }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8, marginTop: 10 }} />
                      <View style={{ flexDirection: "column", }} >
                        <View style={{ marginTop: -4, width: 140, height: 10, borderRadius: 4 }} />
                        <View style={{ width: 70, height: 10, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginBottom: 10 }} />
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginLeft: 5, marginBottom: 10 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
              }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "column", }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 40, height: 40, borderRadius: 4, marginRight: 8, marginTop: 10 }} />
                      <View style={{ flexDirection: "column", }} >
                        <View style={{ marginTop: -4, width: 140, height: 10, borderRadius: 4 }} />
                        <View style={{ width: 70, height: 10, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', }} >
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginBottom: 10 }} />
                      <View style={{ width: 90, height: 20, borderRadius: 20, marginTop: 20, marginLeft: 5, marginBottom: 10 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
            </View>
          </View>
          :
          <>
            {ApplicationAccessJob != '' ?
              <View style={{ flex: 1 }}>
                {
                  this.state.data != "" &&
                  <View style={[styles.section1, { flexDirection: 'row' }]}>
                    <View style={{ marginTop: 10, marginBottom: 10, width: 120, height: 20, borderRadius: 5 }} >
                      <Text style={styles.MainHeadingTextStyle}>
                        {this.state.data[0].count_totals}{' İŞ BULUNDU'}
                      </Text>
                    </View>
                  </View>
                }
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    marginTop: 5, shadowOffset: { width: 0, height: 1 },
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, marginLeft: 13, marginBottom: 15, marginRight: 13, backgroundColor: CONSTANT.primaryColor, height: 52, borderRadius: 12, padding: 15, flexDirection: 'row', justifyContent: 'space-between'
                  }}
                  onPress={() => this.props.navigation.navigate('SearchScreen')} >
                  <View style={{
                    flexDirection: 'row',
                  }} >
                    <Searchwhite style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'white', fontFamily: 'Poppins-Medium' }} >Pozisyon,firma adı,sektör</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }} >
                    <Stick />
                    <Filter />
                  </View>
                </TouchableOpacity>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.data}
                  keyExtractor={(a, b) => b.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.9}

                      onPress={() =>
                        this.props.navigation.navigate("DetailJobScreen", {
                          job_id: item.job_id
                        })
                      }
                    >
                      <CompleteJobLayout
                        imageUriCompleteJobfeatured={{ uri: `${item.featured_url}` }}
                        imageEmployerAvatar={{ uri: `${item.employer_avatar}` }}
                        Completejobname={`${entities.decode(item.employer_name)}`}
                        featuredCompleteJobColor={`${entities.decode(
                          item.featured_color
                        )}`}
                        ComplateJobType={`${entities.decode(item.job_type)}`}
                        Completejobtitle={`${entities.decode(item.project_title)}`}
                        Completejoblevel={`${entities.decode(
                          item.project_level.level_title
                        )}`}
                        Completejobcountry={`${entities.decode(
                          item.location._country
                        )}`}
                        //saatlik ücret
                        //Completejobrate={(item.project_cost)}
                        // Completejobhourlyhours={(item.hourly_rate)}
                        // Completejobestimatedhours={(item.estimated_hours)}
                        project_type={`${entities.decode(item.project_type)}`}
                        fav_job_user_id={item.job_id}
                        Fav_Color={`${entities.decode(item.favorit)}`}
                        Completejobduration={`${entities.decode(
                          item.project_duration
                        )}`}
                      />
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={this.renderFooter.bind(this)}

                />
              </View>
              :
              <View style={styles.NoDataMainArea}>
                <Image style={styles.NoDataImageStyle}
                  source={require('../Images/noAccess.png')}
                />
                <Text></Text>
              </View>
            }
          </>
        }
      </SafeAreaView>

    );
  }
}
export default Jobs;

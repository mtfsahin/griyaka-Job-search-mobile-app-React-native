import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";
import FreelancerCategory from "../Home/FreelancerCategory";
import FreelancerHeader from "../Header/FreelancerHeader";
import { NavigationEvents } from 'react-navigation';
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class Freelancers extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      data: [],
      isLoading: true,
      Toataldata: "",
      page: 1,
      fetching_from_server: false,
      spinnerFreelancer: true,
    };
    this.offset = 1;
  }
  componentDidMount() {
    this.fetchFreelancerData();
  }
  fetchFreelancerData = async () => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_freelancers?listing_type=search&profile_id=" + Pid + "&page_number=" +
      this.offset
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ data: [], spinnerFreelancer: false }); // empty data set 
    } else {
      this.offset = this.offset + 1;
      this.setState({
        data: [...this.state.data, ...this.state.data.concat(json)],
        spinnerFreelancer: false
      });
      this.setState({ Toataldata: json[0].count_totals, spinnerFreelancer: false });
    }
  };
  loadMoreData = async () => {

    const Pid = await AsyncStorage.getItem("projectProfileId");
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl + "listing/get_freelancers?listing_type=search&profile_id=" + Pid + "&page_number=" +
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
            this.setState({ data: [], spinnerFreelancer: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              data: this.state.data.concat(responseJson),
              spinnerFreelancer: false,
              fetching_from_server: false
            });
            //                   this.setState({Toataldata: responseJson[0].totals , spinnerFreelancer: false});
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
          <TouchableOpacity
            onPress={this.loadMoreData}
            style={styles.MainButtonArea}
          >
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
    const { isLoading, spinnerFreelancer } = this.state;
    return (
      <View style={styles.container}>

        <FreelancerHeader />

        <TouchableOpacity style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop: 5,
          marginLeft: 13, marginBottom: 15, marginRight: 13, backgroundColor: "white", height: 52, borderRadius: 5, padding: 15, flexDirection: 'row', justifyContent: 'space-between'
        }}
          onPress={() => this.props.navigation.navigate('SearchScreenFreelancer')} >
          <View style={{
            flexDirection: 'row',
          }} >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#5E5E5E', fontFamily: 'Poppins-Medium' }} >Aday ara</Text>
          </View>
          <View style={{ flexDirection: 'row' }} >
          </View>
        </TouchableOpacity>

        {spinnerFreelancer ?
          <View style={{ marginTop: 20, }}>
            <SkeletonPlaceholder>
              <View style={styles.section}>
                <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
              </View>
            </SkeletonPlaceholder>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 10, width: 90, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 15, width: 170, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 60, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 70, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 10, width: 110, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 70, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 70, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 90, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 70, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: "#ffffff",
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#ddd",
            }}>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 60,
                    marginBottom: 15,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 20,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    borderColor: "transparent",
                    height: 60
                  }} />
                  <View>
                    <View style={{ height: 10, width: 110, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 15, width: 150, borderRadius: 5, marginBottom: 10 }} />
                    <View style={{ height: 10, width: 70, borderRadius: 5 }} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
          </View>
          :
          <>
            {
              this.state.data != "" &&
              <View style={[styles.section, { flexDirection: 'row' }]}>
                <Text style={styles.MainHeadingTextStyle}>
                  {this.state.data[0].count_totals}{' '}
                </Text>
                {this.state.data[0].count_totals == 1 ?
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.FreelancerFound}
                  </Text>
                  :
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.FreelancersFound}
                  </Text>
                }
              </View>
            }
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    this.props.navigation.navigate("DetailFreelancerScreen", {
                      profile_id: item.profile_id,
                      user_id: item.user_id
                    })
                  }>
                  <FreelancerCategory
                    imageUrifreelancer={{ uri: `${item.profile_img}` }}
                    imageUrifeatured={{ uri: `${item.badge.badget_url}` }}
                    featuredColor={`${entities.decode(item.badge.badget_color)}`}
                    flagimageUri={{ uri: `${item.location.flag}` }}
                    freelancername={`${entities.decode(item.name)}`}
                    title={`${entities.decode(item._tag_line)}`}
                    country={`${entities.decode(item.location._country)}`}
                    Fav_Color={`${entities.decode(item.favorit)}`}
                    isFeatured={item._featured_timestamp}
                  />
                </TouchableOpacity>
              )}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          </>
        }
      </View>
    );
  }
}
export default Freelancers;

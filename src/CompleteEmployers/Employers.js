import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import EmployerLayout from "../Home/EmployerLayout";
import EmployerHeader from "../Header/EmployerHeader";
import { NavigationEvents } from 'react-navigation';
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class Employers extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
    data: [],
    isLoading: true,
    Toataldata: "",
    page: 1,
    fetching_from_server: false,
    spinnerEmployer: true,
  };
  this.offset = 1;
}
  componentDidMount() {
    this.fetchEmployerData();
  }
  fetchEmployerData = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_employers?listing_type=search&page_number=" +
      this.offset
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ data: [], spinnerEmployer: false });
    } else {
      this.offset = this.offset + 1;
      this.setState({
        data: [...this.state.data, ...this.state.data.concat(json)],
        spinnerEmployer: false
      });
      this.setState({ Toataldata: json[0].count_totals, spinnerEmployer: false });
    }
  };
  loadMoreData = async() => {
    const Pid = await AsyncStorage.getItem("projectProfileId");
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl + "listing/get_employers?listing_type=search&page_number=" +
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
            this.setState({ data: [], spinnerEmployer: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              data: this.state.data.concat(responseJson),
              spinnerEmployer: false,
              fetching_from_server: false
            });
            //this.setState({Toataldata: responseJson[0].totals , spinnerEmployer: false});
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
    const { spinnerEmployer } = this.state;
    return (
      <View style={styles.container}>
        <EmployerHeader />
        <TouchableOpacity style={{
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
          marginLeft: 13, marginBottom: 15, marginRight: 13, backgroundColor: "white", height: 52, borderRadius: 5, padding: 15, flexDirection: 'row', justifyContent: 'space-between'
        }}
          onPress={() => this.props.navigation.navigate('SearchScreenEmployer')} >
          <View style={{
            flexDirection: 'row',
          }} >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#5E5E5E', fontFamily: 'Poppins-Medium' }} >Şirket ara</Text>
          </View>
          <View style={{ flexDirection: 'row' }} >
          </View>
        </TouchableOpacity>
        {spinnerEmployer ?
          <View style={{marginTop: 20}}>
            <SkeletonPlaceholder>
              <View style={styles.section}>
                <View style={{height: 15, width: 150, borderRadius: 5, marginBottom: 10}}/>
              </View>
            </SkeletonPlaceholder>
            <View style={styles.section}>
              <View
                style={{
                  height: 170,
                  width: '100%',
                  backgroundColor: '#fff', 
                  borderRadius: 4, 
                  elevation: 5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowColor: "#000",
                  marginVertical: 10
                }}
              >
                <SkeletonPlaceholder>
                  <View style={{height: 80, width: '100%'}}/>
                </SkeletonPlaceholder>
                <View style={{flexDirection: 'row'}}>
                  <View style={{alignItems:'center', marginLeft: 15,}}>
                    <View style={{
                      height: 74,
                      width: 74, 
                      borderRadius: 5, 
                      borderColor: '#fff', 
                      borderWidth: 2, 
                      marginTop: -74/2,
                      backgroundColor: '#fff',
                      marginBottom: 12
                    }}>
                      <SkeletonPlaceholder>
                        <View style={styles.EmployerLayoutImgStyle}/>
                      </SkeletonPlaceholder>
                    </View>
                    <SkeletonPlaceholder>
                      <View style={{height: 25, width: 25, borderRadius: 25/2}}/>
                    </SkeletonPlaceholder>
                  </View>
                  <SkeletonPlaceholder>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                      <View style={{height: 10, width: 90, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 15, width: 150, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 10, width: 120, borderRadius: 5}}/>
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View
                style={{
                  height: 170,
                  width: '100%',
                  backgroundColor: '#fff', 
                  borderRadius: 4, 
                  elevation: 5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowColor: "#000",
                  marginBottom: 10
                }}
              >
                <SkeletonPlaceholder>
                  <View style={{height: 80, width: '100%'}}/>
                </SkeletonPlaceholder>
                <View style={{flexDirection: 'row'}}>
                  <View style={{alignItems:'center', marginLeft: 15,}}>
                    <View style={{
                      height: 74,
                      width: 74, 
                      borderRadius: 5, 
                      borderColor: '#fff', 
                      borderWidth: 2, 
                      marginTop: -74/2,
                      backgroundColor: '#fff',
                      marginBottom: 12
                    }}>
                      <SkeletonPlaceholder>
                        <View style={styles.EmployerLayoutImgStyle}/>
                      </SkeletonPlaceholder>
                    </View>
                    <SkeletonPlaceholder>
                      <View style={{height: 25, width: 25, borderRadius: 25/2}}/>
                    </SkeletonPlaceholder>
                  </View>
                  <SkeletonPlaceholder>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                      <View style={{height: 10, width: 60, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 15, width: 200, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 10, width: 140, borderRadius: 5}}/>
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View
                style={{
                  height: 170,
                  width: '100%',
                  backgroundColor: '#fff', 
                  borderRadius: 4, 
                  elevation: 5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowColor: "#000",
                  marginBottom: 10
                }}
              >
                <SkeletonPlaceholder>
                  <View style={{height: 80, width: '100%'}}/>
                </SkeletonPlaceholder>
                <View style={{flexDirection: 'row'}}>
                  <View style={{alignItems:'center', marginLeft: 15,}}>
                    <View style={{
                      height: 74,
                      width: 74, 
                      borderRadius: 5, 
                      borderColor: '#fff', 
                      borderWidth: 2, 
                      marginTop: -74/2,
                      backgroundColor: '#fff',
                      marginBottom: 12
                    }}>
                      <SkeletonPlaceholder>
                        <View style={styles.EmployerLayoutImgStyle}/>
                      </SkeletonPlaceholder>
                    </View>
                    <SkeletonPlaceholder>
                      <View style={{height: 25, width: 25, borderRadius: 25/2}}/>
                    </SkeletonPlaceholder>
                  </View>
                  <SkeletonPlaceholder>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                      <View style={{height: 10, width: 70, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 15, width: 110, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 10, width: 150, borderRadius: 5}}/>
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <View
                style={{
                  height: 170,
                  width: '100%',
                  backgroundColor: '#fff', 
                  borderRadius: 4, 
                  elevation: 5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowColor: "#000",
                  marginVertical: 10
                }}
              >
                <SkeletonPlaceholder>
                  <View style={{height: 80, width: '100%'}}/>
                </SkeletonPlaceholder>
                <View style={{flexDirection: 'row'}}>
                  <View style={{alignItems:'center', marginLeft: 15,}}>
                    <View style={{
                      height: 74,
                      width: 74, 
                      borderRadius: 5, 
                      borderColor: '#fff', 
                      borderWidth: 2, 
                      marginTop: -74/2,
                      backgroundColor: '#fff',
                      marginBottom: 12
                    }}>
                      <SkeletonPlaceholder>
                        <View style={styles.EmployerLayoutImgStyle}/>
                      </SkeletonPlaceholder>
                    </View>
                    <SkeletonPlaceholder>
                      <View style={{height: 25, width: 25, borderRadius: 25/2}}/>
                    </SkeletonPlaceholder>
                  </View>
                  <SkeletonPlaceholder>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                      <View style={{height: 10, width: 90, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 15, width: 150, borderRadius: 5, marginBottom: 10}}/>
                      <View style={{height: 10, width: 120, borderRadius: 5}}/>
                    </View>
                  </SkeletonPlaceholder>
                </View>
              </View>
            </View>
          </View>
          :
          <>
            {
              this.state.data != "" &&
              <View style={[styles.section, {flexDirection:'row'}]}>
                <Text style={styles.MainHeadingTextStyle}>
                  {this.state.data[0].count_totals}{' '}
                </Text>
                { this.state.data[0].count_totals == 1 ?
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.EmployerFound}
                  </Text>
                  :
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.EmployersFound}
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
                    this.props.navigation.navigate("DetailCompanyScreen", {
                      profile_id: item.profile_id,
                      employ_id: item.employ_id
                    })
                  }
                >
                  <EmployerLayout
                    companBannerImage={{ uri: `${item.banner_img}` }}
                    companyProfileImage={{ uri: `${item.profile_img}` }}
                    companyName={`${entities.decode(item.name)}`}
                    companyTitle={`${entities.decode(item._tag_line)}`}
                    Fav_Color={`${entities.decode(item.favorit)}`}
                    fav_user_id={item.user_id}
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
export default Employers;

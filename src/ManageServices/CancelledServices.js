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
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";

import CancelledServicesCard from "./CancelledServicesCard";
import CustomHeader from "../Header/CustomHeader";
import { NavigationEvents } from 'react-navigation';
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from '../Constants/Constant';
import styles from "../Constants/Styles";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class CancelledServices extends Component {
  constructor() {
        super();
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
        data: [],
        isLoading: true,
        Toataldata: "",
        page: 1,
        fetching_from_server: false,
        fetchCancelledServices:[]
    };
    this.offset = 1;
    }
  componentDidMount() {
    this.getUser();
    this.fetchCancelledService();
  }
  getUser = async () => {
    try {
      // const permissionChat = await AsyncStorage.getItem("chatPermission");
      // const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      // const profileImg = await AsyncStorage.getItem("profile_img");
      // const type = await AsyncStorage.getItem("profileType");
      // const id = await AsyncStorage.getItem("projectUid");

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      // if (storedValue !== null) {
      //   this.setState({ storedValue });
      // } else {
      //   // alert('something wrong')
      // }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      // if (profileImg !== null) {
      //   this.setState({ profileImg });
      // } else {
      //   //  alert('something wrong')
      // }
      // if (type !== null) {
      //   this.setState({ type });
      // } else {
      //   //  alert('something wrong')
      // }
      // if (id !== null) {
      //   this.setState({ id });
      // } else {
      //   //  alert('something wrong')
      // }
      // if (permissionChat !== null) {
      //   this.setState({ permissionChat });
      // } else {
      //   //  alert('something wrong')
      // }
    } catch (error) {
      // alert(error)
    }
  };
  fetchCancelledService = async () => {
    const Pid = await AsyncStorage.getItem("projectUid");
    const storedType = await AsyncStorage.getItem("user_type");
    if (storedType == "freelancer") {
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/get_services_by_type?type=cancelled&user_id=" + Pid
      );
      const json = await response.json();
      if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
        this.setState({ fetchCancelledServices: [] }); // empty data set 
      } else {
        this.setState({ fetchCancelledServices: json  , isLoading:false});
        console.log('cancelled_Services', JSON.stringify(this.state.fetchCancelledServices))
      }
    }else{
      const response = await fetch(
        CONSTANT.BaseUrl + "dashboard/get_employer_services?type=cancelled&user_id=" + Pid
      );
      const json = await response.json();
      if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
        this.setState({ fetchCancelledServices: [] }); // empty data set 
      } else {
        this.setState({ fetchCancelledServices: json  , isLoading:false});
        console.log('cancelled_Services', JSON.stringify(this.state.fetchCancelledServices))
      }
    }
  };
 
  renderFooter() {
    return (
      <View>
        {this.state.Toataldata.toString() != this.state.data.length ? (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  render() {
    const { isLoading, storedType } = this.state;
    return (
      <View style={styles.container}>
       <View
          style={{
            height: 60,
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%',
            backgroundColor: CONSTANT.primaryColor,
            flexDirection: 'row',
            shadowOffset: {width: 0, height: 2},
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              flexDirection: 'column',
              width: '20%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <AntIcon name="back" size={25} color={'#fff'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              width: '60%',
              display: 'flex',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  height: 30,
                  marginTop: 9,
                }}>
                {CONSTANT.CancelledServices}
              </Text>
            </View>
          </View>
        </View>
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}
        {
          this.state.data != "" &&
          <View>
            <Text style={{fontSize:18 , margin:10 , fontWeight:'700'}}>{this.state.data[0].count_totals} {CONSTANT.CancelledServicesEmployersFound}</Text>
          </View>
        }
        {
            this.state.fetchCancelledServices.length >= 1 ?
            <FlatList
            style={{height:'100%', flex: 1}}
            contentContainerStyle= {{flexGrow: 1}}
            data={this.state.fetchCancelledServices}
            listKey={(x, i) => i.toString()}
            renderItem={({ item , index }) => (
              <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={()=> this.props.navigation.navigate("CompleteServicesDetail", 
                  {data : this.state.fetchCancelledServices[index]}
                  )}
                >
                <CancelledServicesCard
                    employer_avatar={{ uri: storedType == "freelancer" ? item.employer.employer_avatar : item.freelancer_avatar}}
                    employer_title={`${entities.decode(storedType == "freelancer" ? item.employer.employer_title : item.freelancer_title)}`}
                    employertagline={`${entities.decode(storedType == "freelancer" ? item.employer.employertagline: item.freelancertagline)}`}
                    service_title={`${entities.decode(item.service_title)}`}
                    price={`${entities.decode(item.price)}`}
                    featured_img={{ uri: `${item.featured_img != "" ? item.featured_img : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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'}` }}
                    is_featured={`${entities.decode(item.is_featured)}`}
                    feedback={`${entities.decode(item.feedback)}`}
                />
              </TouchableOpacity>
            )}
          />
          :
          <View style={styles.NoDataMainArea}>
            <Image
              resizeMode={'contain'}
              style={styles.NoDataImageStyle}
              source={require('../Images/nodata.png')}
            />
          </View>
        }
      </View>
    );
  }
}
export default CancelledServices;

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  AsyncStorage,
  Share, Linking
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';

import AntIcon from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import axios from "axios";
import CompleteJobLayout from "../Home/CompleteJobLayout";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SimpleHeader from '../Header/SimpleHeader'
class DetailCompanyScreen extends Component {
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
    iconColor: CONSTANT.primaryColor,
    text: CONSTANT.DetailCompanyScreenSaveCompany,
  };
  componentDidMount() {
    this.fetchCompanyData();
    this.fetchCompleteJobData();
  }
  fetchCompanyData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
      "listing/get_employers?listing_type=single&profile_id=" +
      params.profile_id
    );
    const json = await response.json();
    this.setState({ fetchCompany: json, isLoading: false });
  };
  fetchCompleteJobData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "listing/get_jobs?listing_type=company&company_id=" +
      params.employ_id
    );
    const json = await response.json();
    if (Array.isArray(json) && json[0] && json[0].type && json[0].type === 'error') {
      this.setState({ fetchJobs: [], isLoading: false }); // empty data set 
    } else {
      this.setState({ fetchJobs: json, isLoading: false });
    }
  };
  onClick = () => {
    Share.share({
      message: this.state.fetchCompany[0].company_link,
      url: this.state.fetchCompany[0].company_link,
      title: 'Wow, did you see that?'
    }, {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  };
  UpdateFav = async () => {
    var user_id = this.state.fetchCompany[0].user_id;
    const fav_id = await AsyncStorage.getItem("projectUid");
    axios
      .post(
        CONSTANT.BaseUrl + "user/favorite",
        {
          id: fav_id,
          favorite_id: user_id,
          type: "_following_employers"
        }
      )
      .then(async response => {
        if (response.status == "200") {
          this.setState({
            iconColor: '#00cc8d',
            text: 'Saved',
            isLoading: false
          });
          alert("Favorite Updated Successfully");
        } else if (response.status == "203") {
          alert("Cannot update favorite/ Network Error");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { isLoading, iconColor } = this.state;
    return (
      <View style={styles.container}>
        <SimpleHeader HeaderText={CONSTANT.DetailCompanyScreenDetailEmployers}/>
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
          showsVerticalScrollIndicator={false}>
          {this.state.fetchCompany && (
            <Image
              style={{ height: 200 }}
              source={{ uri: `${this.state.fetchCompany[0].banner_img}` }}
            />
          )}
            <View style={styles.section}>
              <View
                style={[styles.DetailCompanyInfoArea, styles.Elevation,]}
              >
                <View style={styles.DetailCompanyNameArea}>
                  {this.state.fetchCompany && (
                    <Image
                      style={styles.DetailCompanyImageStyle}
                      source={{
                        uri: `${this.state.fetchCompany[0].profile_img}`
                      }}
                    />
                  )}
                  <View style={styles.DetailCompanyScreenviewStyle}>
                    {this.state.fetchCompany && (
                      <Text style={styles.NameTextStyle}>
                        {this.state.fetchCompany[0].name}
                      </Text>
                    )}
                    {this.state.fetchCompany && (
                      <Text style={styles.SectionHeadingTextStyle}>
                        {this.state.fetchCompany[0]._tag_line}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={styles.DetailCompanyInfoAreaBorder}
                />
                <View
                  style={styles.DetailCompanyIDArea}
                >
                  <Text style={styles.ParagraphTextStyle}>
                    {CONSTANT.DetailCompanyScreenCompanyId}{' '}
                  </Text>
                  {this.state.fetchCompany && (
                    <Text style={styles.ParagraphTextStyle}>
                      {this.state.fetchCompany[0].employ_id}
                    </Text>
                  )}
                </View>
                <View
                  style={styles.DetailCompanyButtonMainArea}
                >
                  {this.state.fetchCompany != null &&
                    this.state.fetchCompany[0].favorit == 'yes' ?
                    <TouchableOpacity
                      style={styles.DetailCompanySavedButtonArea}
                    >
                      <Text
                        style={styles.ButtonText}>
                        {CONSTANT.DetailCompanyScreenSaved}
                    </Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={this.UpdateFav}
                      style={{
                        width: "80%",
                        backgroundColor: this.state.iconColor,
                        height: 40,
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent:"center",
                      }}
                    >
                      <Text
                        style={styles.ButtonText}>
                        {this.state.text}
                      </Text>
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    onPress={this.onClick}
                    style={styles.DetailCompanyShareButtonArea}
                  >
                    <AntIcon
                      name="sharealt"
                      color={"#fff"}
                      size={17}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailCompanyScreenAbout}
              </Text>
              {this.state.fetchCompany && (
                <Text
                  style={styles.ParagraphTextStyle}
                >
                  {this.state.fetchCompany[0].employer_des.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
                
              )}
            </View>
            <View style={styles.section}>
              <Text
                style={styles.MainHeadingTextStyle}
              >
                {CONSTANT.DetailCompanyScreenJobOpenings}
              </Text>
            </View>
            <FlatList
              data={this.state.fetchJobs}
              keyExtractor={(a, b) => b.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
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
            />
        </ScrollView>
      </View>
    );
  }
}
export default DetailCompanyScreen;

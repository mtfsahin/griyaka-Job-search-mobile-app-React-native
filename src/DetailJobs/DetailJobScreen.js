import React, { Component } from 'react';
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
  CameraRoll,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation, DrawerActions } from 'react-navigation';
import { I18nManager } from 'react-native';
import * as CONSTANT from '../Constants/Constant';
import AntIcon from 'react-native-vector-icons/AntDesign';
import JobAttachments from '../DetailJobs/JobAttachments';
//import RNFetchBlob from 'react-native-fetch-blob';
import JobSkill from '../DetailJobs/JobSkill';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from '../Constants/Styles';
import { NavigationEvents } from 'react-navigation';
import HTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class DetailJobScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
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
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    showAlert: false,
  };
  componentDidMount() {
    this.ApplicationThemeSettings();
    this.fetchJObData();
  }
  ApplicationThemeSettings = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({
      themeSettingsDetailJobFAQs: json.project_settings.job_faq_option,
      themeSettingsDetailJobAttachment: json.remove_project_attachments,
      themeSettingsDetailJobLocation: json.remove_location_job,
    });
  }
  fetchJObData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
      'listing/get_jobs?listing_type=single&job_id=' +
      params.job_id,
    );
    const json = await response.json();
    this.setState({ fetchJob: json });
    this.setState({ fetchJob: json });
    this.setState({ fetchAttachment: json[0].attanchents });
    this.setState({ fetchFAQs: json[0].faq });
    this.setState({ fetchSkills: json[0].skills, isLoading: false });
    this.getUser();
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
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
        title: 'Wow, did you see that?',
      },
      {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  render() {
    const { isLoading, showAlert } = this.state;
    const { id, storedValue, storedType, profileImg, type } = this.state;
    const { params } = this.props.navigation.state;

    return (

      <View style={styles.container}>
        {/* <NavigationEvents onWillFocus={this.fetchJObData} /> */}
        <View>
          {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
          <StatusBar backgroundColor={"#fff"} barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"} />
          <View
            style={{
              height: 40,
              paddingVertical: 10,
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}
              style={{ paddingLeft: 20 }}
            >
              <AntIcon name="arrowleft" size={25} color={"#000"}
                style={{
                  transform: I18nManager.isRTL ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }]
                }} />
            </TouchableOpacity>
            <View style={{ alignItems: "flex-end", justifyContent: "flex-end", flex: 1, marginRight: 20, flexDirection: "row" }}>

              <View style={{ alignItems: "flex-end", justifyContent: "flex-end", }}>
                {/*<TouchableOpacity
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <AntIcon name="hearto" size={19} color={"#000"}
                    style={{
                      transform: I18nManager.isRTL ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }], paddingRight: 13
                    }} />
                  </TouchableOpacity>*/}
              </View>
              <View style={{ alignItems: "flex-end", justifyContent: "flex-end", }}>
                <TouchableOpacity
                  onPress={this.onClick}
                >
                  <Entypo name="forward" size={19} color={"#000"}
                    style={{
                      transform: I18nManager.isRTL ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }], paddingRight: 13
                    }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-end", justifyContent: "flex-end", }}>

                {type == 'success' && storedType == 'freelancer' ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SendReport', {
                        job_id: params.job_id,
                      })
                    }
                  >
                    <AntIcon
                      name="warning" size={19} color={"#000"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.showAlert();
                    }}
                  >
                    <AntIcon
                      name="warning" size={19} color={"#000"}
                    />
                  </TouchableOpacity>
                )}
              </View>
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


        <SafeAreaView style={{ flex: 1 }} >
          
          <ScrollView showsVerticalScrollIndicator={false} >
            
            <View style={{ backgroundColor: "#F5F7FC", }} >
              <View style={[styles.DetailJobScreenMainArea]}>
                <View style={{ backgroundColor: "#FFFFFF", }}>
                  <View style={{ marginTop: 20, marginLeft: 24, marginBottom: 20, alignItems: 'flex-start', flexDirection: "column" }} >
                    {this.state.fetchJob && (
                      <Image
                        style={{ width: 64, height: 64, borderRadius: 4 }}
                        source={{ uri: this.state.fetchJob[0].employer_avatar }}
                      />
                    )}

                    {this.state.fetchJob && (
                      <View style={{ width: "95%"}} >
                        <Text
                          style={styles.SectionHeadingTextStyle1}>
                          {this.state.fetchJob[0].project_title}
                        </Text>
                      </View>

                    )}

                    {this.state.fetchJob && (
                      <Text style={styles.NameTextStyle1}>
                        {this.state.fetchJob[0].employer_name}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ backgroundColor: "#FFFFFF", marginTop: 13 }}>

                  <View style={{ paddingTop: 24, marginLeft: 24, alignItems: 'flex-start', flexDirection: "row" }} >

                    <View style={{
                      justifyContent: 'flex-start',
                      alignItems: "flex-start",
                      height: 40,
                      width: 100,
                    }}>
                      <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {this.state.fetchJob && (
                          <Text
                            style={styles.NameTextStyleTitle}>
                            SON BAŞVURU
                          </Text>
                        )}
                        {this.state.fetchJob && (
                          <Text style={styles.NameTextContent}>
                            {this.state.fetchJob[0].expiry_date}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "20%" }}>
                      {this.state.fetchJob && (
                        <Text
                          style={styles.NameTextStyleTitle}>
                          İŞ TÜRÜ
                        </Text>
                      )}
                      {this.state.fetchJob && (
                        <Text style={styles.NameTextContent}>
                          {this.state.fetchJob[0].job_type}
                        </Text>
                      )}
                    </View>


                  </View>

                  <View style={{ paddingTop: 23, paddingBottom: 24, marginLeft: 24, alignItems: 'flex-start', flexDirection: "row" }} >

                    <View style={{
                      justifyContent: 'flex-start',
                      alignItems: "flex-start",
                      height: 40,
                      width: 100,
                    }}>
                      <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {this.state.fetchJob && (
                          <Text
                            style={styles.NameTextStyleTitle}>
                            İŞ TİPİ
                          </Text>
                        )}
                        {this.state.fetchJob && (
                          <Text style={styles.NameTextContent}>
                            {this.state.fetchJob[0].project_level.level_title}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "20%" }}>
                      {this.state.fetchJob && (
                        <Text
                          style={styles.NameTextStyleTitle}>
                          ŞEHİR
                        </Text>
                      )}
                      {this.state.fetchJob && (
                        <Text style={styles.NameTextContent}>
                          {this.state.fetchJob[0].location._country}
                        </Text>
                      )}
                    </View>
                  </View>

                </View>


                <View style={{ backgroundColor: "#FFFFFF", marginTop: 13 }}>

                  <View style={{ paddingTop: 24, marginLeft: 24, marginRight: 24, alignItems: 'flex-start', flexDirection: "row" }} >

                    <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                      {this.state.fetchJob && (
                        <Text
                          style={styles.NameTextStyleTitle1}>
                          İŞ TANIMI
                        </Text>
                      )}
                      {this.state.fetchJob && (
                        <View>
                          <HTML
                            html={this.state.fetchJob[0].project_content}
                            baseFontStyle={styles.NameTextContent}
                          />
                        </View>
                      )}
                    </View>

                  </View>
                </View>
                <View style={{ backgroundColor: "#FFFFFF", marginTop: 13 }}>

                  <View style={{ paddingTop: 24, marginLeft: 24, marginBottom: 10, alignItems: 'flex-start', flexDirection: "row" }} >


                    <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      {this.state.fetchJob && (
                        <Text
                          style={styles.NameTextStyleTitle1}>
                          İSTENİLEN YETENEKLER
                        </Text>
                      )}
                      <FlatList
                        data={this.state.fetchSkills}
                        listKey={(a, b) => b.toString()}
                        renderItem={({ item }) => (
                          //  <TouchableOpacity
                          //  onPress={() => this.props.navigation.navigate('DetailJobScreen', {profile_id: item.profile_id})}>
                          <JobSkill skillName={`${entities.decode(item.skill_name)}`} />
                          // </TouchableOpacity>
                        )}
                        horizontal={false}
                      />
                    </View>

                  </View>
                </View>

                {(this.state.fetchAttachment != '' && this.state.themeSettingsDetailJobAttachment == 'no') &&
                  <View style={{ backgroundColor: "#FFFFFF", marginTop: 13 }}>

                    <View style={{ paddingTop: 24, marginLeft: 24, marginBottom: 10, alignItems: 'flex-start', flexDirection: "row" }} >


                      <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {this.state.fetchJob && (
                          <Text
                            style={styles.NameTextStyleTitle1}>
                            EK BELGELER
                          </Text>
                        )}
                        <>
                          <FlatList
                            data={this.state.fetchAttachment}
                            listKey={(a, b) => b.toString()}
                            renderItem={({ item }) => (
                              <TouchableOpacity >
                                <JobAttachments
                                  attachmentName={`${entities.decode(item.document_name)}`}
                                  attachmentSize={`${entities.decode(item.file_size)}`}
                                  attachmentType={item.filetype.type}
                                  attachmentImage={item.url}
                                />
                              </TouchableOpacity>
                            )}
                            horizontal={true}
                          />
                        </>

                      </View>
                    </View>
                  </View>
                }
              </View>

              {(this.state.themeSettingsDetailJobFAQs == 'yes' && this.state.fetchFAQs != '') &&
                <View>
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
                            style={[styles.PersonalDetailCollapseHeaderArea, { alignItems: 'center', backgroundColor: '#ddd', paddingLeft: 10 }]}
                          >
                            <Text
                              style={
                                styles.NameTextStyle
                              }
                            >
                              {item.faq_question}
                            </Text>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View style={[styles.PersonalDetailCollapseBodyArea, { marginBottom: 10, marginTop: 0 }]}>
                            <Text style={styles.ParagraphTextStyle}>
                              {item.faq_answer}
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



            </View>

            {!isLoading && (
            <View style={{
              position: 'absolute',
              flexDirection: "column",
              justifyContent: "flex-end",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              opacity: 1,
              marginBottom: 31,
            }}>
              {type == 'success' &&
                this.state.fetchJob &&
                storedType == 'freelancer' ? (
                <TouchableOpacity
                activeOpacity={1}
                  onPress={() =>
                    this.props.navigation.navigate('SendProposal', {
                      job_id: params.job_id,
                      job_main_title: this.state.fetchJob[0].project_title,
                      job_type: this.state.fetchJob[0].project_type,
                      job_level: this.state.fetchJob[0].project_level.level_title,
                      job_time: this.state.fetchJob[0].estimated_hours,
                      job_Duration: this.state.fetchJob[0].project_duration,
                      job_Price: this.state.fetchJob[0].project_cost,
                      hourly_rate: this.state.fetchJob[0].hourly_rate,
                    })
                  }
                  style={{ alignItems: 'center', justifyContent: 'center', marginRight: "20%", marginLeft: "20%", backgroundColor: '#1C58F2', height: 52, borderRadius: 12 }}>
                  <Text
                    style={styles.ButtonText}>
                    {CONSTANT.DetailjobProposal}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                activeOpacity={0.9}

                  onPress={() => {
                    this.showAlert();
                  }}
                  style={{ alignItems: 'center', justifyContent: 'center', marginRight: "20%", marginLeft: "20%", backgroundColor: '#1C58F2', height: 52, borderRadius: 12 }}>
                  <Text
                    style={styles.ButtonText}>
                    {CONSTANT.DetailjobProposal}
                  </Text>
                </TouchableOpacity>
              )}

            </View>)}

          </ScrollView>

          

        </SafeAreaView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={CONSTANT.AwesomeAlertTitle}
          message={CONSTANT.AwesomeAlertMessage5}
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

      </View>

    );
  }
}
export default DetailJobScreen;

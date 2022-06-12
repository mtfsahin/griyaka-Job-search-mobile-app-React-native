import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  NativeModules,
  Switch,
  FlatList,
  ScrollView
} from "react-native";
import CustomHeader from "../Header/CustomHeader";
import axios from "axios";
import AntIcon from "react-native-vector-icons/AntDesign";
import DocumentPicker from "react-native-document-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import MultiSelect from "react-native-multiple-select";
import SelectedDocLayout from "./SelectedDocLayout";
const Entities = require("html-entities").XmlEntities;
import * as CONSTANT from "../Constants/Constant";
import styles from "../Constants/Styles";
import SimpleHeader from "../Header/SimpleHeader";
import RNFetchBlob from "rn-fetch-blob";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
const entities = new Entities();
var ImagePicker = NativeModules.ImageCropPicker;
const options = [
  "Cancel",
  "Apple",
  <Text style={{ color: "yellow" }}>Banana</Text>,
  "Watermelon",
  <Text style={{ color: "red" }}>Durian</Text>
];

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: [],
      switchValue: false,
      imagesLength: "",
      switchfeaturedValue: false,
      sendSwitchFeaturedValue: "",
      sendSwitchValue: "",
      switchMileStoneValue: false,
      sendswitchMileStoneValue: "",
      isUpdatingLoader: false,
      Uid: "",
      Title: "",
      Cost: "",
      HourlyRate: "",
      EstimatedHour: "",
      MaximumPrice: "",
      ExpiryDate: "",
      DeadlineDate: "",
      Content: "",
      Address: "",
      Latitude: "",
      Longitude: "",
      pickerOpacity: 0,
      opacityOfOtherItems: 1,
      label: "Firstvalue",
      isLoading: true,
      freelancerKnown: "",
      jobKnown: "",
      freelancerLevelKnown: "",
      englishKnown: "",
      durationKnown: "",
      projectCategoryKnown: "",
      projectTypeKnown: "",
      projectLevelKnown: "",
      projectLocationKnown: "",
      ProjectExperience: "",
      projectExperienceKnown: "",
      locationOption: "",
      locationOptionKnown: [],
      CatPickerValueHolder: [],
      CatKnown: [],
      LangPickerValueHolder: [],
      LangKnown: [],
      SkillsPickerValueHolder: [],
      SkillsKnown: [],
      showAlert: false,
      showSuccessAlert: false,
      LocationOption: [],
      new_LocationOption: [],
      size: "",
      imagesArray: [],

      FAQ_Data: [],
      FAQ_Refresh: false,
      Question: '',
      Answer: '',
      editedQuestion: '',
      editedAnswer: '',
    };
  }
  componentDidMount() {
    this.FreelancerLevelSpinner();
    this.JObDurationSpinner();
    this.englishLevelSpinner();
    this.ProjectCatSpinner();
    this.ProjectTypeSpinner();
    this.ProjectCategoriesSpinner();
    this.ProjectLanguageSpinner();
    this.ProjectSkillsSpinner();
    this.ProjectLocationSpinner();
    this.FetchLocationOption();
    this.ProjectExperienceSpinner();
    this.ApplicationThemeSettings();
  }

  ApplicationThemeSettings = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({
      themeSettingsProjectLevel: json.project_settings.remove_project_level,
      themeSettingsDuration: json.project_settings.remove_project_duration,
      themeSettingsLocationType: json.project_settings.remove_location_type,
      themeSettingsExperienceOption: json.project_settings.job_experience_option.gadget,
      themeSettingsExperienceEnable: json.project_settings.job_experience_option.enable.multiselect_experience,
      themeSettingsProjectType: json.project_settings.project_type,
      themeSettingsEnglishLevel: json.project_settings.remove_english_level,
      themeSettingsFreelancerType: json.project_settings.remove_freelancer_type,
      themeSettingsLanguages: json.project_settings.remove_languages,
      themeSettingsFreelancerTypeSelection: json.project_settings.multiselect_freelancertype,
      themeSettingsMilestone: json.project_settings.job_milestone_option.gadget,
      themeSettingsPriceOption: json.project_settings.job_price_option,
      themeSettingsAttachment: json.project_settings.attachment_display,
      themeSettingsFAQ: json.project_settings.job_faq_option,
      themeSettingsRemoveLocation: json.remove_location_job,
      themeSettingsRemoveAttachment: json.remove_project_attachments,
      isLoading: false
    });
  }
  FetchLocationOption = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_theme_settings");
    const json = await response.json();
    this.setState({ LocationOption: json.job_types, });
    console.log("location Option", JSON.stringify(this.state.LocationOption));
    for (const [key, value] of Object.entries(this.state.LocationOption)) {
      console.log(`${key}: ${value}`);
      this.state.new_LocationOption.push({
        name: `${value}`,
        slug: `${key}`
      });
    }
    console.log("New Required Array", this.state.new_LocationOption);
  };
  FreelancerLevelSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=freelancer_level",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let freelancer = responseJson;
        this.setState({
          freelancer
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  JObDurationSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=duration_list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let JobDuration = responseJson;
        this.setState({
          JobDuration
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  englishLevelSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=english_levels", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let EnglishLevel = responseJson;
        this.setState({
          EnglishLevel
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  ProjectCatSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=project_level", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let ProjectLevel = responseJson;
        this.setState({
          ProjectLevel
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  ProjectTypeSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=project_type", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectType = responseJson;
        // let projectTypeValue = responseJson
        // let projectTypeValue = responseJson[0].value;
        // let projectTypeValueHourlyRate = responseJson[1].value;
        this.setState({
          projectType,
          // projectTypeValue,
          // projectTypeValueHourlyRate
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  ProjectLocationSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=locations",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let projectLocation = responseJson;
        this.setState({
          projectLocation
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectCategoriesSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=project_cat",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let ProjectCategory = responseJson;
        this.setState({
          ProjectCategory
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectLanguageSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=languages",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let Language_data = responseJson;
        this.setState({
          Language_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectSkillsSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=skills", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let skills_data = responseJson;
        this.setState({
          skills_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectExperienceSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=experience",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let ProjectExperience = responseJson;
        this.setState({
          ProjectExperience
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  PostJob = async () => {
    const Uid = await AsyncStorage.getItem("projectUid");
    const {
      sendSwitchValue,
      sendSwitchFeaturedValue,
      sendswitchMileStoneValue,
      Address,
      image,
      Latitude,
      Longitude,
      Title,
      Cost,
      HourlyRate,
      EstimatedHour,
      MaximumPrice,
      ExpiryDate,
      DeadlineDate,
      Content,
      freelancerLevelKnown,
      projectLevelKnown,
      projectExperienceKnown,
      durationKnown,
      englishKnown,
      projectTypeKnown,
      projectLocationKnown,
      CatKnown,
      LangKnown,
      SkillsKnown,
      images,
      imagesArray,
      size,
      locationOptionKnown,
      FAQ_Data
    } = this.state;
    if (
      Title != "" &&
      this.state.images.length >= 1
      // && durationKnown[0] != "" && freelancerLevelKnown[0] != ""
      //  && englishKnown[0] != "" && projectTypeKnown[0] != "" && projectLocationKnown[0] != ""
    ) {
      this.setState({ isLoading: true });

      //Alert.alert("This is my data" , JSON.stringify(this.state.SkillsKnown) + JSON.stringify(this.state.LangKnown) + JSON.stringify(this.state.CatKnown))
      console.log(
        Title,
        freelancerLevelKnown,
        durationKnown,
        englishKnown,
        locationOptionKnown,
        projectLevelKnown,
        projectExperienceKnown,
        ExpiryDate,
        DeadlineDate,
        projectTypeKnown,
        Cost,
        HourlyRate,
        MaximumPrice,
        EstimatedHour,
        CatKnown,
        LangKnown,
        Content,
        SkillsKnown,
        projectLocationKnown,
        Address,
        Latitude,
        Longitude,
        sendSwitchFeaturedValue,
        sendSwitchValue,
        sendswitchMileStoneValue,
        imagesArray,
        size,
        FAQ_Data
      );
      const formData = new FormData();
      formData.append('submit_type', 'add');
      formData.append('id', '');
      formData.append('user_id', Uid);
      formData.append('title', Title);
      formData.append('project_level', projectLevelKnown[0]);
      formData.append('job_option', locationOptionKnown[0]);
      formData.append('experiences', projectExperienceKnown[0]);
      formData.append('project_duration', durationKnown[0]);
      formData.append('freelancer_level', freelancerLevelKnown[0]);
      formData.append('english_level', englishKnown[0]);
      formData.append('project_type', projectTypeKnown[0]);
      formData.append('hourly_rate', HourlyRate);
      formData.append('estimated_hours', EstimatedHour);
      formData.append('max_price', MaximumPrice);
      formData.append('expiry_date', ExpiryDate);
      formData.append('deadline', DeadlineDate);
      formData.append('project_cost', Cost);
      formData.append('description', Content);
      formData.append('country', projectLocationKnown[0]);
      formData.append('address', Address);
      formData.append('longitude', Longitude);
      formData.append('latitude', Latitude);
      formData.append('is_featured', sendSwitchFeaturedValue);
      formData.append('show_attachments', sendSwitchValue);
      formData.append('skills', JSON.stringify(SkillsKnown));
      formData.append('languages', JSON.stringify(LangKnown));
      formData.append('categories', JSON.stringify(CatKnown));
      formData.append('is_milestone', sendswitchMileStoneValue);
      formData.append('faq', FAQ_Data);
      if (images != null) {
        images.forEach((item, i) => {
          var path =  item.uri;
          var filename = item.name;
          formData.append("project_documents" + i, {
            uri: path,
            type: item.type,
            name: filename || `filename${i}.jpg`,
          });
        });
        formData.append('size', images.length);
      }
      axios({
        url: CONSTANT.BaseUrl + "listing/update_job",
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            this.setState({ isLoading: false });
            Alert.alert("Başarılı", response.data.message);
            console.log("Başarılı", response.data.message);
            this.props.navigation.navigate('PostedJobs')
          } else if (response.status === 203) {
            this.setState({ isLoading: false });
            Alert.alert("Hata", response.data.message);
            console.log("Hata", response.data.message);
          }
        })
        .catch((error) => {
            this.setState({ isLoading: false });
            Alert.alert(
              'Başarılı',
              'İlanınız başarılı bir şekilde yayınlandı',
              [
                {text: 'Tamam'},
              ],
              {cancelable: false},
            );
            this.props.navigation.navigate('PostedJobs')
        })
      
    } else {
      Alert.alert(
        'Üzgünüz',
        'Tüm alanları doldurunuz.',
        [
          {text: 'Tamam'},
        ],
        {cancelable: false},
      );
      
    }

   
  };
 

  pickMultiple = async () => {

    try {
      const res = await DocumentPicker.pickMultiple({
        // type: [DocumentPicker.types.pdf]
      })
      .then(images => {
        this.setState({
          image: null,
          images: images
        });
        console.log('images', images);
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  toggleSwitch = value => {
    this.setState({ switchValue: value });
    if (value == true) {
      this.state.sendSwitchValue = "on";
    } else {
      this.state.sendSwitchValue = "off";
    }
  };
  toggleSwitchMileStones = value => {
    this.setState({ switchMileStoneValue: value });
    if (value == true) {
      this.state.sendswitchMileStoneValue = "on";
    } else {
      this.state.sendswitchMileStoneValue = "off";
    }
  };
  togglefeaturedSwitch = value => {
    this.setState({ switchfeaturedValue: value });
    if (value == true) {
      this.state.sendSwitchFeaturedValue = "on";
    } else {
      this.state.sendSwitchFeaturedValue = "off";
    }
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  showSuccessAlert = () => {
    this.setState({
      showSuccessAlert: true
    });
  };
  hideSuccessAlert = () => {
    this.setState({
      showSuccessAlert: false
    });
  };
  showDatePickerExpiryDate = () => {
    this.setState({
      DatePickerVisibleExpiryDate: true
    });
  };
  hideDatePickerExpiryDate = () => {
    this.setState({
      DatePickerVisibleExpiryDate: false
    });
  };
  handleConfirmExpiryDate = date => {
    const dateS = date.toUTCString();
    this.setState({ ExpiryDate: moment(dateS).format("YYYY/MM/DD") });
    this.hideDatePickerExpiryDate();
  };
  showDatePickerDeadlineDate = () => {
    this.setState({
      DatePickerVisibleDeadlineDate: true
    });
  };
  hideDatePickerDeadlineDate = () => {
    this.setState({
      DatePickerVisibleDeadlineDate: false
    });
  };
  handleConfirmDeadlineDate = date => {
    const dateS = date.toUTCString();
    this.setState({ DeadlineDate: moment(dateS).format("YYYY/MM/DD")});
    this.hideDatePickerDeadlineDate();
  };

  addInd_ExpData = () => {
    this.state.FAQ_Data.push({
      faq_question: this.state.Question,
      faq_answer: this.state.Answer,
    });
    console.log("data", this.state.FAQ_Data)
    this.setState({
      FAQ_Refresh: true,
      Answer: '',
      Question: '',
    });
  };
  EditData = (index, item) => {
    this.state.FAQ_Data[index] = {
      faq_question: this.state.editedQuestion != '' ? this.state.editedQuestion : item.faq_question,
      faq_answer: this.state.editedAnswer != '' ? this.state.editedAnswer : item.faq_answer
    }
    this.setState({ FAQ_Refresh: true, })
  };
  FAQ_DeleteForm = index => {
    this.state.FAQ_Data.splice(index, 1);
    this.setState({
      FAQ_Refresh: true
    });
  };

  render() {
    const {
      showAlert,
      showSuccessAlert,
      isLoading,
      isUpdatingLoader,
      images
    } = this.state;
    return (
      <View style={styles.container}>
        <SimpleHeader HeaderText={CONSTANT.PostJob} />
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
        {/* {isUpdatingLoader == true ? (

          <View style={{ justifyContent: "center", height: "100%", backgroundColor: 'rgba(0, 0, 0,0.1)', width: "100%" }}>
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
        ) : null} */}
        <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobJobDescription}
            </Text>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.TextInputLayoutStyle}
            name="username"
            placeholder={CONSTANT.PostJobJobTitle}
            placeholderTextColor="#807f7f"
            onChangeText={Title => this.setState({ Title })}
          />
          {this.state.themeSettingsFreelancerType === 'no' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ freelancerLevelKnown: value })
                }
                uniqueKey="value"
                items={this.state.freelancer}
                selectedItems={this.state.freelancerLevelKnown}
                borderBottomWidth={0}
                single={this.state.themeSettingsFreelancerTypeSelection === 'disable' ? true : false}
                searchInputPlaceholderText={CONSTANT.PostJobPickFreelancerLevel}
                selectText={CONSTANT.PostJobPickFreelancerLevel}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="title"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }
          {this.state.themeSettingsDuration === 'no' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ durationKnown: value })
                }
                uniqueKey="value"
                items={this.state.JobDuration}
                selectedItems={this.state.durationKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PostJobPickJobDuration}
                selectText={CONSTANT.PostJobPickJobDuration}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="title"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }

          {this.state.themeSettingsEnglishLevel === 'no' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ englishKnown: value })
                }
                uniqueKey="value"
                items={this.state.EnglishLevel}
                selectedItems={this.state.englishKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PostJobPickEnglishLevel}
                selectText={CONSTANT.PostJobPickEnglishLevel}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="title"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }
          {this.state.themeSettingsLocationType == 'enable' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ locationOptionKnown: value })
                }
                uniqueKey="slug"
                items={this.state.new_LocationOption}
                selectedItems={this.state.locationOptionKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PostJobPickLocationOption}
                selectText={CONSTANT.PostJobPickLocationOption}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }
          {this.state.themeSettingsProjectLevel === 'no' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ projectLevelKnown: value })
                }
                uniqueKey="value"
                items={this.state.ProjectLevel}
                selectedItems={this.state.projectLevelKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PostJobPickProjectLevel}
                selectText={CONSTANT.PostJobPickProjectLevel}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="title"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }
         

          <View>
            <DateTimePickerModal
              cancelTextIOS={"CANCEL"}
              confirmTextIOS={"OK"}
              cancelTextStyle={{ color: "#3d4461", fontSize: 20 }}
              confirmTextStyle={{ color: "#3d4461", fontSize: 20 }}
              isVisible={this.state.DatePickerVisibleExpiryDate}
              mode="date"
              onConfirm={this.handleConfirmExpiryDate}
              onCancel={this.hideDatePickerExpiryDate}
            />
          </View>
          <View
            style={[
              styles.TextInputLayoutStyle,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }
            ]}
          >
            {this.state.ExpiryDate == "" ? (
              <Text style={{ color: "#7f7f7f" }}>{CONSTANT.PostJobExpiryDate}</Text>
            ) : (
              <Text style={{ color: "#323232" }}>{this.state.ExpiryDate}</Text>
            )}
            <TouchableOpacity
              onPress={() => this.showDatePickerExpiryDate()}
              style={{ padding: 5 }}
            >
              <AntIcon
                name="calendar"
                color={CONSTANT.primaryColor}
                size={22}
              />
            </TouchableOpacity>
          </View>
          {/* <TextInput
            underlineColorAndroid="transparent"
            style={styles.TextInputLayoutStyle}
            name="username"
            placeholder={CONSTANT.PostJobExpiryDate}
            placeholderTextColor="#807f7f"
            onChangeText={ExpiryDate => this.setState({ ExpiryDate })}
          /> */}
          <View>
            <DateTimePickerModal
              cancelTextIOS={"CANCEL"}
              confirmTextIOS={"OK"}
              cancelTextStyle={{ color: "#3d4461", fontSize: 20 }}
              confirmTextStyle={{ color: "#3d4461", fontSize: 20 }}
              isVisible={this.state.DatePickerVisibleDeadlineDate}
              mode="date"
              onConfirm={this.handleConfirmDeadlineDate}
              onCancel={this.hideDatePickerDeadlineDate}
            />
          </View>
          <View
            style={[
              styles.TextInputLayoutStyle,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }
            ]}
          >
            {this.state.DeadlineDate == "" ? (
              <Text style={{ color: "#7f7f7f" }}>{CONSTANT.PostJobDeadlineDate}</Text>
            ) : (
              <Text style={{ color: "#323232" }}>
                {this.state.DeadlineDate}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => this.showDatePickerDeadlineDate()}
              style={{ padding: 5 }}
            >
              <AntIcon
                name="calendar"
                color={CONSTANT.primaryColor}
                size={22}
              />
            </TouchableOpacity>
          </View>
         
          {this.state.projectTypeKnown[0] === "fixed" ? (
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.TextInputLayoutStyle}
                name="username"
                placeholder={CONSTANT.PostJobProjectCost}
                placeholderTextColor="#807f7f"
                onChangeText={Cost => this.setState({ Cost })}
              />
              {this.state.themeSettingsPriceOption === 'enable' &&
                <TextInput
                  underlineColorAndroid="transparent"
                  style={styles.TextInputLayoutStyle}
                  name="username"
                  placeholder={CONSTANT.PostJobMaximumPrice}
                  placeholderTextColor="#807f7f"
                  onChangeText={MaximumPrice => this.setState({ MaximumPrice })}
                />
              }
            </View>
          ) : this.state.projectTypeKnown[0] === "hourly" ? (
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.TextInputLayoutStyle}
                name="username"
                placeholder={CONSTANT.PostJobHourlyRate}
                placeholderTextColor="#807f7f"
                onChangeText={HourlyRate => this.setState({ HourlyRate })}
              />
              {this.state.themeSettingsPriceOption === 'enable' &&
                <TextInput
                  underlineColorAndroid="transparent"
                  style={styles.TextInputLayoutStyle}
                  name="username"
                  placeholder={CONSTANT.PostJobMaximumPrice}
                  placeholderTextColor="#807f7f"
                  onChangeText={MaximumPrice => this.setState({ MaximumPrice })}
                />
              }
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.TextInputLayoutStyle}
                name="username"
                placeholder={CONSTANT.PostJobEstimatedHour}
                placeholderTextColor="#807f7f"
                onChangeText={EstimatedHour => this.setState({ EstimatedHour })}
              />
            </View>
          ) : null}
          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobJobCategories}
            </Text>
          </View>
          <View style={styles.MultiSelectArea}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({ CatKnown: value })
              }
              uniqueKey="id"
              items={this.state.ProjectCategory}
              selectedItems={this.state.CatKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText={CONSTANT.PostJobPickProjectCategory}
              selectText={CONSTANT.PostJobPickProjectCategory}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              onChangeInput={text => console.log(text)}
              displayKey="name"
              submitButtonText={CONSTANT.Submit}
            />
          </View>
          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobLanguages}
            </Text>
          </View>
          {this.state.themeSettingsLanguages === 'no' &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                style={{ marginTop: 4 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ LangKnown: value })
                }
                uniqueKey="id"
                items={this.state.Language_data}
                selectedItems={this.state.LangKnown}
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.PostJobPickProjectLanguage}
                selectText={CONSTANT.PostJobPickProjectLanguage}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                onChangeInput={text => console.log(text)}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          }
          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobJobDetails}
            </Text>
          </View>
          <TextInput
            multiline={true}
            underlineColorAndroid="transparent"
            style={styles.TextInputLayoutStyleForDetail}
            name="username"
            placeholder={CONSTANT.PostJobJobContent}
            placeholderTextColor="#807f7f"
            onChangeText={Content => this.setState({ Content })}
          />
          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobSkillsRequired}
            </Text>
          </View>
          <View style={styles.MultiSelectArea}>
            <MultiSelect
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({ SkillsKnown: value })
              }
              uniqueKey="id"
              items={this.state.skills_data}
              selectedItems={this.state.SkillsKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText={CONSTANT.PostJobPickJobSkills}
              selectText={CONSTANT.PostJobPickJobSkills}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              onChangeInput={text => console.log(text)}
              displayKey="name"
              submitButtonText={CONSTANT.Submit}
            />
          </View>
          {this.state.themeSettingsRemoveLocation == 'no' &&
            <>
              <View style={styles.PostJobSectionHeadingArea}>
                <Text style={styles.SectionHeadingTextStyle}>
                  {CONSTANT.PostJobYourLocation}
                </Text>
              </View>
              <View style={styles.MultiSelectArea}>
                <MultiSelect
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({ projectLocationKnown: value })
                  }
                  uniqueKey="slug"
                  items={this.state.projectLocation}
                  selectedItems={this.state.projectLocationKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText={CONSTANT.PostJobPickProjectLocation}
                  selectText={CONSTANT.PostJobPickProjectLocation}
                  styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                  styleDropdownMenuSubsection={
                    styles.MultiSelectstyleDropdownMenuSubsection
                  }
                  onChangeInput={text => console.log(text)}
                  displayKey="name"
                  submitButtonText={CONSTANT.Submit}
                />
              </View>    
            </>
          }
      

          <View style={styles.PostJobSectionHeadingArea}>
            <Text style={styles.SectionHeadingTextStyle}>
              {CONSTANT.PostJobIsFeatured}
            </Text>
            <Switch
              style={{ alignSelf: "flex-end", marginTop: -20 }}
              onValueChange={this.togglefeaturedSwitch}
              value={this.state.switchfeaturedValue}
            />
          </View>

          {this.state.themeSettingsRemoveAttachment == 'no' &&
            <View style={styles.PostJobSectionHeadingArea}>
              <Text style={styles.SectionHeadingTextStyle}>
                {CONSTANT.PostJobYourAttachments}
              </Text>
              <Switch
                style={{ alignSelf: "flex-end", marginTop: -20 }}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </View>
          }

          {this.state.themeSettingsMilestone === 'enable' &&
            <View style={styles.PostJobSectionHeadingArea}>
              <Text style={styles.SectionHeadingTextStyle}>
                {CONSTANT.PostJobMileStones}
              </Text>
              <Switch
                style={{ alignSelf: "flex-end", marginTop: -20 }}
                onValueChange={this.toggleSwitchMileStones}
                value={this.state.switchMileStoneValue}
              />
            </View>
          }
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
          <View style={styles.PostJobButtonsArea}>
            <TouchableOpacity
              onPress={this.PostJob}
              style={styles.MainButtonArea}
            >
              <Text style={styles.ButtonText}>{"Yayınla"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.pickMultiple()}
              style={[styles.MainButtonArea, { backgroundColor: "#00cc8d" }]}
            >
              <Text style={styles.ButtonText}>
                {CONSTANT.PostJobSelectFile}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={CONSTANT.AwesomeAlertTitle}
          message={CONSTANT.AwesomeAlertMessage1}
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
        <AwesomeAlert
          show={showSuccessAlert}
          showProgress={false}
          title={CONSTANT.AwesomeAlertTitle}
          message={CONSTANT.AwesomeAlertMessage2}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={CONSTANT.AwesomeAlertConfirmText}
          confirmButtonColor={CONSTANT.primaryColor}
          onConfirmPressed={() => {
            this.hideSuccessAlert();
          }}
        />
      </View>
    );
  }
}
export default PostJob;

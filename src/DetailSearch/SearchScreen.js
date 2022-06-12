import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import * as CONSTANT from '../Constants/Constant';
import styles from '../Constants/Styles';
import SearchHeader from '../Header/SearchHeader';
import MultiSelect from "react-native-multiple-select";
class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      radioButtons: [
        {
          label: CONSTANT.SearchJobs,
          value: "İşler",
          checked: false,
          color: "#323232",
          disabled: false,
          size: 7
        },
      ],
      radioButtonsJob: [
        {
          label: CONSTANT.SearchJobs,
          value: "İşler",
          checked: false,
          color: "#323232",
          disabled: false,
          size: 7
        },

      ],
      isLoading: true,
      title: "",
      isLoading: true,
      freelancerKnown: [],
      jobKnown: [],
      freelancerLevelKnown: [],
      englishKnown: [],
      durationKnown: [],
      projectCategoryKnown: [],
      projectTypeKnown: [],
      projectLevelKnown: [],
      projectLocationKnown: [],
      CatPickerValueHolder: [],
      CatKnown: [],
      LangPickerValueHolder: [],
      LangKnown: [],
      SkillsPickerValueHolder: [],
      SkillsKnown: [],
      EmployeeKnown: "",
      DeliveryKnown: [],
      ResponseKnown: [],
    };
    this.showFilters = true;
  }
  componentDidMount() {
    this.CheckApplicationAccess();
    this.FreelancerLevelSpinner();
    this.JObDurationSpinner();
    this.englishLevelSpinner();
    this.ProjectCatSpinner();
    this.ProjectTypeSpinner();
    this.ProjectCategoriesSpinner();
    this.ProjectLanguageSpinner();
    this.ProjectSkillsSpinner();
    this.ProjectLocationSpinner();
    this.NoEmployeeSpinner();
    this.DeliveryTime();
    this.ResponseTime();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_access");
    const json = await response.json();
    this.setState({ ApplicationAccessServcie: json.access_type.service_access });
    this.setState({ ApplicationAccessJob: json.access_type.job_access });
  }
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
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=duration_list",
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
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=english_levels",
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
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=project_level",
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
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=project_type",
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
        let projectType = responseJson;
        this.setState({
          projectType
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
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=skills",
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
        let skills_data = responseJson;
        this.setState({
          isLoading: false,
          skills_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  NoEmployeeSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=no_of_employes",
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
        let NoEmployee_data = responseJson;
        this.setState({
          NoEmployee_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  DeliveryTime = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=delivery",
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
        let deliveryTime_data = responseJson;
        this.setState({
          deliveryTime_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  ResponseTime = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=response_time",
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
        let responseTime_data = responseJson;
        this.setState({
          responseTime_data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  SearchFreelancer = () => {
    const {
      title,
      freelancerLevelKnown,
      englishKnown,
      SkillsKnown,
      LangKnown,
      CatKnown,
      projectLocationKnown
    } = this.state;
    this.props.navigation.navigate("SearchResultFreelancer", {
      title: title,
      freelancerLevelKnown: freelancerLevelKnown,
      englishKnown: englishKnown,
      SkillsKnown: SkillsKnown,
      LangKnown: LangKnown,
      CatKnown: CatKnown,
      projectLocationKnown: projectLocationKnown
    });
  };
  SearchJobs = () => {
    const {
      title,
      freelancerLevelKnown,
      SkillsKnown,
      LangKnown,
      CatKnown,
      projectLocationKnown,
      durationKnown
    } = this.state;
    this.props.navigation.navigate("SearchResultJob", {
      title: title,
      freelancerLevelKnown: freelancerLevelKnown,
      durationKnown: durationKnown,
      SkillsKnown: SkillsKnown,
      LangKnown: LangKnown,
      CatKnown: CatKnown,
      projectLocationKnown: projectLocationKnown
    });
  };
  SearchServices = () => {
    const {
      title,
      CatKnown,
      projectLocationKnown,
      LangKnown,
      ResponseKnown,
      DeliveryKnown
    } = this.state;
    this.props.navigation.navigate("SearchResultService", {
      title: title,
      CatKnown: CatKnown,
      projectLocationKnown: projectLocationKnown,
      LangKnown: LangKnown,
      ResponseKnown: ResponseKnown,
      DeliveryKnown: DeliveryKnown
    });
  };
  SearchEmployer = () => {
    const { title, projectLocationKnown, EmployeeKnown } = this.state;
    this.props.navigation.navigate("SearchResultEmployer", {
      title: title,
      EmployeeKnown: EmployeeKnown,
      projectLocationKnown: projectLocationKnown
    });
  };
  hide() {
    this.setState({ showFilters: false });
  }
  render() {
    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    const {
      title,
      freelancerKnown,
      englishKnown,
      SkillsKnown,
      LangKnown,
      CatKnown,
      projectLocationKnown,
      isLoading
    } = this.state;
    return (
      <View style={styles.container}>
        <SearchHeader HeaderText={CONSTANT.searchHeader}/>
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}

        <View style = {{height:85,backgroundColor:"#FFFFFF",flexDirection:"row",paddingLeft:10,paddingRight:10,paddingTop:8}}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.TextInputLayoutStyle1}
              name="username"
              placeholder={CONSTANT.SearchType}
              placeholderTextColor="#807f7f"
              onChangeText={title => this.setState({ title })}
            />
           
    
            <TouchableOpacity
                onPress={this.SearchJobs}
                style={{
                  padding:10,
                  alignItems: "center",
                  justifyContent:"center",
                  alignSelf: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{fontFamily:"Poppins-Medium",fontSize:19,color:"#1C58F2",opacity:0.8}}
                >
                Ara
                </Text>
              </TouchableOpacity>

            </View>

     
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}
          >
          </View>
          <View
            style={styles.section}
          >
            {/* <Text style={[styles.NameTextStyle,{ marginBottom: 10 }]}>
              {CONSTANT.SearchNarrow}
            </Text> */}
          
            {/* <View style={styles.selectedItemView}>
              <Text style={styles.selectedText}>Selected Item: {selectedItem}</Text>
            </View> */}          
            {selectedItem == "İşler" ? (
              <View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:5}}>
                <Text style={{fontFamily:"Poppins-SemiBold",fontSize:18,opacity:0.7}}>Filtrele ve Sırala</Text>
                </View>

              {/*Konum*/}
                <View style={{marginBottom:5}}>
                  <Text
                    style={[styles.NameTextStyle,{fontWeight:'700',marginLeft:10}]}
                  >
                    {CONSTANT.SearchPickLocation}
                  </Text>
                 </View>
              
                <View style={[styles.MultiSelectArea,{marginHorizontal:10}]}>
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
                
                tagRemoveIconColor="#D10000"
                tagBorderColor="#909090"
                tagTextColor="#909090"
                itemFontFamily="Poppins-Regular"
                selectedItemFontFamily="Poppins-Medium"
                itemFontSize={14}


                searchInputPlaceholderText={CONSTANT.SearchPickLocation}
                selectText={CONSTANT.SearchPickLocation}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                onChangeInput={text => console.log(text)}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
              
              </View>
            ) : null}
             {selectedItem == "İşler" ? (
              <View>
                <View style={{marginBottom:5}}>
                  <Text
                    style={[styles.NameTextStyle,{fontWeight:'700',marginLeft:10}]}
                  >
                    {CONSTANT.SearchCategories}
                  </Text>
                 </View>
                <View
                  style={[styles.MultiSelectArea,{marginHorizontal:10}]}
                >
                  <MultiSelect
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({ CatKnown: value })
                    }
                    uniqueKey="slug"
                    items={this.state.ProjectCategory}
                    selectedItems={this.state.CatKnown}
                    borderBottomWidth={0}
                    searchInputPlaceholderText={CONSTANT.SearchPickCategories}
                    selectText={CONSTANT.SearchPickCategories}
                    styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                    styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                    onChangeInput={text => console.log(text)}
                    displayKey="name"
                    submitButtonText={CONSTANT.Submit}
                  />
                </View>
              </View>
            ) : null}
            {selectedItem == "İşler" ? (
              <View>
                <View style={{marginBottom:5}}>
                  <Text
                    style={[styles.NameTextStyle,{fontWeight:'700',marginLeft:10}]}
                  >
                    {CONSTANT.PostJobPickEnglishLevel}
                  </Text>
                 </View>
                 <View
                  style={[styles.MultiSelectArea,{marginHorizontal:10}]}
                >
                  <MultiSelect
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({ englishKnown: value })
                    }
                    uniqueKey="value"
                    tagRemoveIconColor="#D10000"
                    tagBorderColor="#909090"
                    tagTextColor="#909090"
                    itemFontFamily="Poppins-Regular"
                    selectedItemFontFamily="Poppins-Medium"
                    itemFontSize={14}    
                    items={this.state.EnglishLevel}
                    selectedItems={this.state.englishKnown}
                    borderBottomWidth={0}
                    searchInputPlaceholderText={CONSTANT.SearchPickEnglishLevel}
                    selectText={CONSTANT.SearchPickEnglishLevel}
                    styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                    styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                    onChangeInput={text => console.log(text)}
                    displayKey="title"
                    submitButtonText={CONSTANT.Submit}
                  />
                </View>
              </View>
            ): null}
           

            {selectedItem == "İşler" ? (
              <TouchableOpacity
                onPress={this.SearchJobs}
                style={styles.MainButtonArea}
              >
                <Text
                  style={styles.ButtonText}
                >
                  {CONSTANT.SearchButtonJobs}
                </Text>
              </TouchableOpacity>
            ) :
            selectedItem == "services" ? (
              <TouchableOpacity
                onPress={this.SearchServices}
                style={styles.MainButtonArea}
              >
                <Text
                  style={styles.ButtonText}
                >
                  {CONSTANT.SearchButtonService}
                </Text>
              </TouchableOpacity>) : null
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SearchScreen;

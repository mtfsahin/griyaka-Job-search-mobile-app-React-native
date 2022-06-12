import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  navigationOptions,
  CONST,
  NativeModules,
  Alert,
  StatusBar,
  Button,
  SafeAreaView,
  ScrollView,
  Easing,
  Animated,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  Share,
  Linking,
  I18nManager
} from 'react-native';
import {withNavigation, DrawerActions} from 'react-navigation';
import axios from 'axios';
import SimpleHeader from "../Header/SimpleHeader";
import * as CONSTANT from "../Constants/Constant";
import RNRestart from 'react-native-restart';
import styles from "../Constants/Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';


class Settings extends Component {

  state = {
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    permissionChat: '',
    listing_type: '',
    showAlert: false,
    IdentityVerify: '',
    NotificationCount: '',
    themeSettingsPortfolio: '',
    profileImageUrl: '',
    bannerImageUrl: '',
    SwitchUserInfo: '',
    themeSettingsSwitchAccount: '',
    isLoading: true,
    spinner: true,
    spinnerSwitch: true,
    spinnerProfileImage: true,
  };
  componentDidMount() {
    this.ApplicationThemeSettings();
    this.CheckApplicationAccess();
    this.CheckIdentityVerify();
    this.CheckNotificationCount();
    this.CheckSwitchUserInfo();
    this.getUser();
    this.getPofileImageData();
  }
  ApplicationThemeSettings = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({themeSettingsPortfolio: json.freelancers_settings.portfolio.gadget});
    console.log(JSON.stringify(this.state.themeSettingsPortfolio))
    this.setState({themeSettingsSwitchAccount: json.switch_account});
    console.log(JSON.stringify(this.state.themeSettingsSwitchAccount))
    this.setState({themeSettingsIdentityVerification: json.identity_verification});
    console.log(JSON.stringify(this.state.themeSettingsIdentityVerification))
    this.setState({
      themeSettingsRegistrationOption: json.registration_option,
      themeSettingsLoginSignupType: json.login_signup_type,
      themeSettingsDefaultRole: json.default_role,
      themeSettingsRemoveUsername: json.remove_username,
      themeSettingsHideLoaction: json.hide_loaction,
      themeSettingsTermText: json.term_text,
      themeSettingsTermPageLink: json.term_page_link,
      themeSettingsRemoveRegistration: json.remove_registration,
      themeSettingsPhoneOptionReg: json.phone_option_reg,
      themeSettingsPhoneMandatory: json.phone_mandatory,
      themeSettingsHidePayoutEmployers: json.employers_settings.hide_payout_employers,
      themeSettingsHideHideDepartments: json.employers_settings.hide_departments
    });
  }  
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({ApplicationAccessServcie: json.access_type.service_access});
    this.setState({ApplicationAccessJob: json.access_type.job_access});
  };
  CheckIdentityVerify = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(CONSTANT.BaseUrl + 'profile/verification_request?user_id=' + Uid);
    const json = await response.json();
    this.setState({IdentityVerify: json.identity_verified});
    console.log('IdentityVerify', this.state.IdentityVerify)
  };
  CheckNotificationCount = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(CONSTANT.BaseUrl + 'user/notification_count?user_id=' + Uid);
    const json = await response.json();
    this.setState({NotificationCount: json.unread_notification_count});
    console.log('NotificationCount', this.state.NotificationCount)
  };
  CheckSwitchUserInfo = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(CONSTANT.BaseUrl + 'switch_user/user_info?user_id=' + Uid);
    const json = await response.json();
    this.setState({SwitchUserInfo: json, spinnerSwitch: false});
    console.log('SwitchUserInfo', this.state.SwitchUserInfo.type)
  };
  getUser = async () => {
    try {
      const permissionChat = await AsyncStorage.getItem('chatPermission');
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      const listing_type = await AsyncStorage.getItem('listing_type');

      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({storedValue});
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({storedType});
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({profileImg});
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({type});
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({id});
      } else {
        //  alert('something wrong')
      }
      if (listing_type !== null) {
        this.setState({listing_type});
      } else {
        //  alert('something wrong')
      }
      if (permissionChat !== null) {
        this.setState({permissionChat});
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
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
  logout = () => {
    const {id, storedValue, storedType, profileImg, type} = this.state;
    RNRestart.Restart();
    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => console.log('başarılı bir şekilde silindi'));
    this.clearAsyncStorage();
    this.checkAppAccess();

  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  canceledLogout = () => {};
  logoutAlert = () => {
    Alert.alert('Uyarı', 'Oturumu kapatmak istediğinizden emin misiniz?', [
      {text: 'Evet', onPress: () => this.logout()},
      {text: 'İptal', onPress: () => this.canceledLogout},
    ]);
  };
  switchAlert = (user_type) => {
    Alert.alert('Hesap değiştir', `Kullanıcıyı değiştirmek istediğinizden emin misiniz${user_type}?`, [
      {text: 'Evet', onPress: () => this.Switch()},
      {text: 'Hayır', onPress: () => this.canceledSwitch},
    ]);
  };
  switchAlert2 = () => {
    Alert.alert('Hesap değiştir', `Kullanıcıyı değiştirmek istediğinizden emin misiniz?`, [
      {text: 'Evet', onPress: () => this.Switch()},
      {text: 'Hayır', onPress: () => this.canceledSwitch},
    ]);
  };
  Switch = async () => {
    //this.setState({ isLoading: true });
    this.setState({ spinner: true });
    const Uid = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + "switch_user/switch_user_account",{
        user_id: Uid,
      })
      .then(async response => {
        if (response.data.type == "success") {
          await AsyncStorage.setItem(
            "full_name",
            response.data.profile.pmeta.full_name
          );
          await AsyncStorage.setItem(
            "user_type",
            response.data.profile.pmeta.user_type
          );
          await AsyncStorage.setItem(
            "profile_img",
            response.data.profile.pmeta.profile_img
          );
          await AsyncStorage.setItem(
            "listing_type",
            response.data.profile.umeta.listing_type
          );
          await AsyncStorage.setItem(
            "profileBanner",
            response.data.profile.pmeta.banner_img
          );
          await AsyncStorage.setItem("profileType",
            response.data.type
          );
          await AsyncStorage.setItem(
            "projectUid",
            response.data.profile.umeta.id
          );
          await AsyncStorage.setItem(
            "projectProfileId",
            JSON.stringify(response.data.profile.umeta.profile_id)
          );
          await AsyncStorage.setItem(
            "chatPermission",
            response.data.profile.umeta.chat_permission
          );
          await AsyncStorage.setItem(
            "shipping_address1",
            response.data.profile.shipping.address_1
          );
          await AsyncStorage.setItem(
            "shipping_city",
            response.data.profile.shipping.city
          );
          await AsyncStorage.setItem(
            "shipping_company",
            response.data.profile.shipping.company
          );
          await AsyncStorage.setItem(
            "shipping_country",
            response.data.profile.shipping.country
          );
          await AsyncStorage.setItem(
            "shipping_first_name",
            response.data.profile.shipping.first_name
          );
          await AsyncStorage.setItem(
            "shipping_last_name",
            response.data.profile.shipping.last_name
          );
          await AsyncStorage.setItem(
            "shipping_state",
            response.data.profile.shipping.state
          );
          await AsyncStorage.setItem(
            "billing_address_1",
            response.data.profile.billing.address_1
          );
          await AsyncStorage.setItem(
            "billing_city",
            response.data.profile.billing.city
          );
          await AsyncStorage.setItem(
            "billing_company",
            response.data.profile.billing.company
          );
          await AsyncStorage.setItem(
            "billing_country",
            response.data.profile.billing.country
          );
          await AsyncStorage.setItem(
            "billing_first_name",
            response.data.profile.billing.first_name
          );
          await AsyncStorage.setItem(
            "billing_last_name",
            response.data.profile.billing.last_name
          );
          await AsyncStorage.setItem(
            "billing_email",
            response.data.profile.billing.email
          );
          await AsyncStorage.setItem(
            "billing_phone",
            response.data.profile.billing.phone
          );
          await AsyncStorage.setItem(
            "billing_state",
            response.data.profile.billing.state
          );
          await AsyncStorage.setItem(
            "user_email",
            response.data.profile.umeta.user_email
          );
          await AsyncStorage.setItem("peojectJobAccess", response.data.profile.umeta.job_access);
          await AsyncStorage.setItem("projectServiceAccess", response.data.profile.umeta.service_access)
          this.setState({ isProgress: false })
          RNRestart.Restart();
        } else if (response.data.type == "error") {
          this.setState({ isProgress: false });
          alert("Please Check Your Email / Password or Check Network ");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  canceledSwitch = () => {};
  checkAppAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({data: json});
  };
  getPofileImageData = async()=> {
    const id = await AsyncStorage.getItem('projectUid');
    return fetch(
      CONSTANT.BaseUrl + 'profile/get_profile_basic?user_id=' + id ,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          profileImageUrl: responseJson.profile_img,
          bannerImageUrl: responseJson.banner_img,
          spinnerProfileImage: false
        })
      })
      .catch(error => {
        console.error(error);
      });
  }
  updateAppNotice = () => {
    Alert.alert(
      CONSTANT.AppRateThisApp,
      CONSTANT.AppPleasegiveusFiveStar +
        (Platform.OS == 'ios' ? CONSTANT.Appappstore : CONSTANT.Appplaystore) +
        '.',
      [
        {
          text: CONSTANT.AppRateNow,
          onPress: () => {
            if (Platform.OS == 'ios') {
              Linking.openURL(CONSTANT.APP_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            } else {
              Linking.openURL(CONSTANT.PLAY_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            }
          },
        },
      ],
    );
  };
  onClickShare = () => {
    Share.share(
      {
        message: CONSTANT.PLAY_STORE_LINK,
        url: CONSTANT.PLAY_STORE_LINK,
        title: CONSTANT.AppWowdidyouseethat,
      },
      {
        // Android only:
        dialogTitle: CONSTANT.AppShareAppLink,
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };
  openApp = () => {
    let url = "wpguppy://app" ;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data); //<---Success
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");  //<---Error
          });
  }
  render() {
    const {
      storedValue,
      storedType,
      profileImg,
      permissionChat,
      showAlert,
      listing_type,
      //isLoading,
      spinnerSwitch,
      spinnerProfileImage,
      spinner,
    } = this.state;
    console.log('Chat Permission=', permissionChat, storedType);
  
   
    return (
      <View style={styles.container1}>
        <SimpleHeader HeaderText={CONSTANT.SettingsHeaderText} />
        {this.state.storedType !== "" ? (
          <>
          <View style={{backgroundColor:"white",paddingRight:20,paddingLeft:20}}>
        <TouchableOpacity style={styles.settings}  onPress={() => this.props.navigation.navigate('SecuritySettings')}>
            <Text style={styles.settingsFont  }>Hesap Ayarları</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings}>
            <Text style={styles.settingsFont}>Bildirim Ayarları</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutUs')} style={styles.settings}>
            <Text style={styles.settingsFont} >Hakkımızda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings} >
            <Text style={styles.settingsFont} >Veri Politikası</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.updateAppNotice()} style={styles.settings}>
            
            <Text style={styles.settingsFont} >Uygulamayı puanla</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onClickShare()} style={styles.settings}>
            <Text style={styles.settingsFont}>Arkadaşlarını Davet Et</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={styles.settings}>
            <Text style={styles.settingsFont}>Destek ile iletişime geç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings}  onPress={() => {
                  this.logoutAlert();
                }}>
            <Text style={styles.settingsFont}>Çıkış Yap</Text>
        </TouchableOpacity>
          </View>
          </>
         ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <Image
              style={{
                alignSelf: "center",
                alignItems: "center"
              }}
              source={require("../Images/loginFirst.png")}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen", {
                RegistrationOption: this.state.themeSettingsRegistrationOption,
                LoginSignupType: this.state.themeSettingsLoginSignupType,
                DefaultRole: this.state.themeSettingsDefaultRole,
                RemoveUsername: this.state.themeSettingsRemoveUsername,
                HideLoaction: this.state.themeSettingsHideLoaction,
                TermText: this.state.themeSettingsTermText,
                TermPageLink: this.state.themeSettingsTermPageLink,
                RemoveRegistration: this.state.themeSettingsRemoveRegistration,
                PhoneOptionReg: this.state.themeSettingsPhoneOptionReg,
                PhoneMandatory: this.state.themeSettingsPhoneMandatory,
                HideDepartments: this.state.themeSettingsHideHideDepartments,
              })}
              style={styles.MainButtonArea}
            >
              <Text style={styles.ButtonText}>
                {CONSTANT.ProfileSettignLogin}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default Settings;

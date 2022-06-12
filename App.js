import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  navigationOptions,
  CONST,
  TouchableOpacity,
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
import {
  createSwitchNavigator,
  createAppContainer,
  DrawerItems,
} from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {NavigationEvents} from 'react-navigation';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RNRestart from 'react-native-restart';
import axios from 'axios';
import home from './src/Home/home';
import EmployerLayout from './src/Home/EmployerLayout';
import Employers from './src/CompleteEmployers/Employers';
import Octicons from 'react-native-vector-icons/Octicons';
import Jobs from './src/CompleteJobs/Jobs';
import NotificationCounter from './src/CompleteJobs/NotificationCounter';
import Freelancers from './src/CompleteFreelancers/Freelancers';
import ProfileTabs from './src/ProfileSetting/ProfileTabs';
import Profile from './src/ProfileSetting/Profile';
import DetailFreelancerScreen from './src/DetailFreelancer/DetailFreelancerScreen';
import DetailJobScreen from './src/DetailJobs/DetailJobScreen';
import DetailCompanyScreen from './src/DetailCompany/DetailCompanyScreen';
import DetailServiceScreen from './src/DetailServices/DetailServiceScreen';
import SearchScreen from './src/DetailSearch/SearchScreen';
import CustomHeader from './src/Header/CustomHeader';
import LoginScreen from './src/Login/LoginScreen';
import PostJob from './src/CompleteEmployers/PostJob';
import PostService from './src/CompleteServices/PostService';
import SendOffer from './src/DetailFreelancer/SendOffer';
import PreLoader from './src/PreLoader/PreLoader';
import Favorite from './src/Favorite/Favorite';
import SendProposal from './src/DetailJobs/SendProposal';
import SearchScreenFreelancer from './src/DetailSearch/SearchScreenFreelancer';
import SearchScreenEmployer from './src/DetailSearch/SearchScreenEmployer';
import SearchResultFreelancer from './src/DetailSearch/SearchResultFreelancer';
import SearchResultEmployer from './src/DetailSearch/SearchResultEmployer';
import SearchResultJob from './src/DetailSearch/SearchResultJob';
import SearchResultService from './src/DetailSearch/SearchResultService';
import Signup from './src/Login/Signup';
import signupEmployer from './src/Login/signupEmployer';
import signupFreelancer from './src/Login/signupFreelancer';
import EmployerLogin from './src/Login/EmployerLogin';
import Pushnoti from './src/Pushnoti';
import VerificationAccount from './src/Login/VerificationAccount';
import ForgetPassword from './src/Login/ForgetPassword';
import JobbyCategorylist from './src/Home/JobbyCategorylist';
import SendReport from './src/DetailJobs/SendReport';
import BuyServiceScreen from './src/DetailServices/BuyServiceScreen';
import BuyServiceWebview from './src/DetailServices/BuyServiceWebview';
import MessagesList from './src/Messages/MessagesList';
import MessageSingleListCard from './src/Messages/MessageSigleListCard';
import DetailMessageScreen from './src/Messages/DetailMessageScreen';
import DetailOngoing from './src/Dashboard/DetailOngoing';
import SocketChat from './src/Messages/SocketChat';
import Insight from './src/Dashboard/Insight';
import Invoices from './src/Dashboard/Invoices';
import InvoiceDetailPage from './src/Dashboard/InvoiceDetailPage';
import Disputes from './src/Dashboard/Disputes';
import Insightstar from './src/Dashboard/Insightstar';
import Packages from './src/Dashboard/Packages';
import LatestProposals from './src/ManageFreelancerProjects/LatestProposals';
import PostedServices from './src/ManageServices/PostedServices';
import CompletedServices from './src/ManageServices/CompletedServices';
import CompleteServicesDetail from './src/ManageServices/CompleteServicesDetail';
import OngoingServices from './src/ManageServices/OngoingServices';
import OngoingServicesDetail from './src/ManageServices/OngoingServicesDetail';
import AddonsServices from './src/ManageServices/AddonsServices';
import CancelledServices from './src/ManageServices/CancelledServices';
import OngoingJobs from './src/ManageJobs/OngoingJobs';
import CompletedJobs from './src/ManageJobs/CompletedJobs';
import CancelledJobs from './src/ManageJobs/CancelledJobs';
import PostedJobs from './src/ManageJobs/PostedJobs';
import ViewProposals from './src/ManageJobs/ViewProposals';
import SecuritySettings from './src/SecuritySetting/SecuritySettings';
import ChangePassword from './src/SecuritySetting/ChangePassword';
import DeleteAccount from './src/SecuritySetting/DeleteAccount';
import AccountSecuritySetting from './src/SecuritySetting/AccountSecuritySetting';
import ManageEmailNotification from './src/SecuritySetting/ManageEmailNotification';
import PayoutSetting from './src/PayoutSettings/PayoutSetting';
import HireSetMilestone from './src/ManageJobs/HireSetMilestone';
import ManageMilestones from './src/ManageJobs/ManageMilestones';
import AddPortfolio from './src/ManagePortfolios/AddPortfolio';
import PortfolioListings from './src/ManagePortfolios/PortfolioListings';
import PortfolioDetail from './src/ManagePortfolios/PortfolioDetail';
import IdentityVerification from './src/Dashboard/IdentityVerification';
import Notification from './src/Dashboard/Notification';
import AboutUs from './src/GeneralPages/AboutUs';
import Settings from './src/GeneralPages/Settings';
import Contact from './src/GeneralPages/Contact';
import * as CONSTANT from './src/Constants/Constant';
import styles from './src/Constants/Styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
console.disableYellowBox = true;
let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  return {
    opacity,
    transform: [{scaleY}],
  };
};
const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;
      const width = layout.initWidth;
      const {index, route} = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: CollapseExpand(index, position, width),
      }[transition];
    },
  };
};
class App extends Component {
  state = {
    data: [],
  };
  constructor() {
    super();
    this.state = {
      connection_Status: '',
    };
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({connection_Status: 'Online'});
      } else {
        this.setState({connection_Status: 'Offline'});
      }
    });
  }
  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     'connectionChange',
  //     this._handleConnectivityChange,
  //   );
  // }
  // componentWillUnmount() {
  //   NetInfo.isConnected.removeEventListener(
  //     'connectionChange',
  //     this._handleConnectivityChange,
  //   );
  // }
  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({connection_Status: 'Online'});
    } else {
      this.setState({connection_Status: 'Offline'});
    }
  };
  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({connection_Status: 'Online'});
    } else {
      this.setState({connection_Status: 'Offline'});
    }
  };
  componentDidMount() {
    this.CheckApplicationAccess();
  }
  CheckApplicationAccess = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
    const json = await response.json();
    this.setState({data: json});
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.connection_Status === 'Offline' ? (
          <View style={{flex: 1}}>
            <Image
              style={{
                resizeMode: 'contain',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                textAlign: 'center',
              }}
              source={require('./src/Images/NoInternet.png')}
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <AppContainer />
            <Pushnoti/>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    );
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Dash')}

        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f7f7',
        }}>
        {Platform.OS === 'ios' ? (
          <StatusBar
            backgroundColor={"#f7f7f7"}
            barStyle="dark-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        <View
         //
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.4,
            position: 'relative',
          }}
        />
        <View
          style={{
            position: 'absolute',
            flex: 1,
            left: 0,
            top: '5%',
            height: '100%',
            width: '100%',
            alignSelf: 'center',
          }}>
          <Image
            resizeMode={"contain"}
            style={{
              width: 320,
              marginTop: 20,
              alignSelf: 'center',
            }}
            source={require('./src/Images/logo.png')}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              opacity:0.8,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: -65,
              fontFamily:"Poppins-Medium"
            }}>
            {CONSTANT.welcomeMain}
          </Text>
          <Text
            onPress={() => this.props.navigation.navigate('Dash')}
            style={{
              color: '#000',
              fontSize: 16,
              alignSelf: 'center',
              padding: 20,
              opacity:0.8,
              fontFamily:"Poppins-Medium",
              marginTop: -10,
            }}>
            {CONSTANT.welcomeSkip}
          </Text>
        
        </View>
      </TouchableOpacity>
    );
  }
}
componentDidMount = () => {
  this.CheckApplicationAccess();
};
CheckApplicationAccess = async () => {
  const response = await fetch(CONSTANT.BaseUrl + 'user/get_access');
  const json = await response.json();
  this.setState({ ApplicationAccessJob: json.access_type.job_access });
  var ApplicationAccessJobWJO = this.state.ApplicationAccessJob
};

const DashboardTabNavigator = createBottomTabNavigator(
  {
    // MainNavigator: MainDrawer},{
    Home: {
      screen: Jobs,
      navigationOptions: {
        headerStyle: {
          backgroundColor: CONSTANT.primaryColor,
        },
        headerTintColor: CONSTANT.primaryColor,
        tabBarLabel: CONSTANT.HomeBottomTabHome,
        tabBarIcon: ({tintColor}) => (
          <AntIcon name="search1" color={tintColor} size={25} />
        ),
      },
    },
    ControlPanel: {
      screen: Insight,
      navigationOptions: {
        tabBarLabel: CONSTANT.HomeBottomTabDashboard,
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="view-dashboard" color={tintColor} size={25} />
        ),
      },
    },
    Freelancers: {
      screen: Freelancers,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
        tabBarLabel: CONSTANT.HomeBottomTabFreelancer,
        tabBarIcon: ({tintColor}) => (
          <FontAwesome5 name="users" color={tintColor} size={25} />
        ),
      },
    },
    Employers: {
      screen: Employers,
      navigationOptions: {
        tabBarLabel: CONSTANT.HomeBottomTabEmployer,
        tabBarIcon: ({tintColor}) => (
          <FontAwesome5 name="building" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: ProfileTabs,
      navigationOptions: {
        tabBarLabel: CONSTANT.HomeBottomTabProfile,
        tabBarIcon: ({tintColor}) => (
          <FontAwesome5 name="user" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
    tabBarOptions: {
      activeTintColor: CONSTANT.primaryColor,
      style : {backgroundColor:"#FFFFFF",height:70,borderTopColor:"#FFFFFF",paddingBottom:10,paddingTop:10}
    },
  },
  {
    headerMode: 'none',
  },
);
const DashboardTabNavigatorWOJ = createBottomTabNavigator(
  {
    // MainNavigator: MainDrawer},{
    Home: {
      screen: home,
      navigationOptions: {
        headerStyle: {
          backgroundColor: CONSTANT.primaryColor,
        },
        headerTintColor: CONSTANT.primaryColor,
        tabBarLabel: CONSTANT.HomeBottomTabHome,
        tabBarIcon: ({tintColor}) => (
          <AntIcon name="home" color={tintColor} size={25} />
        ),
      },
    },
    // Jobs: {
    //   screen: Jobs,
    //   navigationOptions: {
    //     tabBarLabel: CONSTANT.HomeBottomTabJobs,
    //     tabBarIcon: ({tintColor}) => (
    //       <AntIcon name="appstore-o" color={tintColor} size={25} />
    //     ),
    //   },
    // },
    Freelancers: {
      screen: Freelancers,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
        tabBarLabel: CONSTANT.HomeBottomTabFreelancer,
        tabBarIcon: ({tintColor}) => (
          <AntIcon name="user" color={tintColor} size={25} />
        ),
      },
    },
    Employers: {
      screen: Employers,
      navigationOptions: {
        tabBarLabel: CONSTANT.HomeBottomTabEmployer,
        tabBarIcon: ({tintColor}) => (
          <AntIcon name="wallet" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: ProfileTabs,
      navigationOptions: {
        tabBarLabel: CONSTANT.HomeBottomTabProfile,
        tabBarIcon: ({tintColor}) => (
          <AntIcon name="setting" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
    tabBarOptions: {
      activeTintColor: CONSTANT.primaryColor,
    },
  },
  {
    headerMode: 'none',
  },
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    Profile: Profile,
    ProfileTabs:ProfileTabs,
    Employers: Employers,
    Jobs: Jobs,
    NotificationCounter:NotificationCounter,
    DetailFreelancerScreen: DetailFreelancerScreen,
    DetailJobScreen: DetailJobScreen,
    DetailCompanyScreen: DetailCompanyScreen,
    SearchScreen: SearchScreen,
    EmployerLayout: EmployerLayout,
    LoginScreen: LoginScreen,
    PostJob: PostJob,
    PostService: PostService,
    SendOffer: SendOffer,
    CustomHeader: CustomHeader,
    PreLoader: PreLoader,
    Favorite: Favorite,
    SendProposal: SendProposal,
    SearchScreenFreelancer:SearchScreenFreelancer,
    SearchScreenEmployer:SearchScreenEmployer,
    SearchResultFreelancer: SearchResultFreelancer,
    SearchResultEmployer: SearchResultEmployer,
    SearchResultJob: SearchResultJob,
    SearchResultService: SearchResultService,
    Signup: Signup,
    signupEmployer:signupEmployer,
    EmployerLogin:EmployerLogin,
    signupFreelancer:signupFreelancer,
    JobbyCategorylist: JobbyCategorylist,
    SendReport: SendReport,
    ForgetPassword: ForgetPassword,
    DetailServiceScreen: DetailServiceScreen,
    VerificationAccount: VerificationAccount,
    BuyServiceScreen: BuyServiceScreen,
    BuyServiceWebview: BuyServiceWebview,
    MessagesList: MessagesList,
    MessageSingleListCard: MessageSingleListCard,
    DetailMessageScreen: DetailMessageScreen,
    SocketChat: SocketChat,
    Insightstar: Insightstar,
    Insight: Insight,
    Invoices:Invoices,
    InvoiceDetailPage:InvoiceDetailPage,
    Disputes:Disputes,
    Packages: Packages,
    LatestProposals: LatestProposals,
    DetailOngoing: DetailOngoing,
    PostedServices: PostedServices,
    CompletedServices: CompletedServices,
    CompleteServicesDetail: CompleteServicesDetail,
    OngoingServices: OngoingServices,
    OngoingServicesDetail: OngoingServicesDetail,
    AddonsServices: AddonsServices,
    CancelledServices: CancelledServices,
    OngoingJobs: OngoingJobs,
    CompletedJobs: CompletedJobs,
    CancelledJobs: CancelledJobs,
    PostedJobs: PostedJobs,
    ViewProposals: ViewProposals,
    ManageEmailNotification: ManageEmailNotification,
    AccountSecuritySetting: AccountSecuritySetting,
    DeleteAccount: DeleteAccount,
    ChangePassword: ChangePassword,
    SecuritySettings:SecuritySettings,
    PayoutSetting:PayoutSetting,
    HireSetMilestone:HireSetMilestone,
    ManageMilestones:ManageMilestones,
    AddPortfolio: AddPortfolio,
    PortfolioListings: PortfolioListings,
    PortfolioDetail: PortfolioDetail,
    IdentityVerification: IdentityVerification,
    Notification: Notification,
    Settings:Settings,
    AboutUs: AboutUs,
    Contact: Contact,
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    transitionConfig: TransitionConfiguration,
  },
);
const AppSwitchNavigator = createSwitchNavigator(
  {
    PreLoader: {screen: PreLoader},
    Welcome: {screen: WelcomeScreen},
    Dash: {screen: DashboardStackNavigator},
  },
);
const AppContainer = createAppContainer(AppSwitchNavigator);

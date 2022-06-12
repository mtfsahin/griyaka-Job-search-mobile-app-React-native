import { StyleSheet, I18nManager } from "react-native";
import * as CONSTANT from './Constant';
//import {I18nManager} from 'react-native';
I18nManager.forceRTL(false);

export default StyleSheet.create({
  //------------------------------- Global Styles -------------------------------
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  container1: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  section1: {
    paddingLeft: 17,
    paddingRight: 10,
    marginTop: -13
  },
  section3: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  ActivityIndicatorAreaStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#FFFFFF"
  },
  ActivityIndicatorStyle: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#ffffff",
    elevation: 5
  },
  SpinnerTextStyle: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000',
    elevation: 5,
    //fontFamily:CONSTANT.PoppinsMedium
  },
  MultiSelectArea: {
    marginBottom: 10
  },
  MultiSelectstyleMainWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 10,
  },
  MultiSelectstyleDropdownMenuSubsection: {
    backgroundColor: "#ffffff",
    paddingRight: -7,
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.5,
    borderColor: "#dddddd",
  },
  TextInputLayoutStyle: {
    flex: 1,
    marginTop: 10,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#dddddd",
    color: "#323232",
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
    //fontFamily:CONSTANT.PoppinsMedium,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  TextInputLayoutStyle1: {
    flex: 1,
    marginTop: 10,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#dddddd",
    color: "#323232",
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
    //fontFamily:CONSTANT.PoppinsMedium,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TextInputLayoutStyleForDetail: {
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#dddddd",
    color: "#323232",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    //fontFamily:CONSTANT.PoppinsMedium,
    fontSize: 14,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  CollapseMain: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#dddddd',
  },
  CollapseHeaderStyle: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  CollapseHeaderText: {
    color: CONSTANT.SectionHeadingFontColor,
    fontSize: CONSTANT.SectionHeadingFontSize,
    // fontFamily:CONSTANT.NunitoBold,
  },
  MainHeadingTextStyle: {
    color: CONSTANT.TextColorDark,
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  SectionHeadingTextStyle: {
    color: CONSTANT.TextColorDark,
    fontSize: CONSTANT.SectionHeadingFontSize,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'left',
  },
  SectionHeadingTextStyle1: {
    color: CONSTANT.TextColorDark,
    fontWeight: '500',
    fontFamily: "Poppins-Medium",
    fontSize: 27,
    textAlign: 'left',
  },
  CardHeadingTextStyle: {
    color: CONSTANT.TextColorGrey,
    fontSize: CONSTANT.SectionHeadingFontSize,
    textAlign: 'left',
  },
  NameTextStyle: {
    color: '#181A1F',
    fontSize: CONSTANT.ParagraphFontSize,
    fontWeight: '500',
    textAlign: 'left',
  },
  NameTextStyle1: {
    color: '#27292F',
    fontSize: CONSTANT.ParagraphFontSize,
    fontWeight: '500',
    opacity: 0.8,
    textAlign: 'left',
    fontFamily: "Poppins-Medium",
    marginTop: -5,
  },
  NameTextStyleTitle: {
    color: '#343435',
    fontSize: 12,
    opacity: 0.75,
    textAlign: 'left',
    fontFamily: "Poppins-Bold",
    marginBottom: 0,
  },
  NameTextStyleTitle1: {
    color: '#343435',
    fontSize: 12,
    opacity: 0.75,
    textAlign: 'left',
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  NameTextContent: {
    color: '#181A1F',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: "Poppins-Regular",
  },
  ParagraphTextStyle: {
    color: CONSTANT.TextColorGrey,
    fontSize: CONSTANT.ParagraphFontSize,
    textAlign: 'left',
  },
  OtherTextStyle: {
    color: CONSTANT.TextColorGrey,
    fontSize: CONSTANT.OtherFontSize,
    textAlign: 'left',
    fontFamily: "Poppins-Medium",

  },
  MainButtonArea: {
    height: 40,
    marginVertical: 10,
    borderRadius: 5,
    width: "40%",
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: CONSTANT.primaryColor
  },
  ButtonText: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins-Bold"
  },
  RadioLabelStyle: 14,
  RadioButtonStyle: {
    flexDirection: 'row',
    //marginBottom: 10,
  },
  Elevation: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    //shadowRadius: 5,
  },
  NoDataMainArea: {
    flex: 1,
    marginTop: 15,
    // alignContent: 'center',
    // height: '100%',
    // width: '100%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoDataImageStyle: {
    width: 150,
    height: 150,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loadMorebtnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: CONSTANT.PoppinsMedium,
  },

  //--------------------------- EmployerLayout Styles ---------------------------
  EmployerLayoutMainArea: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    borderRadius: 5,
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    height: 170,
    marginBottom: 15,
  },
  EmployerLayoutBannerArea: {
    height: 80,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  EmployerLayoutDetailArea: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 2,
  },
  EmployerLayoutImgArea: {
    width: 70,
    marginLeft: 15,
    marginTop: 45,
    marginBottom: 15,
    height: 70,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  EmployerLayoutImgStyle: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  EmployerLayoutNameArea: {
    flexDirection: "column",
    marginLeft: 15,
    marginTop: 95,
    marginBottom: 15
  },
  EmployerLayoutIconArea: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 37,
    padding: 4,
    borderColor: "#dddddd"
  },
  EmployerLayoutIconStyle: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 2,
    marginLeft: 1,
    marginRight: 1
  },


  //------------------------------ PostJob Styles -------------------------------
  PostJobSectionHeadingArea: {
    height: 60,
    justifyContent: "center",
    marginVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#fcfcfc",
    borderLeftWidth: 5,
    borderLeftColor: CONSTANT.primaryColor
  },
  PostJobButtonsArea: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },


  //------------------------- FreelancerCategory Styles -------------------------
  FreelancerCategoryshadow: {
    position: 'relative',
    flexDirection: "row",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    backgroundColor: "#fffdf3",
    overflow: "visible",
    marginBottom: 10,
    marginRight: 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    zIndex: -1,
  },
  FreelancerCategoryshadow2: {
    position: 'relative',
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    backgroundColor: "#ffffff",
    overflow: "visible",
    marginBottom: 10,
    marginRight: 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    shadowRadius: 2,
    elevation: 2,
    zIndex: -1,
    paddingLeft: 10,
  },
  FreelancerCategoryFeaturedImgStyle: {
    width: 10,
    marginLeft: -22,
    marginTop: 2,
    marginBottom: 2,
    position: "relative",
    height: 10
  },
  FreelancerCategoryImageStyle: {
    width: 60,
    marginBottom: 15,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 5,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    borderColor: "transparent",
    height: 60
  },
  FreelancerCategoryviewStyle: {
    flexDirection: "column",
    overflow: "hidden",
    marginRight: 30,
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  FreelancerCategoryFlagImgStyle: {
    resizeMode: "cover",
    paddingLeft: 10,
    height: 8,
    width: 15,
    alignItems: "center",
    marginTop: 4,
    marginLeft: 10,
    marginRight: 5,
  },
  FreelancerCategoryIconArea: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    right: -15,
    borderWidth: 1,
    borderColor: "#dddddd",
    overflow: 'hidden',
  },
  FreelancerCategoryIconStyle: {
    backgroundColor: '#fff',
    alignSelf: "center",
    textAlign: "center",
    marginTop: 2,
    marginLeft: 1,
    marginRight: 1
  },

  //------------------------- CompleteJobLayout Styles --------------------------
  CompleteJobLayoutshadow: {
    marginTop: -15,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  CompleteJobLayoutmainStyle: featuredCompleteJobColor => ({
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: featuredCompleteJobColor != '' ? "#fff" : "#fff",
  }),
  CompleteJobLayoutInfoArea: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: 'center'
  },
  CompleteJobLayoutFeaturedImgStyle: {
    width: 10,
    marginTop: -23,
    marginLeft: 3,
    marginBottom: 23,
    position: "relative",
    height: 10
  },
  CompleteJobLayoutFeaturedText: {
    width: 60,
    marginTop: -27,
    marginLeft: 15,
    marginBottom: 23,
    height: 14,
    color: 'white',
    fontSize: 13,
  },
  CompleteJobLayoutFlagImgStyle: {
    resizeMode: "cover",
    height: 8,
    width: 13,
  },
  CompleteJobLayoutIconArea: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    right: -15,
    top: '50%',
    marginTop: -15,
    borderWidth: 1,
    borderColor: "#dddddd",
    overflow: 'hidden',
  },
  CompleteJobLayoutIconStyle: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 2,
    marginLeft: 1,
    marginRight: 1
  },

  //---------------------------- PostService Styles -----------------------------
  PostServiceHeadingBorder: {
    borderBottomColor: "#c0c0c0",
    borderBottomWidth: 0.6,
    marginBottom: 15
  },
  PostServiceAddArea: {
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10
  },
  PostServiceAddInfoArea: {
    height: 45,
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: "#f7f7f7",
    marginBottom: 5,
    paddingLeft: 10
  },
  PostServiceAddDeleteIconArea: {
    height: 45,
    width: 45,
    backgroundColor: CONSTANT.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PostServiceAddVideoURLArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PostServiceAddVideoURLTextInputStyle: {
    width: '80%',
    marginBottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  PostServiceAddVideoURLIconArea: {
    backgroundColor: CONSTANT.primaryColor,
    height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0.7,
    borderColor: CONSTANT.primaryColor,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //---------------------------- addProperty Styles -----------------------------
  //---------------------------- addProperty Styles -----------------------------
  //---------------------------- addProperty Styles -----------------------------
  //------------------------ DetailCompanyScreen Styles -------------------------
  DetailCompanyInfoArea: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: -80,
    marginBottom: 10,
    borderRadius: 5,
  },
  DetailCompanyNameArea: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  DetailCompanyImageStyle: {
    borderRadius: 3,
    width: 60,
    marginBottom: 15,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 20,
    height: 60
  },
  DetailCompanyScreenviewStyle: {
    flexDirection: "column",
    justifyContent: 'center',
    overflow: "hidden",
    marginRight: 30,
    marginTop: 15,
    marginBottom: 15
  },
  DetailCompanyInfoAreaBorder: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.6,
    marginBottom: 10
  },
  DetailCompanyIDArea: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  DetailCompanyButtonMainArea: {
    flexDirection: "row",
    margin: 20,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20
  },
  DetailCompanySavedButtonArea: {
    width: "80%",
    backgroundColor: "#00cc8d",
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  DetailCompanyShareButtonArea: {
    width: "20%",
    backgroundColor: "#00cc8d",
    height: 40,
    borderRadius: 4,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  //----------------------- DetailFreelancerScreen Styles -----------------------
  DetailFreelancerviewStyle: {
    flexDirection: "column",
    overflow: "hidden",
    marginRight: 30,
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  DetailFreelancerMainDetailArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#dddddd",
    borderTopWidth: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  DetailFreelancerStatusMainArea: {
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  DetailFreelancerStatusInfoArea: {
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: "#ffffff",
    width: "50%",
    paddingTop: 20,
    paddingBottom: 20
  },


  //--------------------- AwardCard and ProjectsCard Styles ---------------------
  AwardandProjectMainArea: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#ffffff",
    marginBottom: 10,
    marginTop: 5,
    padding: 20,
    borderRadius: 5,
  },
  AwardandProjectImageStyle: {
    borderRadius: 3,
    width: 60,
    marginRight: 10,
    height: 60
  },
  AwardandProjectInfoArea: { flexDirection: "column" },

  //------------------ EducationCard and ExperienceCard Styles ------------------
  EducationandExperienceMainArea: {
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  EducationandExperienceIconArea: {
    flexDirection: "row",
    marginTop: 10
  },

  //----------------------------- SkillCard Styles ------------------------------
  SkillCardFlatlistStyle: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10
  },
  SkillCardInfoArea: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  SkillCardProgressBarStyle: { marginVertical: 10 },

  //---------------------------- FeedbackCard Styles ----------------------------
  FeedbackCardMainArea: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    marginTop: 5,
    paddingVertical: 20,
    borderRadius: 5,
  },
  FeedbackCardInfoArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10
  },
  FeedbackCardImageStyle: {
    borderRadius: 3,
    width: 60,
    marginRight: 10,
    height: 60
  },
  FeedbackCardDetailArea: {
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  FeedbackCardDetailSection: {
    flexDirection: "column",
    alignItems: "center",
    width: "25%",
  },

  //----------------------------- SendOffer Styles ------------------------------


  //------------------------------ Profile Styles -------------------------------
  profileWt_main: {
    flexDirection: "column",
    position: "relative",
    width: "100%",
    paddingBottom: 10,
  },
  profileBorderBottom: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.6
  },
  profileInfoArea: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: 'center'
  },
  profileTextInputCustom: {
    height: 45,
    borderWidth: 0,
    marginBottom: -10,
    paddingHorizontal: 0,
  },

  //-------------------------- DetailJobScreen Styles ---------------------------
  DetailJobScreenMainArea: {
    backgroundColor: "#F5F7FC",
    marginBottom: "25%"
  },
  DetailJobScreenMainDetailArea: {
    flexDirection: 'column',
    marginTop: 10
  },
  DetailJobScreenMainDetailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    padding: 10,
  },
  DetailJobScreenFooterArea: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  DetailJobScreenSendButtonArea: {
    flex: 3,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'red',
    height: 40,
    borderRadius: 4,
  },
  DetailJobScreenAlertButtonArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: CONSTANT.primaryColor,
    height: 40,
    borderRadius: 4,
    marginLeft: 5,
  },

  //--------------------------- JobAttachments Styles ---------------------------
  JobAttachmentsArea: {
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: "#ffffff",
    width: 170,
    height: 170,
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 20,
    marginRight: 10,
    padding: 10,
    borderRadius: 4,
  },
  JobAttachmentsImageStyle: {
    borderRadius: 3,
    width: 80,
    height: 80
  },

  //---------------------------- SendProposal Styles ----------------------------
  SendProposalProfessorInfoArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  SendProposalProfessorInfoSection: {
    flexDirection: 'row',
    alignItems: "center",
    width: '50%',
    marginVertical: 5
  },
  SendProposalAmountMainArea: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'column',
    borderColor: '#dddddd',
  },
  SendProposalAmountArea: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  SendProposalTextInputStyle: {
    fontSize: CONSTANT.HeadingFontSize,
    fontWeight: '700',
    textAlign: 'center'
  },
  SendProposalButtinsArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  //-------------------------------- home Styles --------------------------------
  HomeimageSlider: {
    height: "100%",
    position: "relative",
    zIndex: 2
  },
  HomeimageOpacity: {
    backgroundColor: "#000",
    opacity: 0.74,
    zIndex: 1,
    height: 200
  },
  HomejobTextBAckground: {
    marginTop: -110
  },

  //----------------------------- LatestJobs Styles -----------------------------
  LatestJobsshadow: featuredJObColor => ({
    display: "flex",
    margin: 5,
    width: 255,
    height: '100%',
    paddingBottom: 5,
    borderRadius: 4,
    backgroundColor: featuredJObColor != '' ? "#fffdf3" : "#fff",
    flexDirection: "column",
    borderRadius: 4,
    borderWidth: 0,
    borderColor: "transparent",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    marginBottom: -15
  }),

  //---------------------------- DetailSearch Styles ----------------------------
  DeatilSearchInfoArea: {
    height: 45,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderLeftWidth: 5,
    borderLeftColor: CONSTANT.primaryColor,
    marginBottom: 5,
  },

  //-------------------------- BuyServiceScreen Styles --------------------------
  BuyServiceDetailArea: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  BuyServiceInfoArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

  //------------------------ DetailServiceScreen Styles -------------------------
  DetailServiceSnapCarousalArea: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
  SnapCarousalImg: {
    height: 200,
    borderRadius: 10
  },
  DetailServiceDetailArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dddddd",
  },

  ServiceSkillContainer: {
    padding: 5,
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 5
  },

  //------------------------------ Header Styles --------------------------------
  HeaderMainArea: {
    height: 60,
    paddingVertical: 10,
    backgroundColor: CONSTANT.primaryColor,
    flexDirection: "row",
  },
  HeaderMainArea1: {
    height: 60,
    paddingVertical: 10,
    backgroundColor: CONSTANT.headerColor1,
    flexDirection: "row",
  },
  HeaderSection1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  HeaderSection2: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  HeaderSection3: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: "center"
  },
  //-------------------------- LatestProposal Styles ----------------------------

  //----------------------------- ManageJobs Styles -----------------------------
  ManageJobsProjectsMainArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  ManageJobsProjectsImageArea: {
    borderRadius: 5,
    backgroundColor: "#d7f3ff",
    height: 130,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 10
  },
  ManageJobsProjectsInfoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ManageJobsProjectsFreelancerMainArea: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#dddddd",
    paddingTop: 10,
  },
  ManageJobsProjectsFreelancerImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },

  //---------------------------- ProfileTabs Styles -----------------------------
  profileTabsTebHeadingFontFamily: {
    fontFamily: CONSTANT.PoppinsMedium,
  },
  profileTabsTextStyle: { fontSize: 15 },
  profileTabsUnderlineStyle: { backgroundColor: 'red' },
  profileTabsStyle: { height: '100%' },

  //--------------------------- SocialProfile Styles ----------------------------
  SocialProfileTextInputStyle: {
    height: 50,
    color: "#323232",
    paddingHorizontal: 20,
    justifyContent: 'center',
    fontSize: 14,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    width: '85%'
  },

  //---------------------- AccountSecuritySetting Styles -----------------------
  Accountsecuritycontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  AccountsecurityScrollArea: { height: '90%' },
  AccountsecurityScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    paddingHorizontal: 10
  },
  AccountsecurityScrollDetailText: {
    color: '#323232',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'left'
  },
  AccountsecurityScrollDisableArea: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%'
  },
  AccountsecurityScrollDisableText: {
    color: '#323232',
    width: '85%',
    textAlign: 'left'
  },
  AccountsecurityScrollSwitch: {
    alignSelf: 'flex-end',
    marginTop: -8,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },

  //-------------------------- ChangePassword Styles ---------------------------
  changePasswordcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  changePasswordScrollArea: { height: '90%' },
  changePasswordScrollStyle: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 4,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    paddingHorizontal: 10
  },

  //--------------------------- DeleteAccount Styles ---------------------------
  deleteAccountcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  deleteAccountScrollArea: { height: '90%' },
  deleteAccountScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 10
  },
  deleteAccountMultiStyle: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  deleteAccountMultiDropdownStyle: { backgroundColor: '#000' },
  deleteAccountMultiSearchInput: { color: '#CCC' },

  //---------------------- ManageEmailNotification Styles ----------------------
  emailcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  emailScrollArea: { height: '90%' },
  emailScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 10
  },
  emailTextArea: {
    height: 50,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    marginBottom: 10,
    justifyContent: 'center',
  },
  emailTextStyle: {
    color: "#323232",
    fontFamily: CONSTANT.PoppinsMedium,
    marginHorizontal: 10,
  },

  //------------------------- SecuritySettings Styles --------------------------
  tabBarTextStyle: { fontSize: 12, textAlign: 'center' },
  tabBarUnderlineStyl: { backgroundColor: CONSTANT.primaryColor },
  tabBarStyle: { height: '100%' },

  // PersonalDetailDeleteBTN:{
  //   backgroundColor: '#ff5851',
  //   width: '15%',
  //   justifyContent: 'center',
  //   alignItems:'center',
  // },
  // PersonalDetailEditBTN:{
  //   backgroundColor: '#3d4461',
  //   width: '15%',
  //   justifyContent: 'center',
  //   alignItems:'center',
  // },
  // PersonalDetailSectionArea:{
  //   marginLeft: 10, 
  //   marginRight: 10, 
  //   marginBottom: 10
  // },
  // PersonalDetailDownloadArea:{
  //   backgroundColor:'#fff',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems:'center',
  //   borderRadius: 4,
  //   borderStyle: 'dashed',
  //   borderColor: '#dddddd',
  //   borderWidth: 1,
  //   height: 150,
  //   marginBottom: 10,
  //   marginHorizontal:10
  // },
  // PersonalDetailDownloadText:{
  //   color: '#767676', 
  //   fontSize: 17,
  //   fontFamily:CONSTANT.PoppinsRegular,
  // },
  //---------------------------- addProperty Styles -----------------------------
  //-------------------------- PersonalDetail Styles ----------------------------
  PersonalDetailbuttonHover: {
    width: 150,
    height: 50,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    //marginLeft: 10,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: { width: 1, height: 13 },
    fontSize: 13,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PersonalDetailbuttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  PersonalDetailmap: {
    height: 250,
    borderRadius: 5
  },
  PersonalDetailSectionsStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  PersonalDetailCustomTextInputArea: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  PersonalDetailCustomTextInputStyle: {
    paddingLeft: 10,
    borderRadius: 2,
    height: 50,
    color: '#323232',
    borderWidth: 0.6,
    borderColor: '#dddddd',
    marginBottom: 10,
    width: '80%',
  },
  PersonalDetailCustomTextInputIconArea: {
    backgroundColor: '#3d4461',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  PersonalDetailCollapseHeaderArea: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    //marginHorizontal:10,
    marginBottom: 5,
    borderWidth: 0.6,
    borderColor: '#dddddd',
    borderRadius: 2,
    overflow: 'hidden',
  },
  PersonalDetailCoollapseHeaderTextArea: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  PersonalDetailCollapseBodyArea: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  PersonalDetailPhoneNumbersText: {
    alignSelf: 'center',
    paddingLeft: 10,
    fontFamily: CONSTANT.PoppinsRegular,
  },
  PersonalDetailCoollapseHeaderText: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    fontFamily: CONSTANT.PoppinsRegular,
  },
  PersonalDetailDeleteBTN: {
    backgroundColor: '#ff5851',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PersonalDetailEditBTN: {
    backgroundColor: '#3d4461',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PersonalDetailSectionArea: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  PersonalDetailImageArea: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PersonalDetailImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2
  },
  PersonalDetailDownloadArea: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderStyle: 'dashed',
    borderColor: '#dddddd',
    borderWidth: 1,
    height: 150,
    width: '50%',
    marginBottom: 10,
  },
  PersonalDetailDownloadText: {
    color: '#767676',
    fontSize: 17,
    fontFamily: CONSTANT.PoppinsRegular,
  },
  PersonalDetailFooterArea: {
    backgroundColor: '#3fabf3',
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  PersonalDetailFooterText: {
    color: '#fff',
    justifyContent: 'center',
    fontSize: 16,
    top: 20,
    fontFamily: CONSTANT.PoppinsMedium,
  },

  //---------------------------- AddFeedback Styles ----------------------------
  addFeedbackContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  addFeedbackText: {
    fontSize: 15,
    margin: 10,
    fontWeight: '700'
  },
  AddFeedbackRadioArea: { marginLeft: 10 },

  //----------------------------- AboutUs Styles -------------------------------
  aboutUsMainText: {
    margin: 20,
    fontSize: 20,
    fontFamily: CONSTANT.PoppinsMedium,
    textAlign: 'left',
  },
  aboutUsView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10
  },
  aboutUsTextArea: {
    flexDirection: 'row',
    marginRight: 10
  },
  aboutUsTextRegular: {
    fontSize: 16,
    fontFamily: CONSTANT.PoppinsRegular,
  },
  aboutUsTextBold: {
    fontSize: 16,
    fontFamily: CONSTANT.PoppinsBold,
  },

  //----------------------------- Contact Styles -------------------------------
  contactMainArea: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextArea: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactHeadingText: {
    fontSize: 20,
    fontFamily: CONSTANT.PoppinsBold,
  },
  contactInfoText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: CONSTANT.PoppinsMedium,
  },
  settings: { backgroundColor: "white", height: 60, justifyContent: "center", borderBottomColor: "#909090", borderBottomWidth: 1 },
  settingsFont: { fontFamily: "Poppins-Regular", fontSize: 16 }
  //---------------------------- addProperty Styles -----------------------------
  //---------------------------- addProperty Styles -----------------------------
})

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import SimpleHeader from "../Header/SimpleHeader";


const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class Signup extends Component {

  render() {

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar
            backgroundColor={"#FFFFFF"}
            barStyle="dark-content"
          />
        ) : (
          <StatusBar hidden />
        )}
        <SimpleHeader/>

        <View style={styles.descriptionContainerVer}>
          <View style={styles.descriptionContainerHor}>
            <View style={{ marginBottom: 10,marginTop:-40 }}>
              <Text style={styles.descriptionText3}>Griyaka eleman arıyorum.</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.descriptionText4}>Hemen tıkla ve üyelik oluştur.</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate("signupEmployer", {
            
              })}style={{ borderColor: "#909090", borderWidth: 1, paddingRight: 15, paddingLeft: 15, paddingBottom: 3, paddingTop: 3, borderRadius: 3 }}>
              <Text style={styles.descriptionText} numberOfLines={5} >
                Eleman Arıyorum
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionContainerVer2}>
          <View style={styles.descriptionContainerHor4}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.descriptionText5}>Griyaka'lıyım iş bulmak istiyorum.</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.descriptionText6}>Hemen tıkla ve üyelik oluştur.</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("signupFreelancer", {
            
          })}style={{ borderColor: "white", borderWidth: 1, paddingRight: 15, paddingLeft: 15, paddingBottom: 3, paddingTop: 3, borderRadius: 3 }}>
              <Text style={styles.descriptionText2} numberOfLines={5} >
                İş Arıyorum
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'grey'
  },
  descriptionContainerVer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  descriptionContainerVer2: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#909090',
    paddingLeft: "20%",
    paddingRight: "20%",

  },
  descriptionContainerVer3: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  descriptionContainerHor: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  descriptionContainerHor4: {
    flex: 1,
    backgroundColor: "#909090",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  descriptionContainerHor3: {
    flex: 1,
    backgroundColor: "#909090",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#909090",
    borderWidth: 1,
    borderRadius: 3,
  },
  descriptionText: {
    fontSize: 20,
    color: '#909090',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },
  descriptionText2: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },
  descriptionText3: {
    fontSize: 20,
    color: '#000000',
    opacity: 0.9,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },
  descriptionText4: {

    fontSize: 15,
    color: '#000000',
    opacity: 0.7,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },
  descriptionText5: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },
  descriptionText6: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: "Poppins-Medium"
  },

});


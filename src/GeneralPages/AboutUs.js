import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { withNavigation, DrawerActions } from 'react-navigation';
import SimpleHeader from "../Header/SimpleHeader";
import * as CONSTANT from "../Constants/Constant";
import styles from "../Constants/Styles";

class AboutUs extends Component {
  render() {
    return (
      <View style={{flex: 1,backgroundColor:"white"}}>
        <SimpleHeader HeaderText={CONSTANT.AboutUs} />
        <ScrollView>
          <View>
            <Text style={{
              margin: 20,
              fontSize: 18,
              fontFamily:"Poppins-Mediıum",
              textAlign: 'left'
            }}>
              {CONSTANT.AboutUsMain}
            </Text>
            <View style={styles.aboutUsView}>
              <View style={styles.aboutUsTextArea}>
              </View>
            </View>
            <View  style={{marginTop: 20 }} >
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.aboutUsTextBold}>{CONSTANT.AboutUsCompanyName}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
              <Text style={styles.aboutUsTextBold}>{CONSTANT.AboutUsAPPversionText} : {CONSTANT.AboutUsAppVersion}</Text>
            </View>
            </View>
           

          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AboutUs);

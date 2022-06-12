import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, AsyncStorage, Alert, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '../Constants/Styles';
import * as CONSTANT from '../Constants/Constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleHeader from '../Header/SimpleHeader';
import { WebView } from 'react-native-webview';

class Invoices extends Component {

	state = {
    data: [],
		isLoading: true,
    offset: 1,
    listLoading: false,
    hideLoadMore: false
  };

	componentDidMount() {
    this.fetchInvoicesData();
  }
	fetchInvoicesData = async () => {
    this.setState({ listLoading: true });
		const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + "profile/get_invoice_listings?user_id=" + Uid + "&page_number=" + this.state.offset
    );
		const json = await response.json();
		if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ hideLoadMore: true, listLoading: false, isLoading: false }); // empty data set
    } else {
      this.setState({ data: ([...this.state.data, ...json]), offset: this.state.offset + 1, isLoading: false, listLoading: false });
    }
		
		console.log("data" , this.state.data);
	};

  renderFooter = () =>  {
    return (
      //Footer View with Load More button
      <View>
        {(!this.state.hideLoadMore && this.state.data.length > 9) &&
          <View>
            <TouchableOpacity
              onPress={this.fetchInvoicesData}
              style={styles.MainButtonArea}
            >
              <Text style={styles.ButtonText}>
                {CONSTANT.LoadMore}
              </Text>
              {this.state.listLoading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }

	
  render() {
		const {
      storedType,
			isLoading,
    } = this.state;
    return (
      <View style={styles.container}>
				<SimpleHeader HeaderText={CONSTANT.DrawerInvoices} />
        {isLoading && storedType !== "" ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.data.length >= 1 ? 
          <View style={{flex: 1}}>
            <FlatList
              style={styles.section}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              ListFooterComponent={this.renderFooter}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) => (
                <View
                  // onPress = {() => Linking.canOpenURL('https://google.com').then(() => {
                  // 		Linking.openURL('https://google.com');
                  // })}
                  style={{
                    borderColor: "#ddd",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 10,
                    backgroundColor: "#fff",
                    paddingHorizontal:10,
                    paddingVertical:10
                  }}
                >
                  <View style={{flex:1, flexDirection:'row', width:'100%', justifyContent:'space-between', paddingVertical:5, paddingHorizontal:5}}>
                    <Text style={styles.SectionHeadingTextStyle}>{CONSTANT.InvoicesOrderId}</Text>
                    <Text style={styles.ParagraphTextStyle}>{item.post_id}</Text>
                  </View>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', width:'100%', paddingVertical:5, paddingHorizontal:5}}>
                    <Text style={styles.SectionHeadingTextStyle}>{CONSTANT.InvoicesCreatedDate}</Text>
                    <Text style={styles.ParagraphTextStyle}>{item.created_date}</Text>
                  </View>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', width:'100%', paddingVertical:5, paddingHorizontal:5}}>
                    <Text style={styles.SectionHeadingTextStyle}>{CONSTANT.InvoicesAmount}</Text>
                    <Text style={styles.ParagraphTextStyle}>{item.price}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={ () => {this.props.navigation.navigate("InvoiceDetailPage", { post_id: item.post_id })}}
                    style={[styles.MainButtonArea, {alignSelf: 'flex-end'}]}>
                    <Text style={styles.ButtonText}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          :
          <View style={styles.NoDataMainArea}>
            <Image style={styles.NoDataImageStyle}
              source={require('../Images/nodata.png')}
            />
          </View>
        }
      </View>
    );
  }
}

export default Invoices;

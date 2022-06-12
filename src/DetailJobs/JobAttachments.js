import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import styles from '../Constants/Styles';
class JobAttachments extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
        <View
          style={[styles.JobAttachmentsArea,]}
        >
          <>
            {this.props.attachmentType != ('image/png' && 'image/jpeg') ?
              <>
                <Image
                  style={styles.JobAttachmentsImageStyle}
                  source={{ uri: "https://i.postimg.cc/VkzqqNsp/Untitled-1.png" }}
                />
                <Text
                  numberOfLines={3}
                  style={[styles.NameTextStyle, { textAlign: 'center', marginBottom: 5 }]}
                >
                  {this.props.attachmentName}
                </Text>
                <Text
                  style={styles.NameTextStyle}
                >
                  {this.props.attachmentSize}
                </Text>
              </>
              :
              <>
                <Image
                  resizeMode={'contain'}
                  style={{ width: '100%', height: '70%', marginBottom: 10 }}
                  source={{ uri: this.props.attachmentImage }}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.NameTextStyle, { marginBottom: 5 }]}
                >
                  {this.props.attachmentName}
                </Text>
                <Text
                  style={styles.NameTextStyle}
                >
                  {this.props.attachmentSize}
                </Text>
              </>
            }
          </>
        </View>
      </View>
    );
  }
}
export default JobAttachments;

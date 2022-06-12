import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, ToastAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
const TOPIC = 'Notification';
const  Pushnoti = () => {
  const requestUserPermission = async () => {
     //On ios,checking permission before sending and receiving messages
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
   };
   const getFcmToken = () => {
     // Returns an FCM token for this device
      messaging()
      .getToken()
      .then((fcmToken) => {
      console.log('FCM Token -> ', fcmToken);
      });
   }
    const receiveNotificationFromQuitState = () => {
      messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
         showToast(
         'getInitialNotification:' +
         'Notification caused app to open from quit state',
         );
        }
       });
       console.log('asdf')

    }
    const receiveBackgroundNotification = () => {
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
       if (remoteMessage) {
        showToast(
        'onNotificationOpenedApp: ' +
        'Notification caused app to open from background state',
        );
       }
      });
      console.log('asdf')
    }
    //stop listening for new messages.
    const unsubscribeDeviceTopic = messaging().onMessage(
      async (remoteMessage) => {
       showToast("New notification arrived" +         JSON.stringify(remoteMessage));
       console.log("asdf");
     });
    const backgroundThread = () => {  
    //It's called when the app is in the background or terminated
      messaging().setBackgroundMessageHandler(
       async (remoteMessage) => {
         showToast("Background notification" +  JSON.stringify(remoteMessage));
         console.log(JSON.stringify(remoteMessage));

       });
       console.log('asdf')

     }
const subscribeTopicToGetNotification = () => {
       /**
       * based on Topic, FCM server to send targeted 
       * messages to only those devices subscribed to that topic
       */
       messaging()
       .subscribeToTopic(TOPIC)
       .then(() => {
          console.log(`Topic: ${TOPIC} Suscribed`);
          
        });
        console.log('asdf')

     }
    useEffect(() => {
      if (requestUserPermission()) {
        getFcmToken();
      } else {
        console.log('Not Authorization status:', authStatus);
      }
      receiveNotificationFromQuitState();
      receiveBackgroundNotification();
      backgroundThread();
      subscribeTopicToGetNotification();
     
      return () => {
         unsubscribeDeviceTopic;
         // messaging().unsubscribeFromTopic(TOPIC);
      };
    }, []);
    const showToast = (message) => {
       if (Platform.OS == 'ios') {
         alert(message);
       } else {
         ToastAndroid.show(message, ToastAndroid.SHORT);
       }
    };
    return (
       <View>

       </View>
     );
};
const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent:'center',
     textAlign: 'center',
     backgroundColor: '#fff',
     },
     titleText: {
     fontSize: 20,
     textAlign: 'center',
     fontWeight: 'bold',
     marginVertical: 10,
     color: '#000',
     },
     textStyle: {
     fontSize: 20,
     fontWeight: 'bold',
     textAlign: 'center',
     marginBottom: 10,
     color: '#707070',
     },
});
export default Pushnoti;
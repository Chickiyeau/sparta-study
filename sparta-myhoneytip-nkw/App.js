import React,{ Component } from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking,Alert } from 'react-native';
import {Webview} from 'react-native-webview';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default class App extends Component{
  render() {
    return (
      <View>
        <WebView style={{top:50}}
          source={{html}}
          onMessage={(event)=> Alert.alert(event.nativeEvent.data) }
        />
      </View>
    );
  }
}
export default function App() {
  console.disableYellowBox = true;
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      Linking.openURL(lastNotificationResponse.notification.request.content.data.url);
    }
  }, [lastNotificationResponse]);
  return ( 
  <NavigationContainer>
    <StatusBar style="black" />
    <DrawerNavigator/>


 </NavigationContainer>);
}
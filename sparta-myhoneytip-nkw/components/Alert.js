import '../global.js'
import {Alert} from 'react-native'
import * as Device from 'expo-device';
import {firebase_db} from "../firebaseConfig";
import * as Notifications from 'expo-notifications';

export function TempAlert(){

}

export function MakeAlert(title, body, uri){
    Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: {
            uri: uri
          }
        },
        trigger: {
          seconds: 1, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
        },
      });
}

export async function registerForPushNotificationsAsync() {
    let id = global.id
    console.log(id)
    let token;
    if(id == undefined || id.length == 0){
        Alert.alert("오류","먼저 로그인 해주세요.")
    }
    else
    {
            if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            console.log("finalStatus",finalStatus)
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
            } else {
            alert('Must use physical device for Push Notifications');
            }
        
            if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
            }
        firebase_db.ref(`/user/${id}/pushindex`).once('value').then((pindex) => {
            if(pindex.exists()){
                console.log("remove", pindex)
            }else{
                firebase_db.ref('/pushindex').once('value').then((index) => {    
                    firebase_db.ref(`/user/${id}/pushindex`).set(parseInt(JSON.stringify(index)))
                    firebase_db.ref(`/push/token/`+JSON.stringify(index)).set(token);
                    index = parseInt(JSON.stringify(index)) + 1;
                    console.log("pusg333",index)

                    firebase_db.ref(`/pushindex`).set(index);
                });
            }
            
        });
    }
  }
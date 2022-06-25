import React, {createContext, useContext, useReducer} from 'react';

import { StyleSheet,Text,View,Button, Alert, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import '../global.js'

import CustomDrawer from '../navigation/DrawerNavigator'
let loggedin = false;
let route = null;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
export function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}
export default function loginsuccess({route, navigation}){
    let {service,nickname,profile_image,birthday,email,id} = route.params;
    loggedin = true
    if(loggedin == true){
        
        }
    loggedin = false
    global.name = {nickname}
    global.profile_image = {profile_image}
    global.birthday = {birthday}
    global.id = String({id}.id)
    console.log(global.id)
    navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    return ( {service,nickname,profile_image,birthday,email},
        <View>
            <TouchableOpacity style={styles.loginButton} onPress={()=>{navigation.reset({index: 0, routes:[{name:'MainPage'}]})}}><Text style={styles.aboutButtonText}>{service} 로그인 성공! 돌아가려면 누르세요.</Text></TouchableOpacity>
            <Text></Text>

        </View>
        
        
    );


}

export {route}





const styles = StyleSheet.create({
    loginButton: {
        backgroundColor:"magenta",
        width:370,
        height:40,
        borderRadius:10,
        alignSelf:"center",
        marginRight:20,
        marginTop:10
      },
      aboutButtonText: {
        color:"#fff",
        textAlign:"center",
        marginTop:10
      },
    mainImage: {
        //컨텐츠의 넓이 값
        width:'90%',
        //컨텐츠의 높이 값
        height:200,
        //컨텐츠의 모서리 구부리기
        borderRadius:10,
        marginTop:20,
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center"
      }
})

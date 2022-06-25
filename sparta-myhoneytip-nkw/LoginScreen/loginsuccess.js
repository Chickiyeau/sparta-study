import React, {createContext, useContext, useReducer} from 'react';

import { StyleSheet,Text,View,Button, Alert, Image} from "react-native";

import '../global.js'

import {nicname2} from '../pages/Settings'
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
    return ( {service,nickname,profile_image,birthday,email},
        <View>
            <Text>{service} 로그인 성공!</Text>
            <Text>닉네임 : {nickname}</Text>
            <Text>생일 : {birthday}</Text>
            <Text>이메일 : {email}</Text>
            <Text>프로필 이미지 : {profile_image}</Text>
            <Text>변수 : {nicname2}</Text>
            <Text>id = {id} </Text>
            <Text>globalid = {global.id}</Text>
            <Image style={styles.mainImage} source={{uri:profile_image}}></Image>


        </View>
        
    );


}

export {route}





const styles = StyleSheet.create({
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

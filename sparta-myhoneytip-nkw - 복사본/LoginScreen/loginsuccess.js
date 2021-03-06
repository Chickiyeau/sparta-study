import React, {createContext, useContext, useEffect, useReducer, useRef, useState} from 'react';

import { StyleSheet,Text,View,Button, Alert, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import '../global.js'

import {firebase_db} from "../firebaseConfig";


import CustomDrawer from '../navigation/DrawerNavigator'
import { isNull } from 'util';
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

    const[data,setdata] = useState()

    useEffect(() => {
      firebase_db.ref('/pushindex').once('value').then((index) => {
        setpushIndex(index);
      })
      firebase_db.ref(`/user/${id}`).once('value').then((user) => {
        if(user.hasChildren() == false){
          setdata("nodata")
        }else{
          setdata("hasdata")
        }
      })
    })
    let {service} = route.params;

    if(service == "kakao"){
      let {nickname,profile_image,birthday,email,id,gender} = route.params
      console.log("g",{gender})
      global.name = {nickname}
      global.profile_image = {profile_image}
      global.birthday = {birthday}
      global.id = String({id}.id)
      global.email = {email}
      global.service = {service}
      global.gender = {gender}
      console.log(global.id)
     
      if(data == "nodata"){
        firebase_db.ref(`/user/${global.id}/name`).set(nickname)
        firebase_db.ref(`/user/${global.id}/email`).set(email)
        firebase_db.ref(`/user/${global.id}/birthday`).set(birthday)
        firebase_db.ref(`/user/${global.id}/service`).set(service)
        firebase_db.ref(`/user/${global.id}/profile_image`).set(profile_image)
        
        firebase_db.ref(`/user/${global.id}/gender`).set(gender)
        
      }
      navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    }

    if(service == "naver"){
      let {nickname,profile_image,birthday,email,id,gender,mobile,mobile_e164,birthyear,name} = route.params

      global.name = {nickname}
      global.profile_image = {profile_image}
      global.birthday = {birthday}
      global.id = {id}.id
      global.email = {email}
      global.gender = {gender}
      global.mobile = {mobile}
      global.mobile_e164 = {mobile_e164}
      global.birthyear = {birthyear}
      global.realname = {name}
      global.service = {service}
      console.log(global.name)
      if(data == "nodata"){
        firebase_db.ref(`/user/${id}/name`).set(nickname)
        firebase_db.ref(`/user/${id}/email`).set(email)
        firebase_db.ref(`/user/${id}/birthday`).set(`${birthyear}-${birthday}`)
        firebase_db.ref(`/user/${id}/gender`).set(gender)
        firebase_db.ref(`/user/${id}/mobile`).set(mobile)
        firebase_db.ref(`/user/${id}/service`).set(service)
        firebase_db.ref(`/user/${id}/profile_image`).set(profile_image)
        firebase_db.ref(`/user/${id}/realname`).set(realname)
        
      }
      console.log(data)
      navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    }

    return ( {service,nickname,profile_image,birthday,email},
        <View>
            <TouchableOpacity style={styles.loginButton} onPress={()=>{navigation.reset({index: 0, routes:[{name:'MainPage'}]})}}><Text style={styles.aboutButtonText}>{service} ????????? ??????! ??????????????? ????????????.</Text></TouchableOpacity>
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
        //???????????? ?????? ???
        width:'90%',
        //???????????? ?????? ???
        height:200,
        //???????????? ????????? ????????????
        borderRadius:10,
        marginTop:20,
        //????????? ????????? ????????? ?????? ?????? ??????????????? ??????(????????????)
        //??? ????????? ????????? ??????????????? ?????????~ ?????? ??????
        alignSelf:"center"
      }
})

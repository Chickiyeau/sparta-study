import React, { cloneElement, useState } from 'react';

import { StyleSheet,Text,View,Button, Alert} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'

import '../../global.js'


export const kakaoGlobal = () => {
    const [nickname, setnickname] = useState('nickname')
    const [email, setemail] = useState('email')
    const [id, setid] = useState('id')
    const [profile_image ,setprofile_image] = useState('profile_image')
    const [birthday, setbirthday] = useState('birthday')
}

const toggleSetting2 = () => {
    setting3 ? setSetting2(true) : setSetting2value(false);
  };
// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({useProxy,});

WebBrowser.maybeCompleteAuthSession();
 
export default function kakaoLogin({ navigation }) {

    function LogInProgress(data) {

        // access code는 url에 붙어 장황하게 날아온다.

        // substringd으로 url에서 code=뒤를 substring하면 된다.

        const exp = "code=";

        var condition = data.indexOf(exp);

        if (condition != -1) {

            var request_code = data.substring(condition + exp.length);

            console.log("access code :: " + request_code);

            // 토큰값 받기

            requestToken(request_code);

        }

    };

 

    const requestToken = async (request_code) => {

        var returnValue = "none";

        var request_token_url = "https://kauth.kakao.com/oauth/token";

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            params: {

                grant_type: 'authorization_code',

                client_id: '2e726e0391587bdf6db6c878ca69e208',

                redirect_uri: 'https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw',

                client_screct: '2CvUYsuq8y9NksDqbkFckSm6QrlwIzqB',

                code: request_code,

            },

        }).then(function (response) {
            returnValue = response.data.access_token;
            console.log('token',returnValue)
            requestplayer(returnValue)

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };

    const requestplayer = async (returnValue) => {
        var token = returnValue;

        var request_player_url = "https://kapi.kakao.com/v2/user/me";

        axios({

            method: "GET",

            url: request_player_url,

            headers: {

                Authorization: 'Bearer '+token

            },

        }).then(function (response) {

            returnValue = response.data;
            let nickname = response.data.kakao_account.profile.nickname;
            let id = response.data.id
            let service = "kakao"
            let returnValue = returnValue
            let profile_image = response.data.kakao_account.profile.profile_image_url
            let birthday = response.data.kakao_account.birthday
            let email = response.data.kakao_account.email
            const userSettings = {
                nickname,
                profile_image,
                service,
                birthday,
                email,
                toggleSetting2,
              };

                navigation.navigate('loginsuccess', {service,nickname,profile_image,birthday,email,id})

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };
 

    return (

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'kakaoLogin'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

            <WebView

                originWhitelist={['*']}

                scalesPageToFit={false}

                style={{ marginTop: 30 }}

                source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2e726e0391587bdf6db6c878ca69e208&redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw' }}

                injectedJavaScript={runFirst}

                javaScriptEnabled={true}

                onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}

            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달

            />

        </View>

    );
};

const styles = StyleSheet.create({
    refresh: {
        backgroundColor:"pink",
        width:350,
        height:40,
        borderRadius:10,
        alignSelf:"flex-end",
        marginRight:20,
        marginTop:10
      },
      refreshtext: {
        color:"#fff",
        textAlign:"center",
        fontSize:30
      }
})
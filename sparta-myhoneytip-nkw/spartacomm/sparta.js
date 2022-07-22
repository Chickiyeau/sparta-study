import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,View, Alert, BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import '../global.js'

export default function sparta({navigation}){

    const requestList = async (page) => {

        var returnValue = "none";

        var request_token_url = "https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=10&curPage=1&userId=626be1411d008bf29af0e436&";

 

        axios({

            method: "get",

            url: request_token_url,

            withCredentials:true,


        }).then(function (response) {
            returnValue = response.data.data;
            let array = []
            returnValue.map((content ,i) => {
                //console.log(i, content)
                let id = content._id
                let author = content.author.name
                let commentCount = content.commentCount
                let title = content.title
                let status = content.tutorResponse.status
                let answeredDate = content.tutorResponse.answeredDate
                let firstViewedDate = content.tutorResponse.firstViewedDate
                let viewCount = content.viewCount
                let week = content.week
                let desc = content.content.replace(/<[^>]*>?/g, '')
                let createdAt = content.createdAt
                let comm = {
                    author, commentCount, title, id, status, answeredDate, firstViewedDate, viewCount, week, desc, createdAt
                }
                array.push(comm)
            })

            navigation.navigate('Viewsparta',{array})
            

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };


    useEffect(() => {
        requestList()
    })

    return(
        <ScrollView>
             <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
        </ScrollView>
    )
}

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
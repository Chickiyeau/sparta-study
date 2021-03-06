import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,View, Alert, BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import '../global.js'

export default function sparta({navigation, route}){


    const requestList = async (page) => {

        var returnValue = "none";

        var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=10&curPage=${page}`;

 

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
                let desc = content.content.replace('<br>', '\n')
                let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                if(image != null){
                    image.map((link, i) => {
                        image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                    })
                }
                desc = desc.replace(/<[^>]*>?/g, '')
                desc = desc.replace(/&lt;/g,'<')
                desc = desc.replace(/&gt;/g,'>')
                let descout = desc.indexOf('</pre>')
                let descin = desc.indexOf('<pre class="ql-syntax" spellcheck="false">')
                let cdesc = desc.substring(descin, desc.length)
                let createdAt = content.createdAt
                let courseTitle = content.courseTitle  
                let comm = {
                    author, commentCount, title, id, status, answeredDate, firstViewedDate, viewCount, week, desc, createdAt, courseTitle, image
                }
                array.push(comm)
            })
            navigation.navigate('Viewsparta',{navigation, array, page})
            

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };


    useEffect(() => {
        let page = route.params
        console.log(page)
        if(page == undefined){
            page = 1
        }else{
            page = page.page
            console.log("dddd", page)
        }
        requestList(page)
    })

    return(
        <ScrollView>
             <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>????????? ?????? ??????</Text></TouchableOpacity>
             <Text>??????????????????.</Text>
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
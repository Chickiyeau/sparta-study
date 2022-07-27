import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,Image,View, Alert, BackHandler, useWindowDimensions} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import '../global.js'

export default function sparta({navigation, route}){
  

    const loading = require("../assets/loading.gif");
    const requestList = async (page) => {

      if(global.search == "true"){
        var returnValue = "none";

        var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=9999&curPage=${page}`;
      }else{

        var returnValue = "none";

        var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=10&curPage=${page}`;
      }

 

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
                let profile = `https://spartacodingclub.kr/v5/images/profile/${content.author.profile}.png`
                let commentCount = content.commentCount
                let title = content.title
                let status = content.tutorResponse.status
                let answeredDate = content.tutorResponse.answeredDate
                let firstViewedDate = content.tutorResponse.firstViewedDate
                let viewCount = content.viewCount
                let week = content.week
                let desc = content.content.replace('<br>', '\n')
                let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                let imagelist = []
                if(image != null){
                    image.map((link, i) => {
                        image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                        let image2 = link.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                        if(image2.split('undefined')[1] == undefined){
                          imagelist.push(image)
                        }else{
                          imagelist.push(image+image2.split('undefined')[1].replace('\">',""))
                        }
                    })
                }
                desc = desc.replace(/<[^>]*>?/g, '')
                desc = desc.replace(/\n/g, "")
                desc = desc.replace(/\r/g, "")
                desc = desc.replace(/&lt;/g,'\n<')
                desc = desc.replace(/&gt;/g,'>')
                desc = desc.replace(/&nbsp;/gi, '\n')
                desc = desc.replace(/{/gi, '\n{\n')
                desc = desc.replace(/}/gi, '\n}\n')
                desc = desc.replace(/;/gi, ';\n')
                desc = desc.replace(/@/gi, '\n@')


                let descout = desc.indexOf('</pre>')
                let descin = desc.indexOf('<pre class="ql-syntax" spellcheck="false">')
                let cdesc = desc.substring(descin, desc.length)
                let createdAt = content.createdAt
                let courseTitle = content.courseTitle  
                
                console.log("ill",imagelist)
                let comm = {
                    author, commentCount, title, id, status, answeredDate, firstViewedDate, viewCount, week, desc, createdAt, courseTitle, imagelist, profile
                }
                array.push(comm)
                
            })
            console.log("arrr",array)
            navigation.navigate('Viewsparta',{navigation, array, page})
            

 

        }).catch(function (error) {

            Alert.alert('오류 발생', error.toString());


        });

    };


    useEffect(() => {
        let page = route.params
        if(page == undefined){
            page = 1
        }else{
            page = page.page
        }
        requestList(page)

        const backAction = () => {
      
            navigation.navigate("MainPage")
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()
    })

    return(
        <SafeAreaView style={styles.container}>
          <Image source={loading} alt="progress" style = {styles.loading} />
      </SafeAreaView>
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
      },
      container: {
        flex: 1,
        backgroundColor: "white",
      },
      textBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    
      profileBox: {
        marginHorizontal: 30,
      },
      inputBox: {
        marginHorizontal: 40,
        marginVertical: 20,
      },
      loading:{
        alignSelf:"center",
        resizeMode: 'contain'
      }
})
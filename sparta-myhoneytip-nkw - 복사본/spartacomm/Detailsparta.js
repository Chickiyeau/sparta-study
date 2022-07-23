import React,{useState, useEffect, Component} from 'react';
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Image, View} from 'react-native';
import SpartaCardComment from '../components/SpartaCardComment';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig"
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global.js'
loaded = false;
export default function Detailsparta({route, navigation, beforeid}){

    
    let content = route.params.content
    let id = content.id
    let courseTitle = content.courseTitle
    let week = content.week
    let title = content.title
    let image = content.image

    let array = []
    let bef = ""
    const [ready,setReady] = useState(true)
    const [comm, setcomm] = useState(array)

    let curcourse = `즉문즉답 > ${courseTitle} > ${week}주차`

    function getcomment() {

        if(loaded == false){ //로드할려는 데이터가 같은 거인 경우 무한 반복으로 실행되는 버그 수정!
            var { idx } = route.params;
            var returnValue = "none";

            var request_token_url = `https://api.scc.spartacodingclub.kr/community/${id}/comment`;
    
     
    
            axios({
    
                method: "get",
    
                url: request_token_url,
    
                withCredentials:true,
    
    
            }).then(function (response) {
                returnValue = response.data.data;
    
                returnValue.map((content ,i) => {
                    let id = content._id
                    let author = content.author.name
                    let isTutor = content.author.isTutor
                    let isWriter = content.author.isWriter
                    let profile = content.author.profile
                    let createdAt = content.author.createdAt
                    let desc = content.content.replace('<br>', '\n')

                    let image2 = ""
                    let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                    
                    if(image != null){
                        image.map((link, i) => {
                            
                            image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            let image2 = link.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            image = image+image2.split('undefined')[1].replace('\">',"")
                        })
                    }

                    desc = desc.replace(/<[^>]*>?/g, '')
                    desc = desc.replace(/&lt;/g,'<')
                    desc = desc.replace(/&gt;/g,'>')
                    console.log("image", image)
                    let comm = {
                        author, id, desc, createdAt, isTutor, isWriter, profile, image
                    }
                    array.push(comm)
                    
    
                })
                
                loaded = true
                //setcomm(array)
                
                setReady(false)
    
     
    
            }).catch(function (error) {
    
                console.log('error', error);
    
            });
            loaded = true //로드가 되었다고 표시
            bef = idx
        }else{
            console.log("still running")
            if(idx  != bef){ //로드할려는 데이터가 다른 거인 경우!
                loaded = false //로드 완료를 취소하고 재로드를 실시한다.
            }
        }
        

    }
    useEffect(() => {
        title = content.title
        if(beforeid == undefined){
            getcomment()
        }else{
            if(title != beforeid){
                beforeid = title
                //getcomment()
            }
        }

        const backAction = () => {
      
            navigation.goBack()
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()

        
})
    if(image != null){
        return (
            <ScrollView> 
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{content.title}</Text>
                    <Text style={styles.cardDate}>{curcourse}</Text>
                    <Image style={styles.image} source={{uri:image}}/>
                    <Text style={styles.cardDesc}>{content.desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}</Text>
                
                </View>
                <ScrollView>
                {
                    comm.map((content,i)=>{
                        return(
                        <SpartaCardComment key={i} content={content} navigation={navigation}/>)
                    })
                }   
                </ScrollView>

            </ScrollView>
        )
    }else{
        return (
            <ScrollView> 
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{content.title}</Text>
                    <Text style={styles.cardDate}>{curcourse}</Text>
                    <Text style={styles.cardDesc}>{content.desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}</Text>
                
                </View>
                <ScrollView>
                {
                    comm.map((content,i)=>{
                        return(
                        <SpartaCardComment key={i} content={content} navigation={navigation}/>)
                    })
                }   
                </ScrollView>

            </ScrollView>
        )        
    }
}

const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    buttonGroup: {
        flexDirection:"row",
    },
    button:{
        width:90,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:'deeppink',
        borderRadius:7
    },
    buttonText:{
        color:'deeppink',
        textAlign:'center'
    },
    image:{
        height:200,
        margin:10,
        marginTop:40
    }
});
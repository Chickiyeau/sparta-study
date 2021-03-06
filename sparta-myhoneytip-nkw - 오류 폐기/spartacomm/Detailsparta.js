import React,{useState, useEffect, Component} from 'react';
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Image, View, useWindowDimensions, Button, Animated } from 'react-native';
import SpartaCardComment from '../components/SpartaCardComment';
import * as Linking from 'expo-linking';
import AutoHeightImage from "react-native-auto-height-image";
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global.js';
import { SliderBox } from 'react-native-image-slider-box';
loaded = false;
export default function Detailsparta({route, navigation, beforeid}){
    let scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width);

    let content = route.params.data
    let id = content.id
    let courseTitle = content.courseTitle
    let week = content.week
    let title = content.title
    let image = content.image

    const [Desc, setDesc] = useState('');

    let array = []
    let bef = ""
    let { width } = useWindowDimensions();
    console.log(width)
    const [ready,setReady] = useState(true)
    const [comm, setcomm] = useState(array)
    let curcourse = ``
    if(week == 100){
        curcourse = `즉문즉답 > ${courseTitle} > 기타`
    }else{
        curcourse = `즉문즉답 > ${courseTitle} > ${week}주차`
    }

    /*function uploadcomment() {
        var returnValue = "none";

        var request_token_url = `https://api.scc.spartacodingclub.kr/community/62dbdc19697492e2920e2b42/comment`;

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            headers :{
                ":authority": "api.scc.spartacodingclub.kr",
                "accept": "application/json, text/plain"
            },

            params :{
                attachFiles: [],
                content: "<p> 댓글 테스팅 </p>",
                postId: "62dbdc19697492e2920e2b42",
                userId: "626be1411d008bf29af0e436"
            }


        }).then(function (response) {
    
            console.log("success", response)
 

        }).catch(function (error) {

            console.log('error', error);

        });

    } 위험 구역 위험 구역*/

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
                    let imagelist = []
                    let image2 = ""
                    let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                    
                    if(image != null){
                        image.map((link, i) => {
                            
                            image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            let image2 = link.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            imagelist.push(image+image2.split('undefined')[1].replace('\">',""))
                        })
                    }
                    
                    desc = desc.replace(/<[^>]*>?/g, '')
                    desc = desc.replace(/\n/gi, "")
                    desc = desc.replace(/\r/gi, "")
                    desc = desc.replace(/&lt;/g,'\n<')
                    desc = desc.replace(/&gt;/g,'>')
                    desc = desc.replace(/&nbsp;/gi, '\n')
                    desc = desc.replace(/{/gi, '\n{\n')
                    desc = desc.replace(/}/gi, '\n}\n')
                    desc = desc.replace(/;/gi, ';\n')
                    desc = desc.replace(/@/gi, '\n@')
                    let comm = {
                        author, id, desc, createdAt, isTutor, isWriter, profile, imagelist
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
      
                global.load = "false"
                navigation.push("Home")
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()

        
})
    if(content.imagelist.length != 0){
        return (
            <ScrollView style={styles.main}> 
                <View style={styles.cardText}>
                <View style={styles.cardTop}>
              <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
                <Text style={styles.cardTitle} numberOfLines={1}> {content.author}</Text>
              </View>
                    <Text style={styles.cardTitle}>{content.title}</Text>
                    <Text style={styles.cardDate}>{curcourse}</Text>
                    <View style={{ width:width, height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
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
                <TextInput
            value={Desc}
            onChangeText={(Desc) => setDesc(Desc)}
            placeholder={'내용'}
            style={styles.inputDesc}
            />

            </ScrollView>
        )
    }else{
        return (
            <ScrollView style={styles.main}> 
                <View style={styles.cardText}>
                <View style={styles.cardTop}>
              <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
                <Text style={styles.cardTitle} numberOfLines={1}> {content.author}</Text>
              </View>
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
                <View style={styles.input}>
                <TextInput
                    value={Desc}
                    onChangeText={(Desc) => setDesc(Desc)}
                    placeholder={'내용'}
                    style={styles.inputDesc}
                    />
                    <Button style={styles.button2} title="게시" />

                </View>
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
    cardDesc2: {
        fontSize:15,
        fontWeight:"800",
        marginBottom:10,
        borderBottomWidth:0.5,
        borderLeftWidth:0.5,
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        marginTop:10,
        alignSelf:"center",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:3,
        paddingBottom:3
        
        
      },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    buttonGroup: {
        flexDirection:"row"
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
        alignSelf:'center',
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        borderBottomColor:"#aaa"
    },
    cardTop:{
        flexDirection:"row",
        borderBottomWidth:0.5,
        borderBottomColor:"#aaa"
      },
      inputDesc: {
        width: 300,
        height: 50,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        alignSelf:"auto"
      },
      input:{
        flexDirection:"row"
      },
      button2:{
        marginLeft:10
      },
      main:{
        marginTop:30
      }
});
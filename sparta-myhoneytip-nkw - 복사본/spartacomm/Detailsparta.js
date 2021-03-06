import React,{useState, useEffect, PureComponent} from 'react';
import RN, {BackHandler, ScrollView, Text, StyleSheet, Alert, Image, View, useWindowDimensions, Button, Animated } from 'react-native';
import SpartaCardComment from '../components/SpartaCardComment';
import * as Linking from 'expo-linking';
import AutoHeightImage from "react-native-auto-height-image";
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global.js';
import { SliderBox } from 'react-native-image-slider-box';
import RNJsxParser from 'react-native-jsx-parser'
import { copyAsync } from 'expo-file-system';
loaded = false;


export default function Detailsparta({route, navigation, beforeid}){
    let scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width);

    let { width } = useWindowDimensions()
    let content = route.params.content
    let id = content.id
    let courseTitle = content.courseTitle
    let week = content.week
    let title = content.title
    let image = content.image
    
    function mapStringToComponent(stringToRender, list) {
      let parseResult = stringToRender.match(/<([a-z]*)>(.*)<\/[a-z]*>/i);
      if(parseResult == null){
        parseResult = stringToRender.match(/<([a-z]*) (.*)<\/[a-z]*>/i);
      }
      
       // result of this regex ["<Text>hello</Text>", "Text", "hello"]
      if (parseResult !== null && parseResult.length == 3) {
        
        let [, compName, innerText] = parseResult;
        let style = ''
        if(innerText.includes("style")){
          style = innerText.match(/style={styles.([a-z]*)}>/i)
          if(style != null){
            code = style[0]
            innerText = innerText.replace(code, "")
            code = code.replace(">", "")
            code = '{'+code+'}'     
            
            list.push(React.createElement(
              RN[compName],
              {style:{color:"pink"}}, // here may be an object with attributes if your node has any
              innerText,
            ));
          }
        }else{
          if(innerText.length != 1){
            if(compName == 'Text'){
              list.push(React.createElement(
                RN[compName],
                null, // here may be an object with attributes if your node has any
                innerText,
              ));
            }else{
              if(compName == 'head'){
                list.push(React.createElement(
                  RN['Text'],
                  {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                  '<head>',
                ));
              }

              if(compName == 'body'){
                list.push(React.createElement(
                  RN['Text'],
                  {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                  '<body>',
                ));
              }
            }
          }
        }

        

      }
    
      return null
    }
    

    const [Desc, setDesc] = useState('');

    let array = []
    let bef = ""
     
    const [ready,setReady] = useState(true)
    const [comm, setcomm] = useState(array)
    let curcourse = ``
    if(week == 100){
        curcourse = `???????????? > ${courseTitle} > ??????`
    }else{
        curcourse = `???????????? > ${courseTitle} > ${week}??????`
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
                content: "<p> ?????? ????????? </p>",
                postId: "62dbdc19697492e2920e2b42",
                userId: "626be1411d008bf29af0e436"
            }


        }).then(function (response) {
    
            console.log("success", response)
 

        }).catch(function (error) {

            console.log('error', error);

        });

    } ?????? ?????? ?????? ??????*/

    function getcomment() {

        if(loaded == false){ //??????????????? ???????????? ?????? ?????? ?????? ?????? ???????????? ???????????? ?????? ??????!
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
                    let createdAt = content.createdAt
                    let desc = content.content
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
                    desc = desc.replace(/\r/gi, "")
                    desc = desc.replace(/<p><br><\/p>/g, "")
                    desc = desc.replace(/<\/p>/g, '\n')
                    desc = desc.replace(/<[^>]*>?/g, '')
                    desc = desc.replace(/;/g,"")
                    desc = desc.replace(/&lt/g,'<')
                    desc = desc.replace(/&gt/g,'>')
                    desc = desc.replace(/&nbsp/gi, ' ')
                    desc = desc.replace(/{/gi, '\n{\n')
                    desc = desc.replace(/}/gi, '\n}\n')
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
            loaded = true //????????? ???????????? ??????
            bef = idx
        }else{
            console.log("still running")
            if(idx  != bef){ //??????????????? ???????????? ?????? ?????? ??????!
                loaded = false //?????? ????????? ???????????? ???????????? ????????????.
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

if(content.week == 100){
    curcourse = `???????????? > ${content.courseTitle} > ??????`
}else{
    curcourse = `???????????? > ${content.courseTitle} > ${content.week}??????`
}
let date = content.createdAt.split("T")[0].split("-")
let time = content.createdAt.split("T")[1].split(".")[0].split(":")
let ms = content.createdAt.split("T")[1].split(".")[1].replace("Z", "")
let aa = ``
let hour = ``
if(time[0] > 12){
  aa = "??????"
  hour = time[0] - 12
}else{
  aa = "??????"
  hour = time[0]
}
function formatDate(date) {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`)
}
var write = new Date(content.createdAt);
var now = new Date();

let year = now.getFullYear()
let month = now.getMonth()
let day = now.getDate()
let hours = now.getHours()+9
let minutes = now.getMinutes()
let seconds = now.getSeconds()

let nowdate = new Date(year, month, day, hours, minutes, seconds)

let elti = nowdate.getTime() - write.getTime()

let chai = elti

let a = ``

let desc = `<Text>${content.desc}</Text>`

desc = desc.replace(/\n/gi, '</Text>\n<Text>')

desc = desc.replace(/<Text><\/Text>/g, "")

desc = desc.replace(/<Text></sg, '<Text style={styles.lt}><')

//desc = mapStringToComponent(desc);

let descsplit = desc.split("\n")
let descmap = []
descsplit.map((value, i) => {
  mapStringToComponent(value, descmap)
})
//console.log(descmap)

if(chai < 1000 * 60)
  a = '??????';
else if(chai < 1000 * 60 * 60)
  a += Math.floor(chai / (1000 * 60)) + ' ??????';
else if(chai < 1000 * 60 * 60 * 24)
  a += Math.floor(chai / (1000 * 60 * 60)) + ' ?????????';
else if(chai < 1000 * 60 * 60 * 24 * 30)
  a += Math.floor(chai / (1000 * 60 * 60 * 24)) + ' ??????';
else if(chai < 1000 * 60 * 60 * 24 * 30 * 12)
  a += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + ' ??????';

  
  if(content.week == 100){
    curcourse = `???????????? > ${content.courseTitle} > ??????`
}else{
    curcourse = `???????????? > ${content.courseTitle} > ${content.week}??????`
}
date = `${date[0]}??? ${date[1]}??? ${date[2]}??? ${aa} ${hour}??? ${time[1]}??? `
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
                            
                            autoplay={false}  //?????? ???????????? ??????
                            circleLoop={true} //?????? ?????????????????? ?????? ??????????????????
                            resizeMode="cover"  // ????????? ????????? ?????????
                            images={content.imagelist} // ????????? ?????? ????????? 
                            dotColor="rgba(0,0,0,0)" // ?????? ??? ???????????? ???????????? ??????
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>???????????? ???????????? ???????????? ????????? ???????????????.</Text>
                    <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{date}            ????????? : {content.author}                 {a}</Text>
                
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
            placeholder={'??????'}
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
                    <View style={styles.cardDesc}>
                      <Text style={styles.lt}></Text>
                      {descmap.map((value) => {return(value)})}
                    </View>
                    <Text style={styles.cardDate}>{content.createdAt}  ????????? : {content.author}   {a}</Text>
                
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
                    placeholder={'??????'}
                    style={styles.inputDesc}
                    />
                    <Button style={styles.button2} title="??????" />

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
      },
      lt:{
        color:"#FFFF00"
      }
});
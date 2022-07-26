import { FlatList } from "native-base";
import { useEffect, useState } from "react";
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Button, View} from 'react-native';
import MainHeader from "../components/MainHeader";
import PostItem from "../components/PostItem";
import Loading from "./Loading";
import axios from 'axios';
import'../global.js'

export default function MainPage({ navigation }) {
  let array = []
  const [data, setData] = useState([]);

  function goBack() {
    page -= 1
    navigation.navigate('sparta', {navigation, page})
   }

   function goNext( ) {
      page += 1
      navigation.navigate('sparta', {navigation, page})

   }

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    let page = global.page
    if(page.length == 0){
        page = 1
    }else{
        page = global.page
    }

    console.log(global.load)
    if(global.load != "true"){
      requestList(page)
    }


  });
  
  const setvar = async (array) => {
    setTimeout(() => {
      setData(array);
    }, 1000);
  }
  const requestList = async (page) => {

    var returnValue = "none";

    var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=10&curPage=${page}`;




    axios({

        method: "get",

        url: request_token_url,

        withCredentials:true,


    }).then(function (response) {
        returnValue = response.data.data;
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
                    imagelist.push(image+image2.split('undefined')[1].replace('\">',""))
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
            
            //console.log("ill",imagelist)
            let comm = {
                author, commentCount, title, id, status, answeredDate, firstViewedDate, viewCount, week, desc, createdAt, courseTitle, imagelist, profile
            }
            array.push(comm)
        })
        //console.log("done! ", array, "page", page)
        setvar(array)
        global.load = "true"



    }).catch(function (error) {

        Alert.alert('오류 발생', error.toString());


    });

};

  const tempData = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  return data.length == 0 ? (
    <Loading />
  ) : (
    <><FlatList
        backgroundColor="white"
        initialNumToRender={5}
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <MainHeader />}
        renderItem={({ item }) => (
          <PostItem data={item} navigation={navigation} />
        )} /><View style={styles.button}>
          <Button style={styles.buttonleft} title="이전 페이지" disabled={page == 1} onPress={goBack} />
          <Button style={styles.buttonright} title="다음 페이지" disabled={page == 50} onPress={goNext} />
        </View></>
    
  );
}

const styles = StyleSheet.create({
  container:{
      backgroundColor:"#fff"
  },
  refresh: {
      backgroundColor:"pink",
      
      height:40,
      borderRadius:10,
      alignSelf:"center",
      paddingLeft:25,
      paddingRight:25,
      marginLeft:5,
      marginRight:5,
      marginTop:10
    },
    refreshtext: {
      color:"#fff",
      textAlign:"center",
      fontSize:30
    },
    button: {
      flexDirection:"row",
      justifyContent:"space-between"
    },
    buttonleft: {
      marginLeft: 50,
      flex : 0.5
    },
    buttonright: {
      marginLeft: 30,
      flex: 0.5
    },
    middleContainer:{
      marginTop:20,
      marginLeft:10,
      marginBottom:60,
      borderColor:"black",
      borderWidth:2,
      height:60
    },
    middleButtonAll: {
      width:100,
      height:50,
      padding:15,
      backgroundColor:"#20b2aa",
      borderColor:"deeppink",
      borderRadius:15,
      margin:7
    },
    middleButton01: {
      width:100,
      height:50,
      padding:15,
      backgroundColor:"#fdc453",
      borderColor:"deeppink",
      borderRadius:15,
      margin:7
    },
    middleButton02: {
      width:100,
      height:50,
      padding:15,
      backgroundColor:"#fe8d6f",
      borderRadius:15,
      margin:7
    },
    middleButton03: {
      width:100,
      height:50,
      padding:15,
      backgroundColor:"#9adbc5",
      borderRadius:15,
      margin:7
    },
    middleButton04: {
      width:100,
      height:50,
      padding:15,
      backgroundColor:"#f886a8",
      borderRadius:15,
      margin:7
    },
    middleButtonText: {
      color:"#fff",
      fontWeight:"700",
      //텍스트의 현재 위치에서의 정렬 
      textAlign:"center"
    },
    middleButtonTextAll: {
      color:"#fff",
      fontWeight:"700",
      //텍스트의 현재 위치에서의 정렬 
      textAlign:"center"
    }
})
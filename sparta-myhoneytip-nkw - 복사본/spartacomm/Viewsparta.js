import React,{useState, useEffect, Component} from 'react';
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Button, View} from 'react-native';
import SpartaCard from '../components/SpartaCard';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig"
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from "../components/MainHeader";
import sparta from './sparta';
import '../global.js'

export default function Viewsparta({navigation, route}) {
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    const [text, setText] = useState('')
    let loaded = false
    useEffect(() => {
      setTip(route.params.array)

      
    })
     let page = route.params.page
     if(page == undefined){
      page = 1
  }
    
     function goBack() {
      page -= 1
      navigation.navigate('sparta', {navigation, page})
     }

     function goNext( ) {
        page += 1
        navigation.navigate('sparta', {navigation, page})

     }

     function search() {
      global.search = "true"
      global.search_keyword = text
      console.log("global:",global.search_keyword)
      navigation.navigate('sparta', {navigation, page})
     }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.refresh} onPress={() => {global.search = "false",navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>즉문즉답 눌러서 새로 고침</Text></TouchableOpacity>
              <MainHeader/>
              <TextInput style = {{backgroundColor:"gray",height:50}} placeholder={"검색할 것을 입력하세요."} onChangeText={(keyworld) => {setText(keyworld)}}></TextInput>
              <Button title='검색'  onPress={() => {search()}}></Button>
              {
                   tip.map((content,i)=>{
                    if(global.search == "true"){
                      if((content.title.includes(global.search_keyword) || content.desc.includes(global.search_keyword)) == true){
                        return(
                        <SpartaCard key={i} content={content} navigation={navigation}/>)
                        }
                      }else{
                        return(
                          <SpartaCard key={i} content={content} navigation={navigation}/>)
                                                  
                      }
                   })
               }
            <View style={styles.button}>
             <Button style={styles.buttonleft} title="이전 페이지" disabled={page == 1} onPress={goBack} />
             <Button style={styles.buttonright} title="다음 페이지" disabled={page == 50} onPress={goNext} />
            </View>
        </ScrollView>
    )

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


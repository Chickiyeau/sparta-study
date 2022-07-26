import React,{useState, useEffect, Component} from 'react';
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Button, View} from 'react-native';
import SpartaCard from '../components/SpartaCard';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig"
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import sparta from './sparta';
import '../global.js'

export default function Viewsparta({navigation, route}) {
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
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



    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>즉문즉답 눌러서 새로 고침</Text></TouchableOpacity>
              {
                   tip.map((content,i)=>{
                       return(
                       <SpartaCard key={i} content={content} navigation={navigation}/>)
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


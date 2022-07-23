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
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
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
      button: {
        flexDirection:"row"
        
      },
      buttonleft: {
        marginLeft: 50,
        flex : 0.5
      },
      buttonright: {
        marginLeft: 30,
        flex: 0.5
      }
})


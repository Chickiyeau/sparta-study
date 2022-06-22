import React,{useState, useEffect, Component} from 'react';
import {ScrollView, Text, StyleSheet, Alert} from 'react-native';
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';


//class LikePage extends react.Component {
    
//}
//LikePage({navigation})

export default function LikePage({navigation}) {
    console.log(navigation)
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    let loaded = false
    useEffect( ()=>{
        /*navigation.setOptions({
            title:'꿀팁 찜'
        })*/
        const user_id = Constants.installationId;
            firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
                
                console.log("파이어베이스에서 데이터 가져왔습니다!!")
                let tip = snapshot.val();
                let tip_list = Object.values(tip)
                if(tip_list.length > 0){
                    setTip(tip_list)
                    setReady(false)
                    loaded = true;
                }else{
                    Alert.alert("불러올 데이터가 없습니다!","먼저 찜을 해주세요!")
                    navigation.reset({index: 0, routes:[{name:'MainPage'}]})
                }
            
            });
        
            setTimeout(()=>{
                if(loaded != true){
                Alert.alert("로딩에 실패했습니다.","먼저 찜을 해주세요!")
                navigation.reset({index: 0, routes:[{name:'MainPage'}]})
                navigation.navigate('MainPage')
                }
            },3000)
    },[])

    return ready ? <Loading/> : (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'LikePage'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
           {
               tip.map((content,i)=>{
                   return(<LikeCard key={i} content={content} navigation={navigation}/>)
               })
           }
        </ScrollView>
    )

    //createStackNavigator({ LikePage });
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
      }
})


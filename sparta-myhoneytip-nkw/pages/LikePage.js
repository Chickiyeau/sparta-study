import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, Alert} from 'react-native';
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

export default function LikePage({navigation,route}){
    
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    let loaded = false
    useEffect(()=>{
        navigation.setOptions({
            title:'꿀팁 찜'
        })
        const user_id = Constants.installationId;
            firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
                
                console.log("파이어베이스에서 데이터 가져왔습니다!!")
                let tip = snapshot.val();
                console.log(tip)
                let tip_list = Object.values(tip)
                if(tip_list.length > 0){
                    setTip(tip_list)
                    setReady(false)
                    loaded = true;
                }
            
            });

        setTimeout(() => {        
            if(loaded != true){
            Alert.alert("오류!","죄송합니다. 로드할 찜 데이터가 존재하지 않습니다! 먼저 팁을 찜해주세요!")
            navigation.navigate("MainPage")
            loaded = false;
        }
        console.log(loaded)
            
        }, 3000);
 
    },[])

    return ready ? <Loading/> : (
        <ScrollView style={styles.container}>
           {
               tip.map((content,i)=>{
                   return(<LikeCard key={i} content={content} navigation={navigation}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})
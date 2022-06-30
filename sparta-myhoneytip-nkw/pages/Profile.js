import React, {createContext, useContext, useReducer} from 'react';

import { StyleSheet,Text,View,Button, Alert, Image, ScrollView, D} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fragment } from 'react/cjs/react.production.min.js';

import '../global.js'


export default function ProfileScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>내 정보</Text>
            </View>

            <ScrollView style={styles.desccontainer}>
                <View style={styles.topcontainer1}>
                    <View style={styles.profileimage}><Text>프로필 이미지 구역</Text></View>
                    <View style={styles.namecontainer}>
                        <Text style={styles.nameText}>이름 : </Text>
                        <Text style={styles.nameText}>전화번호 : </Text>
                        <Text style={styles.nameText}>이메일 : </Text>
                        <Text style={styles.nameText}>나이 : </Text>
                    </View>   
                </View>

            </ScrollView>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"blue"
    },
    titlecontainer: {
        width:300,
        height:20,
        backgroundColor:"yellow",
        alignSelf:"center",
        marginTop:20,
        alignContent:"center",
        borderRadius:20
    },
    title: {
       fontSize:15,
       textAlign:'center' 
    },
    //본문
    desccontainer: {
        width:350,
        height:600,
        marginTop:10,
        marginLeft:17.5,
        marginBottom:5,
        backgroundColor:"green",
        flexDirection:"column"
    },
    topcontainer1:{
        height:100,
        backgroundColor:"magenta",
        flexDirection:"row"
    },
    //프로필이미지
    profileimage:{
        width:87,
        height:87,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        backgroundColor:"orange",
        borderRadius:15
    },
    //이름
    namecontainer:{
        width:240,
        height:87,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        backgroundColor:"cyan",
        borderRadius:15
    },
    nameText:{
        marginLeft:5,
        fontSize:15
    }
})
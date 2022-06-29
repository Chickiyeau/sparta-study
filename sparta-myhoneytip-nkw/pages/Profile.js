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
                    <View style={styles.profileimage}>
                        
                    </View>
                    <Fragment>
                    <div style={styles.namecontainer}></div>
                    </Fragment>
                    
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
        height:640,
        marginTop:10,
        marginLeft:17.5,
        backgroundColor:"green"
    },
    topcontainer1:{
        height:100,
        backgroundColor:"magenta"
    },
    //프로필이미지
    profileimage:{
        witdh:30,
        height:50,
        marginLeft:5,
        marginTop:5,
        marginBottom:5,
        marginRight:280,
        backgroundColor:"orange"
    },
    //이름
    namecontainer:{
        witdh:30,
        height:30,
        marginLeft:120,
        backgroundColor:"black"
    }
})
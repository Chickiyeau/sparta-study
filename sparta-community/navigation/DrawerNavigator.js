import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert} from 'react-native';
//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { DrawerContentScrollView, DrawerItemList, DrawerItem , createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import {Ionicons} from '@expo/vector-icons';
import Viewsparta from '../pages/Viewsparta';
const Drawer = createDrawerNavigator();
export const myComponent = () => {
  // Get the global variables & functions via context
  const myContext = useContext(AppContext);
}


function HeaderR() {
  let id = global.id
    return (  <TouchableOpacity onPress={() => {registerForPushNotificationsAsync("add")}}><Ionicons name="notifications-outline"size={30}></Ionicons></TouchableOpacity>);
   
  }

export const CustomDrawer = props => {
    //const data = loginsuccess();
    let profile_image = global.profile_image.profile_image
    let birthday = global.birthday.birthday
    let name = global.name.nickname
    let id = global.id
    if(name == undefined){
      let name = global.name.name
    }
    
    console.log(id)
    if(id == undefined || id.length == 0){
    return (

      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#f6f6f6',
              marginBottom: 10,
            }}
          >
            <View>
              <Text>로그인 안됨</Text>
              
            </View>
            <Ionicons name="person-circle-outline"size={35}></Ionicons>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 90,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://desert-carbon-8ac.notion.site/31ffa67bb28545c4a65630a915012ae0")}}
        >
          <Text style = {styles.logoutText}>이용 약관</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 30,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://teamsparta.notion.site/3-f2e359d2a710447db3036ff2a3156869")}}
        >
          <Text style = {styles.logoutText}>개인정보 처리 방침</Text>
          
        </TouchableOpacity>
      </View>
    );}else{
      return (
        <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#f6f6f6',
              marginBottom: 10,
            }}
          >
            <View>
              <Text>{name}님 안녕하세요!</Text>
              <Text style={styles.id}>ID : {id}</Text>
            </View>
            <Image style={styles.mainImage} source={{uri:profile_image}}></Image>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 140,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {
            Alert.alert("신고해주셔서 감사합니다.","신고하신 사항을 면밀히 확인하여 처리하도록 하겠습니다.")
            Linking.openURL("https://forms.gle/bx1ugybD1UhiNR8j8")}}
        >
          <Text style = {styles.logoutText}>신고하기</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 90,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://desert-carbon-8ac.notion.site/31ffa67bb28545c4a65630a915012ae0")}}
        >
          <Text style = {styles.logoutText}>이용 약관</Text>
          
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 30,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://desert-carbon-8ac.notion.site/3-de87259a28b249c4a79ad03df9129150")}}
        >
          <Text style = {styles.logoutText}>개인정보 처리방침</Text>
          
        </TouchableOpacity>
      </View>
    );
    }
  };

const DrawerNavigator = (navigator) =>{
    return (
<Drawer.Navigator initialRouteName="Home" screenOptions={{
    headerShown: true,
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitle: '',
    
}}
drawerContent={props => <CustomDrawer {...props}/>}
>
    <Drawer.Screen name="Viewsparta" component={Viewsparta} options={{drawerLabel: '디테일 페이지',title:'디테일 페이지',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {Alert.alert("타이틀","나의 꿀팁")}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
        

</Drawer.Navigator>
)}
const styles = StyleSheet.create({
    logoutBox: {
      //position: 'absolute',
      flex: 1,
      width:200,
      height:0,
      backgroundColor: '#009DAE',
    },
    logoutText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      //marginLeft: 30
    },
    mainImage: {
      //컨텐츠의 넓이 값
      width: 50,
      //컨텐츠의 높이 값
      height:50,
      //컨텐츠의 모서리 구부리기
      borderRadius:10,
      //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
      //각 속성의 값들은 공식문서에 고대로~ 나와 있음
      alignSelf:"center"
    },
    id:{
      fontSize:5
    }
  })

export default DrawerNavigator;
export {DrawerNavigator};
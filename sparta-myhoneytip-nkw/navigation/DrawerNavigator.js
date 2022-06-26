import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert} from 'react-native';
//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { DrawerContentScrollView, DrawerItemList, DrawerItem , createDrawerNavigator } from '@react-navigation/drawer';
import AboutPage from '../pages/AboutPage';
import LikePage from '../pages/LikePage';
import SettingsScreen from '../pages/Settings';
import ProfileScreen from '../pages/Profile';
import StackNavigator from './StackNavigator';
import {Ionicons} from '@expo/vector-icons';
import {Webview} from 'react-native-webview';
import kakaoLogin from '../LoginScreen/kakao/kakaoLogin';
import kakaoLogout from '../LoginScreen/kakao/KaKaoLogout';
import loginsuccess, {route} from '../LoginScreen/loginsuccess';
import { nicname2 } from '../pages/Settings';
import '../global.js'
const Drawer = createDrawerNavigator();
export const myComponent = () => {
  // Get the global variables & functions via context
  const myContext = useContext(AppContext);
}


function HeaderR() {
    return (  <TouchableOpacity onPress={() => {Alert.alert("알림 설정 태그","알람이 설정되기 싫어합니다")}}><Ionicons name="notifications-outline"size={30}></Ionicons></TouchableOpacity>);
   
  }

export const CustomDrawer = props => {
    //const data = loginsuccess();
    let profile_image = global.profile_image.profile_image
    let birthday = global.birthday.birthday
    let name = global.name.nickname
    let id = global.id

    console.log(id)
    if(name == undefined){
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
            bottom: 30,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://spartacodingclub.kr")}}
        >
          <Text style = {styles.logoutText}>스파르타로 이동</Text>
          
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
              <Text>ID : {id}</Text>
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
            bottom: 30,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://spartacodingclub.kr")}}
        >
          <Text style = {styles.logoutText}>스파르타로 이동</Text>
          
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
        <Drawer.Screen name="MainPage" component={StackNavigator}  options={{drawerLabel: '메인',title:'나의 꿀팁',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {Alert.alert("타이틀","나의 꿀팁")}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
        <Drawer.Screen name="AboutPage" component={AboutPage} options={{drawerLabel: '소개',title:"소개 페이지",
        headerTitle: () => (
            <TouchableOpacity onPress={() => {Alert.alert("타이틀","나의 꿀팁")}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
    <Drawer.Screen name="LikePage" component={LikePage} options={{drawerLabel: '찜 페이지',title:'찜 페이지',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {Alert.alert("타이틀","나의 꿀팁")}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
    <Drawer.Screen name="Setting" component={SettingsScreen} options={{drawerLabel: '설정',title:'설정',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {Alert.alert("타이틀","나의 꿀팁")}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
    <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{drawerLabel: '프로파일',title:'정보',
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
    }
  })

export default DrawerNavigator;
export {DrawerNavigator};
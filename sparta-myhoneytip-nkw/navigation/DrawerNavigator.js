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

const Drawer = createDrawerNavigator();
const REST_API_KEY = '	2e726e0391587bdf6db6c878ca69e208'
const REDIRECT_URI = ''
function HeaderR() {
    return (  <TouchableOpacity onPress={() => {Alert.alert("알림 설정 태그","알람이 설정되기 싫어합니다")}}><Ionicons name="notifications-outline"size={30}></Ionicons></TouchableOpacity>);
   
  }

const CustomDrawer = props => {
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
              <Text>로그인 사용자: 나경원(20000304)</Text>
              
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
            bottom: 280,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://spartacodingclub.kr")}}
        >
          <Text style = {styles.logoutText}>스파르타로 이동</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 150,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => alert('Link to logout')}
        >
          <Text style = {styles.logoutText}>로그아웃</Text>
          
        </TouchableOpacity>
      </View>
    );
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
    }
  })

export default DrawerNavigator;
export {DrawerNavigator};
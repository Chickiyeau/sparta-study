import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';


export default function MainPage({navigation,route}) {
  console.disableYellowBox = true;

      const [state,setState] = useState([])
      const [cateState,setCateState] = useState([])
      const [ready,setReady] = useState(true)
    
      useEffect(()=>{
         
        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(()=>{
            //헤더의 타이틀 변경
            navigation.setOptions({
              title:'나만의 꿀팁'
          })  
            setState(data.tip)
            setCateState(data.tip)
            setReady(false)
        },1000)
     
        
      },[])
    
      const category = (cate) => {
        if(cate == "전체보기"){
            //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }
    
    return ready ? <Loading/> :  (

    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      {/* <Text style={styles.title}>Eye care</Text> */}
      <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
          <Text style={styles.aboutButtonText}>소개 페이지</Text>
        </TouchableOpacity>
        <Image style={styles.mainImage} source={require('../assets/main.png')}/>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
        <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>안경 수치</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>콘택트렌즈</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04}><Text style={styles.middleButtonText}>꿀팁</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton05}><Text style={styles.middleButtonText}>질환</Text></TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
         
        {
        cateState.map((content,i)=>{
          return (<Card content={content} key={i} navigation={navigation}/>)
        })
        }

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:50,
    //왼쪽 공간으로 부터 이격
    marginLeft:20
  },
weather:{
    alignSelf:"flex-end",
    paddingRight:20,
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width:'90%',
    //컨텐츠의 높이 값
    height:200,
    //컨텐츠의 모서리 구부리기
    borderRadius:10,
    marginTop:20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
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
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  }


});
import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity, Alert, RefreshControl, useWindowDimensions} from 'react-native'
import {firebase_db} from "../firebaseConfig"
import '../global.js'
import AutoHeightImage from "react-native-auto-height-image";
import { SliderBox } from 'react-native-image-slider-box';
import * as Linking from 'expo-linking';


//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function SpartaCardComment({content,navigation}){

    let array = []
    let { width } = useWindowDimensions();
    const detail = () => {
      array.push({content})
      navigation.navigate('Detailsparta', {content})
      //console.log(content.desc)s
        //Linking.openURL(`https://spartacodingclub.kr/community/fastqna/all/${content.id}/${content.title}`)
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
        
    let desc = content.desc
    desc = desc.replace(/<[^>]*>?/g, '')
    desc = desc.replace(/\n/gi, "")
    desc = desc.replace(/\r/gi, "")
    desc = desc.replace(/&lt;/g,'\n<')
    desc = desc.replace(/&gt;/g,'>')
    desc = desc.replace(/&nbsp;/gi, '\n')
    desc = desc.replace(/{/gi, '\n{\n')
    desc = desc.replace(/}/gi, '\n}\n')
    desc = desc.replace(/;/gi, ';\n')
    desc = desc.replace(/@/gi, '\n@')

    if(content.imagelist.length != 0){
        let image = content.image
        if(content.isTutor == true){
          if(content.isWriter == true){
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <View style={{ width:width, height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                      <Text style={styles.cardDesc}>{desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터이면서 이글의 작성자입니다</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <View style={{ width:width, height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                      <Text style={styles.cardDesc}>{desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터입니다.</Text>
                      
                  </View>
              </View>
            )            
          }
        }else{
          if(content.isWriter == true){
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <View style={{ width:'50%', height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                      <Text style={styles.cardDesc}>{desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author} 이글의 작성자입니다.</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <View style={{ width:width, height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                        <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                    </View>
                    
                      <Text style={styles.cardDesc}>{desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}</Text>
                      
                  </View>
              </View>
            )            
          }
        }
    }else{
      if(content.isTutor == true){
        if(content.isWriter == true){
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터이면서 이글의 작성자입니다</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터입니다.</Text>
                    
                </View>
            </View>
          )            
        }
      }else{
        if(content.isWriter == true){
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author} 이글의 작성자입니다.</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}</Text>
                    
                </View>
            </View>
          )            
        }
      }    
    }
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10,
      backgroundColor:"#ccc",
      borderRadius:5,
      paddingTop:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      marginTop:10,
      fontSize:10,
      color:"white",
    },
    buttonGroup: {
        flexDirection:"row",
    },
    button:{
        width:90,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:'deeppink',
        borderRadius:7
    },
    buttonText:{
        color:'deeppink',
        textAlign:'center'
    },
    image:{
        alignSelf:'center',
        marginRight:10,
    },
    cardDesc2: {
      fontSize:15,
      fontWeight:"800",
      marginBottom:10,
      borderBottomWidth:0.5,
      borderLeftWidth:0.5,
      borderTopWidth:0.5,
      borderRightWidth:0.5,
      marginTop:10,
      alignSelf:"center",
      paddingLeft:10,
      paddingRight:10,
      paddingTop:3,
      paddingBottom:3
      
      
    }
});
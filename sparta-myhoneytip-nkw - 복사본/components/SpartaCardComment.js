import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity, Alert, RefreshControl, useWindowDimensions} from 'react-native'
import {firebase_db} from "../firebaseConfig"
import '../global.js'
import AutoHeightImage from "react-native-auto-height-image";


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
        

    if(content.image != null){
        let image = content.image
        if(content.isTutor == true){
          if(content.isWriter == true){
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <AutoHeightImage
                        style={styles.image}
                        width={width}
                        source={{uri:image}}
                    />
                      <Text style={styles.cardDesc}>{content.desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터이면서 이글의 작성자입니다</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <AutoHeightImage
                        style={styles.image}
                        width={width}
                        source={{uri:image}}
                    />
                      <Text style={styles.cardDesc}>{content.desc}</Text>
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
                  <AutoHeightImage
                        style={styles.image}
                        width={width}
                        source={{uri:image}}
                    />
                      <Text style={styles.cardDesc}>{content.desc}</Text>
                      <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author} 이글의 작성자입니다.</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <AutoHeightImage
                        style={styles.image}
                        width={width}
                        source={{uri:image}}
                    />
                      <Text style={styles.cardDesc}>{content.desc}</Text>
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
                    <Text style={styles.cardDesc}>{content.desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}  튜터이면서 이글의 작성자입니다</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{content.desc}</Text>
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
                    <Text style={styles.cardDesc}>{content.desc}</Text>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author} 이글의 작성자입니다.</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                    <Text style={styles.cardDesc}>{content.desc}</Text>
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
    }
});
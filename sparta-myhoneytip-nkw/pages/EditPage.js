import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,BackHandler,Alert,Share,Button } from 'react-native';
import * as Linking from 'expo-linking';
import * as ImagePicker from 'expo-image-picker';
import {firebase_db} from "../firebaseConfig";
import Loading from '../components/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { State } from 'react-native-gesture-handler';


import firebase from 'firebase/compat/app'

import { firebaseConfig } from '../firebaseConfig';
import * as FileSystem from 'expo-file-system';
import "firebase/compat/storage";
import '../global.js'

loaded = false //페이지를 최초로 로드했고 데이터를 받을준비
export default function EditPage({navigation,route}) {

    useEffect(() => {
        const backAction = () => {
      
            Alert.alert('잠시만요!', '수정을 종료하고 내가 쓴 글로 돌아가시겠나요?', [
              {
                text: '아니요',
                onPress: () => null,
                style: 'cancel',
              },
              { text: '네', onPress: () => navigation.reset({index: 0, routes:[{name:'WritePage'}]}) },
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
          return () => backHandler.remove();
      
        })


        if (!firebase.apps.length) {
            Firebase.initializeApp(firebaseConfig);
          }
        
          const [image, setImage] = useState(null);
          const [uploading, setUploading] = useState(false);
        
          //기존 꿀팁을 저장하고 있을 상태  
        
          const [open, setOpen] = useState(false);
          const [value, setValue] = useState(null);
          const [state,setState] = useState([])
          //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
          const [cateState,setCateState] = useState([])
          const [ready,setReady] = useState(true)
          const [Name, setName] = useState('');
          const [Desc, setDesc] = useState('');
          
          const [currentDate, setCurrentDate] = useState('');
          const [percent, setPercent] = useState(0);
          const [Caterory, setCategory] = useState([
            {label: '생활', value: '생활'},
            {label: '재테크', value: '재테크'},
            {label: '반려견', value: '반려견'},
            {label: '기타', value: '기타'}
          ]);



    
    let user_idx = global.id
    console.log(user_idx)
    
    const [tip, setTip] = useState({
        "idx":9,
        "category":"재테크",
        "title":"렌탈 서비스 금액 비교해보기",
        "image": "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Frental.png?alt=media&token=97a55844-f077-4aeb-8402-e0a27221570b",
        "desc":"요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이 늘어나고 있는데요. 다만, 이런 렌탈 서비스 이용이 하나둘 늘어나다 보면 그 금액은 겉잡을 수 없이 불어나게 됩니다. 특히, 렌탈 서비스는 빌려주는 물건의 관리비용까지 포함된 것이기에 생각만큼 저렴하지 않습니다. 직접 관리하며 사용할 수 있는 물건이 있는지 살펴보고, 렌탈 서비스 항목에서 제외해보세요. 렌탈 비용과 구매 비용, 관리 비용을 여러모로 비교해보고 고민해보는 것이 좋습니다. ",
        "date":"2020.09.09"
    })

    //데이터 파이어베이스 로딩 구역 시작
    let tip1 = () => {
        if(loaded == false){ //로드할려는 데이터가 같은 거인 경우 무한 반복으로 실행되는 버그 수정!
            var { idx } = route.params;
            console.log("idx"+idx)
            firebase_db.ref('/tip/'+idx).once('value').then((snapshot) => {
                let tip = snapshot.val();
                setTip(tip)
                console.log("firebaseloaded")
            })
            loaded = true //로드가 되었다고 표시
            console.log(loaded)
            bef = idx
        }else{
            console.log("still running")
            if(idx  != bef){ //로드할려는 데이터가 다른 거인 경우!
                loaded = false //로드 완료를 취소하고 재로드를 실시한다.
            }
        }
    }

    //데이터 파이어베이스 로딩구역 끝
    
    
    useEffect(()=>{
        
        if(route.params == undefined){
            Alert.alert("이 방식으론 디테일 페이지를 로드할 수 없습니다.")
            navigation.navigate("MainPage")
            beftip = null;
        }else{
        console.log("rute"+route.params)
        tip1()
        navigation.setOptions({
            title:route.params.title,
            headerStyle: {
                backgroundColor: '#000',
                shadowColor: "#000",
            },
            headerTintColor: "#fff",
        })
        //넘어온 데이터는 route.params에 들어 있습니다.

};
    },[])

    const pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        const localUri = pickerResult.uri;
        setImage(localUri)
      
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;
        const formdata = new FormData;
        
        
        formdata.append('image', { uri: localUri, name: filename, type})
      
        if (!pickerResult.cancelled) {
          setImage(localUri)
          uploadImage(localUri)
        }
      };
      
      function gohome(){
        console.log("gohome")
        navigation.reset({index: 0, routes:[{name:'MainPage'}]})
      }
      
      const uploadImage = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("네트워크 오류가 발생하였습니다."));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
        let index = state + 1
        const ref = firebase.storage().ref().child(new Date().toISOString());
      
        const snapshot = ref.put(blob);
      
        snapshot.on(
          
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            
            setUploading(true);
          },
          (error) => {
            setUploading(false);
            console.log(error);
            blob.close();
            return;
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false);
              console.log("다운 링크 : ",url);
              setImage(url)
              alert("업로드를 완료했습니다!")
              blob.close();
              return url;
            });
          }
        )
      
      }

    const like = () => {
        
        // like 방 안에
        // 특정 사용자 방안에
        // 특정 찜 데이터 아이디 방안에
        // 특정 찜 데이터 몽땅 저장!
        // 찜 데이터 방 > 사용자 방 > 어떤 찜인지 아이디
        const user_id = global.id;
        let name = global.name.nickname
        if(name != undefined){
            firebase_db.ref('/like/'+user_id+'/'+ tip.idx).set(tip,function(error){
                console.log(error)
                Alert.alert("찜 완료!")
            });
        }else{
            Alert.alert("오류!","이 기능을 사용하려면 먼저 로그인 해야합니다.")
        }
    }

    const share = () => {
        Share.share({
            message:`${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
        });
    }

    const link = () => {
        Linking.openURL("https://spartacodingclub.kr")
    }
            
    if(route.params == undefined){
        Alert.alert("이 방식으론 디테일 페이지를 로드할 수 없습니다.")
        navigation.navigate("MainPage")
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize:16,fontWeight:'700'}}>로드할 데이터가 존재하지 않습니다. 메인페이지로 돌아가서 선택해주세요.</Text>
            </View>
        );
    }else{
        
        tip1()
    return ( 
        // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
        // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다. 
        // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다. 
    
        <ScrollView style={styles.container}>
            <View style={styles.imagecontainer}>
                <Image style={styles.image} source={{uri:tip.image}}></Image>

                <View style={styles.imagetextcontainer}>
                    <Button title="여기를 눌러 이미지를 선택하세요" onPress={pickImage} />
                    <Text>선택한 이미지가 아래에 표시됩니다.</Text>
                    <Text>이미지 업로드 완료 창이 뜨면 진행해주세요.</Text>
                    <Text>이미지를 변경하지 않으실꺼면 선택하지 마세요.</Text>
                    <Text>왼쪽 상단에 있는것이 원래 이미지 입니다.</Text>
                </View>



                </View>
                {image && <Image source={{ uri: image }} style={{marginTop:0, width: 100, height: 100, borderRadius:20 }} />}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{tip.title}</Text>
                <Text style={styles.desc}>{tip.desc}</Text>
                
            </View>
            
        </ScrollView>
    
    )
}
}

const styles = StyleSheet.create({
    /*container:{
        backgroundColor:"#000"
    },*/
    image:{
        height:80,
        width:80,
        margin:10,
        marginTop:5,
        borderRadius:20
    },
    textContainer:{
        padding:20,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize:20,
        fontWeight:'700',
        color:"#eee"
    },
    desc:{
        marginTop:10,
        color:"#eee"
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
        color:'#fff',
        textAlign:'center'
    },

    imagecontainer:{
        flexDirection:"row"
    },
    imagetextcontainer:{
        flexDirection:"column"
    }
})
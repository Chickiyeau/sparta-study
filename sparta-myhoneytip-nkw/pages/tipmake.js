//React Native TextInput
//https://aboutreact.com/react-native-textinput/

//import React in our code
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import { StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, Platform, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {firebase_db} from "../firebaseConfig";
import Loading from '../components/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { State } from 'react-native-gesture-handler';

export default function tipmake(){
  //기존 꿀팁을 저장하고 있을 상태
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [state,setState] = useState([])
  //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
  const [cateState,setCateState] = useState([])
  const [ready,setReady] = useState(true)
  const [Name, setName] = useState('');
  const [Desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [Caterory, setCategory] = useState([
    {label: '생활', value: '생활'},
    {label: '재테크', value: '재테크'},
    {label: '반려견', value: '반려견'},
    {label: '기타', value: '기타'}
  ]);


  useEffect(()=>{
	   
    //뒤의 1000 숫자는 1초를 뜻함
    setTimeout(()=>{    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    
        //헤더의 타이틀 변경
        firebase_db.ref('/tipindex').once('value').then((snapshot) => {
          console.log("파이어베이스에서 데이터 가져왔습니다!!")
          let tip = snapshot.val();
          setState(tip)
          setCateState(tip)
          setReady(false)
        });
    },1000)

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      year+ '.' + month + '.' + date
    );

    
  },[])

  const pickImage = async () => {
  let pickerres = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!pickerres.cancelled) {
    setImage(pickerres.uri);
  }
}
  return ready ? <Loading/> :   (
    <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text>당신만의 꿀팁을 여기에 적어주세요!!</Text>
            <Text>단. 제목, 내용, 이미지가 모두 들어가야합니다!</Text>
            <TextInput
            value={Name}
            onChangeText={(Name) => setName(Name)}
            placeholder={'제목'}
            style={styles.inputName}
            />
    <DropDownPicker
     placeholder='카테고리를 선택하세요.'
      open={open}
      value={value}
      items={Caterory}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCategory}
    />

            <TextInput
            value={Desc}
            onChangeText={(Desc) => setDesc(Desc)}
            placeholder={'내용'}
            style={styles.inputDesc}
            />
         <Button title="여기를 눌러 이미지를 선택하세요" onPress={pickImage} />
         <Text>선택한 이미지가 아래에 표시됩니다.</Text>
             {image && <Image source={{ uri: image }} style={{marginTop:20, width: 200, height: 200 }} />}

        
        </View>
        <Button title="글쓰기" onPress={() => {Alert.alert("글 쓰기 확인","정말 작성하시겠습니까?", [
        {
            text:'취소',
            onPress: () => Alert.alert('작성이 취소되었습니다.', '사용자가 작성을 취소했습니다.'),},
        {
            text:'확인',
            onPress: () => {
                if(Name != ""){
                    if(value != null){
                        if(Desc != ""){
                            if(image != null){
                                console.log("name",Name)
                                console.log("desc",Desc)
                                console.log("image",image)
                                console.log("value", value)
                                console.log("date", currentDate)
                                let index = state + 1
                                console.log("index",index)
                                let newtip = {
                                    category:value,
                                    date:currentDate,
                                    desc:Desc,
                                    idx:index,
                                    title:Name
                                 }
                                 console.log(newtip)
                                
                                
                                Alert.alert('작성을 시작합니다.', 'DB에 연결중입니다.')
                                /*firebase_db.ref('/'+user_id+'/'+ tip.idx).set(tip,function(error){
                                    console.log(error)
                                    Alert.alert("찜 완료!")
                                });*/
                                
                            }else{
                                Alert.alert("등록 불가", "이미지가 비어있습니다.")
                            }
                        }else{
                            Alert.alert("등록 불가", "내용란이 비어있습니다.")
                        }
                    }else{
                        Alert.alert("등록 불가", "카테고리를 선택하지 않았습니다.")
                    }        
                }else{
                    Alert.alert("등록 불가", "제목란이 비어있습니다.")
                }
        }},]);
        
        }}
        />
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  inputName: {
    width: 350,
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  inputDesc: {
    width: 350,
    height: 800,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  }
});
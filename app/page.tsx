import axios from "axios";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View,Image,TouchableOpacity,Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Page(){
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [hash,setHash] = useState("");
    const { chapterid,mangaid,cover_id,title,cover_art,currentpageparam,chaptertitle,volumeno}:any = params;
    console.log(currentpageparam,"hey")
    const [currentpage,setCurrentPage] = useState(currentpageparam === undefined ? 0 : parseInt(currentpageparam));
    const [pages,setPages] = useState([]);
    
    //console.log("hi",chapterid,mangaid,cover_id,title,cover_art,volumeno)
    const setcurrentreading =async () => {
        AsyncStorage.setItem(`manga-current-reading:${mangaid}`,JSON.stringify({"volumeno":volumeno,"chaptertitle":chaptertitle,"chapterid":chapterid,"currentpage":currentpage,"mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":`${cover_art}`}))
        router.push("/library")
    }
    const getpages =async () => {
        const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterid}`)
        let result = response.data
        let hash = result.chapter.hash
        setHash(hash)
        setPages(result.chapter.data)
        //let pageurl = `https://uploads.mangadex.org/data/3303dd03ac8d27452cce3f2a882e94b2/1-f7a76de10d346de7ba01786762ebbedc666b412ad0d4b73baa330a2a392dbcdd.png`
        //console.log(result)
        
    }
    const incrementpage = () =>{
        let numpages = pages.length
        if (currentpage +1 < numpages){
            setCurrentPage(currentpage + 1)

        }
    }
    const decrementpage = () =>{
        if (currentpage != 0){
            setCurrentPage(currentpage - 1)

        }
    }
    const snapTo = (number:number) =>{
        setCurrentPage(number)

    }
    useEffect(() =>{
        getpages()
    },[])
    // JSON.stringify({ "mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`})
    //console.log(`https://uploads.mangadex.org/data/${hash}/${pages[0]}`)
    return(
    <View style={{flex:1,backgroundColor:"#141212",alignItems:"center"}}>
        <StatusBar  hidden/>
        <View style={{alignSelf:"flex-start"}} >
            <TouchableOpacity style={{width:100}}  onPress={() =>{navigation.goBack()}}>
            <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={{flex:0.1}}>
            <Text style={{color:"white"}}>Page: {currentpage + 1}/{pages.length}</Text>
        </View>
        <View style={{flex:0.2}}>
            <Text style={{color:"white"}}></Text>
        </View>

            
        <Image style={{width:414,height:586}} alt="hello" source={{uri:`https://uploads.mangadex.org/data/${hash}/${pages[currentpage]}`}}></Image>
        <View style={{flex:0.5,flexDirection:"row",gap:25,marginTop:20}}>
            <TouchableOpacity  onPress={() =>{decrementpage()}}>
            <AntDesign name="arrowleft" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.25))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.25)}</Text>
            </TouchableOpacity>
            <TouchableOpacity onLongPress={()=>{setcurrentreading()}}>
            <Image style={{width:50,height:40}} alt="hello" source={require("./CaesarAILogo.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.75))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.75)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{bottom:3}} onPress={() =>{incrementpage()}}>
            <AntDesign name="arrowright" size={35} color="white" />
            </TouchableOpacity>
        </View>

    </View>)
}
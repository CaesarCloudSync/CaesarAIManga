import { View,Text,Image,TouchableOpacity } from "react-native"
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
export default function VolumeCover({mangaid,cover_art,volumeno,title,cover_id,type,chapterid,currentpage,setRecentManga}:any){
    const router = useRouter();
    const pathname = usePathname();
    const [volumecolor,setVolumeColor] = useState("#141212")
    const navtochapters = async () =>{
        if (currentpage !== undefined){
        router.push({ pathname: "/page", params: {"chapterid":chapterid,"mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":cover_art,"currentpageparam":currentpage}});
        }
        else{
        router.push({ pathname: "/chapterpage", params: { "volumeno":volumeno,"mangaid": mangaid,"title":title,"cover_id":cover_id,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
        }
    }
    const removefromrecentreading =async () => {
        if (pathname === "/library"){
            //console.log("hi")
            await AsyncStorage.removeItem(`manga-current-reading:${mangaid}-${volumeno}-${chapterid}`)
            setRecentManga([])
        }
        
    }
    const checkvolumeunavailable =async () => {
        const unavail = await AsyncStorage.getItem(`un-manga-volume:${mangaid}-${volumeno}`)
        if (unavail !== null){
            setVolumeColor("red")
        }
        //console.log(unavail)
        
    }
    useEffect(() =>{
        checkvolumeunavailable()
    },[])
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:volumecolor}}>
            <TouchableOpacity onLongPress={() =>{removefromrecentreading()}} onPress={() =>{navtochapters()}}>
                <Image style={{width:175,height:250}} alt="hello" source={{uri:`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}}></Image>
                <Text style={{color:"white",width:175}}>{title} - Volume: {volumeno} | {currentpage !== undefined && `Page ${currentpage +1}`}</Text>
            </TouchableOpacity>
        </View>

    )
}
import { View,TouchableOpacity,Text,Image,FlatList} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import ChapterCover from "@/components/chapterpagecomponents/chaptercover";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileSystem from "expo-file-system";
export default function ChapterPage(){
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [progress,setProgress] = useState({});
    const [downloadedmanga,setDownloadedManga]  = useState<any>([]);
    const { mangaid,title,cover_art,volumeno,cover_id,type,currentpageparam}:any = params;
    const [chapterfeed,setChapterFeed] = useState("");
    const callback = (downloadProgress:any) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress({
          downloadProgress: progress,
        });
      };
    const getpages =async () => {
        const downloadResumable = FileSystem.createDownloadResumable(
            'https://uploads.mangadex.org/data/7dd9b16a7f83881121980b3bf685d5ff/x1-de250240139cdbe166efb2251cb9b6d02029ae72242a953065974a12a0d86581.jpg',
            FileSystem.documentDirectory + 'chapter1.jpg',
            {},
            callback
          );
          try {
            const { uri }:any = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
          } catch (e) {
            console.error(e);
          }
          let dir:any = FileSystem.documentDirectory
          let files = await FileSystem.readDirectoryAsync(dir);
          console.log(files)
          
        
    }
    const getchapterpages =async () => {
        //console.log(mangaid)
        const responsefeed = await axios.get(`https://api.mangadex.org/manga/${mangaid}/feed`,{params:{"limit":500,"translatedLanguage":["en"],"order":{
            
            "volume":"asc",
            "chapter":"asc"
            
          }}})
        let result = responsefeed.data.data
        //console.log(result[1])
        result= result.filter((manga:any)=>{return(manga.attributes.volume === volumeno)})
        //console.log(result)
        if (result.length === 0){
            AsyncStorage.setItem(`un-manga-volume:${mangaid}-${volumeno}`,JSON.stringify({"mangaid":mangaid,"volumeno":volumeno}))
        }
        setChapterFeed(result)
        
    }
    const navmangapage = () =>{
        router.push({ pathname: "/mangapage", params: { "mangaid": mangaid,"cover_id":cover_id,"title":title,"cover_art":cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
    }
    const download_volume =async () => {
        await AsyncStorage.setItem(`downloaded:${mangaid}-${volumeno}`,JSON.stringify({"volumeno":volumeno,"mangaid":mangaid,"title":title,"cover_id":cover_id,"cover_art":cover_art.includes("http") ? cover_art.split("/").slice(-1) :`${cover_art}`}))
        router.push("/downloads")
    }
    useEffect(()=>{
        getchapterpages()
    },[])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <View style={{flex:0.04}}>
            <StatusBar  hidden/>
            <TouchableOpacity style={{flex:1}} onPress={() =>{navmangapage()}}>
            <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            </View>

            <View style={{flex:0,alignItems:"center"}}>
             
                <TouchableOpacity onLongPress={() =>{download_volume()}}>
                    <Image style={{width:150,height:225}} alt="hello" source={{uri:cover_art.includes("http") ? cover_art :`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}` }}></Image>
                </TouchableOpacity>
                <Text style={{color:"white",fontSize:20}}>{title}</Text>
                <Text style={{color:"grey",fontSize:13}}>Volume: {volumeno}</Text>

            </View>

            {chapterfeed.length !== 0 &&
            <FlatList
                    numColumns={2}
                    style={{flex:0.1}}
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={chapterfeed}
                    renderItem={({item,index}:any) => {
                            return (
                                
                                <ChapterCover  key={index} volumeno={volumeno} chapterid={item.id} title={title} chaptertitle={item.attributes.title} chapter={item.attributes.chapter}  mangaid={mangaid} cover_art={cover_art} cover_id={cover_id} type={type} currentpageparam={currentpageparam}></ChapterCover>
                
                            )
                    }
                }

            />}



        </View>
    )
}
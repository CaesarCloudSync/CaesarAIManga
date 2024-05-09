import { View,TouchableOpacity,Text,Image,FlatList} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import ChapterCover from "@/components/chapterpagecomponents/chaptercover";
export default function ChapterPage(){
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { mangaid,volumeid,title,cover_art,volumeno}:any = params;
    const [chapterfeed,setChapterFeed] = useState("");
    const getchapterpages =async () => {
        console.log(mangaid)
        const responsefeed = await axios.get(`https://api.mangadex.org/manga/${mangaid}/feed`,{params:{"limit":500,"translatedLanguage":["en"],"order":{
            
            "volume":"asc",
            "chapter":"asc"
            
          }}})
        let result = responsefeed.data.data
        //console.log(result)
        result= result.filter((manga:any)=>{return(manga.attributes.volume === volumeno)})
        console.log(result)
        setChapterFeed(result)
        
    }
 
    useEffect(()=>{
        getchapterpages()
    },[])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <View style={{flex:0.04}}>
            <TouchableOpacity style={{flex:1}} onPress={() =>{navigation.goBack()}}>
            <Text style={{color:"white"}}>Back</Text>
            </TouchableOpacity>
            </View>

            <View style={{flex:0,alignItems:"center"}}>
             
                <Image style={{width:150,height:225}} alt="hello" source={{uri:cover_art}}></Image>
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
                                
                                <ChapterCover key={index} chapterid={item.id} title={item.attributes.title} chapter={item.attributes.chapter} mangaid={mangaid} cover_art={cover_art} item={item}></ChapterCover>
                
                            )
                    }
                }

            />}



        </View>
    )
}
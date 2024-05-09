import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MangaCover({mangaid,cover_id,title,type,index}:any){
    const router = useRouter();
    //console.log(description.en)
    const [cover_art,setCoverArt] = useState("");
    
    const [coverimageexists,setCoverImageExists] = useState(true)
    
    const getcoverimage =async () => {
        try{
            //console.log(`https://api.mangadex.org/cover/${cover_id}`)
            const response = await axios.get(`https://api.mangadex.org/cover/${cover_id}`)
            let cover_art = response.data.data.attributes.fileName
            //console.log(`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`)
            setCoverArt(cover_art)
        }
        catch{
            //console.log("error",`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`)
            setCoverImageExists(false)
        }

        
    }
    const navmangapage =async () => {
        AsyncStorage.setItem(`manga:${mangaid}`,JSON.stringify({ "mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}))
        router.push({ pathname: "/mangapage", params: { "mangaid": mangaid,"cover_id":cover_id,"title":title,"type":type,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
        
        
    }
    useEffect(()=>{
        getcoverimage()
    },[cover_art])

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            {index === 0 &&    <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Manga</Text>}
            {index === 20 &&    <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Shounen</Text>}
            {index === 100 &&    <Text style={{color:"white",fontSize:20,marginBottom:10}}>Latest Shoujo</Text>}
            {index === 200 &&    <Text style={{color:"white",fontSize:17,marginBottom:10}}>Latest Seinen</Text>}
            {index.toString().includes("1") &&   <View style={{height:32}}></View>}
             
            {cover_art !== ""?

            <TouchableOpacity onPress={() =>{navmangapage()}} >
                <Image style={{width:200,height:300}} alt="hello" source={{uri:`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}}></Image>
            </TouchableOpacity>

            :
            <TouchableOpacity onPress={() =>{navmangapage()}} >
                <Image style={{width:200,height:300}} alt="hello" source={require("./download (1).jpeg")}></Image>
            </TouchableOpacity>
   
            
        
           
            }
            
            <Text style={{color:"white",width:200}}>{title}</Text>
            </View>

            
                
            

            
        </View>
    )

 

}
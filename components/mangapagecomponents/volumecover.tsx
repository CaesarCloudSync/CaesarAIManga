import { View,Text,Image,TouchableOpacity } from "react-native"
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
export default function VolumeCover({mangaid,cover_art,volumeid,volumeno,title}:any){
    const router = useRouter()
    const navtochapters = async () =>{
        router.push({ pathname: "/chapterpage", params: { "volumeid":volumeid,"volumeno":volumeno,"mangaid": mangaid,"title":title,"cover_art":`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}});
    }
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={() =>{navtochapters()}}>
                <Image style={{width:175,height:250}} alt="hello" source={{uri:`https://uploads.mangadex.org/covers/${mangaid}/${cover_art}`}}></Image>
                <Text style={{color:"white"}}>Volume: {volumeno}</Text>
            </TouchableOpacity>
        </View>

    )
}
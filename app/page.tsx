import axios from "axios";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View,Image,TouchableOpacity,Text } from "react-native";
export default function Page(){
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [hash,setHash] = useState("");
    const [currentpage,setCurrentPage] = useState(0);
    const [pages,setPages] = useState([]);
    const { chapterid}:any = params;
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
    console.log(`https://uploads.mangadex.org/data/${hash}/${pages[0]}`)
    return(
    <View style={{flex:1,backgroundColor:"#141212",alignItems:"center"}}>
        <View style={{alignSelf:"flex-start"}} >
            <TouchableOpacity style={{width:100}}  onPress={() =>{navigation.goBack()}}>
            <Text style={{color:"white"}}>Back</Text>
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
            <Text style={{color:"white",fontSize:20}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.25))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.25)}</Text>
            </TouchableOpacity>
            <View style={{width:20}}></View>
            <TouchableOpacity onPress={() =>{snapTo(Math.round(pages.length * 0.75))}}>
            <Text style={{color:"white",fontSize:20}}>{Math.round(pages.length * 0.75)}</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() =>{incrementpage()}}>
            <Text style={{color:"white",fontSize:20}}>Forward</Text>
            </TouchableOpacity>
        </View>

    </View>)
}
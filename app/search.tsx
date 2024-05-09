import { TextInput, View ,FlatList,Text,TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MangaCover from "@/components/homecomponents/MangaCover";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
export default function Search(){
    const [text,setText] = useState("");
    const [searchresults,setSearchResults] = useState([]);
    const [recentmanga,setRecentManga]  = useState<any>([]);
    const [recentremoved,setRecentRemoved] = useState(false)
     const searchmanga =async () => {
        if(text !== ""){
            const response = await axios.get(`https://api.mangadex.org/manga?limit=100&originalLanguage[]=ja&availableTranslatedLanguage[]=en`,{params:{"title": text}})
            
            let result = response.data.data
  
            let mangafeed:any = result.map((manga:any) =>{return({"mangaid":manga.id,"title":manga.attributes.title.en,"type":manga.type,"description":manga.attributes.description,"status":manga.attributes.status,"tags":manga.attributes.tags,"updatedAt":manga.attributes.updatedAt,"cover_id":manga.relationships[2].id})})

            setSearchResults(mangafeed)
        }
        
     }
     const getrecentmanga =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        setRecentManga(mangaitems)
        
     }


     useEffect(() =>{
        if (recentmanga.length === 0){
            getrecentmanga()
        }
     },[recentmanga])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
                <StatusBar  hidden/>
                {searchresults.length !== 0 &&
                <TouchableOpacity onPress={() =>{setSearchResults([])}} style={{alignSelf:"flex-end"}}>
                <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>}


                <TextInput
                onSubmitEditing={() =>{searchmanga()}}
                placeholder="What manga would you like to read?"
                placeholderTextColor={'white'}
         
                style={ {
                    height: 10,
                    flex:0.1,

                    borderBottomRightRadius:10,borderTopRightRadius:10,
   
                    backgroundColor:"#141212",
                    color:"white"
                  }}
                onChangeText={setText}
                value={text}
            />
            
        {recentmanga.length !== 0 &&
                <FlatList
                numColumns={2}
                style={{flex:1, flexGrow: searchresults.length === 0 ?1 :0 }}
                
                columnWrapperStyle={{    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}
                data={recentmanga}
                renderItem={({item,index}:any) => {
        
                        return (
                            <MangaCover key={index} index={index} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} type={item.type} setRecentManga={setRecentManga}></MangaCover>
            
                        )
                }
            }

        />}
    

        {searchresults.length !== 0 &&
                <FlatList
                numColumns={2}
                style={{flex:1}}
                
                columnWrapperStyle={{    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}

                data={searchresults}
                renderItem={({item,index}:any) => {
        
                        return (
                            <MangaCover key={index} index={index} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} ></MangaCover>
            
                        )
                }
            }

        />}
        {/*searchresults.length === 0 && <View style={{flex:1}}></View>*/}
        <NavigationFooter style={{flex:0.1}} currentpage={"search"}/>
        </View>
    )
}
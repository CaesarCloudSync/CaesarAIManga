import { TextInput, View ,FlatList} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MangaCover from "@/components/homecomponents/MangaCover";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Search(){
    const [text,setText] = useState("");
    const [searchresults,setSearchResults] = useState("");
    const [recentmanga,setRecentManga]  = useState<any>([]);
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
        const items = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga:"))}))
        setRecentManga(items)
        
     }
     useEffect(() =>{
        getrecentmanga()
     },[])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            
                <TextInput
                onSubmitEditing={() =>{searchmanga()}}
                placeholder="What song would you like to listen to?"
                placeholderTextColor={'white'}
         
                style={ {
                    height: 10,
                    flex:0.1,
                    margin:20,
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
                style={{flex:1}}
                
                columnWrapperStyle={{    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}

                data={recentmanga}
                renderItem={({item,index}:any) => {
                    let manga = JSON.parse(item[1])
                    console.log(manga)
        
                        return (
                            <MangaCover key={index} index={index} mangaid={manga.mangaid} title={manga.title} cover_id={manga.cover_id}></MangaCover>
            
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
        <NavigationFooter currentpage={"search"}/>
        </View>
    )
}
import { View } from "react-native";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import MangaCover from "@/components/homecomponents/MangaCover";
import VolumeCover from "@/components/mangapagecomponents/volumecover";
import { FlatList } from "react-native";
export default function Library(){
    const [recentmanga,setRecentManga]= useState([]);
    const getcurrentreading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga-current-reading:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        console.log(mangaitems)
         setRecentManga(mangaitems)
        
     }
    useEffect(()=>{
        getcurrentreading()
    },[])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            {recentmanga.length !== 0 &&
            <FlatList
                    numColumns={2}
                    
                    
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={recentmanga}
                    renderItem={({item,index}:any) => {
        
                            return (
                                
                                <VolumeCover key={index}  volumeno={item.volumeno} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} t cover_art={item.color_art}></VolumeCover>
                
                            )
                    }
                }

            />}
            <NavigationFooter style={{flex:0.1}} currentpage={"library"}/>
            
        </View>
    )
}
import { View } from "react-native";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import MangaCover from "@/components/homecomponents/MangaCover";
import VolumeCover from "@/components/mangapagecomponents/volumecover";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
export default function Library(){
    const [recentmanga,setRecentManga]= useState([]);

    const getcurrentreading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("manga-current-reading:"))}))
         //console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
         /*const items_download:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("downloaded_volume:"))}))
         const mangaitemskey = items.map((item:any) =>{return(`downloaded_volume:${JSON.parse(item[1]).mangaid}-${JSON.parse(item[1]).volumeno}`)})
         const downloaditems = items_download.map((item:any) =>{return(`downloaded_volume:${JSON.parse(item[1]).mangaid}-${JSON.parse(item[1]).volumeno}`)})
        console.log(downloaditems)
        const filteredArray =  mangaitemskey.map((value:any,index:any) => {if (downloaditems.includes(value)){return(index)}else{return(false)}}).filter((value:any) =>{return(value !== false)})
        console.log(filteredArray)
        
         // downloaded_volume:${mangaid}-${volumeno}

         setRecentManga(mangaitems)*/
         setRecentManga(mangaitems)
        
     }
    useEffect(()=>{
        if (recentmanga.length === 0){
        getcurrentreading()
    }
    },[recentmanga])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <Header/>
            <StatusBar  hidden/>
            {recentmanga.length !== 0 &&
            <FlatList
                    numColumns={2}
                    style={{flex:1}}
                    
                    
                    
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',}}

                    data={recentmanga}
                    renderItem={({item,index}:any) => {
                        let cover_filename = item.cover_art.split("/").slice(-1)
                      
                            return (
                                
                                
                                <VolumeCover key={index} chaptertitle={item.chaptertitle} currentpage={item.currentpage} chapterid={item.chapterid} volumeno={item.volumeno} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} t cover_art={cover_filename} setRecentManga={setRecentManga} ></VolumeCover>
                
                            )
                    }
                }

            />}
            {recentmanga.length === 0 && <View style={{flex:1}}></View>}
            <NavigationFooter style={{flex:0.1}} currentpage={"library"}/>
            
        </View>
    )
}
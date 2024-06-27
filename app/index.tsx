import { FlatList, View,Text,Image } from 'react-native';

import { Link } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MangaCover from '@/components/homecomponents/MangaCover';
import { mangatest } from '@/components/homecomponents/test';
import Header from '@/components/header/header';
import NavigationFooter from './footer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
export default function Index() {
    const netInfo = useNetInfo();
    const [mangafeed,setMangaFeed] = useState([]);
    const getmangafeed = async (params:any) =>{
        const response = await axios.get("https://api.mangadex.org/manga?limit=100&originalLanguage[]=ja&availableTranslatedLanguage[]=en",{"params":params}) //&updatedAtSince=
        let result = response.data.data
  
        let mangafeed:any = result.map((manga:any) =>{return({"mangaid":manga.id,"title":manga.attributes.title.en,"type":manga.type,"description":manga.attributes.description,"status":manga.attributes.status,"tags":manga.attributes.tags,"updatedAt":manga.attributes.updatedAt,"cover_id":manga.relationships[2].id})})
        return mangafeed
        
    }
    const getallmangafeed =async () => {
        const shounenfeed = await getmangafeed({"publicationDemographic":["shounen"],"contentRating":["safe"],"createdAtSince":"2015-05-07T14:30:45"})
        const shoujofeed = await getmangafeed({"publicationDemographic":["shoujo"],"contentRating":["safe"],"createdAtSince":"2022-05-07T14:30:45"})
        const seinenfeed = await getmangafeed({"publicationDemographic":["seinen"],"contentRating":["safe"],"createdAtSince":"2022-05-07T14:30:45"})
        const mangafeed = shounenfeed.concat(shoujofeed).concat(seinenfeed)
        //let keys = await AsyncStorage.getAllKeys()
        //const items:any = await AsyncStorage.multiRemove(keys.filter((key:any) =>{return(key.includes("manga-current-reading:"))}))
        //console.log(mangafeed)
        setMangaFeed(mangafeed)
    }
    

useEffect(() =>{
    // setMangaFeed(mangafeed)
    if (netInfo.isInternetReachable === true){
        getallmangafeed()
    }
    
},[netInfo])
if (netInfo.isInternetReachable === true){
  return (
    <View style={{flex:1,backgroundColor:"#141212"}}>
        <StatusBar  hidden/>
        <Header style={{flex:1}}/>
        <View style={{flex:1,padding:30}}>

        {mangafeed.length !== 0 &&
        <FlatList
        numColumns={2}
        style={{flex:1}}
        
        columnWrapperStyle={{    flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',}}

        data={mangafeed}
        renderItem={({item,index}:any) => {
   
                return (
                    <MangaCover key={index} index={index} mangaid={item.mangaid} title={item.title} cover_id={item.cover_id} type={item.type} description={item.description} status={item.status} tags={item.tags} updatedAt={item.updatedAt}></MangaCover>
    
                )
        }
    }

  />}
        </View>
        <NavigationFooter currentpage={"home"}></NavigationFooter>

  

    </View>
  );
}
else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
        <StatusBar  hidden/>
        <Header style={{flex:1}}/>
        {<View style={{flex:1}}></View>}
        <NavigationFooter currentpage={"home"}></NavigationFooter>

  

    </View>
    )
}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            <StatusBar  hidden/>
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"#141212",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Read your Downloads
                </Text>
            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"home"}/>

        </View>
    )
    
}
}
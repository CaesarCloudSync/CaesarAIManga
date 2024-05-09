import { View,Text,Image } from 'react-native';

import { Link } from 'expo-router';

export default function NavigationFooter({currentpage}:any){

    return(
        <View style={{flex:0.03,backgroundColor:"#141212"}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",flex:1}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Link  href="/">
                <View>
                    
                    <Image  ></Image>
                
                        <Text style={{fontSize:10,color:currentpage=== "home" ? "white" :"grey"}}>
                            Home
                        </Text>
                    

                </View>
            </Link>
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <View>
                
                {currentpage === "search" ?
                <View>
                                    
                    <Image  ></Image>
                    
        
                    <Text style={{fontSize:10,color:currentpage=== "search" ? "white" :"grey"}}>
                        Search
                    </Text>
                </View>:
                 <Link   href="/search" style={{backgroundColor:"transparent"}}>
                    <View>
                
                    <Image  ></Image>
                    
        
                    
                    <Text style={{fontSize:10,color:currentpage=== "search" ? "white" :"grey"}}>
                            Search
                        </Text>
                    </View>
                </Link>
                }


            </View>
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Link    href="/downloads">
                <View>
                <Image  ></Image>
                    
                        <Text style={{fontSize:10,color:currentpage=== "downloads" ? "white" :"grey"}}>
                            Downloads
                        </Text>
                

                </View>
            </Link>
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Link   href="/library">
                <View>
                {/*Image style={{width:20,height:20}} source={} ></Image> */}
                    
                        <Text style={{fontSize:10,color:currentpage=== "library" ? "white" :"grey"}}>
                            Library
                        </Text>
                

                </View>
            </Link>
        </View>






            
            

        </View>

    </View>
    )
}
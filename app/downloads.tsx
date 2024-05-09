import { View } from "react-native";
import NavigationFooter from "./footer";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
export default function Downloads(){
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <StatusBar  hidden/>
            <Header/>
            { <View style={{flex:1}}></View>}
            <NavigationFooter style={{flex:0.1}} currentpage={"downloads"}/>

        </View>
    )
}
import { View } from "react-native";
import NavigationFooter from "./footer";
import { StatusBar } from "expo-status-bar";
export default function Downloads(){
    return(
        <View style={{flex:1}}>
            <StatusBar  hidden/>
            <NavigationFooter style={{flex:0.1}} currentpage={"downloads"}/>

        </View>
    )
}
import { View } from "react-native";
import NavigationFooter from "./footer";
export default function Library(){
    return(
        <View style={{flex:1}}>
            <NavigationFooter style={{flex:0.1}} currentpage={"library"}/>
            
        </View>
    )
}
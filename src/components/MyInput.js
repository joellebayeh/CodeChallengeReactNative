import React from "react";
import { TextInput, View } from "react-native";

const MyInput = (props) => {
    const {placeholder} = props;
    return(
        <View>
            <View>
                ....ICON....
                <TextInput placeholder={placeholder}/>
            </View>
        </View>
    )
}

export default MyInput;
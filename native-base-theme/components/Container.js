import {Platform, Dimensions} from "react-native";

import variable from "./../variables/platform";
import {Colors} from "../../constants";

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
    const theme = {
        flex: 1,
        height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
        backgroundColor: Colors.white
    };

    return theme;
};

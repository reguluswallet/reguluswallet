import React from "react";
import { Image, StyleSheet } from "react-native";
import { Layout } from "../constants";

const LogoImage = () => {
    return (
        <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        marginBottom: Layout.gutter
    }
});

export { LogoImage };

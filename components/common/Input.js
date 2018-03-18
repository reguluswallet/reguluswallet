import React from "react";
import { Input, Item } from "native-base";
import { Colors, Layout } from "../../constants";

const TestInput = () => {
    return (
        <Item regular>
            <Input
                {...props}
                ref={props.ref}
                selectionColor={Colors.tintColor}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                placeholder="E-mail Address"
                placeholderTextColor={Colors.grey}
                onChangeText={value => this.setState({ reset_email: value })}
                value={this.state.reset_email}
            />
        </Item>
    );
};

const styles = {
    inputStyle: {
        color: Colors.darkGrey,
        padding: Layout.gutter,
        fontSize: 16,
        lineHeight: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.grey,
        fontFamily: "clear-sans"
    },
    labelStyle: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: "clear-sans"
    },
    containerStyle: {
        marginBottom: Layout.gutter
    }
};

export { TestInput };

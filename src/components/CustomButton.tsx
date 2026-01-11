import {Pressable, Text, View, StyleSheet, ViewStyle, StyleProp} from "react-native";
import {ComponentProps} from "react";
import {COLORS} from "../constants/colors";

type CustomButtonProps = {
    title: string;
    style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof Pressable>;

export const CustomButton = ({title, style, ...pressableProps}: CustomButtonProps) => {
    return (
        <Pressable hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} {...pressableProps} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: 1.5
    },
});

export default CustomButton;

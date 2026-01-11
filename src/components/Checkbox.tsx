import {Pressable, StyleSheet, View} from "react-native";
import {ComponentProps} from "react";
import {AntDesign} from '@expo/vector-icons';
import {COLORS} from "../constants/colors";

type CheckboxProps = {
    checked?: boolean;
    onPress?: () => void;
} & ComponentProps<typeof View>;

export const Checkbox = ({checked, onPress, ...viewProps}: CheckboxProps) => {
    return (
        <View {...viewProps}>
            <Pressable hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} onPress={onPress} style={[styles.container, checked && styles.checked]}>
                <AntDesign style={!checked && {display: 'none'}} name='check' size={20} color='white'/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 25,
        aspectRatio: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center'

    },
    checked: {
        backgroundColor: COLORS.secondary
    }
});

export default Checkbox;

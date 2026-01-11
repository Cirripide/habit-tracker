import {View, StyleSheet} from "react-native";
import {COLORS} from "../constants/colors";


type ProgressBarProps = {
    // 0 - 100
    progress: number;
};

export const ProgressBar = ({progress}: ProgressBarProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.statusBar, {width: `${progress}%`}]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.secondary,
    },
    statusBar: {
        backgroundColor: COLORS.secondary,
        height: '100%',
        borderRadius: 10
    }
});

export default ProgressBar;

import {View, Text, StyleSheet} from "react-native";
import {COLORS} from "../constants/colors";
import {useHabits} from "../providers/HabitsProvider";
import ProgressBar from "./ProgressBar";
import {useMemo} from "react";

export const OverviewCard = () => {
    const {habits, completedHabitsCount, habitsCount} = useHabits();

    const finishedHabitsCount = useMemo(() => (completedHabitsCount /habitsCount) * 100, [habits, completedHabitsCount]);

    if (!habitsCount) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You are almost there!</Text>
            <Text style={styles.count}>{completedHabitsCount}/{habitsCount} habits completed</Text>
            <ProgressBar progress={finishedHabitsCount}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.tertiary
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10
    },
    count: {
        marginBottom: 10
    }
});

export default OverviewCard;

import {View, Text, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import {useHabits} from "../providers/HabitsProvider";
import {COLORS} from "../constants/colors";
import {Habit} from "../types";

type DeleteHabitProps = {
    habit?: Habit;
    onSubmit?: () => void;
};

export const DeleteHabit = ({onSubmit, habit}: DeleteHabitProps) => {
    const {deleteHabit} = useHabits();

    if (!habit) {
        return (
            <View>No habit selected</View>
        )
    }

    const handleSubmit = () => {
        deleteHabit(habit.id);
        onSubmit?.();
    }

    return (
        <View>
            <Text style={styles.description}>Do you want to delete the "{habit.name}" habit?</Text>
            <CustomButton style={{backgroundColor: COLORS.danger}} title="Delete" onPress={handleSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    description: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 15
    }
});

export default DeleteHabit;

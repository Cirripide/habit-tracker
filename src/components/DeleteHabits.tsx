import {View, Text, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import {useHabits} from "../providers/HabitsProvider";
import {COLORS} from "../constants/colors";

type DeleteHabitsProps = {
    onSubmit?: () => void;
};

export const DeleteHabits = ({onSubmit}: DeleteHabitsProps) => {
    const {clearCompletedHabits} = useHabits();

    const handleSubmit = () => {
        clearCompletedHabits();
        onSubmit?.();
    }

    return (
        <View>
            <Text style={styles.description}>Do you want to delete all completed
                habits?</Text>
            <CustomButton style={{backgroundColor: COLORS.danger}} title="Delete all" onPress={handleSubmit}/>
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

export default DeleteHabits;

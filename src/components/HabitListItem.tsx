import {Text, StyleSheet, View} from 'react-native';
import {type Habit} from '../types';
import Checkbox from "./Checkbox";
import {useHabits} from "../providers/HabitsProvider";
import {COLORS} from "../constants/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type HabitListItemProps = {
    habit: Habit
};

export const HabitListItem = ({habit}: HabitListItemProps) => {
    const {toggleHabit} = useHabits();

    return (
        <View style={styles.container}>
            <View style={styles.habitIcon}>
                <FontAwesome6 name={habit.icon} size={20} color="black"/>
            </View>
            <View style={{flex: 1}}>
                <Text
                    textBreakStrategy="highQuality"
                    lineBreakStrategyIOS="standard"
                    style={styles.title}>{habit.name}</Text>
                <Text
                    textBreakStrategy="highQuality"
                    lineBreakStrategyIOS="standard"
                    style={styles.description}>{habit.description}</Text>
            </View>
            <Checkbox
                style={styles.checkbox}
                checked={habit.completed}
                onPress={() => toggleHabit(habit.id)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingRight: 60,
        borderWidth: 1,
        borderColor: COLORS.tertiary,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    habitIcon: {
        width: 45,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 600
    },
    description: {},
    checkbox: {
        position: 'absolute',
        right: 30
    }
});

export default HabitListItem;

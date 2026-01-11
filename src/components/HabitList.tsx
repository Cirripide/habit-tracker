import {Text, StyleSheet, View, ScrollView, Pressable} from 'react-native';
import HabitListItem from "./HabitListItem";
import {useHabits} from "../providers/HabitsProvider";
import CustomButton from "./CustomButton";
import {useState} from "react";
import CustomModal from "./CustomModal";
import CreateHabit from "./CreateHabit";
import {COLORS} from "../constants/colors";
import DeleteHabits from "./DeleteHabits";
import DeleteHabit from "./DeleteHabit";
import {Habit} from "../types";

const MODAL_COMPONENTS = {
    add: (onClose: () => void) => <CreateHabit onSubmit={onClose}/>,
    deleteAllCompleted: (onClose: () => void) => <DeleteHabits onSubmit={onClose}/>,
    delete: (onClose: () => void, habit?: Habit) => <DeleteHabit habit={habit} onSubmit={onClose}/>
};

export default function HabitList() {
    const [modalVisible, setModalVisible] = useState(false);
    const {habits, completedHabits, makeAllHabitsUncompleted} = useHabits();
    const [modalContent, setModalContent] = useState<'add' | 'delete' | 'deleteAllCompleted'>('add');
    const [currentHabit, setCurrentHabit] = useState<Habit>();

    const HabitListItemWrapper = ({habit}: {habit: Habit}) => {
        return(
            <Pressable onLongPress={() => {
                setCurrentHabit(habit);
                setModalContent('delete');
                setModalVisible(true);
            }}>
                <HabitListItem habit={habit}/>
            </Pressable>
        )
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <Text style={styles.header}>Habits</Text>
                <CustomButton style={styles.button} title="Add new habit" onPress={() => {
                    setModalContent('add');
                    setModalVisible(true);
                }}/>

                {
                    <View style={styles.habitsContainer}>
                        {habits.map(habit => (
                           <HabitListItemWrapper key={habit.id} habit={habit}/>
                        ))}
                    </View>
                }

                <Text style={styles.header}>Completed Habits</Text>
                <View style={styles.completedButtonView}>
                    <CustomButton style={[styles.button, styles.completedButton]} title="Uncheck all" onPress={makeAllHabitsUncompleted}/>
                    <CustomButton style={[styles.button, styles.deleteButton, styles.completedButton]} title="Delete all" onPress={() => {
                        setModalContent('deleteAllCompleted');
                        setModalVisible(true);
                    }}/>
                </View>
                {
                    <View style={styles.habitsContainer}>
                        {completedHabits.map(habit => (
                            <HabitListItemWrapper key={habit.id} habit={habit}/>
                        ))}
                    </View>
                }

            </ScrollView>

            <CustomModal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onPressClose={() => setModalVisible(!modalVisible)}
            >
                {MODAL_COMPONENTS[modalContent](() => setModalVisible(!modalVisible), currentHabit)}
            </CustomModal>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    habitsContainer: {
        gap: 10,
        paddingBottom: 20
    },
    button: {
        marginBottom: 10
    },
    completedButton: {
        width: '49%'
    },
    deleteButton: {
        backgroundColor: COLORS.danger
    },
    completedButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

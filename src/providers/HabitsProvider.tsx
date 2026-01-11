import {Habit} from "../types";
import {PropsWithChildren, createContext, useState, useContext, useEffect} from "react";
import {ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HabitsContext = {
    habits: Habit[];
    completedHabits: Habit[];
    toggleHabit: (id: string) => void;
    completedHabitsCount: number;
    habitsCount: number;
    addHabit: (habit: Habit) => void;
    deleteHabit: (id: string) => void;
    clearCompletedHabits: () => void;
    makeAllHabitsUncompleted: () => void;

};

const HabitsContext = createContext<HabitsContext>({
    habits: [],
    completedHabits: [],
    toggleHabit: () => {
    },
    completedHabitsCount: 0,
    habitsCount: 0,
    addHabit: () => {
    },
    deleteHabit: () => {},
    clearCompletedHabits: () => {
    },
    makeAllHabitsUncompleted: () => {
    }
});

export default function HabitsProvider({children}: PropsWithChildren) {
    const [habits, setHabits] = useState<Habit[]>([]);

    const [completedHabits, setCompletedHabits] = useState<Habit[]>([]);

    const [loading, setLoading] = useState(true);

    const completedHabitsCount = completedHabits.length;
    const habitsCount = completedHabits.length + habits.length;

    useEffect(() => {
        loadHabits();
    }, []);

    useEffect(() => {
        if (!loading) {
            saveHabits();
        }
    }, [habits, loading, completedHabits]);

    const addHabit = (habit: Habit) => {
        setHabits(habits => [habit, ...habits]);
    }

    const deleteHabit = (id: string) => {
        setHabits(habits => habits.filter(habit => habit.id !== id));
        setCompletedHabits(completedHabits => completedHabits.filter(habit => habit.id !== id));
    };

    const clearCompletedHabits = () => {
        setCompletedHabits([]);
    }

    const makeAllHabitsUncompleted = () => {
        const completeHabitList = [...completedHabits];
        const completeHabitsToUncompleted = completeHabitList.map(habit => {
            habit.completed = false
            return habit;
        });

        setCompletedHabits([]);
        setHabits(habits => [...completeHabitsToUncompleted, ...habits]);
    }

    const toggleHabit = (id: string) => {
        const completeHabitList = [...habits, ...completedHabits];
        let habit = completeHabitList.find(habit => habit.id === id);

        if (!habit) {
            return
        }

        habit.completed = !habit.completed;

        setHabits(habits => {
            if (habit.completed) {
                return habits.filter(habit => {
                    if (id !== habit.id) {
                        return true;
                    }

                    return !habit.completed;
                });
            }

            return [habit, ...habits];
        });

        setCompletedHabits(habits => {
            if (!habit.completed) {
                return habits.filter(habit => {
                    if (id !== habit.id) {
                        return true;
                    }

                    return habit.completed;
                });
            }

            return [habit, ...habits];
        });
    };

    const saveHabits = async () => {
        await AsyncStorage.setItem('habits', JSON.stringify(habits));
        await AsyncStorage.setItem('completed-habits', JSON.stringify(completedHabits));
    };

    const loadHabits = async () => {
        const habitsFromStorage = await AsyncStorage.getItem('habits');
        const habitsFromStorageParsed = habitsFromStorage ? JSON.parse(habitsFromStorage) : [];

        const completedHabitsFromStorage = await AsyncStorage.getItem('completed-habits');
        const completedHabitsFromStorageParsed = completedHabitsFromStorage ? JSON.parse(completedHabitsFromStorage) : [];

        setHabits(habitsFromStorageParsed);
        setCompletedHabits(completedHabitsFromStorageParsed);
        setLoading(false);
    };

    if (loading) {
        return <ActivityIndicator/>;
    }


    return (
        <HabitsContext.Provider value={{
            habits,
            toggleHabit,
            completedHabitsCount,
            completedHabits,
            habitsCount,
            addHabit,
            clearCompletedHabits,
            makeAllHabitsUncompleted,
            deleteHabit
        }}>
            {children}
        </HabitsContext.Provider>
    );
}

export const useHabits = () => useContext(HabitsContext);

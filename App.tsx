import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import HabitList from './src/components/HabitList';
import HabitsProvider from "./src/providers/HabitsProvider";
import OverviewCard from "./src/components/OverviewCard";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <HabitsProvider>
                    <View style={{flex: 1}}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Have a good day!</Text>
                            <OverviewCard/>
                        </View>
                        <HabitList/>
                    </View>
                </HabitsProvider>

                <StatusBar style='auto'/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    header: {
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 10
    },
});

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import icons from "../icons";
import {COLORS} from "../constants/colors";
import {Habit} from "../types";
import uuid from 'react-native-uuid';
import {useHabits} from "../providers/HabitsProvider";


export type IconName = (typeof icons)[number];

type FocusedField = "name" | "description" | null;

type CreateHabitProps = {
    onSubmit?: () => void;
};

export default function CreateHabit({ onSubmit }: CreateHabitProps) {
    const {addHabit} = useHabits();
    const [selectedIcon, setSelectedIcon] = useState<IconName>(icons[0]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [focusedField, setFocusedField] = useState<FocusedField>(null);


    const resetForm = () => {
        setSelectedIcon(icons[0]);
        setName("");
        setDescription("");
        setFocusedField(null);
        Keyboard.dismiss();
    };

    const handleSubmit = () => {
        const habit: Habit = {
            id: uuid.v4(),
            icon: selectedIcon,
            name,
            description,
            completed: false
        };

        addHabit(habit);
        onSubmit?.();

        resetForm();
    };

    function IconItem({icon, isSelected, onPress,}: { icon: IconName; isSelected: boolean; onPress: () => void; }) {
        return (
            <Pressable
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={`Select icon ${icon}`}
                style={({ pressed }) => [
                    styles.iconCell,
                    isSelected && styles.iconCellSelected,
                    pressed && styles.iconCellPressed,
                ]}
            >
                <FontAwesome6 name={icon as any} size={20} color="black" />
            </Pressable>
        );
    }

    const nameBorderColor = focusedField === "name" ? COLORS.secondary : COLORS.tertiary;
    const descBorderColor = focusedField === "description" ? COLORS.secondary : COLORS.tertiary;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.sectionTitle}>Choose an icon</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.iconScrollContent}
                >
                    {icons.map((ic) => (
                        <IconItem
                            key={ic}
                            icon={ic}
                            isSelected={ic === selectedIcon}
                            onPress={() => setSelectedIcon(ic)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.field}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField((prev) => (prev === "name" ? null : prev))}
                        placeholder="Enter name"
                        style={[styles.input, { borderColor: nameBorderColor }]}
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        onFocus={() => setFocusedField("description")}
                        onBlur={() => setFocusedField((prev) => (prev === "description" ? null : prev))}
                        placeholder="Enter description"
                        style={[styles.input, styles.inputMultiline, { borderColor: descBorderColor }]}
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <CustomButton title="Add" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 14,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    iconScrollContent: {
        paddingVertical: 6,
        gap: 10,
    },
    iconList: {
        paddingTop: 6,
        gap: 10,
    },
    iconRow: {
        gap: 10,
        justifyContent: "flex-start",
    },
    iconCell: {
        width: 44,
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.tertiary,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    iconCellSelected: {
        backgroundColor: COLORS.primary,
    },
    iconCellPressed: {
        opacity: 0.6,
    },
    field: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    inputMultiline: {
        minHeight: 96,
    },
});

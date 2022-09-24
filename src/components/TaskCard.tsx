import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import Checked from '../assets/Checked.svg'
import Unchecked from '../assets/Unchecked.svg'
import { theme } from "../styles/theme";

interface TaskCard {
    createdAt: string;
    description: string;
    isTaskDone: boolean;
    setIsTaskDone: (status: boolean) => void;
}

export function TaskCard({ createdAt, description, isTaskDone, setIsTaskDone }: TaskCard) {
    return (
        <View
            style={styles.card}
        >
            <TouchableOpacity
                style={styles.statusTask}
                onPress={() => setIsTaskDone(!isTaskDone)}
            >
                {
                    isTaskDone ? <Checked /> : <Unchecked />
                }
            </TouchableOpacity>

            <Text
                style={styles.description}
            >
                { description }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: theme.colors.gray[500],
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.gray[300],
    },
    description: {
        flexGrow: 1
    },
    statusTask: {
        paddingLeft: 12,
        paddingVertical: 20,
        marginRight: 8,
    }
})
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import Trash from '../assets/trash.svg'
import Checked from '../assets/checked.svg'
import Unchecked from '../assets/unchecked.svg'

import { theme } from "../styles/theme";

export interface TaskCardProps {
    createdAt: string;
    description: string;
    isTaskDone: boolean;
    //setIsTaskDone: (status: boolean) => void;
}

interface TaskCardData {
    data: TaskCardProps;
    onRemoveTask: (createdAt: string) => void;
}

export function TaskCard({ data, onRemoveTask }: TaskCardData) {
    return (
        <View
            style={styles.card}
            //onLayout={({ nativeEvent }) => console.log(nativeEvent.layout.height)}
        >
            <TouchableOpacity
                style={styles.statusTask}
                //onPress={() => data.setIsTaskDone(!isTaskDone)}
            >
                {
                    !data.isTaskDone ? <Checked /> : <Unchecked />
                }
            </TouchableOpacity>

            <Text
                style={styles.description}
            >
                { data.description }
            </Text>

            <TouchableOpacity
                style={styles.btnRemoveTask}
                onPress={() => onRemoveTask(data.createdAt)}
            >
                <Trash />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.gray[500],
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.gray[300],
    },
    description: {
        flex: 1,
        maxHeight: 60,
        overflow: 'hidden',
        color: theme.colors.gray[100]
    },
    statusTask: {
        paddingLeft: 12,
        paddingVertical: 20,
        marginRight: 8,
    },
    btnRemoveTask: {
        padding: 16
    }
})
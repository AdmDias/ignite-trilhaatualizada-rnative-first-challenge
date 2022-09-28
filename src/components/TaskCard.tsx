import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { Modal } from "./Modal";

import Trash from '../assets/trash.svg'
import Checked from '../assets/checked.svg'
import Unchecked from '../assets/unchecked.svg'

import { theme } from "../styles/theme";

export interface TaskCardProps {
    createdAt: Date;
    description: string;
    isTaskDone: boolean;
}

interface TaskCardData {
    data: TaskCardProps;
    onFinishTask: (createdAt : Date) => void;
    onEditTask: (createdAt: Date, taskDescription: string) => void;
    onRemoveTask: (createdAt: Date) => void;
}

export function TaskCard({ data, onFinishTask, onEditTask ,onRemoveTask }: TaskCardData) {
    const [modalVisibility, setModalVisibility] = useState(false)

    const handleModalShow = () => setModalVisibility(true)

    return (
        <View
            style={styles.card}
        >
            <TouchableOpacity
                style={styles.statusTask}
                onPress={() => onFinishTask(data.createdAt)}
            >
                {
                    !data.isTaskDone ? <Checked /> : <Unchecked />
                }
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.description}
                onPress={handleModalShow}
            >
                <Text
                    style={{
                        color: data.isTaskDone ? theme.colors.gray[300] : theme.colors.gray[100],
                        textDecorationLine: data.isTaskDone ? 'line-through' : 'none',
                    }}
                >
                    { data.description }
                </Text>
            </TouchableOpacity>
           

            <TouchableOpacity
                style={styles.btnRemoveTask}
                onPress={() => {
                    Alert.alert(
                        'Tarefa', 
                        'Remover tarefa da sua lista?', 
                        [
                            { text: 'Sim', onPress: () => onRemoveTask(data.createdAt) },
                            { text: 'Não', style: 'cancel' }
                        ], 
                    )
                }}
            >
                <Trash />
            </TouchableOpacity>

            <Modal
                task={data}
                onEditTask={onEditTask}
                modalVisibility={modalVisibility}
                onModalVisibilityChanged={setModalVisibility}
            />
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
        paddingVertical: 8,
        maxHeight: 50,
        overflow: 'hidden'
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
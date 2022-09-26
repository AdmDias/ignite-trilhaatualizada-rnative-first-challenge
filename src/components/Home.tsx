import { useState } from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../styles/theme";

import { Header } from "./Header";
import { TaskCard, TaskCardProps } from "./TaskCard";
import { TaskCount } from "./TaskCount";

import Plus from '../assets/plus.svg'
import Clipboard from '../assets/clipboard.svg'

export function Home() {
    const [tasks, setTasks] = useState<TaskCardProps[]>([])
    const [taskDescription, setTaskDescription] = useState('')


    function handleNewTask() {
        if (!taskDescription) {
            return Alert.alert('Tarefa', 'Informe a descrição da tarefa!')
        }

        const newUserTask = {
            createdAt: new Date().toString(),
            description: taskDescription,
            isTaskDone: false
        } as TaskCardProps

        setTasks([...tasks, newUserTask])
    }

    function handleRemoveTask(createdAt: string) {
        setTasks(tasks.filter(item => item.createdAt !== createdAt))
    }

    return (
        <View
            style={styles.container}
        >
            <Header />
            <View
                style={styles.content}
            >
                <View
                    style={styles.fieldset}
                >
                    <TextInput 
                        style={styles.input}
                        placeholderTextColor={theme.colors.gray[300]}
                        placeholder='Adicione um nova tarefa...'
                        numberOfLines={1}
                        onChangeText={setTaskDescription}
                        //onLayout={({ nativeEvent }) => console.log(nativeEvent.layout.width)}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnAdd}
                        onPress={handleNewTask}
                    >
                        <Plus />
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.containerTask}
                >
                    <View
                        style={styles.countTasks}
                    >
                        <TaskCount 
                            status="created"
                            counts={0}
                        />

                        <TaskCount 
                            status="done"
                            counts={0}
                        />
                    </View>

                    <FlatList 
                        data={tasks}
                        keyExtractor={(item) => item.createdAt}
                        renderItem={({item}) => (
                            <TaskCard 
                                data={item}
                                onRemoveTask={handleRemoveTask}
                            />
                        )}
                        //renderItem={null}
                        ListEmptyComponent={
                            <View
                                style={styles.emptyList}
                            >
                                <Clipboard />
                                <Text
                                    style={[styles.emptyListTitle, { marginTop: 16, fontWeight: 'bold' }]}
                                >
                                    Você ainda não tem tarefas cadastradas
                                </Text>
                                <Text
                                    style={styles.emptyListTitle}
                                >
                                    Crie tarefas e organize seus itens a fazer
                                </Text>
                            </View>
                        }
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        backgroundColor: theme.colors.gray[600],
        paddingHorizontal: 24
    },
    fieldset: {
        marginTop: -28,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    input: {
        width: 288,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 6,
        color: theme.colors.gray[100],
        borderColor: theme.colors.gray[700],
        backgroundColor: theme.colors.gray[500],
    },
    btnAdd: {
        marginLeft: 4,
        width: 52,
        height: 52,
        padding: 18,
        borderRadius: 6,
        backgroundColor: theme.colors.blue.dark
    },
    containerTask: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.gray[600],
        backgroundColor: 'transparent'
    },
    countTasks: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 48,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray[400],
    },
    emptyListTitle: {
        fontSize: 16,
        color: theme.colors.gray[300],
        textAlign: 'center'
    }
})
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../styles/theme";

import { Header } from "./Header";
import { TaskCard, TaskCardProps } from "./TaskCard";
import { TaskCount } from "./TaskCount";

import Plus from '../assets/plus.svg'
import Clipboard from '../assets/clipboard.svg'
import { Input } from "./Input";
//import { useTask } from "../hooks/useTask";

export function Home() {
    //const { tasks, isRender, handleNewTask } = useTask()

    const [taskDescription, setTaskDescription] = useState('')
    const [tasks, setTasks] = useState<TaskCardProps[]>([])
    const [isRender, setIsRender] = useState(false)

    function handleNewTask(taskDescription: string) {
        if (!taskDescription) {
            return Alert.alert('Tarefa', 'Informe a descrição da tarefa!')
        }

        const newUserTask = {
            createdAt: new Date(),
            description: taskDescription.trim(),
            isTaskDone: false
        } as TaskCardProps

        setTasks([...tasks, newUserTask])
        setTaskDescription('')
    }

    function handleFinishTask(createdAt: Date) {
        const newData = tasks.map(item => {
            if (item.createdAt === createdAt){
                item.isTaskDone = !item.isTaskDone
                return item
            }
            return item
        })

        setTasks(newData)
        setIsRender(!isRender)
    }

    function handleEditTask(createdAt: Date, taskDescriptionEdited: string){
        const newData = tasks.map(item => {
            if (item.createdAt === createdAt){
                item.description = taskDescriptionEdited
                return item
            }
            return item
        })

        setTasks(newData)
        setIsRender(!isRender)
    }

    function handleRemoveTask(createdAt: Date) {
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
                    <Input
                        placeholder='Adicione um nova tarefa...'
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        numberOfLines={1}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnAdd}
                        onPress={() => handleNewTask(taskDescription)}
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
                            counts={tasks.length}
                        />

                        <TaskCount 
                            status="done"
                            counts={tasks.filter(item => item.isTaskDone).length}
                        />
                    </View>

                    <FlatList 
                        data={tasks}
                        keyExtractor={(item) => item.createdAt.toString()}
                        renderItem={({item}) => (
                            <TaskCard 
                                data={item}
                                onFinishTask={handleFinishTask}
                                onEditTask={handleEditTask}
                                onRemoveTask={handleRemoveTask}
                            />
                        )}
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
                        extraData={isRender}
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
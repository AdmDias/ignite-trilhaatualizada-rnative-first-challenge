import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { TaskCount } from "./TaskCount";
import { Header } from "./Header";

import { theme } from "../styles/theme";
import Plus from '../assets/plus.svg'
import { TaskCard } from "./TaskCard";

export function Home() {
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
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnAdd}
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

                    {/* <FlatList 
                        data={}
                        keyExtractor={}
                        renderItem={(item) => {
                            <TaskCard />
                        }}
                    /> */}

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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        
    },
    input: {
        padding: 16,
        flexGrow: 1,
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
    }
})
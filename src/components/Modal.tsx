import { useState } from 'react'
import { Modal as RNModal, ModalProps, StyleSheet, View, TouchableOpacity, TextInput, Text, ScrollView, Alert } from "react-native"
import { format } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR';
import { Input } from './Input';
import { theme } from "../styles/theme";
import { TaskCardProps } from './TaskCard';
import { Button } from './Button';

interface Props extends ModalProps {
    task: TaskCardProps;
    onEditTask: (createdAt: Date, taskDescription: string) => void;
    modalVisibility: boolean;
    onModalVisibilityChanged: (modalVisibility: boolean) => void;
}

const { colors: { gray }} = theme

export function Modal({ modalVisibility, task, onEditTask, onModalVisibilityChanged }: Props){
    const dateFormatted = format(task.createdAt, "d'/'MM'/'uuuu' • 'k'h'mm", {
        locale: ptBR
    })

    const [newTaskDescription, setNewTaskDescription] = useState(task.description)
    const [openEdit, setOpenEdit] = useState(false)

    const handleOpenEdit = () => setOpenEdit(true)
    const handleCancelEdit = () => setOpenEdit(false)

    const handleSaveEdit = () => {
        if (!newTaskDescription) {
            return Alert.alert('Tarefa', 'Informe a descrição da tarefa!')
        }
        onEditTask(task.createdAt, newTaskDescription)
        onModalVisibilityChanged(!modalVisibility)
        setOpenEdit(false)
    }

    return (
        <RNModal 
            animationType="fade" 
            transparent={true} 
            visible={modalVisibility} 
            onRequestClose={() => onModalVisibilityChanged(!modalVisibility)}
        >
            <View style={styles.modalView}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View>
                            <Text
                                style={{ color: gray[100], fontWeight: 'bold' }}
                            >
                                Criada em
                            </Text>
                            <Text
                                style={{ color: gray[100], fontWeight: 'bold' }}
                            >
                                {dateFormatted}
                            </Text>
                        </View>
                        <TouchableOpacity  
                            onPress={() => onModalVisibilityChanged(!modalVisibility)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: gray[100] }}>
                                X
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}
                    >
                        {
                            openEdit ? (
                                <Input 
                                    value={newTaskDescription}
                                    onChangeText={setNewTaskDescription}
                                    multiline
                                    style={styles.textArea}
                                />
                            ) : (
                                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                                    <Text 
                                        style={{ color: gray[100], fontWeight: 'bold' }}
                                    >
                                        { `" ${task.description} "` }
                                    </Text>
                                </ScrollView>
                            )
                        }
                    </View>
                    <View style={{ width: '100%', marginTop: 24 }}>
                        {
                            openEdit ? (
                                <>
                                    <Button
                                        title='Salvar'
                                        onPress={handleSaveEdit}
                                    />
                                    <View style={{ marginTop: 8 }}/>
                                    <Button
                                        title='Cancelar'
                                        color={theme.colors.danger}
                                        onPress={handleCancelEdit}
                                    />
                                </>
                            ):(
                                <>
                                    {
                                        !task.isTaskDone && (
                                            <Button
                                                title='Editar'
                                                onPress={handleOpenEdit}
                                            />
                                        )
                                    }
                                </>
                            )
                        }
                    </View>
                </View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: "center",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    content: {
        marginTop: 30,
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: gray[500],
        borderRadius: 6
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical:  6,
        borderBottomWidth: 1,
        borderBottomColor: gray[400]
    },
    textArea: {
        flex: 1,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 6,
        color: gray[100],
        backgroundColor: gray[500],
    }
})
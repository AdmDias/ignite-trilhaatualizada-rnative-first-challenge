import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../styles/theme';

interface TaskCountProps {
    status: 'created' | 'done';
    counts: number;
}

export function TaskCount({ status, counts }: TaskCountProps) {
    return (
        <View style={styles.infoCount }>
            <Text style={
                [
                    styles.status, 
                    { color: status === 'created' ? theme.colors.blue.primary : theme.colors.purple.primary }
                ]
            }>
                { status === 'created' ? 'Criadas' : 'Concluídas' }
            </Text>
            <Text
                style={styles.counts}
            >
                { counts }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCount: {
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    counts: {
        marginLeft: 4,
        paddingVertical: 2,
        paddingHorizontal: 8,
        color: theme.colors.gray[100],
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 99,
        backgroundColor: theme.colors.gray[400]
    }
})
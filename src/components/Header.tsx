import { StyleSheet, View } from "react-native"
import Logo from '../assets/Logo.svg'

export function Header() {
    return (
        <View style={styles.header}>
            <Logo />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingHorizontal: 132,
        paddingVertical: 70
    }
})
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { theme } from "../styles/theme";

export function Input(props: TextInputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)
    
    return (
        <TextInput 
            style={[
                styles.input, 
                {
                    borderColor: isInputFocused ? theme.colors.purple.dark : theme.colors.gray[700]
                }
            ]}
            placeholderTextColor={theme.colors.gray[300]}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: 288,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 6,
        color: theme.colors.gray[100],
        backgroundColor: theme.colors.gray[500],
    },
})
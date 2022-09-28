import { Button as RNButton, ButtonProps } from "react-native"
import { theme } from "../styles/theme"


export function Button(props: ButtonProps) {
    return (
        <RNButton 
            color={theme.colors.blue.dark}
            { ...props}
        />
    )
}
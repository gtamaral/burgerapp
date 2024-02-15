import { Children, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";


type ButtonProps = TouchableOpacityProps & {
    children: ReactNode
}

type ButtonTextProps = {
    children: ReactNode
}

type ButtonIconProps = {
    children: ReactNode
}



const Button = ({children, ...rest}: ButtonProps) => {
    return ( 
        <TouchableOpacity {...rest} className="h-12 bg-yellow-400 rounded-md flex-row items-center justify-center" activeOpacity={0.7}>
            {children}
        </TouchableOpacity>
     );
}
 

const ButtonText = ({children}: ButtonTextProps) => {
    return (
        <Text className="text-black font-heading text-base mx-2">
            {children}
        </Text>
    )
}

const ButtonIcon = ({children}: ButtonIconProps) => {
    return (
        children
    )
}


Button.Text = ButtonText
Button.Icon = ButtonIcon

export {Button} 

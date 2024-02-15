import {Text, Pressable, PressableProps} from 'react-native'
import { clsx } from 'clsx';

type CategoryProps = PressableProps & {
    title?: string
    isSelected?: boolean
}

const CategoryButton = ({title, isSelected, ...rest}: CategoryProps) => {
    return ( 
        <Pressable className={
            clsx("bg-slate-900 px-4 justify-center rounded-md h-10",
            isSelected && "border-2 border-yellow-400")
            }
        {...rest}>
            <Text className='text-slate-100 font-subtitle text-sm'>
                {title}
            </Text>
        </Pressable>
     );
}
 

export default CategoryButton;
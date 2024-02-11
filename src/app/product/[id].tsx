import { Image, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PRODUCTS } from "@/src/utils/data/products";
import FormatCurrency from "@/src/utils/functions/format-currency";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "@/src/components/link-button";

const Product = () => {
    const {id} = useLocalSearchParams()

    const product = PRODUCTS.filter((item) => item.id === id)[0]
    return ( 
        <View className="flex-1">

            
            <Image source={product.cover} className="w-full h-52" resizeMode="cover"/>


            <View className="p-5 mt-8 flex-1">

                <View className="flex-row justify-between">
                    <Text className="text-white font-bold font-heading text-2xl">{product.title}</Text>

                    <Text className="text-lime-400 text-2xl font-heading">
                        {FormatCurrency(product.price)}
                    </Text>
                </View>

                <Text className="pt-6 font-subtitle text-slate-300 text-base mb-6">
                   {product.description}
                </Text>

                {/* <View>
                    <Text className="text-white font-sm list-item">
                        {product.ingredients}
                    </Text>
                </View> */}

                {product.ingredients.map((ingredient) => (
                    <Text className="text-base text-slate-300 font-body leading-5"> {"\u2022"} {ingredient}</Text>
                ))}

            </View>
            <View className="p-5 pb-8 pt-5 gap-5">
                <Button>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>
                    <Button.Text>Adicionar ao pedido</Button.Text>
                </Button>

                <LinkButton title="Voltar" href="/" />
            </View>
        </View>


     );
}
 
export default Product;

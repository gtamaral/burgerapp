import { View, Text, ScrollView, Alert, Linking } from "react-native";

import Header from "../components/header";
import useCartStore, { ProductCartProps } from "../stores/cart-store";
import Product from "../components/product";
import { Button } from "../components/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "../components/link-button";
import FormatCurrency from "../utils/functions/format-currency";
import { Link, Redirect, useNavigation } from "expo-router";
import Input from "../components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

const PHONE_NUMBER = "5581995773532"

const Cart = () => {
    const [address, setAdress] = useState("")
    const navigation = useNavigation()
    const cartStore = useCartStore()
    const total = FormatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

    const handleProductRemove = (product: ProductCartProps) => {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar",
            },
            {
                text: "remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])
    }

    const handleOrder = () => {
        if(address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega")
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        

        const message = `
         🍔 NOVO PEDIDO 🍔
         \n -Entregar em: ${address} 
         
         ${products} 
         
         \n -Valor total: ${total}
         
         `
        

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()

        navigation.goBack()

    }

    return ( 
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho"  />

        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraHeight={100}>
            <View className="p-5 flex-1">
            <ScrollView>
            { cartStore.products.length > 0 ? 
             ( <View className="border-b border-slate-400">
                {
                    cartStore.products.map((product => (
                        <Product 
                         key={product.id} 
                         data={product}
                         onPress={()=> handleProductRemove(product)}    />
                    )))
                }
            </View> )
            : (
                <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio.</Text>
            ) }

            <View className="flex-row gap-2 items-center mt-5 mb-4">
                <Text className="text-white text-xl font-subtitle">Total:</Text>
                <Text className="text-yellow-400 text-xl font-subtitle">{total}</Text>
            </View>

            <Input 
             placeholder="Informe o endereço de entrega com rua,bairro, cep, número e complemento..."  
             onChangeText={setAdress} 
             blurOnSubmit={true}
            />
            </ScrollView>
            </View>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon><Feather name="arrow-right-circle" size={20} /></Button.Icon>
                    
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
     );
}
 
export default Cart;

import { View, Text, ScrollView, Alert, Linking, Share } from 'react-native'
import React, { useState } from 'react'

import { ProductCartProps, useCartStore } from '@/stores/cart-store'

import Header from '@/components/Header'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import Input from '@/components/Input'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '@/components/Button'
import { Feather } from '@expo/vector-icons'
import LinkButton from '@/components/Link-button'
import { useNavigation } from 'expo-router'

const PHONE_NUMBER = '244944304551'

export default function Cart() {
  const [address, setAddress] = useState('')
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProduct(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega.')
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join('')

    const message = `
    🍔 NOVO PEDIDO 🌭 
    \n Entregar em ${address}

    ${products}


    \n valor total: ${total}
    `
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )
    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço"
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="send"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}

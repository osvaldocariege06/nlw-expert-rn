import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import Button from '@/components/Button'

import { useCartStore } from '@/stores/cart-store'

import { Feather } from '@expo/vector-icons'
import LinkButton from '@/components/Link-button'

export default function Product() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
      navigation.goBack()
    }
  }

  if (!product) {
    return <Redirect href={'/'} />
  }

  return (
    <View className="flex-1 ">
      <Image
        source={product.cover}
        resizeMode="cover"
        className="w-full h-52"
        alt={product.title}
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-base text-slate-400 font-body leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {'\u2022 '}
            {ingredient}
          </Text>
        ))}
      </View>
      <View className="px-5 mb-5 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adiconar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}

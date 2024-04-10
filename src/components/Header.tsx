import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

type HeaderProps = {
  title: string
  cartQuantityItems?: number
}

export default function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View style={{ flex: 1 }}>
        <Image
          source={require('@/assets/logo.png')}
          alt="Logo"
          className="h-6 w-32"
        />
        <Text className="text-white mt-2 font-heading text-xl">{title}</Text>
      </View>

      {cartQuantityItems > 0 && (
        <Link href={'/cart'} asChild>
          <TouchableOpacity className="relative">
            <View className="bg-lime-300 rounded-full w-4 h-4 top-2 z-10 -right-3.5 justify-center items-center">
              <Text className="text-slate-900 text-xs font-body">
                {cartQuantityItems}
              </Text>
            </View>

            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}

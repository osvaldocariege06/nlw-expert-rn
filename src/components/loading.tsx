import { View, ActivityIndicator } from 'react-native'
import React from 'react'

import color from 'tailwindcss/colors'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator color={color.white} />
    </View>
  )
}

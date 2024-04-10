import { Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import clsx from 'clsx'

type CategoryProps = PressableProps & {
  title: string
  isSelected?: boolean
}

export default function CategoryButton({
  title,
  isSelected,
  ...rest
}: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        'bg-slate-800 px-4 justify-center rounded-md h-10',
        isSelected && 'border-2 border-lime-200',
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  )
}

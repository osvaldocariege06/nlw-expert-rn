import { TextInputProps, TextInput } from 'react-native'
import React from 'react'
import colors from 'tailwindcss/colors'

export default function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="h-32 bg-slate-800 rounded-md px-4 py-3 text-sm text-white font-body"
      {...rest}
    />
  )
}

import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TextProps } from 'react-native'

export type StyledButtonProps = {
    title: string
    onPress: () => Promise<void> | void
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'invisible'
    lightColor?: string
    darkColor?: string, 
    styles?: object
}

export default function StyledButton({ 
    title, 
    onPress, 
    lightColor,
    darkColor,
    styles,
    type = 'primary'
} : StyledButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <TouchableOpacity 
            style={[
                stylesInt.button, 
                type === 'primary' && stylesInt.primary,
                type === 'secondary' && stylesInt.secondary,
                type === 'invisible' && stylesInt.invisible, 
                styles
            ]} 
            onPress={onPress}
        >
            <Text style={stylesInt.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const stylesInt = StyleSheet.create({
    button: {
      backgroundColor: Colors.primary.background, 
      paddingVertical: 12,      
      paddingHorizontal: 20,     
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff', 
      fontSize: 16,
      fontWeight: 'bold',
    },
    primary: {
        backgroundColor: Colors.primary.background
    }, 
    secondary: {
        backgroundColor: Colors.dark.container
    }, 
    invisible: {
        backgroundColor: 'transparent',
        paddingVertical: 5, 
    }
  });

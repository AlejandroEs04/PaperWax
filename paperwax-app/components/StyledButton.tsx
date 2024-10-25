import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TextProps } from 'react-native'

export type StyledButtonProps = {
    title: string
    onPress: () => Promise<void> | void
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'invisible'
    lightColor?: string
    darkColor?: string
}

export default function StyledButton({ 
    title, 
    onPress, 
    lightColor,
    darkColor,
    type = 'primary'
} : StyledButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                type === 'primary' && styles.primary,
                type === 'secondary' && styles.secondary,
                type === 'invisible' && styles.invisible
            ]} 
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.primary.background, 
      paddingVertical: 12,      
      paddingHorizontal: 20,     
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10, 
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
        backgroundColor: Colors.primary.backgroundSecondary
    }, 
    invisible: {
        backgroundColor: 'transparent',
        paddingVertical: 5, 
    }
  });

import { View, StyleSheet, ViewProps, TouchableOpacity, Text } from 'react-native'
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react'
import { Link, router } from 'expo-router';
import { ThemedText } from '../ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';

export type ActionContainerProps = ViewProps & {
    href: string
    text: string
    icon: IconProps<ComponentProps<typeof Ionicons>['name']>['name']
    lightColor?: string
    darkColor?: string
}

export default function ActionContainer({ href, text, icon, lightColor, darkColor, ...otherProps } : ActionContainerProps) {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background');
    const iconColor = useThemeColor({ light: "#000", dark: Colors.dark.text }, 'background');

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]}    onPress={() => router.push(href)}>
            <ThemedText type='link' >{text}</ThemedText>

            <Ionicons size={35} style={[{  }]} name={icon} color={iconColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,  
        width: "100%", 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function checkIn() {
    return (
        <ThemedView>
            <ThemedText type='title' style={styles.title}>Registrar entradas</ThemedText>

            <View style={styles.actionContainer}>
                <View>
                    <ThemedText>Registrar Rollos</ThemedText>
                </View>

                <View>
                    <TabBarIcon name='pencil' />
                </View>
            </View>
        </ThemedView>
    )
}

export const styles = StyleSheet.create({
    title: {
        paddingTop: 20
    }, 
    actionContainer: {
        padding: 10, 
        backgroundColor: '#fff'
    }
})

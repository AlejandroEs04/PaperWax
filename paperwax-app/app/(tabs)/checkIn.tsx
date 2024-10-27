import ActionContainer from '@/components/checkIn/ActionContainer'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function checkIn() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={{marginTop: 10}} type='title'>Registrar</ThemedText>
            <ThemedText>Para registrar una entrada, primero seleccione el tipo de registro</ThemedText>

            <View style={{marginTop: 15, display: 'flex', gap: 5}}>
                <ActionContainer 
                    href='checkIn/rollRegister'
                    text='Registrar rollos'
                    icon='barcode-outline'
                />
                <ActionContainer 
                    href='checkIn/rollRegister'
                    text='Registrar materia prima'
                    icon='book-outline'
                />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
    }
})
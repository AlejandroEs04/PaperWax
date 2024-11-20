import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import StyledButton from '@/components/StyledButton'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

export default function account() {
    const router = useRouter()

    const handleLogOut = async() => {
        await SecureStore.deleteItemAsync('authToken')
        router.replace('/auth/login')
    }

    return (
        <ThemedView>
            <ThemedText type='title'>Cuenta</ThemedText>
            <ThemedText type='subtitle' style={{fontWeight: 500, marginVertical: 10}}>Tipo: Dispositivo</ThemedText>

            <View style={styles.closeSessionContainer}>
                <StyledButton 
                    title='Cerrar Sesión'
                    onPress={handleLogOut}
                    type='danger'
                />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    closeSessionContainer: {
        flex: 1,
        bottom: 0, 
        marginHorizontal: 8, 
        width: '100%'
    }
})
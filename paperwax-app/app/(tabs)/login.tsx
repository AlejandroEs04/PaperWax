import StyledButton from '@/components/StyledButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

export default function login() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleLogin = async() => {

    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText type='title'>Bienvenido</ThemedText>
            <Text style={styles.text}>Por favor ingrese sus claves para iniciar sesión en el dispositivo</Text>
            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={id}
                onChangeText={setId}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <StyledButton 
                title="Iniciar Sesión" 
                onPress={handleLogin} 
            />

            <Text style={styles.text}>En caso de haber olvidado sus claves, favor de avisar al personal de soporte tecnico</Text>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
    },
    input: {
      height: 40,
      borderRadius: 10,
      backgroundColor: '#fff',
      fontSize: 18,
      borderWidth: 0,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    error: {
      color: 'red',
      marginBottom: 12,
    },
    button: {
        backgroundColor: '#525252', 
        borderRadius: 10,
    }, 
    h1: {
        fontSize: 40, 
        fontWeight: '800'
    }, 
    text: {
        fontSize: 18, 
        fontWeight: '400', 
        color: '#9ca3af', 
        marginBottom: 25,
    }
  });

import { authenticateUser } from '@/api/AuthApi'
import StyledButton from '@/components/StyledButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { UserLogin } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'

export default function login() {
    const [id, setId] = useState<string | number>('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: authenticateUser, 
        onError: (error) => {

        }, 
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const handleLogin = () => {
        const formData : UserLogin = {
            id, password
        }

        mutate(formData)
    }

    return (
        <ThemedView>
            <View style={{display: 'flex', alignItems: 'center', marginTop: 40}}>
                <Image 
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
            </View>

            <ThemedText type='title' style={{textAlign: 'center'}}>Bienvenido</ThemedText>
            <Text style={styles.text}>Por favor ingrese sus claves para iniciar sesión en el dispositivo</Text>

            <ThemedText style={styles.label}>Identificador</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={id.toString()}
                keyboardType='numeric'
                onChangeText={setId}
                autoCapitalize="none"
            />

            <ThemedText style={styles.label}>Contraseña</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <StyledButton 
                styles={{ marginVertical: 10 }}
                title="Iniciar Sesión" 
                onPress={handleLogin} 
            />

            <Text style={styles.text}>En caso de haber olvidado sus claves, favor de avisar al personal de soporte tecnico</Text>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 70, 
        height: 70, 
        borderRadius: 10, 
        marginBottom: 15
    },
    container: {
        flex: 1, 
        justifyContent: 'center',
    },
    label: {
        paddingLeft: 4, 
        marginBottom: 4, 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    input: {
      height: 40,
      borderRadius: 10,
      backgroundColor: '#fff',
      fontSize: 18,
      borderWidth: 0,
      marginBottom: 15,
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
        textAlign: 'center'
    }
  });

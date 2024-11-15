import { TextInput, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import RNPickerSelect from 'react-native-picker-select'
import StyledButton from '@/components/StyledButton'
import { getMaterials } from '@/api/MaterialApi'
import { useQuery } from '@tanstack/react-query'
import getPapersPicker from '@/utils/getPapersPicker'

export default function rawMaterialRegister() {
    const [stock, setStock] = useState('')
    const [type_id, setType_id] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ['materials'], 
        queryFn: getMaterials
    })

    if(isLoading) return (
        <View style={{marginTop: 40}}>
            <ActivityIndicator size="large" />
        </View>
    )

    return (
        <ThemedView header>
            <ThemedText style={{marginTop: 0}} type='title'>Registrar materiales</ThemedText>
            <ThemedText>Ingrese la información que se solicita para registrar la entrada de los materiales</ThemedText>

            <View style={styles.form}>
            <ThemedText>Tipo de papel</ThemedText>
                {data && (
                    <RNPickerSelect
                        onValueChange={(value) => setType_id(value)}
                        items={getPapersPicker(data)}
                        style={pickerSelectStyles}
                    />
                )}
                <ThemedText>Cantidad de Materiales</ThemedText>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Cantidad de materiales"
                    value={stock}
                    onChangeText={setStock}
                    autoCapitalize="none"
                />
                
                <StyledButton 
                    title='Registrar Material'
                    styles={{marginTop: 10}}
                    onPress={() => console.log('hola')}
                />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    input: {
        height: 'auto',
        borderRadius: 0,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 14,
    },
    camera: {
        flex: 1,
    },
    cameraContainer: {
        marginVertical: 10,
        height: 150
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderRadius: 4,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputAndroid: {
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 8,
    }
});
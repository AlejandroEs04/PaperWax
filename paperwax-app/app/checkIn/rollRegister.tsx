import { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert, Vibration } from 'react-native'
import { useQuery,useMutation } from '@tanstack/react-query'
import { CameraView, Camera } from 'expo-camera'
import getPapersPicker from '@/utils/getPapersPicker'
import { getPaper } from '@/api/PaperApi'
import RNPickerSelect from 'react-native-picker-select'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import StyledButton from '@/components/StyledButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { createRollMaterial } from '@/api/MaterialApi'
import { RollMaterialCreate } from '@/types'

export default function rollRegister() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)

    const [lot, setLot] = useState('')
    const [lotId, setLotId] = useState('')
    const [weight, setWeight] = useState('')
    const [paperId, setPaperId] = useState(0)
    
    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setLot(data.slice(0, 4)) 
        setLotId(data.slice(4)) 
        
        if(!lot && !lotId) Vibration.vibrate()
    };
    
    const { data: papers, isLoading } = useQuery({
        queryKey: ['papers'], 
        queryFn: getPaper
    })
    
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    const { mutate } = useMutation({
        mutationFn: createRollMaterial, 
        onError: () => {
            Alert.alert('Hubo un error', 'Hubo un error al tratar de registrar el rollo', [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data : string) => {
            Vibration.vibrate()

            Alert.alert('Rollo registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])
        }
    })

    const handleForm = () => mutate({
        lot: lot, lot_id: +lotId, paper_id: +paperId, weight: +weight, material_id: 2
    })

    if(isLoading) return (
        <View style={{marginTop: 40}}>
            <ActivityIndicator size="large" />
        </View>
    )

    if (hasPermission === null) {
        return <ThemedText style={{marginTop: 50}}>Requesting for camera permission</ThemedText>
    }
    if (hasPermission === false) {
        return <ThemedText>No access to camera</ThemedText>
    }

    return (
        <ThemedView header>
            <ThemedText style={{marginTop: 0}} type='title'>Registrar un rollo</ThemedText>
            <ThemedText>Ingrese la información que se solicita para registrar la entrada de los rollos</ThemedText>

            {showCamera && (
                <View style={styles.cameraContainer}>
                    <CameraView 
                        style={styles.camera}
                        facing='back'
                        barcodeScannerSettings={{
                            barcodeTypes: ['codabar', 'code128']
                        }}
                        onBarcodeScanned={(value) => handleBarCodeScanned(value)}
                    />
                </View>
            )}

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: showCamera ? -40 : 0, marginRight: showCamera ? 10 : 0 }}>
                <TouchableOpacity 
                    style={{ 
                        width:'auto', 
                        height:'auto', 
                        backgroundColor: Colors.dark.container,
                        padding: 5, 
                        borderRadius: 10, 
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: 10, 
                        alignItems: 'center'
                    }}
                    onPress={() => setShowCamera(!showCamera)}
                >
                    <Ionicons size={25} name='camera-outline' color={'#fff'} />

                    {!showCamera && (
                        <Text style={{ color:'#fff', fontSize: 18 }}>Activar Camara</Text>
                    )}
                </TouchableOpacity>
            </View>
        
            <View style={styles.form}>
                <ThemedText>Lote</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Lote"
                    value={lot}
                    onChangeText={setLot}
                    autoCapitalize="none"
                />
                <ThemedText>ID del lote</ThemedText>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Identificador"
                    value={lotId}
                    onChangeText={setLotId}
                    autoCapitalize="none"
                />
                <ThemedText>Peso del rollo</ThemedText>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Peso"
                    value={weight}
                    onChangeText={setWeight}
                    autoCapitalize="none"
                />
                <ThemedText>Tipo de papel</ThemedText>
                {papers && (
                    <RNPickerSelect
                        onValueChange={(value) => setPaperId(value)}
                        items={getPapersPicker(papers)}
                        style={pickerSelectStyles}
                    />
                )}


                <StyledButton 
                    title='Registrar Rollo'
                    styles={{marginTop: 10}}
                    onPress={handleForm}
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

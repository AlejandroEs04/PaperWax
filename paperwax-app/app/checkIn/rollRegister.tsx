import { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { CameraView, Camera } from 'expo-camera'
import getPapersPicker from '@/utils/getPapersPicker'
import { getPaper } from '@/api/PaperApi'
import RNPickerSelect from 'react-native-picker-select'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import StyledButton from '@/components/StyledButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'

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

    if(isLoading) return (<Text>Cargando</Text>)

    if (hasPermission === null) {
        return <ThemedText style={{marginTop: 50}}>Requesting for camera permission</ThemedText>
    }
    if (hasPermission === false) {
        return <ThemedText>No access to camera</ThemedText>
    }

    return (
        <ThemedView>
            <ThemedText style={{marginTop: 20}} type='title'>Registrar un rollo</ThemedText>
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
                <TextInput
                    style={styles.input}
                    placeholder="Lote"
                    value={lot}
                    onChangeText={setLot}
                    autoCapitalize="none"
                />
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Identificador"
                    value={lotId}
                    onChangeText={setLotId}
                    autoCapitalize="none"
                />
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Peso"
                    value={weight}
                    onChangeText={setWeight}
                    autoCapitalize="none"
                />

                <RNPickerSelect
                    onValueChange={(value) => setPaperId(value)}
                    items={getPapersPicker(papers)}
                    style={pickerSelectStyles}
                />

                <StyledButton 
                    title='Registrar Rollo'
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
        height: 42,
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
        height: 40,
        borderRadius: 4,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 8,
    }
});

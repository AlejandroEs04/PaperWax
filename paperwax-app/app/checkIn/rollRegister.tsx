import StyledButton from '@/components/StyledButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ChangeEvent, useState, useEffect } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Camera, CameraType, CameraView } from 'expo-camera'
import axios from 'axios'
import { Paper } from '@/types'

export default function rollRegister() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(false)
    const [scanned, setScanned] = useState(false);
    const [barcodeData, setBarcodeData] = useState('');

    const [papers, setPapers] = useState([])
    const [lot, setLot] = useState('')
    const [lotId, setLotId] = useState('')
    const [weight, setWeight] = useState('')

    const handleGetPaper = async() => {
        try {
            const {data} = await axios('https://f58b-2806-2f0-4040-f507-f821-8136-c4df-c1d4.ngrok-free.app/api/papers')

            console.log(data)

            const papers = data.map((paper: Paper) => {
                return {
                    label: paper.name, 
                    value: paper.id
                }
            })

            setPapers(papers)
        } catch (error) {
            console.log("Hubo un error")
        }
    }

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();

        handleGetPaper()
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        setBarcodeData(data);

        setLot(data.slice(0, 4)) 
        setLotId(data.slice(4)) 
    };

    if (hasPermission === null) {
        return <ThemedText>Requesting for camera permission</ThemedText>;
    }
    if (hasPermission === false) {
        return <ThemedText>No access to camera</ThemedText>;
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
                    onValueChange={(value) => console.log(value)}
                    items={papers}
                    style={pickerSelectStyles}
                />

                <StyledButton 
                    title='Registrar Rollo'
                    onPress={() => console.log('hola')}
                />
                <StyledButton 
                    title={`${showCamera ? 'Ocultar' : 'Abrir'} Camara`}
                    onPress={() => setShowCamera(!showCamera)}
                    type='secondary'
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
        height: 200
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

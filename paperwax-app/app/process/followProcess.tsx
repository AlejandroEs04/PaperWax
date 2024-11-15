import { useState, useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { CameraView, Camera } from 'expo-camera'
import { router } from 'expo-router'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import StyledButton from '@/components/StyledButton'
import { useQuery } from '@tanstack/react-query'
import { getProcess } from '@/api/ProcessApi'
import { ProcessType, RollMaterial } from '@/types'
import formatDate from '@/utils/formatDate'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export default function followProcess() {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background');
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)

    const [rolls, setRolls] = useState<ProcessType[]>([])
    const [rollId, setRollId] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setRollId(data) 
    };

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if(data) {
            setRolls(data)
        }
    }, [data])

    useEffect(() => {
        const lot = rollId.slice(0, 4)
        const lot_id = rollId.slice(4)
        const newArray = data?.filter(process => process.roll_material.lot === lot && process.roll_material.lot_id === +lot_id)

        if(newArray) 
            setRolls(newArray)
    }, [rollId])

    if (hasPermission === null) {
        return <ThemedText style={{marginTop: 50}}>Requesting for camera permission</ThemedText>
    }
    if (hasPermission === false) {
        return (
            <View style={{ display: 'flex', justifyContent: 'center'}}>
                <ThemedText type='title'>No access to camera</ThemedText>
            </View>
        )
    }

    return (
        <>
            <ThemedView header>
                <ThemedText type='title'>Seguir Proceso</ThemedText>
                <ThemedText>Para seguir un proceso, ingrese el rollo que busca</ThemedText>

                <View>
                    {data?.length ? data.map(process => (
                        <View style={[styles.processContainer, {backgroundColor}]}>
                            <View style={{ width: '50%', display: 'flex', gap: 4 }}>
                                <ThemedText style={styles.processContainerText}>ID: {process.id}</ThemedText>
                                <ThemedText style={styles.processContainerText}>Tipo: {process.type}</ThemedText>
                                <ThemedText style={styles.processContainerText}>Producto: {process.product.name}</ThemedText>
                            </View>

                            <View style={{ width: '50%' }}>
                                <ThemedText style={styles.processContainerText}>Fecha de inicio:</ThemedText>
                                <ThemedText style={styles.processContainerDate}>{formatDate(process.start_time)}</ThemedText>
                            </View>
                        </View>
                    )) : (
                        <View>
                            <ThemedText style={{ textAlign: 'center', marginTop: 40, color: '#2563eb' }} type='subtitle'>No hay procesos activos</ThemedText>
                            <StyledButton onPress={() => router.navigate('/process/createProcess')} title='+ Iniciar proceso' type='invisible' />
                        </View>
                    )}
                </View>
            </ThemedView>

            {(showCamera && rollId.length === 0) && (
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

            <StyledButton title={`${showCamera ? 'Cerrar' : 'Abrir'} Camara`} onPress={() => setShowCamera(!showCamera)} />
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    input: {
        height: 50,
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
        flex: 1,
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0
    }, 
    processContainer: {
        paddingVertical: 12, 
        paddingHorizontal: 15,
        borderRadius: 10, 
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 10
    }, 
    processContainerText: {
        fontSize: 19, 
        fontWeight: '600'
    }, 
    processContainerDate: {
        fontSize: 19, 
    }
})

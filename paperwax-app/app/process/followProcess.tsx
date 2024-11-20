import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { CameraView, Camera } from 'expo-camera'
import { router } from 'expo-router'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import StyledButton from '@/components/StyledButton'
import { useQuery } from '@tanstack/react-query'
import { getProcess } from '@/api/ProcessApi'
import { ProcessType, ProductType } from '@/types'
import formatDate from '@/utils/formatDate'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

type ProcessListType = ProcessType & {
    product: ProductType
}

const Status = {
    PRINTING: 'Impresion', 
    PARAFFIN: 'Parafinado', 
    CUT: 'Corte', 
    PACKAGING: 'Empaquetado'
  }

export default function followProcess() {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background');
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(false)

    const [rolls, setRolls] = useState<ProcessType[]>([])
    const [rollId, setRollId] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    const getNextProcess = (currentProcess: ProcessListType['type']) : ProcessListType['type'] => {
        switch(currentProcess) {
          case 'PRINTING':
            return 'PARAFFIN'
    
          case 'PARAFFIN':
            return 'CUT'
    
          case 'CUT':
            return 'PACKAGING'
        }
        
        return 'PRINTING'
      }

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
        
        if(lot && lot_id) {
            const newArray = data?.filter((item: { roll_material: { lot: string; lot_id: number } }) => item.roll_material.lot === lot && item.roll_material.lot_id === +lot_id)
    
            setShowCamera(false)

            if(newArray) 
                setRolls(newArray)
        }
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

                {rolls.length !== data?.length && (
                    <StyledButton 
                        onPress={() => setRolls(data!)}
                        title='Reiniciar'
                        type='danger'
                        styles={{marginTop: 10}}
                    />
                )}

                <View style={{ gap: 10, marginTop: 10 }}>
                    {rolls?.length ? rolls.map((process: ProcessListType) => (
                        <>
                            <TouchableOpacity
                                onPress={() => router.push(`/process/createProcess?roll_id=${process.roll_material_id}&paper=${process.product.paper_id}&product=${process.product.id}&typeUrl=${getNextProcess(process.type)}`)}
                                key={`${process.id}`}
                                style={[
                                {
                                    padding: 15,
                                    borderRadius: 10
                                },
                                {backgroundColor}
                                ]}
                            >
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                <View style={{width: '60%'}}>
                                    <ThemedText type='secondary'>Nombre: {process.product?.name}</ThemedText>
                                    <ThemedText type='secondary' style={{marginTop: 5}}>Rollo: {process.roll_material.lot + "" + process.roll_material.lot_id}</ThemedText>
                                    <ThemedText type='secondary' style={{marginTop: 5}}>Papel: {process.product.paper?.name}</ThemedText>
                                </View>
                                
                                <View style={{width: '40%'}}>
                                    <ThemedText type='secondary' style={{textAlign: 'right'}}>Status: {Status[process.type]}</ThemedText>
                                </View>
                                </View>
                            </TouchableOpacity>
                        </>
                        
                    )) : (
                        <View>
                            <ThemedText style={{ textAlign: 'center', marginTop: 40, color: '#2563eb' }} type='subtitle'>No hay procesos activos</ThemedText>
                            <StyledButton onPress={() => router.navigate('/process/createProcess')} title='+ Iniciar proceso' type='invisible' />
                        </View>
                    )}
                </View>
            </ThemedView>

            {(showCamera) && (
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

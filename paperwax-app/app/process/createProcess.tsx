import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, Vibration } from 'react-native'
import { CameraView, Camera } from 'expo-camera'
import { router, useLocalSearchParams } from 'expo-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import RNPickerSelect from 'react-native-picker-select'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import StyledButton from '@/components/StyledButton'
import { getRolls } from '@/api/MaterialApi'
import { getProducts } from '@/api/ProductApi'
import { ProcessCreate, ProductType, RollMaterial, SaleProductType } from '@/types'
import getPapersPicker, { getRollPicker } from '@/utils/getPapersPicker'
import { finishProcess, getProcess, registerProcess } from '@/api/ProcessApi'
import queryClient from '@/lib/queryClient'

export default function createProcess() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)

    const [rollMaterials, setRollMaterials] = useState<RollMaterial[]>([])
    const [products, setProducts] = useState<ProductType[]>([])

    const [type, setType] = useState<ProcessCreate['type'] | SaleProductType['status']>('PRINTING')
    const [initialWeight, setInitialWeight] = useState<string | undefined>()
    const [productId, setProductId] = useState<string | number>(0)
    const [rollMaterialId, setRollMaterialId] = useState<string | number>(0)
    const [lot, setLot] = useState('')
    const [lotId, setLotId] = useState('')

    const { paper, product, typeUrl, sale_id, roll_id, process_id } = useLocalSearchParams<{
        sale_id?: string;
        paper?: string;
        product?: string;
        typeUrl?: ProcessCreate['type'] | SaleProductType['status']
        roll_id?: string;
        process_id?: string;
    }>();

    const { data: rollMaterialsApi, isLoading: rollsIsLoading } = useQuery({
        queryKey: ['rolls'], 
        queryFn: getRolls
    })

    const { data: processApi, isLoading: IsLoadingProcess } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    const { data: productsApi, isLoading: productsIsLoading } = useQuery({
        queryKey: ['products'], 
        queryFn: getProducts
    })

    const { mutate: finishedProcess } = useMutation({
        mutationFn: finishProcess, 
        onError: (error) => {
            Alert.alert('Hubo un error', error.message, [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: () => {
            mutate({
                roll_material_id: +rollMaterialId, initial_weight: +initialWeight!, product_id: +productId, type: type, sale_id: +sale_id!
            })
        }
    })

    const { mutate } = useMutation({
        mutationFn: registerProcess, 
        onError: (error) => {
            Alert.alert('Hubo un error', error.message, [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data : string) => {
            Vibration.vibrate()

            Alert.alert('Proceso registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])

            queryClient.invalidateQueries({queryKey: [['pendingProcess'], ['process']]})

            router.back()
        }, 
    })

    const handleForm = () => {
        if(typeUrl !== 'PRINTING' && typeUrl) {
            finishedProcess({
                data: {
                    ...processApi?.filter(item => +item.id === +process_id!)[0]!, 
                    end_time: new Date().toISOString(), 
                    final_weight: +initialWeight!
                }, processId: +process_id!
            })
        } else {
            mutate({
                roll_material_id: +rollMaterialId, initial_weight: +initialWeight!, product_id: +productId, type: type, sale_id: +sale_id!
            })
        }
        
    }

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setLot(data.slice(0, 4)) 
        setLotId(data.slice(4)) 
    };

    useEffect(() => {
        if(rollMaterialsApi) {
            setRollMaterials(rollMaterialsApi)
        }
        if(productsApi) {
            setProducts(productsApi)
        }
    }, [rollMaterialsApi, productsApi])

    const checkRoll = (id: number) => {
        if(id && paper) {
            const roll = rollMaterials.filter(roll => roll.id === id)[0]
            if(+roll.paper_id !== +paper!) {
                Alert.alert('Rollo Incorrecto', 'El tipo de rollo seleccionado no es el correcto', [
                    {text: 'Aceptar', style: 'cancel'}
                ])

                setRollMaterialId(0)
                return false
            }
            setInitialWeight(roll.weight.toString())
        }

        return true
    }

    useEffect(() => {
        const roll = rollMaterials.filter(roll => roll.lot === lot && roll.lot_id === +lotId && roll.status === 'AVAIBLE')

        if(roll.length && checkRoll(roll[0].id)) {
            Vibration.vibrate()
            setRollMaterialId(roll[0].id)
        }
    }, [lot, lotId])

    useEffect(() => {
        if(product) {
            setProductId(+product)
        }
        if(typeUrl) {
            setType(typeUrl)
        }
        if(roll_id) {
            setRollMaterialId(roll_id)
        }
    }, [product, paper, typeUrl, roll_id])

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    if(rollsIsLoading || productsIsLoading) return (
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
            <ThemedText style={{marginTop: 0}} type='title'>Iniciar Proceso</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Ingrese la información que se solicita para iniciar el proceso</ThemedText>

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
                <ThemedText>Rollo</ThemedText>
                <RNPickerSelect
                    value={rollMaterialId}
                    onValueChange={(value) => {
                        setLot(rollMaterials.filter(roll => roll.id === +value)[0]?.lot)
                        setLotId(rollMaterials.filter(roll => roll.id === +value)[0]?.lot_id.toString())
                        setRollMaterialId(value)
                    }}
                    items={getRollPicker(rollMaterials)}
                    style={pickerSelectStyles}
                />

                <ThemedText>Producto</ThemedText>
                {products && (
                    <RNPickerSelect
                        value={productId}
                        onValueChange={(value) => setProductId(value)}
                        items={getPapersPicker(products)}
                        style={pickerSelectStyles}
                    />
                )}
                <ThemedText>Proceso</ThemedText>
                {products && (
                    <RNPickerSelect
                        value={type}
                        onValueChange={(value) => setType(value)}
                        items={[
                            {label: 'Impresión', value: 'PRINTING'},
                            {label: 'Parafinado', value: 'PARAFFIN'},
                            {label: 'Cortado', value: 'CUT'},
                            {label: 'Empaquetado', value: 'PACKAGING'}
                        ]}
                        style={pickerSelectStyles}
                    />
                )}
                <ThemedText>Peso inicial</ThemedText>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Peso inicial (Kg)"
                    value={initialWeight}
                    onChangeText={setInitialWeight}
                    autoCapitalize="none"
                />

                <StyledButton 
                    title='Iniciar Proceso'
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
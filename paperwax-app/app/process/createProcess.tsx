import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import { CameraView, Camera } from 'expo-camera'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import RNPickerSelect from 'react-native-picker-select'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import StyledButton from '@/components/StyledButton'
import { createRollMaterial, getRolls } from '@/api/MaterialApi'
import { createProduct, getProducts } from '@/api/ProductApi'
import { ProcessCreate, ProductType, RollMaterial, RollMaterialCreate } from '@/types'
import getPapersPicker, { getRollPicker } from '@/utils/getPapersPicker'
import { registerProcess } from '@/api/ProcessApi'

export default function createProcess() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)

    const [rollMaterials, setRollMaterials] = useState<RollMaterial[]>([])
    const [products, setProducts] = useState<ProductType[]>([])

    const [type, setType] = useState<ProcessCreate['type']>('PRINTING')
    const [initialWeight, setInitialWeight] = useState<string | undefined>()
    const [productId, setProductId] = useState<string | number>(0)
    const [rollMaterialId, setRollMaterialId] = useState<string | number>(0)
    const [lot, setLot] = useState('')
    const [lotId, setLotId] = useState('')

    const { data: rollMaterialsApi, isLoading: rollsIsLoading } = useQuery({
        queryKey: ['rolls'], 
        queryFn: getRolls
    })

    const { data: productsApi, isLoading: productsIsLoading } = useQuery({
        queryKey: ['products'], 
        queryFn: getProducts
    })

    const { mutate } = useMutation({
        mutationFn: registerProcess, 
        onError: (error) => {
            Alert.alert('Hubo un error', 'Hubo un error al tratar de registrar el proceso', [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data) => {
            Alert.alert('Proceso registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])
        }
    })

    const handleForm = () => mutate({
        roll_material_id: +rollMaterialId, initial_weight: +initialWeight!, product_id: +productId, type: type
    })

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

    useEffect(() => {
        const roll = rollMaterials.filter(roll => roll.lot === lot && roll.lot_id === +lotId && roll.status === 'AVAIBLE')
        if(roll.length) {
            setRollMaterialId(roll[0].id)
        } else if(roll.length === 0 && lot && lotId) {
            Alert.alert('Rollo no disponible', 'El rollo ya fue usado o no esta disponible', [
                {text: 'Aceptar', style: 'cancel'}
            ])

            setRollMaterialId(0)
            setLot('')
            setLotId('')
            setShowCamera(false)
        }
    }, [lot, lotId])

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
                {(rollMaterials && !rollMaterialId) ? (
                    <RNPickerSelect
                        onValueChange={(value) => {
                            setLot(rollMaterials.filter(roll => roll.id === +value)[0]?.lot)
                            setLotId(rollMaterials.filter(roll => roll.id === +value)[0]?.lot_id.toString())
                            setRollMaterialId(value)
                        }}
                        items={getRollPicker(rollMaterials)}
                        style={pickerSelectStyles}
                    />
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Rollo Seleccionado"
                            value={lot + "" + lotId}
                        />
                    </>
                )}
                <ThemedText>Producto</ThemedText>
                {products && (
                    <RNPickerSelect
                        onValueChange={(value) => setProductId(value)}
                        items={getPapersPicker(products)}
                        style={pickerSelectStyles}
                    />
                )}
                <ThemedText>Proceso</ThemedText>
                {products && (
                    <RNPickerSelect
                        onValueChange={(value) => setType(value)}
                        items={[
                            {label: 'Impresión', value: 'PRINTING'},
                            {label: 'Parafinado', value: 'PARAFFIN'}
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
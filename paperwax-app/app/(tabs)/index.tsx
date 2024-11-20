import { useQuery } from '@tanstack/react-query'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors';
import StyledButton from '@/components/StyledButton';
import { router } from 'expo-router';
import { getPendingProcess } from '@/api/ProcessApi';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const Status = {
  ON_HOLD: 'En espera', 
  PRINTING: 'Impresion', 
  PARAFFIN: 'Parafinado', 
  CUT: 'Corte', 
  PACKAGING: 'Empaquetado', 
  COMPLETED: 'Completado', 
  DELIVERED: 'Entregado'
}

export default function HomeScreen() {
  const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background');

  const { data, isLoading } = useQuery({
    queryKey: ['pendingProcess'], 
    queryFn: getPendingProcess
  })

  if(isLoading) return <ActivityIndicator />

  return (
    <ThemedView>
      <ThemedText type='title' style={{ color: Colors.primary.textPrimaryLight, fontWeight: 'bold' }}>PaperWax App</ThemedText>

      <ThemedText style={{marginTop: 20}} type='subtitle'>Procesos Pendientes</ThemedText>
      <ThemedText>Gestiona los procesos que estan pendientes</ThemedText>

      <StyledButton 
        styles={{marginVertical: 10}}
        title='+ Iniciar Proceso'
        onPress={() => router.push('/process/createProcess')}
      />

      {data?.length ? data.map(item => (
        <TouchableOpacity
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
              <ThemedText type='secondary'>Nombre: {item.product.name}</ThemedText>
              <ThemedText type='secondary' style={{marginTop: 5}}>Paper: {item.product.paper.name}</ThemedText>
            </View>
            
            <View style={{width: '40%'}}>
              <ThemedText type='secondary' style={{textAlign: 'right'}}>Cantidad: {item.quantity}</ThemedText>
              <ThemedText type='secondary' style={{textAlign: 'right'}}>Status: {Status[item.status]}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      )) : (
        <ThemedText>No hay productos</ThemedText>
      )}

      
    </ThemedView>
  );
}
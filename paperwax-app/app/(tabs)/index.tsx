import { useQuery } from '@tanstack/react-query'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors';
import StyledButton from '@/components/StyledButton';
import { router } from 'expo-router';
import { getPendingProcess } from '@/api/ProcessApi';
import { ActivityIndicator, TouchableOpacity, View, RefreshControl, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SaleProductType } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useState } from 'react';

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
  const [refreshing, setRefreshing] = useState(false);
  const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background');

  const getNextProcess = (currentProcess: SaleProductType['status']) : SaleProductType['status'] => {
    switch(currentProcess) {
      case 'ON_HOLD': 
        return 'PRINTING'

      case 'PRINTING':
        return 'PARAFFIN'

      case 'PARAFFIN':
        return 'CUT'

      case 'CUT':
        return 'PACKAGING'

      case 'PACKAGING':
        return 'COMPLETED'
    }
    
    return 'ON_HOLD'
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pendingProcess'], 
    queryFn: getPendingProcess
  })

  const onRefresh = useCallback(() => {
    refetch()

    setRefreshing(false)
  }, []);

  if(isLoading) return <ActivityIndicator />

  return (
      <ThemedView onCharge={() => refetch()}>
        <ThemedText type='title' style={{ color: Colors.primary.textPrimaryLight, fontWeight: 'bold' }}>PaperWax App</ThemedText>

        <ThemedText style={{marginTop: 20}} type='subtitle'>Procesos Pendientes</ThemedText>
        <ThemedText>Gestiona los procesos que estan pendientes</ThemedText>

        <StyledButton 
          styles={{marginVertical: 10}}
          title='+ Iniciar Proceso'
          onPress={() => router.push('/process/createProcess')}
        />

        <View style={{gap: 10}}>
          {data?.length ? data.map(item => (
            <TouchableOpacity
              onPress={() => router.push(`/process/createProcess?roll_id=${item.product.processes.filter(itemDb => +itemDb.sale_id! === +item.sale_id)[0]?.roll_material_id}&process_id=${item.product.processes.filter(itemDb => +itemDb.sale_id! === +item.sale_id)[0]?.id}&sale_id=${item.sale_id}&paper=${item.product.paper_id}&product=${item.product.id}&typeUrl=${getNextProcess(item.status)}`)}
              key={`${item.sale_id}-${item.product.id}`}
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
            <View>
              <ThemedText style={{ textAlign: 'center', marginTop: 40 }} type='subtitle'>No hay procesos pendientes</ThemedText>
            </View>
          )}
        </View>
      </ThemedView>
  );
}
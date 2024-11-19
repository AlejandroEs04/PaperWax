import { StyleSheet, View } from 'react-native'
import ActionContainer from '@/components/checkIn/ActionContainer'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors';
import StyledButton from '@/components/StyledButton';
import { router } from 'expo-router';

export default function HomeScreen() {
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

      
    </ThemedView>
  );
}
import { StyleSheet, View } from 'react-native'
import ActionContainer from '@/components/checkIn/ActionContainer'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedText type='title' style={{ color: Colors.primary.textPrimaryLight, fontWeight: 'bold' }}>PaperWax App</ThemedText>

      <ThemedText style={{marginTop: 20}} type='subtitle'>Registrar</ThemedText>
      <ThemedText>Para registrar una entrada, primero seleccione el tipo de registro</ThemedText>

      <View style={{marginTop: 15, display: 'flex', gap: 5}}>
        <ActionContainer 
          href='checkIn/rollRegister'
          text='Registrar rollos'
          icon='barcode-outline'
        />

        <ActionContainer 
          href='checkIn/rawMaterialRegister'
          text='Registrar materia prima'
          icon='book-outline'
        />
      </View>

      <ThemedText style={{marginTop: 40}} type='subtitle'>Iniciar Procesos</ThemedText>
      <ThemedText>Para iniciar un proceso de producción, selecciona el proceso</ThemedText>

      <View style={{marginTop: 15, display: 'flex', gap: 5}}>
        <ActionContainer 
          href='process/followProcess'
          text='Seguir Proceso'
          icon='camera-outline'
        />

        <ActionContainer 
          href='process/createProcess'
          text='Iniciar Proceso'
          icon='add-outline'
        />

        <ActionContainer 
          href='process/createPrinting'
          text='Imprenta'
          icon='print-outline'
        />

        <ActionContainer 
          href='process/createParaffin'
          text='Parafinado'
          icon='settings-outline'
        />

        <ActionContainer 
          href='checkIn/rollRegister'
          text='Cortado'
          icon='cut-outline'
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      justifyContent: 'center',
  }
})

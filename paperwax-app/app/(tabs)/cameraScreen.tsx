import StyledButton from '@/components/StyledButton';
import { Colors } from '@/constants/Colors';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [type, setType] = useState('');
  const [lote, setLote] = useState('');
  const [id, setId] = useState('');
  const [weight, setWeight] = useState('');

  const [showForm, setShowForm] = useState(false)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleChangeShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <View style={styles.container}>
      <CameraView barcodeScannerSettings={{ barcodeTypes: ['codabar'] }} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <View style={[styles.formContainer, showForm ? null : styles.maxHeight]}>
        <StyledButton type='invisible' title={showForm ? 'Ocultar formulario' : 'Mostrar formulario'} onPress={handleChangeShowForm} />

        <View>
            <TextInput
                style={styles.input}
                placeholder="Tipo"
                value={type}
                onChangeText={setType}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Lote"
                value={lote}
                onChangeText={setLote}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={id}
                onChangeText={setId}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={weight}
                onChangeText={setWeight}
                autoCapitalize="none"
            />

            <StyledButton title='Registrar entrada' onPress={handleChangeShowForm} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20, 
    backgroundColor: Colors.primary.backgroundSecondary, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 10, 
    position: 'absolute', 
    bottom: 0, 
    width: '100%',
    height: 'auto',
  },
  maxHeight: {
    maxHeight: 90,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CamaraScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState(null);
  const [camaraLista, setCamaraLista] = useState(false);

  async function tomarFoto() {
    if (!camaraLista) return;
    try {
      const foto = await cameraRef.current?.takePictureAsync();
      if (foto?.uri) setFotoUri(foto.uri);
    } catch (e) {
      console.log('Error al tomar la foto:', e);
    }
  }

  if (!permission) {
    return <Text style={styles.mensaje}>Verificando permiso de cámara...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensaje}>Se necesita permiso para usar la cámara.</Text>
        <Pressable
          style={styles.boton}
          onPress={permission.canAskAgain ? requestPermission : Linking.openSettings}
        >
          <Text style={styles.textoBoton}>
            {permission.canAskAgain ? 'Conceder permiso' : 'Abrir configuración'}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (fotoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: fotoUri }} style={styles.vista} />
        <Pressable style={styles.boton} onPress={() => setFotoUri(null)}>
          <Text style={styles.textoBoton}>Tomar otra</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.vista}
        facing="back"
        onCameraReady={() => setCamaraLista(true)}
      />
      <Pressable
        style={[styles.boton, !camaraLista && styles.botonDeshabilitado]}
        onPress={tomarFoto}
        disabled={!camaraLista}
      >
        <Text style={styles.textoBoton}>Tomar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
  },
  vista: {
    flex: 1,
  },
  mensaje: {
    textAlign: 'center',
    margin: 20,
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 14,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: '#9ca3af',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

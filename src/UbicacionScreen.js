import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function UbicacionScreen() {
  const [cargando, setCargando] = useState(false);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  async function obtenerUbicacion() {
    setCargando(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permiso de ubicación denegado.');
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords(pos.coords);
    } catch (e) {
      setError('No se pudo obtener la ubicación. Revisa que el GPS esté activado.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={styles.centro}>
      <Pressable style={styles.boton} onPress={obtenerUbicacion} disabled={cargando}>
        <Text style={styles.textoBoton}>Obtener mi ubicación</Text>
      </Pressable>

      {cargando && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {coords && !cargando && (
        <View>
          <Text>Latitud: {coords.latitude.toFixed(6)}</Text>
          <Text>Longitud: {coords.longitude.toFixed(6)}</Text>
          <Text>Precisión: {coords.accuracy?.toFixed(0) ?? '—'} m</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

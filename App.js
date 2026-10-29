import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CamaraScreen from './src/CamaraScreen';
import UbicacionScreen from './src/UbicacionScreen';
import BrujulaScreen from './src/BrujulaScreen';

const PESTANAS = ['Cámara', 'Ubicación', 'Brújula'];

export default function App() {
  const [activa, setActiva] = useState('Cámara');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Explorador móvil</Text>

      <View style={styles.pestanas}>
        {PESTANAS.map((nombre) => (
          <Pressable
            key={nombre}
            onPress={() => setActiva(nombre)}
            style={[styles.pestana, activa === nombre && styles.pestanaActiva]}
          >
            <Text style={activa === nombre && styles.textoActivo}>{nombre}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.contenido}>
        {activa === 'Cámara' && <CamaraScreen />}
        {activa === 'Ubicación' && <UbicacionScreen />}
        {activa === 'Brújula' && <BrujulaScreen />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  pestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  pestana: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  pestanaActiva: {
    borderBottomWidth: 3,
    borderColor: '#2563eb',
  },
  textoActivo: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  contenido: {
    flex: 1,
  },
});

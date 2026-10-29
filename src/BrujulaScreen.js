import { Magnetometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DIRECCIONES = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];

function direccion(angulo) {
  return DIRECCIONES[Math.round(angulo / 45) % 8];
}

export default function BrujulaScreen() {
  const [disponible, setDisponible] = useState(null);
  const [datos, setDatos] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let cancelado = false;
    let sub = null;

    Magnetometer.isAvailableAsync().then((ok) => {
      if (cancelado) return;
      setDisponible(ok);
      if (!ok) return;
      Magnetometer.setUpdateInterval(250);
      sub = Magnetometer.addListener(setDatos);
    });

    return () => {
      cancelado = true;
      sub?.remove();
    };
  }, []);

  if (disponible === null) {
    return <Text style={styles.mensaje}>Verificando sensor...</Text>;
  }

  if (!disponible) {
    return <Text style={styles.mensaje}>Sensor no disponible</Text>;
  }

  const { x, y, z } = datos;
  const angulo = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

  return (
    <View style={styles.centro}>
      <Text style={styles.angulo}>{angulo.toFixed(0)}° {direccion(angulo)}</Text>
      <Text>X: {x.toFixed(2)} μT</Text>
      <Text>Y: {y.toFixed(2)} μT</Text>
      <Text>Z: {z.toFixed(2)} μT</Text>
      <Text style={styles.nota}>
        Dirección aproximada: mantén el teléfono horizontal. No corrige declinación magnética ni
        inclinación.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  angulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mensaje: {
    textAlign: 'center',
    margin: 20,
  },
  nota: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
});

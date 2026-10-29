Explorador móvil: app Expo / React Native en **JavaScript** (sin TypeScript) con tres módulos: Cámara, Ubicación y Brújula. Se ejecuta en un teléfono físico con **Expo Go**.

## Expo cambia entre versiones: no confíes en la memoria

Antes de escribir código que use una API de Expo o React Native:

1. Revisa la versión mayor de `expo` en `package.json` (actualmente SDK 58).
2. Consulta la documentación de esa versión: `https://docs.expo.dev/versions/v58.0.0/`
   - Cámara: https://docs.expo.dev/versions/v58.0.0/sdk/camera/
   - Ubicación: https://docs.expo.dev/versions/v58.0.0/sdk/location/
   - Sensores: https://docs.expo.dev/versions/v58.0.0/sdk/sensors/
3. Para otros temas, usa el índice https://docs.expo.dev/llms.txt.

## Comandos

```bash
npx expo install <paquete>  # SIEMPRE en lugar de npm install: resuelve versiones compatibles con el SDK
npx expo start              # servidor de desarrollo (usa --tunnel si la red local falla)
npx expo-doctor             # diagnostica dependencias y configuración
npx expo install --fix      # corrige versiones incompatibles
```

No ejecutes `npm audit fix --force`: cambia versiones y rompe la compatibilidad con el SDK.

## Estructura y convenciones

- `App.js`: encabezado y navegación simple por pestañas con `useState`; solo se monta la pantalla activa, así al cambiar de pestaña se libera la cámara y se eliminan las suscripciones de sensores.
- `src/screens/`: una pantalla por módulo (`CamaraScreen.js`, `UbicacionScreen.js`, `BrujulaScreen.js`).
- `src/components/`: componentes reutilizables (botones, mensajes de estado/permiso).
- `src/utils/`: funciones puras (por ejemplo, convertir ángulo a dirección cardinal).
- Solo componentes básicos de React Native: `View`, `Text`, `Pressable`, `Image`, `ScrollView`, `StyleSheet`, `ActivityIndicator`. No agregar librerías de navegación.
- Textos de la interfaz en español.

## Reglas

- Cada módulo debe mostrar estados de permiso pendiente / concedido / denegado, cargando y error; nunca una pantalla vacía.
- Las suscripciones a sensores se crean dentro de `useEffect` y se eliminan en su función de limpieza.
- La ubicación del usuario no se envía ni se publica en ningún lado.
- No crear ni editar `ios/` ni `android/`; la configuración nativa va en `app.json`.
- Solo usar módulos incluidos en Expo Go (`expo-camera`, `expo-location`, `expo-sensors` lo están).

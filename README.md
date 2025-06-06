# Rick & Morty App 📱

Una aplicación móvil desarrollada con React Native y Expo que muestra personajes de la serie Rick y Morty con animaciones fluidas y una interfaz moderna.

## 🚀 Características

- 📋 Lista animada de personajes de Rick y Morty
- 🎨 Tarjetas con animaciones de scroll suaves
- 📱 Navegación entre pantallas con transiciones personalizadas
- 🔍 Vista detallada de cada personaje
- ♾️ Scroll infinito para cargar más personajes
- 🎯 Optimizada para rendimiento
- 🌙 Soporte para modo claro/oscuro
- 📊 Gestión de estado con Zustand
- 🔄 Cache inteligente con React Query

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil multiplataforma
- **Expo** - Plataforma de desarrollo y herramientas
- **TypeScript** - Tipado estático para JavaScript
- **React Native Reanimated** - Animaciones de alta performance
- **React Navigation** - Navegación entre pantallas
- **TanStack Query (React Query)** - Manejo de estado del servidor y cache
- **Zustand** - Gestión de estado global

## 📁 Estructura del Proyecto

```
app/
├── modules/animated/
│   ├── hooks/              # Hooks personalizados
│   ├── screens/            # Pantallas de la aplicación
│   ├── services/           # Servicios de API
│   └── store/              # Estado global
├── components/             # Componentes reutilizables
├── navigation/             # Configuración de navegación
├── types/                  # Definiciones de TypeScript
├── constants/              # Constantes de la aplicación
└── hooks/                  # Hooks globales
```

## 🏗️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go o emulador

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/rick-morty-animated.git
   cd rick-morty-animated
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npx expo start
   ```

4. **Ejecuta en tu dispositivo**
   - Escanea el código QR con Expo Go (Android/iOS)
   - O presiona `a` para Android emulator
   - O presiona `i` para iOS simulator

## 📱 Pantallas

### 🏠 Pantalla Principal (HomeScreen)
- Lista horizontal de tarjetas animadas
- Animaciones de escala y opacidad al hacer scroll
- Carga automática de más personajes
- Indicador de carga en el footer

### 📋 Pantalla de Detalles (DetailScreen)
- Información completa del personaje
- Animaciones de entrada personalizadas
- Estado visual (vivo/muerto/desconocido)
- Información de origen y ubicación
- Lista de episodios

## 🎨 Animaciones

### Scroll Animado
- **Escala**: Las tarjetas se agrandan al estar en el centro
- **Opacidad**: Efecto fade en tarjetas laterales
- **Parallax**: Movimiento suave durante el scroll

### Transiciones de Pantalla
- **Slide**: Deslizamiento horizontal
- **Fade**: Desvanecimiento gradual
- **Scale**: Efecto de zoom
- **Stagger**: Animaciones secuenciales

## 🔧 Hooks Personalizados

### [`useAnimatedScroll`](app/modules/animated/hooks/useAnimatedScroll.ts)
Maneja las animaciones del scroll horizontal con interpolaciones suaves.

### [`useFetchCharacters`](app/modules/animated/hooks/useFetchCharacters.ts)
Gestiona la carga de personajes con paginación infinita y cache inteligente.

## 🌐 API

La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/):
- **Endpoint**: `https://rickandmortyapi.com/api/character`
- **Paginación**: Automática con scroll infinito
- **Cache**: 5 minutos de duración

## 📊 Gestión de Estado

### Zustand Store
- [`useCharacterStore`](app/modules/animated/store/useCharacterStore.ts): Almacena la lista de personajes

### React Query
- Cache inteligente de peticiones API
- Reintento automático en caso de error
- Optimización de rendimiento

## 🎯 Optimizaciones de Performance

- **Lazy Loading**: Componentes cargados bajo demanda
- **Memoización**: React.memo en componentes clave
- **getItemLayout**: Optimización de FlatList
- **removeClippedSubviews**: Mejora de memoria
- **windowSize**: Control de elementos renderizados

## 🔄 Scripts Disponibles

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

## 📱 Navegación

La navegación está configurada con React Navigation Stack:
- **AnimatedList**: Pantalla principal con lista de personajes
- **Details**: Pantalla de detalles del personaje

## 🔧 Configuración

### TypeScript
- Configuración estricta habilitada
- Alias de rutas configurado (`@/*`)
- Tipos exportados desde [`types/`](types/)

### Expo
- Configuración en [`app.json`](app.json)
- Soporte para typed routes
- Splash screen personalizada

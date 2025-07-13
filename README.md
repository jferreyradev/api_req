# 🚀 API Tester - Cliente API Moderno

Un potente clie### 🔧 Funcionalidades Técnicas
- **✅ Validación JSON**: En tiempo real con indicadores visuales
- **📋 Clipboard API**: Copia con confirmación visual
- **🔄 Request Building**: Construcción inteligente de peticiones
- **📊 Response Analytics**: Estadísticas de líneas y tamaño
- **🎮 Keyboard Shortcuts**: Navegación eficiente con teclas rápidas
- **💻 Vue 3 Composition API**: Reactivity moderna y optimizada
- **⚡ Vite**: Build tool ultrarrápido con hot reloadmoderno y elegante construido con Vue 3, Vite y DaisyUI. Permite realizar peticiones HTTP de forma visual e intuitiva con capacidades avanzadas de testing, búsqueda y exportación de datos. 

**Arquitectura simplificada**: Todo integrado en un solo componente robusto para máxima eficiencia y mantenibilidad.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

## ✨ Características Principales

### 🌐 Cliente API Completo
- **Métodos HTTP**: GET, POST, PUT, DELETE, PATCH
- **URL Parameters**: Gestión dinámica con activación/desactivación individual
- **🚀 Headers Rápidos**: 
  - 🔐 **Authorization**: Input directo para Bearer tokens
  - 🔑 **API Key**: Configuración rápida con nombre personalizable  
  - ⚡ **Header Personalizado**: Crear cualquier header al instante
  - 💫 **Sincronización automática** con el sistema de headers principal
- **Headers Avanzados**: 
  - ✅ **Compatible con TODOS los métodos** (GET, POST, PUT, DELETE, PATCH)
  - 🔧 Gestión completa con validación visual
  - 💡 Ejemplos predefinidos para facilitar el uso
- **Request Body**: 
  - 📝 **Modo JSON**: Editor con validación en tiempo real
  - 🔧 **Modo Parámetros**: Interface visual key-value con preview JSON
- **Respuestas Detalladas**: Status code, headers y datos formateados

### 🔍 Búsqueda Avanzada en Respuestas
- **Búsqueda en Tiempo Real**: Encuentra términos específicos instantáneamente
- **Resaltado Visual**: Coincidencias en amarillo, actual en rojo
- **Navegación Inteligente**: 
  - Enter: Siguiente coincidencia
  - Shift+Enter: Anterior coincidencia
  - ESC: Cerrar búsqueda
- **Contador Dinámico**: "3 de 15 coincidencias"
- **Auto-scroll**: Se desplaza automáticamente a la coincidencia

### 📥 Sistema de Descarga Avanzado
- **� JSON Completo**: Respuesta completa con metadatos (URL, método, headers, status)
- **� Solo Datos**: Únicamente el contenido de la respuesta (.txt)
- **📊 CSV Inteligente**: Conversión automática para arrays de objetos
- **� Timestamping**: Archivos con fecha y hora automática
- **� Auto-reset**: Selector se resetea después de cada descarga

### 🎨 Interfaz Moderna y Responsiva
- **� Logo con Emoji**: Identidad visual moderna con emoji de cohete
- **📱 Design Responsivo**: Perfecto en desktop, tablet y móvil
- **🎛️ Configuración Compacta**: Secciones colapsables con espaciado mínimo
- **⚡ Estados Visuales**: Loading spinners, badges de status, feedback visual
- **🎯 UX Optimizada**: Tooltips, shortcuts de teclado, feedback inmediato

### �️ Funcionalidades Técnicas
- **✅ Validación JSON**: En tiempo real con indicadores visuales
- **📋 Clipboard API**: Copia con confirmación visual
- **🔄 Request Building**: Construcción inteligente de peticiones
- **📊 Response Analytics**: Estadísticas de líneas y tamaño
- **🎮 Keyboard Shortcuts**: Navegación eficiente
- **Vue 3 Composition API**: Reactivity moderna y optimizada
- **Vite**: Build tool ultrarrápido

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (versión recomendada: 16+)
- **npm** o **yarn**

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd api_req
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**
   ```
   http://localhost:5173
   ```

## 📖 Uso

### 🚀 Headers Rápidos - Nueva Característica
La función más destacada de este cliente API es el sistema de **Headers Rápidos**, que permite configurar headers comunes de forma instantánea:

1. **Authorization Bearer**: 
   - Input directo para tokens Bearer
   - Se añade automáticamente el prefijo "Bearer "
   - Sincronización inmediata con headers principales

2. **API Key**:
   - Nombre personalizable del header (ej: X-API-KEY, Api-Key, etc.)
   - Valor del API key
   - Ambos campos se sincronizan automáticamente

3. **Header Personalizado**:
   - Crear cualquier header con nombre y valor custom
   - Perfect para headers específicos de tu API

**Ventaja**: Todos los headers configurados en "Headers Rápidos" se muestran automáticamente en la sección "Headers Enviados en la Petición" y son editables desde ambos lugares.

### Realizar una Petición GET
1. Ingresa la URL de la API
2. Selecciona el método GET (por defecto)
3. **Agrega parámetros de URL si es necesario** (ej: page=1, limit=10)
4. Agrega headers si es necesario
5. Haz clic en "Enviar"

### Realizar una Petición POST/PUT
1. Selecciona el método POST o PUT
2. Se activará automáticamente el editor de Body
3. **Configura parámetros de URL** para filtros o paginación
4. Ingresa el JSON en el editor del body
5. El sistema validará automáticamente la sintaxis
6. Haz clic en "Enviar"

### Gestión de Parámetros de URL
- ✅ **Activar/Desactivar**: Checkbox para habilitar parámetros
- ➕ **Agregar**: Botón para nuevos parámetros
- ❌ **Eliminar**: Botón X para quitar parámetros
- 📝 **Ejemplos**: Botón para cargar ejemplos comunes (page, limit, sort)
- 🗑️ **Limpiar**: Botón para resetear todos los parámetros

### Gestión de Headers con Headers Rápidos
- **🚀 Authorization**: Input directo para Bearer tokens
- **🔑 API Key**: Configuración rápida con nombre personalizable  
- **⚡ Header Personalizado**: Crear cualquier header al instante
- **💫 Sincronización automática** con el sistema principal
- **✅ Activar/Desactivar**: Checkbox para habilitar headers
- **➕ Agregar**: Botón para nuevos headers personalizados
- **❌ Eliminar**: Botón X para quitar headers
- **🔄 Content-Type**: Incluido por defecto para POST/PUT

### Exportar Resultados
1. Realiza cualquier petición exitosa
2. Haz clic en el botón "Descargar"
3. Selecciona el formato deseado:
   - **JSON completo**: Incluye status, headers y datos
   - **Solo datos (.txt)**: Únicamente la respuesta
   - **CSV**: Para arrays de objetos (auto-detecta)

## 🏗️ Arquitectura

### Estructura Simplificada del Proyecto
```
src/
├── components/
│   └── CardApi.vue          # 🎯 Componente único - toda la funcionalidad integrada
├── assets/
│   └── logo.svg            # Logo/recursos de la aplicación  
├── App.vue                  # Componente raíz con layout responsive
├── main.js                  # Punto de entrada con configuración de Vue
└── style.css               # Estilos globales de Tailwind
```

### Filosofía de Arquitectura

**Un Solo Componente, Máxima Potencia**: En lugar de múltiples componentes modulares, `CardApi.vue` integra toda la funcionalidad en un diseño cohesivo y optimizado:

- ⚡ **Mejor Rendimiento**: Sin overhead de comunicación entre componentes
- � **Más Fácil de Mantener**: Una sola fuente de verdad 
- 🎯 **UX Más Fluida**: Estados compartidos sin complejidad
- 📦 **Menor Bundle Size**: Sin importaciones ni props innecesarios
- 🚀 **Desarrollo Más Rápido**: Cambios directos sin refactoring modular

### Tecnologías Integradas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue 3** | ^3.5.13 | Framework reactivo con Composition API |
| **Vite** | ^6.2.0 | Build tool ultrarrápido y dev server |
| **Tailwind CSS** | ^4.1.11 | Framework CSS utility-first |
| **DaisyUI** | ^5.0.46 | Componentes elegantes para Tailwind |

## 🎨 Temas Disponibles

El proyecto incluye 8 temas de DaisyUI con cambio dinámico:

1. 🌞 **Light** - Tema claro clásico
2. 🌙 **Dark** - Tema oscuro elegante
3. 🎨 **Cupcake** - Colores suaves y pasteles
4. 🐝 **Bumblebee** - Amarillo vibrante
5. 🍃 **Emerald** - Verde fresco
6. 🏢 **Corporate** - Azul corporativo
7. 🌸 **Retro** - Estilo vintage
8. 🔥 **Synthwave** - Estética cyberpunk

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev           # Servidor de desarrollo con hot reload

# Build
npm run build         # Construcción optimizada para producción

# Preview
npm run preview       # Preview de la build de producción
```

## 🔧 Configuración

### Vite (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  }
})
```

### Tailwind (`tailwind.config.js`)
```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "retro", "synthwave"]
  }
}
```

## 📋 Roadmap Futuro

- [ ] 🔒 **Autenticación Avanzada**: OAuth 2.0, JWT y múltiples tipos de auth
- [ ] 📚 **Historial de Peticiones**: Guardar y reutilizar requests anteriores
- [ ] 🧪 **Testing Automatizado**: Aserciones y validaciones automáticas
- [ ] 📊 **GraphQL**: Soporte completo para queries y mutations
- [ ] 🌍 **Environments**: Gestión de múltiples entornos (dev, staging, prod)
- [ ] 📱 **PWA**: Aplicación web progresiva offline-first
- [ ] 🔗 **Collections**: Agrupación y organización de endpoints
- [ ] 📈 **Analytics**: Métricas de rendimiento de APIs

## 🐛 Reportar Issues

Si encuentras algún problema o tienes sugerencias:
1. Ve a la sección **Issues**
2. Crea un **nuevo issue**
3. Describe el problema con detalle
4. Incluye pasos para reproducir

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **José Ferreyra** - *Desarrollo y arquitectura* - [@joseferreyra](https://github.com/joseferreyra)

## 🙏 Agradecimientos

- **Vue.js Team** - Por el excelente framework reactivo
- **Vite Team** - Por la velocidad de desarrollo incomparable
- **DaisyUI** - Por los componentes hermosos y accesibles
- **Tailwind CSS** - Por el sistema de diseño utility-first

---

⭐ **¡Dale una estrella si te gustó el proyecto!** ⭐

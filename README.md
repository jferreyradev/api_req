# 🚀 API Client - Vue 3 + Vite + DaisyUI

Un cliente API moderno y elegante construido con Vue 3, Vite y DaisyUI. Permite realizar peticiones HTTP de forma visual e intuitiva con capacidades avanzadas de testing y exportación de datos.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

## ✨ Características

### 🌐 Cliente API Completo
- **Métodos HTTP**: GET, POST, PUT, DELETE, PATCH
- **Headers personalizados**: Gestión dinámica de headers con activación/desactivación
- **Request Body**: Editor JSON con validación en tiempo real
- **Respuestas detalladas**: Status code, headers de respuesta y datos

### 🎨 Interfaz Moderna
- **8 temas de DaisyUI**: Cambio dinámico de temas con persistencia
- **Diseño responsive**: Funciona en desktop, tablet y móvil
- **Iconos SVG**: Iconografía moderna y consistente
- **Feedback visual**: Estados de carga, éxito y error

### 📥 Exportación de Datos
- **Formato JSON**: Respuesta completa con metadatos
- **Formato TXT**: Solo datos de respuesta
- **Formato CSV**: Conversión automática para arrays de objetos
- **Nombres automáticos**: Archivos con timestamp

### 🛠️ Arquitectura Moderna
- **Composables reutilizables**: Lógica separada y modular
- **TypeScript ready**: Estructura preparada para TypeScript
- **Vue 3 Composition API**: Reactivity moderna y optimizada
- **Vite**: Build tool ultrarrápido

## 🚀 Inicio Rápido

### Prerrequisitos
- **Deno** (versión recomendada: 1.40+)
- **Node.js** (opcional, para npm packages)

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd front-ndgs
   ```

2. **Instala las dependencias**
   ```bash
   deno install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   deno task dev
   ```

4. **Abre en el navegador**
   ```
   http://localhost:5173
   ```

## 📖 Uso

### Realizar una Petición GET
1. Ingresa la URL de la API
2. Selecciona el método GET (por defecto)
3. Agrega headers si es necesario
4. Haz clic en "Consultar"

### Realizar una Petición POST/PUT
1. Selecciona el método POST o PUT
2. Se activará automáticamente el tab "Body"
3. Ingresa el JSON en el editor
4. El sistema validará automáticamente la sintaxis
5. Haz clic en "Consultar"

### Gestión de Headers
- ✅ **Activar/Desactivar**: Checkbox para habilitar headers
- ➕ **Agregar**: Botón para nuevos headers
- ❌ **Eliminar**: Botón X para quitar headers
- 🔄 **Content-Type**: Incluido por defecto para POST/PUT

### Exportar Resultados
1. Realiza cualquier petición exitosa
2. Haz clic en el botón "Descargar"
3. Selecciona el formato deseado:
   - **JSON completo**: Incluye status, headers y datos
   - **Solo datos (.txt)**: Únicamente la respuesta
   - **CSV**: Para arrays de objetos (auto-detecta)

## 🏗️ Arquitectura

### Estructura del Proyecto
```
src/
├── components/
│   └── CardApi.vue          # Componente principal de la UI
├── composables/
│   ├── useApiClient.js      # Lógica de peticiones HTTP
│   ├── useApiForm.js        # Lógica del formulario
│   └── index.js             # Exportaciones centralizadas
├── assets/                  # Recursos estáticos
├── App.vue                  # Componente raíz con temas
├── main.js                  # Punto de entrada
└── style.css               # Estilos globales
```

### Composables

#### `useApiClient.js` 🌐
Maneja toda la lógica de comunicación HTTP:
- **Estado reactivo**: `response`, `isLoading`, `error`
- **Peticiones**: `makeRequest(config)`
- **Descarga**: `downloadResponse(format)`
- **Gestión de errores**: Centralizada y consistente

#### `useApiForm.js` 📝
Gestiona el estado y validación del formulario:
- **Campos**: `url`, `method`, `headers`, `requestBody`
- **Validación**: JSON en tiempo real
- **Ejemplos**: Templates predefinidos
- **Configuración**: `getRequestConfig()`

### Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue 3** | ^3.4.0 | Framework reactivo |
| **Vite** | ^6.2.6 | Build tool y dev server |
| **Tailwind CSS** | ^3.4.0 | Framework CSS utility-first |
| **DaisyUI** | ^5.0.46 | Componentes para Tailwind |
| **Deno** | 1.40+ | Runtime y package manager |

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
deno task dev          # Servidor de desarrollo

# Build
deno task build        # Construcción para producción

# Preview
deno task preview      # Preview de la build

# Lint (si se configura)
deno task lint         # Verificación de código
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

## 📋 Roadmap

- [ ] 🔒 **Autenticación**: Soporte para tokens y API keys
- [ ] 📚 **Historial**: Guardar peticiones anteriores
- [ ] 🧪 **Tests**: Suites de pruebas automatizadas
- [ ] 📊 **GraphQL**: Soporte para queries GraphQL
- [ ] 🌍 **Environments**: Gestión de múltiples entornos
- [ ] 📱 **PWA**: Aplicación web progresiva

## 🐛 Reportar Issues

Si encuentras algún problema o tienes sugerencias:
1. Ve a la sección **Issues**
2. Crea un **nuevo issue**
3. Describe el problema con detalle
4. Incluye pasos para reproducir

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [@tuusuario](https://github.com/tuusuario)

## 🙏 Agradecimientos

- **Vue.js Team** - Por el excelente framework
- **Vite Team** - Por la velocidad de desarrollo
- **DaisyUI** - Por los componentes hermosos
- **Tailwind CSS** - Por el sistema de diseño

---

⭐ **¡Dale una estrella si te gustó el proyecto!** ⭐

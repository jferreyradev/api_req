# 🚀 Guía de Deploy y Configuración HTTPS

## 🎯 Problema: Mixed Content en Deploy

Cuando despliegas tu aplicación en plataformas como **Netlify**, **Vercel**, **GitHub Pages**, etc., estas usan **HTTPS** automáticamente. Si tu aplicación intenta hacer peticiones a APIs que solo soportan **HTTP**, el navegador bloqueará estas peticiones por seguridad (Mixed Content Policy).

## ✅ Soluciones Implementadas

### 1. 🔍 Detección Automática
- La aplicación detecta automáticamente cuando hay un problema de Mixed Content
- Muestra una advertencia visual con sugerencias específicas

### 2. 🔄 Proxies CORS Integrados
La aplicación incluye tres tipos de proxy:

#### 🌐 AllOrigins (Recomendado para Producción)
```javascript
// URL original: http://api.ejemplo.com/data
// Con AllOrigins: https://api.allorigins.win/get?url=http://api.ejemplo.com/data
// La respuesta estará en: response.data.contents
```

#### 🛠️ CORS Anywhere (Solo Desarrollo)
```javascript
// URL original: http://api.ejemplo.com/data  
// Con CORS Anywhere: https://cors-anywhere.herokuapp.com/api.ejemplo.com/data
// Nota: Requiere activar en https://cors-anywhere.herokuapp.com/corsdemo
```

#### 📡 Proxy Local de Vite (Solo Desarrollo)
```javascript
// Configurado en vite.config.js
// URL original: https://jsonplaceholder.typicode.com/posts
// Con proxy local: http://localhost:5173/api-proxy/posts
```

### 3. ⚙️ Variables de Entorno
```env
# .env
VITE_CORS_PROXY_1=https://api.allorigins.win/get?url=
VITE_CORS_PROXY_2=https://cors-anywhere.herokuapp.com/
VITE_DEFAULT_API_URL=https://jsonplaceholder.typicode.com/posts/1
```

## 🚀 Configuración para Deploy

### 📦 Netlify
1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Variables de Entorno**:
   ```
   VITE_CORS_PROXY_1=https://api.allorigins.win/get?url=
   VITE_DEFAULT_API_URL=https://jsonplaceholder.typicode.com/posts/1
   ```

### 📦 Vercel
1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**: Igual que Netlify

### 📦 GitHub Pages
1. Usar GitHub Actions con el workflow de Vite
2. Configurar las variables en Repository Settings > Secrets

## 🔧 Configuración Avanzada

### HTTPS en Desarrollo (Opcional)
```javascript
// vite.config.js
export default defineConfig({
  server: {
    https: true, // Habilita HTTPS en desarrollo
    port: 5173
  }
})
```

### Proxy Personalizado
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/mi-api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mi-api/, '/api')
      }
    }
  }
})
```

## 📋 Checklist de Deploy

### ✅ Antes del Deploy
- [ ] Cambiar URLs HTTP a HTTPS cuando sea posible
- [ ] Configurar variables de entorno en la plataforma
- [ ] Probar en modo preview: `npm run preview`
- [ ] Verificar que no hay console.log en producción

### ✅ Después del Deploy
- [ ] Probar peticiones a APIs HTTPS (deberían funcionar normalmente)
- [ ] Probar peticiones a APIs HTTP (debería mostrar sugerencias de proxy)
- [ ] Verificar que los proxies funcionan correctamente
- [ ] Comprobar que no hay errores en la consola del navegador

## 🆘 Troubleshooting

### Error: "Mixed Content"
**Síntoma**: Las peticiones a HTTP fallan desde HTTPS
**Solución**: Usar uno de los proxies o cambiar la API a HTTPS

### Error: "CORS"
**Síntoma**: Error de CORS al hacer peticiones
**Solución**: Usar AllOrigins o configurar CORS en la API

### Error: "Failed to fetch"
**Síntoma**: La petición falla completamente
**Verificar**:
1. La URL es correcta
2. La API está funcionando
3. No hay problemas de red
4. Revisar Mixed Content

## 🌐 APIs Recomendadas para Testing

### ✅ HTTPS (Funcionan en deploy)
- `https://jsonplaceholder.typicode.com/posts`
- `https://httpbin.org/get`
- `https://api.github.com/users/octocat`
- `https://reqres.in/api/users`

### ⚠️ HTTP (Requieren proxy)
- `http://httpbin.org/get` → Usar proxy
- APIs locales sin HTTPS → Usar proxy o configurar HTTPS

## 📱 Ejemplo de Uso con AllOrigins

```javascript
// URL original (HTTP)
const originalUrl = 'http://api.ejemplo.com/data'

// Con AllOrigins (HTTPS)
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(originalUrl)}`

// La respuesta llegará como:
{
  "contents": "{ \"data\": \"aquí están los datos reales\" }",
  "status": {
    "url": "http://api.ejemplo.com/data",
    "content_type": "application/json",
    "http_code": 200,
    "response_time": 1.2
  }
}

// Para obtener los datos:
const realData = JSON.parse(response.contents)
```

---

## 🎉 ¡Tu aplicación ahora es compatible con HTTPS en producción!

Con estas configuraciones, tu API Tester funcionará perfectamente tanto en desarrollo (HTTP) como en producción (HTTPS).

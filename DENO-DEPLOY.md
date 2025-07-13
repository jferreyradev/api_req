# 🦕 Guía de Deploy en Deno Deploy

## 🎯 ¿Qué es Deno Deploy?

**Deno Deploy** es una plataforma de hosting moderna que ejecuta TypeScript y JavaScript de forma nativa, sin necesidad de Node.js. Es ideal para aplicaciones modernas como nuestro API Tester.

### ✅ Ventajas de Deno Deploy
- 🚀 **Deploy instantáneo** desde GitHub
- 🌍 **CDN global** automático
- 🆓 **Gratis** para proyectos personales
- ⚡ **Extremadamente rápido** (V8 isolates)
- 🔒 **HTTPS automático** con certificados SSL
- 🦕 **TypeScript nativo** sin configuración

## 🛠️ Configuración del Proyecto

### 📁 Archivos Necesarios

```
📦 Proyecto
├── server.ts              # 🦕 Servidor Deno con file serving
├── deno.json              # ⚙️ Configuración Deno
├── .env.production        # 🌍 Variables de producción
├── build-deno.sh          # 🔨 Script de build
├── .github/workflows/
│   └── deno-deploy.yml    # 🤖 CI/CD GitHub Actions
└── dist/                  # 📦 App Vue compilada (generada)
```

### 🔧 Scripts Disponibles

```bash
# Desarrollo con Vite (recomendado)
npm run dev

# Build para Deno Deploy
npm run build:deno

# Test servidor Deno localmente
npm run deno:dev

# Verificar sintaxis TypeScript
npm run deno:check
```

## 🚀 Deploy Manual (Método 1)

### Paso 1: Preparar el Proyecto
```bash
# 1. Build la aplicación Vue
npm run build

# 2. Verificar que funciona con Deno localmente
deno run --allow-net --allow-read server.ts
```

### Paso 2: Crear Proyecto en Deno Deploy
1. Ve a https://dash.deno.com/new
2. Conecta tu cuenta de GitHub
3. Selecciona tu repositorio `api_req`
4. Configura:
   - **Entrypoint**: `server.ts`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### Paso 3: Variables de Entorno
En el dashboard de Deno Deploy, añade:
```env
VITE_CORS_PROXY_1=https://api.allorigins.win/get?url=
VITE_DEFAULT_API_URL=https://jsonplaceholder.typicode.com/posts/1
ENVIRONMENT=production
```

### Paso 4: Deploy
- Haz push a tu repositorio
- Deno Deploy buildeará y desplegará automáticamente

## 🤖 Deploy Automático con GitHub Actions (Método 2)

### Configuración One-Time

1. **Crear proyecto en Deno Deploy**:
   - Ve a https://dash.deno.com/new
   - Crea un nuevo proyecto
   - **Anota el nombre del proyecto** (ej: `my-api-tester`)

2. **Configurar GitHub Actions**:
   - El archivo `.github/workflows/deno-deploy.yml` ya está configurado
   - **Cambia** la línea `project: "api-tester"` por tu nombre de proyecto

3. **Push y Deploy**:
   ```bash
   git add .
   git commit -m "🦕 Add Deno Deploy configuration"
   git push origin main
   ```

## 📊 Comparación de Plataformas

| Característica | Deno Deploy | Netlify | Vercel |
|---------------|-------------|---------|---------|
| **Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Velocidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Gratis** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **TypeScript** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Cold Start** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 🔧 Configuración Avanzada

### Headers de Seguridad
El servidor Deno incluye headers de seguridad automáticos:
```typescript
{
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block", 
  "Content-Security-Policy": "...",
  "Access-Control-Allow-Origin": "*"
}
```

### Cache de Assets
Los archivos estáticos se cachean automáticamente:
```typescript
// JS, CSS, imágenes: 1 año de cache
"Cache-Control": "public, max-age=31536000"
```

### SPA Routing
El servidor maneja automáticamente el routing de Vue Router:
- Todas las rutas desconocidas → `index.html`
- Perfect para aplicaciones SPA

## 🐛 Troubleshooting

### Error: "Module not found"
**Causa**: Deno no encuentra el módulo estándar
```bash
# Solución: Verificar la versión de std
deno check server.ts
```

### Error: "Permission denied"
**Causa**: Permisos insuficientes en Deno
```bash
# Solución: Añadir permisos necesarios
deno run --allow-net --allow-read server.ts
```

### Error: "Build failed"
**Causa**: El directorio `dist` no existe
```bash
# Solución: Build primero
npm run build
```

### Error: "404 en todas las rutas"
**Causa**: SPA routing no configurado
```bash
# Verificar que server.ts maneja 404 → index.html
```

## 📈 Optimizaciones de Rendimiento

### 1. Build Optimizado
```bash
# Build con análisis de bundle
npm run build:analyze
```

### 2. Preload de Assets Críticos
El `index.html` incluye preload automático de Vite

### 3. Compresión Gzip
Deno Deploy incluye compresión automática

### 4. CDN Global
Los assets se sirven desde la ubicación más cercana al usuario

## 🌍 URLs y Dominios

### URL Automática
Deno Deploy asigna una URL automática:
```
https://[project-name]-[random].deno.dev
```

### Dominio Personalizado
En el dashboard de Deno Deploy:
1. Ve a Settings → Domains
2. Añade tu dominio personalizado
3. Configura los DNS records

## 📊 Monitoring y Logs

### Logs en Vivo
```bash
# Ver logs en tiempo real
deno deploy logs [project-name]
```

### Métricas
- **Dashboard**: https://dash.deno.com/[project]
- **Analytics**: Requests, errors, response time
- **Usage**: CPU, memoria, bandwidth

## 🎉 Resultado Final

Tu API Tester estará disponible en:
- ✅ **URL rápida**: https://tu-proyecto.deno.dev
- ✅ **HTTPS automático**
- ✅ **CDN global**
- ✅ **Deploy en segundos**
- ✅ **Escalado automático**

## 🔗 Enlaces Útiles

- 📚 [Deno Deploy Docs](https://deno.com/deploy/docs)
- 🎯 [Dashboard](https://dash.deno.com)
- 💬 [Discord Support](https://discord.gg/deno)
- 🐛 [GitHub Issues](https://github.com/denoland/deploy_feedback)

---

## 🚀 ¡Tu API Tester está listo para el mundo!

Con Deno Deploy tienes una plataforma moderna, rápida y gratuita para compartir tu API Tester con el mundo.

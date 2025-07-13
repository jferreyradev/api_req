# 🦕 Deno Deploy - Resumen de Configuración

## ✅ Archivos Creados y Configurados

### 📁 Configuración de Deno
- ✅ `server.ts` - Servidor Deno con file serving y headers de seguridad
- ✅ `deno.json` - Configuración de proyecto Deno
- ✅ `.env.production` - Variables de entorno para producción
- ✅ `deno-deploy.json` - Configuración de deploy (generado automáticamente)

### 🤖 CI/CD
- ✅ `.github/workflows/deno-deploy.yml` - GitHub Actions para deploy automático
- ✅ `build-deno.sh` - Script de build y test local

### ⚙️ Configuración
- ✅ `vite.config.js` - Optimizado para build sin terser
- ✅ `package.json` - Scripts para Deno añadidos
- ✅ `.gitignore` - Actualizado para archivos de entorno

## 🚀 Cómo Desplegar

### Método 1: Deploy Manual (Más Simple)
1. Ve a https://dash.deno.com/new
2. Conecta tu repositorio GitHub
3. Configura:
   - **Project Name**: `api-tester` (o el nombre que prefieras)
   - **Entrypoint**: `server.ts`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
4. Deploy automático en cada push

### Método 2: GitHub Actions (Automático)
1. Edita `.github/workflows/deno-deploy.yml`
2. Cambia `project: "api-tester"` por tu nombre de proyecto
3. Push a GitHub:
   ```bash
   git add .
   git commit -m "🦕 Add Deno Deploy support"
   git push origin main
   ```

## 🔧 Variables de Entorno

Configura estas variables en el dashboard de Deno Deploy:
```env
VITE_CORS_PROXY_1=https://api.allorigins.win/get?url=
VITE_DEFAULT_API_URL=https://jsonplaceholder.typicode.com/posts/1
ENVIRONMENT=production
```

## 📊 Beneficios de Deno Deploy

### ⚡ Rendimiento
- **Cold Start**: ~10ms (vs ~100ms+ en otras plataformas)
- **CDN Global**: Edge computing automático
- **V8 Isolates**: Súper eficiente en memoria

### 🔒 Seguridad
- **Headers automáticos**: CSP, CORS, XSS protection
- **TypeScript nativo**: Sin transpilación necesaria
- **Sandboxing**: Permisos explícitos por defecto

### 💰 Costos
- **100% Gratis** para proyectos personales:
  - 100,000 requests/día
  - 10GB transfer/mes
  - Dominios personalizados incluidos

## 🌐 URL Final

Tu aplicación estará disponible en:
```
https://[project-name]-[random].deno.dev
```

Ejemplo:
```
https://api-tester-abc123.deno.dev
```

## 🎯 Características del Servidor

### 📁 File Serving
- Sirve archivos estáticos desde `/dist`
- Cache inteligente para assets (1 año)
- Fallback a `index.html` para SPA routing

### 🔒 Headers de Seguridad
```typescript
{
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "...",
  "Access-Control-Allow-Origin": "*"
}
```

### 🚀 CORS
- Habilitado para todas las origins
- Manejo de preflight requests
- Compatible con el API Tester

## 📋 Checklist Final

Antes del deploy, verifica:
- [ ] ✅ Build funciona: `npm run build`
- [ ] ✅ Directorio `dist` se genera correctamente
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ `server.ts` sin errores: `deno check server.ts`
- [ ] ✅ GitHub repository conectado (si usas GitHub Actions)

## 🐛 Troubleshooting

### Error: "Build failed"
```bash
# Limpiar y rebuildar
rm -rf dist node_modules
npm install
npm run build
```

### Error: "Module not found"
```bash
# Verificar sintaxis Deno
deno check server.ts
```

### Error: "Permission denied"
```bash
# En local, usar permisos explícitos
deno run --allow-net --allow-read server.ts
```

---

## 🎉 ¡Tu API Tester está listo para Deno Deploy!

Con esta configuración tienes:
- ✅ **Deploy automático** desde GitHub
- ✅ **HTTPS nativo** con certificados SSL
- ✅ **CDN global** para máxima velocidad
- ✅ **TypeScript nativo** sin configuración
- ✅ **100% compatible** con todas las funcionalidades del API Tester

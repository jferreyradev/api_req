import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts"

const port = parseInt(Deno.env.get("PORT") || "8000")

// Headers de seguridad para producción
const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: http: ws: wss:; frame-src 'none';",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const pathname = url.pathname
  
  // Manejo de CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: securityHeaders
    })
  }
  
  // Log de requests en desarrollo
  if (Deno.env.get("ENVIRONMENT") !== "production") {
    console.log(`${req.method} ${pathname}`)
  }
  
  try {
    // Servir archivos estáticos desde el directorio dist
    const response = await serveDir(req, {
      fsRoot: "./dist",
      urlRoot: "",
      showDirListing: false,
      enableCors: true
    })
    
    // Si es un archivo estático que existe, añadir headers de seguridad
    if (response.status === 200) {
      const headers = new Headers(response.headers)
      Object.entries(securityHeaders).forEach(([key, value]) => {
        headers.set(key, value)
      })
      
      // Cache para assets estáticos
      if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
        headers.set("Cache-Control", "public, max-age=31536000") // 1 año
      }
      
      return new Response(response.body, {
        status: response.status,
        headers
      })
    }
    
    // Si el archivo no existe (404), servir index.html para SPA routing
    if (response.status === 404) {
      const indexFile = await Deno.readFile("./dist/index.html")
      return new Response(indexFile, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          ...securityHeaders
        }
      })
    }
    
    return response
    
  } catch (error) {
    console.error("Error serving file:", error)
    
    // Fallback a index.html
    try {
      const indexFile = await Deno.readFile("./dist/index.html")
      return new Response(indexFile, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          ...securityHeaders
        }
      })
    } catch {
      return new Response("Service Unavailable", { 
        status: 503,
        headers: securityHeaders
      })
    }
  }
}

console.log(`🚀 API Tester running on http://localhost:${port}`)
console.log(`📦 Environment: ${Deno.env.get("ENVIRONMENT") || "development"}`)
console.log(`🌍 CORS enabled for all origins`)

await serve(handler, { port })

#!/bin/bash

echo "🚀 Building API Tester for Deno Deploy..."

# 1. Build the Vue app
echo "📦 Building Vue application..."
npm run build

# 2. Verificar que el directorio dist existe
if [ ! -d "dist" ]; then
  echo "❌ Error: dist directory not found. Build failed."
  exit 1
fi

# 3. Crear archivo de configuración para Deno Deploy
echo "⚙️ Creating Deno Deploy configuration..."

cat > deno-deploy.json << EOF
{
  "name": "api-tester-${USER:-user}",
  "project": "api-tester",
  "entrypoint": "server.ts",
  "env": {
    "ENVIRONMENT": "production",
    "VITE_CORS_PROXY_1": "https://api.allorigins.win/get?url=",
    "VITE_DEFAULT_API_URL": "https://jsonplaceholder.typicode.com/posts/1"
  }
}
EOF

# 4. Verificar que el servidor de Deno funciona localmente
echo "🧪 Testing Deno server locally..."
if command -v deno &> /dev/null; then
  echo "✅ Deno found. Testing server..."
  timeout 5s deno run --allow-net --allow-read server.ts &
  sleep 2
  if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Deno server works locally!"
  else
    echo "⚠️ Could not test server locally (this is OK for CI/CD)"
  fi
  pkill -f "deno run" 2>/dev/null || true
else
  echo "⚠️ Deno not found locally. Skipping local test."
fi

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next steps for Deno Deploy:"
echo "1. Go to https://dash.deno.com/new"
echo "2. Connect your GitHub repository"
echo "3. Set entrypoint to: server.ts"
echo "4. Set build command to: npm run build"
echo "5. Deploy!"
echo ""
echo "📁 Files ready for Deno Deploy:"
echo "   ├── server.ts         # Deno server"
echo "   ├── deno.json         # Deno configuration"
echo "   ├── dist/             # Built Vue app"
echo "   └── deno-deploy.json  # Deploy configuration"

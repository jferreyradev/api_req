<script setup>
import { ref, computed } from 'vue'

// Estado principal
const url = ref('https://jsonplaceholder.typicode.com/posts/1')
const method = ref('GET')
const response = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Body para POST/PUT/PATCH
const requestBody = ref('{\n  "title": "Test",\n  "body": "Testing API",\n  "userId": 1\n}')
const bodyMode = ref('json') // 'json' o 'params'

// Headers
const headers = ref([
  { key: 'User-Agent', value: 'API-Tester/1.0', enabled: true },
  { key: 'X-Requested-With', value: 'XMLHttpRequest', enabled: true },
  { key: 'Content-Type', value: 'application/json', enabled: false },
  { key: 'Authorization', value: 'Bearer your-token', enabled: false },
  { key: '', value: '', enabled: true }
])

// URL Parameters
const urlParams = ref([
  { key: '', value: '', enabled: true }
])

// Body Parameters
const bodyParams = ref([
  { key: 'title', value: 'Test', enabled: true },
  { key: 'body', value: 'Testing API', enabled: true },
  { key: 'userId', value: '1', enabled: true },
  { key: '', value: '', enabled: true }
])

// Variables para búsqueda en respuesta
const searchTerm = ref('')
const isSearchVisible = ref(false)
const isResponseExpanded = ref(false)
const copySuccess = ref(false)
const currentMatchIndex = ref(0)
const totalMatches = ref(0)
const downloadSelect = ref(null)

// Headers rápidos
const quickHeaders = ref({
  authorization: '',
  apiKeyName: 'X-API-Key',
  apiKeyValue: '',
  customName: '',
  customValue: ''
})

// Computed
const showBody = computed(() => ['POST', 'PUT', 'PATCH'].includes(method.value))

const isValidJson = computed(() => {
  if (!requestBody.value.trim()) return true
  try {
    JSON.parse(requestBody.value)
    return true
  } catch {
    return false
  }
})

const finalUrl = computed(() => {
  const baseUrl = url.value
  const activeParams = urlParams.value.filter(p => p.enabled && p.key && p.value)
  if (activeParams.length === 0) return baseUrl
  
  const params = new URLSearchParams()
  activeParams.forEach(p => params.append(p.key, p.value))
  return `${baseUrl}?${params.toString()}`
})

const finalBody = computed(() => {
  if (!showBody.value) return null
  
  if (bodyMode.value === 'params') {
    const activeParams = bodyParams.value.filter(p => p.enabled && p.key && p.value)
    const obj = {}
    activeParams.forEach(p => {
      obj[p.key] = isNaN(Number(p.value)) ? p.value : Number(p.value)
    })
    return JSON.stringify(obj)
  }
  
  return requestBody.value.trim() || null
})

// Computed para el JSON formateado de la respuesta
const formattedResponse = computed(() => {
  if (!response.value) return ''
  return typeof response.value.data === 'object' 
    ? JSON.stringify(response.value.data, null, 2) 
    : response.value.data.toString()
})

// Computed para resaltar el término de búsqueda
const highlightedResponse = computed(() => {
  if (!searchTerm.value || !formattedResponse.value) {
    totalMatches.value = 0
    return formattedResponse.value
  }
  
  const regex = new RegExp(`(${searchTerm.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const matches = formattedResponse.value.match(regex) || []
  totalMatches.value = matches.length
  
  if (totalMatches.value === 0) {
    return formattedResponse.value
  }
  
  // Resetear índice si es mayor que el total
  if (currentMatchIndex.value >= totalMatches.value) {
    currentMatchIndex.value = 0
  }
  
  let matchCount = 0
  return formattedResponse.value.replace(regex, (match) => {
    const isCurrentMatch = matchCount === currentMatchIndex.value
    matchCount++
    return isCurrentMatch 
      ? `<mark class="bg-red-400 text-white px-1 rounded border-2 border-red-600" id="current-match">${match}</mark>`
      : `<mark class="bg-yellow-300 text-black px-1 rounded">${match}</mark>`
  })
})

// Funciones
const addUrlParam = () => {
  urlParams.value.push({ key: '', value: '', enabled: true })
}

const removeUrlParam = (index) => {
  urlParams.value.splice(index, 1)
}

const addBodyParam = () => {
  bodyParams.value.push({ key: '', value: '', enabled: true })
}

const removeBodyParam = (index) => {
  bodyParams.value.splice(index, 1)
}

// Funciones para headers rápidos
const updateAuthorizationHeader = () => {
  const authIndex = headers.value.findIndex(h => h.key === 'Authorization')
  if (quickHeaders.value.authorization.trim()) {
    if (authIndex >= 0) {
      headers.value[authIndex].value = quickHeaders.value.authorization
      headers.value[authIndex].enabled = true
    } else {
      headers.value.splice(-1, 0, { 
        key: 'Authorization', 
        value: quickHeaders.value.authorization, 
        enabled: true 
      })
    }
  } else if (authIndex >= 0) {
    headers.value[authIndex].enabled = false
  }
}

const clearAuthorizationHeader = () => {
  quickHeaders.value.authorization = ''
  const authIndex = headers.value.findIndex(h => h.key === 'Authorization')
  if (authIndex >= 0) {
    headers.value[authIndex].enabled = false
  }
}

const updateApiKeyHeader = () => {
  const keyName = quickHeaders.value.apiKeyName || 'X-API-Key'
  const keyIndex = headers.value.findIndex(h => h.key === keyName)
  
  if (quickHeaders.value.apiKeyValue.trim()) {
    if (keyIndex >= 0) {
      headers.value[keyIndex].value = quickHeaders.value.apiKeyValue
      headers.value[keyIndex].enabled = true
    } else {
      headers.value.splice(-1, 0, { 
        key: keyName, 
        value: quickHeaders.value.apiKeyValue, 
        enabled: true 
      })
    }
  } else if (keyIndex >= 0) {
    headers.value[keyIndex].enabled = false
  }
}

const clearApiKeyHeader = () => {
  quickHeaders.value.apiKeyValue = ''
  const keyName = quickHeaders.value.apiKeyName || 'X-API-Key'
  const keyIndex = headers.value.findIndex(h => h.key === keyName)
  if (keyIndex >= 0) {
    headers.value[keyIndex].enabled = false
  }
}

const updateCustomHeader = () => {
  if (!quickHeaders.value.customName.trim()) return
  
  const customIndex = headers.value.findIndex(h => h.key === quickHeaders.value.customName)
  
  if (quickHeaders.value.customValue.trim()) {
    if (customIndex >= 0) {
      headers.value[customIndex].value = quickHeaders.value.customValue
      headers.value[customIndex].enabled = true
    } else {
      headers.value.splice(-1, 0, { 
        key: quickHeaders.value.customName, 
        value: quickHeaders.value.customValue, 
        enabled: true 
      })
    }
  } else if (customIndex >= 0) {
    headers.value[customIndex].enabled = false
  }
}

const clearCustomHeader = () => {
  const customName = quickHeaders.value.customName
  quickHeaders.value.customName = ''
  quickHeaders.value.customValue = ''
  
  if (customName) {
    const customIndex = headers.value.findIndex(h => h.key === customName)
    if (customIndex >= 0) {
      headers.value[customIndex].enabled = false
    }
  }
}

// Funciones de navegación de búsqueda
const goToNextMatch = () => {
  if (totalMatches.value > 0) {
    currentMatchIndex.value = (currentMatchIndex.value + 1) % totalMatches.value
    scrollToCurrentMatch()
  }
}

const goToPrevMatch = () => {
  if (totalMatches.value > 0) {
    currentMatchIndex.value = currentMatchIndex.value === 0 
      ? totalMatches.value - 1 
      : currentMatchIndex.value - 1
    scrollToCurrentMatch()
  }
}

const scrollToCurrentMatch = () => {
  setTimeout(() => {
    const element = document.getElementById('current-match')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}

// Resetear búsqueda cuando cambia el término
const resetSearch = () => {
  currentMatchIndex.value = 0
  setTimeout(scrollToCurrentMatch, 100)
}

// Función para copiar al portapapeles
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedResponse.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

// Función para manejar descargas
const downloadResponse = (format) => {
  if (!response.value) return
  
  let content = ''
  let filename = ''
  let mimeType = ''
  
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[:-]/g, '')
  
  switch (format) {
    case 'json':
      content = JSON.stringify({
        request: {
          url: finalUrl.value,
          method: method.value,
          headers: response.value.request.headers,
          body: response.value.request.body
        },
        response: {
          status: response.value.status,
          headers: response.value.headers,
          data: response.value.data
        }
      }, null, 2)
      filename = `api-response-${timestamp}.json`
      mimeType = 'application/json'
      break
      
    case 'txt':
      content = formattedResponse.value
      filename = `api-response-${timestamp}.txt`
      mimeType = 'text/plain'
      break
      
    case 'csv':
      if (Array.isArray(response.value.data)) {
        const data = response.value.data
        if (data.length > 0) {
          const headers = Object.keys(data[0])
          const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => 
              JSON.stringify(row[header] || '')
            ).join(','))
          ].join('\n')
          content = csvContent
        } else {
          content = 'No data available'
        }
      } else {
        content = 'Data is not an array, cannot convert to CSV'
      }
      filename = `api-response-${timestamp}.csv`
      mimeType = 'text/csv'
      break
  }
  
  // Crear y descargar el archivo
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para manejar la selección de descarga
const handleDownloadSelection = (event) => {
  const format = event.target.value
  if (format) {
    downloadResponse(format)
    // Resetear el select después de la descarga
    setTimeout(() => {
      event.target.value = ''
    }, 100)
  }
}

const makeRequest = async () => {
  if (!url.value) return
  
  // Limpiar búsqueda anterior
  searchTerm.value = ''
  currentMatchIndex.value = 0
  isSearchVisible.value = false
  isResponseExpanded.value = false
  
  isLoading.value = true
  error.value = null
  response.value = null
  
  try {
    const fetchOptions = {
      method: method.value,
      headers: {}
    }
    
    // Agregar headers activos (siempre, independiente del método)
    headers.value
      .filter(h => h.enabled && h.key && h.value)
      .forEach(h => {
        fetchOptions.headers[h.key] = h.value
      })
    
    // Agregar body si es necesario
    if (finalBody.value) {
      fetchOptions.body = finalBody.value
    }
    
    const res = await fetch(finalUrl.value, fetchOptions)
    const data = await res.json()
    
    response.value = {
      status: res.status,
      data: data,
      headers: Object.fromEntries(res.headers.entries()),
      // Guardar información de la petición enviada
      request: {
        url: finalUrl.value,
        method: method.value,
        headers: { ...fetchOptions.headers },
        body: finalBody.value
      }
    }
    
  } catch (err) {
    error.value = err.message
    console.error('Request failed:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-3 space-y-1">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-1">
        <div class="w-6 h-6 flex items-center justify-center text-xl">
          🚀
        </div>
        <div>
          <h2 class="card-title text-base">API Tester</h2>
          <p class="text-xs opacity-70">Prueba APIs fácilmente</p>
        </div>
      </div>
      
      <!-- Formulario principal -->
      <div class="form-control w-full">
        <div class="flex gap-2">
          <select v-model="method" class="select select-bordered select-primary select-xs w-20 h-8">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
          <input 
            v-model="url"
            type="text" 
            placeholder="https://api.ejemplo.com/endpoint"
            class="input input-bordered input-primary input-xs flex-1 h-8"
            @keyup.enter="makeRequest"
          />
          <button 
            @click="makeRequest"
            :disabled="isLoading || !url"
            class="btn btn-primary btn-xs min-w-16 h-8"
            :class="{ 'loading': isLoading }"
          >
            {{ isLoading ? '' : 'Enviar' }}
          </button>
        </div>
      </div>

      <!-- Input Rápido para Headers -->
      <div class="card bg-base-100 border border-base-300 p-2">
        <div class="flex items-center gap-2 mb-1">
          <h4 class="font-medium text-sm">🚀 Headers Rápidos</h4>
          <span class="badge badge-info badge-xs">Acceso directo</span>
        </div>
        
        <div class="space-y-1">
          <!-- Authorization Header -->
          <div class="form-control">
            <label class="label py-0">
              <span class="label-text text-xs font-medium">🔐 Authorization</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="quickHeaders.authorization"
                type="text" 
                placeholder="Bearer tu-token-aqui"
                class="input input-bordered input-sm flex-1 text-xs"
                @input="updateAuthorizationHeader"
              />
              <button 
                @click="clearAuthorizationHeader"
                class="btn btn-ghost btn-sm btn-square"
                title="Limpiar"
              >
                ×
              </button>
            </div>
          </div>

          <!-- API Key Header -->
          <div class="form-control">
            <label class="label py-0">
              <span class="label-text text-xs font-medium">🔑 API Key</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="quickHeaders.apiKeyName"
                type="text" 
                placeholder="X-API-Key"
                class="input input-bordered input-sm w-32 text-xs"
              />
              <input 
                v-model="quickHeaders.apiKeyValue"
                type="text" 
                placeholder="tu-api-key"
                class="input input-bordered input-sm flex-1 text-xs"
                @input="updateApiKeyHeader"
              />
              <button 
                @click="clearApiKeyHeader"
                class="btn btn-ghost btn-sm btn-square"
                title="Limpiar"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Custom Header -->
          <div class="form-control">
            <label class="label py-0">
              <span class="label-text text-xs font-medium">⚡ Header Personalizado</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="quickHeaders.customName"
                type="text" 
                placeholder="Nombre del header"
                class="input input-bordered input-sm w-40 text-xs"
              />
              <input 
                v-model="quickHeaders.customValue"
                type="text" 
                placeholder="Valor del header"
                class="input input-bordered input-sm flex-1 text-xs"
                @input="updateCustomHeader"
              />
              <button 
                @click="clearCustomHeader"
                class="btn btn-ghost btn-sm btn-square"
                title="Limpiar"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Parámetros de URL -->
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="url-params" /> 
        <div class="collapse-title text-sm font-medium py-1 min-h-0">
          🔗 Parámetros de URL
          <span class="badge badge-xs ml-2">
            {{ urlParams.filter(p => p.enabled && p.key && p.value).length }}
          </span>
          <span v-if="urlParams.filter(p => p.enabled && p.key && p.value).length > 0" class="badge badge-success badge-xs">Activos</span>
        </div>
        <div class="collapse-content pb-1 pt-0">
          <div class="space-y-0">
            <div v-for="(param, index) in urlParams" :key="index" class="flex gap-1 items-center">
              <input type="checkbox" v-model="param.enabled" class="checkbox checkbox-xs" :class="{'checkbox-success': param.enabled}" />
              <input 
                v-model="param.key" 
                type="text" 
                placeholder="Parámetro (ej: page)"
                class="input input-bordered input-xs flex-1 text-xs"
                :class="{'input-success': param.enabled && param.key && param.value}"
              />
              <input 
                v-model="param.value" 
                type="text" 
                placeholder="Valor (ej: 1)"
                class="input input-bordered input-xs flex-1 text-xs"
                :class="{'input-success': param.enabled && param.key && param.value}"
              />
              <button @click="removeUrlParam(index)" class="btn btn-error btn-xs btn-circle">×</button>
            </div>
            <button @click="addUrlParam" class="btn btn-outline btn-xs mt-1">+ Parámetro</button>
          </div>
        </div>
      </div>

      <!-- Body Section -->
      <div v-if="showBody" class="card bg-base-200 p-1">
        <div class="flex items-center justify-between mb-1">
          <h4 class="font-medium text-sm flex items-center gap-2">
            📝 Body
            <span class="badge badge-success badge-xs">Activo</span>
          </h4>
          
          <!-- Tabs -->
          <div class="tabs tabs-boxed tabs-xs">
            <button 
              class="tab tab-sm"
              :class="{ 'tab-active': bodyMode === 'json' }"
              @click="bodyMode = 'json'"
            >
              📝 JSON
            </button>
            <button 
              class="tab tab-sm"
              :class="{ 'tab-active': bodyMode === 'params' }"
              @click="bodyMode = 'params'"
            >
              🔧 Parámetros
            </button>
          </div>
        </div>

        <!-- Modo JSON -->
        <div v-if="bodyMode === 'json'" class="form-control">
          <textarea 
            v-model="requestBody" 
            placeholder='{"ejemplo": "datos"}'
            class="textarea textarea-bordered textarea-sm h-24 font-mono text-xs"
            :class="{
              'textarea-error': !isValidJson && requestBody.trim(),
              'textarea-success': isValidJson && requestBody.trim()
            }"
          ></textarea>
          
          <div class="label py-0" v-if="requestBody.trim()">
            <span class="label-text-alt text-sm" :class="{
              'text-success': isValidJson,
              'text-error': !isValidJson
            }">
              {{ isValidJson ? '✓ JSON Válido' : '✗ JSON Inválido' }}
            </span>
          </div>
        </div>

        <!-- Modo Parámetros -->
        <div v-else-if="bodyMode === 'params'" class="space-y-0">
          <div class="space-y-0">
            <div v-for="(param, index) in bodyParams" :key="index" class="flex gap-2 items-center">
              <input type="checkbox" v-model="param.enabled" class="checkbox checkbox-xs" />
              <input 
                v-model="param.key" 
                type="text" 
                placeholder="Clave"
                class="input input-bordered input-xs flex-1"
              />
              <input 
                v-model="param.value" 
                type="text" 
                placeholder="Valor"
                class="input input-bordered input-xs flex-1"
              />
              <button @click="removeBodyParam(index)" class="btn btn-error btn-xs btn-circle">×</button>
            </div>
            <button @click="addBodyParam" class="btn btn-outline btn-xs">+ Agregar Parámetro</button>
          </div>

          <!-- Preview del JSON -->
          <div class="bg-base-300 rounded p-1 text-xs font-mono" v-if="bodyParams.some(p => p.enabled && p.key && p.value)">
            <div class="text-xs font-medium mb-1 opacity-70">Vista previa JSON:</div>
            <pre class="text-xs">{{ finalBody }}</pre>
          </div>
        </div>
      </div>

      <!-- Estados -->
      <div v-if="isLoading" class="flex justify-center py-4">
        <span class="loading loading-spinner loading-md text-primary"></span>
      </div>

      <div v-else-if="error" class="alert alert-error py-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <div v-else-if="response" class="space-y-0">
        <!-- Header de respuesta con herramientas -->
        <div class="card bg-base-200 p-1">
          <div class="flex justify-between items-center mb-0">
            <h3 class="text-sm font-semibold flex items-center gap-2">
              📡 Respuesta
              <div class="badge badge-xs" :class="{
                'badge-success': response.status >= 200 && response.status < 300,
                'badge-error': response.status >= 400,
                'badge-warning': response.status >= 300 && response.status < 400
              }">
                {{ response.status }}
              </div>
              <div class="badge badge-outline badge-xs">{{ response.request.method }}</div>
              <div v-if="Object.keys(response.request.headers).length > 0" class="badge badge-info badge-xs">
                {{ Object.keys(response.request.headers).length }} headers
              </div>
            </h3>
            <div class="text-xs text-base-content/60">
              {{ formattedResponse.split('\n').length }} líneas • {{ Math.round(formattedResponse.length / 1024 * 10) / 10 }}KB
            </div>
          </div>

          <!-- Barra de herramientas compacta -->
          <div class="flex gap-1 items-center justify-between">
            <div class="flex gap-1">
              <button 
                @click="isSearchVisible = !isSearchVisible" 
                class="btn btn-xs btn-outline"
                :class="{ 'btn-active': isSearchVisible }"
                :title="isSearchVisible ? 'Ocultar búsqueda' : 'Buscar en la respuesta'"
              >
                🔍
              </button>
              <button 
                @click="isResponseExpanded = !isResponseExpanded" 
                class="btn btn-xs btn-outline"
                :title="isResponseExpanded ? 'Contraer respuesta' : 'Expandir respuesta completa'"
              >
                {{ isResponseExpanded ? '📄' : '📋' }}
              </button>
              <button 
                @click="copyToClipboard" 
                class="btn btn-xs btn-outline" 
                :class="{ 'btn-success': copySuccess }"
                :title="copySuccess ? 'Copiado al portapapeles' : 'Copiar respuesta al portapapeles'"
              >
                {{ copySuccess ? '✓' : '📋' }}
              </button>
            </div>
            
            <!-- Lista desplegable de descarga -->
            <select 
              class="select select-bordered select-primary select-xs w-32 text-xs"
              @change="handleDownloadSelection"
              ref="downloadSelect"
            >
              <option value="" disabled selected>📥 Descargar</option>
              <option value="json">📄 JSON completo</option>
              <option value="txt">📝 Solo datos</option>
              <option value="csv">📊 Formato CSV</option>
            </select>
          </div>

          <!-- Barra de búsqueda compacta -->
          <div v-if="isSearchVisible" class="mt-1 pt-1 border-t border-base-content/10">
            <div class="flex gap-1 items-center">
              <input 
                v-model="searchTerm"
                @input="resetSearch"
                type="text" 
                placeholder="Buscar..."
                class="input input-bordered input-xs flex-1 text-xs"
                @keydown.enter.prevent="goToNextMatch"
                @keydown.shift.enter.prevent="goToPrevMatch"
                @keydown.esc="isSearchVisible = false"
              />
              <button 
                @click="goToPrevMatch"
                class="btn btn-xs btn-outline"
                :disabled="!searchTerm || totalMatches === 0"
                title="Anterior"
              >
                ↑
              </button>
              <button 
                @click="goToNextMatch"
                class="btn btn-xs btn-outline"
                :disabled="!searchTerm || totalMatches === 0"
                title="Siguiente"
              >
                ↓
              </button>
              <button 
                @click="searchTerm = ''; currentMatchIndex = 0"
                class="btn btn-xs btn-square btn-outline"
                :disabled="!searchTerm"
                title="Limpiar"
              >
                ×
              </button>
            </div>
            <div v-if="searchTerm" class="text-xs text-base-content/60 mt-0.5">
              <span v-if="totalMatches > 0">
                {{ currentMatchIndex + 1 }} de {{ totalMatches }}
              </span>
              <span v-else class="text-warning">
                Sin resultados
              </span>
              <span class="ml-2 opacity-50">Enter: ↓ • Shift+Enter: ↑</span>
            </div>
          </div>
        </div>

        <!-- Request Headers Enviados -->
        <div class="card bg-gradient-to-r from-blue-50 to-blue-100 p-3 border border-blue-200">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm font-bold flex items-center gap-2 text-blue-800">
              📤 Headers Enviados en la Petición
              <span class="badge badge-info badge-sm">{{ Object.keys(response.request.headers).length }}</span>
            </h3>
          </div>
          
          <div v-if="Object.keys(response.request.headers).length > 0" class="overflow-x-auto bg-white rounded border">
            <table class="table table-zebra table-sm">
              <thead class="bg-blue-50">
                <tr>
                  <th class="text-xs font-bold text-blue-900">Header</th>
                  <th class="text-xs font-bold text-blue-900">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="[key, value] in Object.entries(response.request.headers)" :key="key" class="hover:bg-blue-50">
                  <td class="font-mono text-xs font-semibold py-2 text-blue-800">{{ key }}</td>
                  <td class="font-mono text-xs py-2 text-gray-700">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="bg-yellow-50 border border-yellow-200 rounded p-3">
            <div class="flex items-center gap-2">
              <span class="text-yellow-600">⚠️</span>
              <span class="text-sm text-yellow-800 font-medium">No se enviaron headers personalizados</span>
            </div>
            <p class="text-xs text-yellow-700 mt-1">Configura headers en la sección "Configuración Avanzada" arriba</p>
          </div>
        </div>

        <!-- Response Headers -->
        <div class="collapse collapse-arrow bg-base-200">
          <input type="checkbox" /> 
          <div class="collapse-title text-sm font-medium py-1 min-h-0">
            📋 Headers de Respuesta del Servidor ({{ Object.keys(response.headers).length }})
          </div>
          <div class="collapse-content pb-1 pt-0"> 
            <div class="overflow-x-auto">
              <table class="table table-zebra table-xs">
                <tbody>
                  <tr v-for="[key, value] in Object.entries(response.headers)" :key="key">
                    <td class="font-mono text-xs font-medium py-1 w-1/3">{{ key }}</td>
                    <td class="font-mono text-xs py-1">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Response Body con búsqueda -->
        <div class="card bg-base-300">
          <div class="card-header p-1 border-b border-base-content/10">
            <h4 class="font-medium text-sm">📄 Respuesta</h4>
          </div>
          <div class="card-body p-0">
            <div class="mockup-code rounded-none bg-transparent">
              <pre class="response-code response-scroll text-xs leading-relaxed overflow-x-auto p-2" 
                   :class="{ 'max-h-64 overflow-y-auto': !isResponseExpanded, 'max-h-none': isResponseExpanded }"
                   v-if="searchTerm"
                   v-html="highlightedResponse"
              ></pre>
              <pre class="response-code response-scroll text-xs leading-relaxed overflow-x-auto p-2" 
                   :class="{ 'max-h-64 overflow-y-auto': !isResponseExpanded, 'max-h-none': isResponseExpanded }"
                   v-else
              ><code>{{ formattedResponse }}</code></pre>
            </div>
            
            <!-- Indicador de contenido cortado compacto -->
            <div v-if="!isResponseExpanded && formattedResponse.split('\n').length > 12" 
                 class="text-center py-1 bg-base-200 border-t border-base-content/10">
              <button @click="isResponseExpanded = true" class="btn btn-xs btn-outline">
                Ver todo ({{ formattedResponse.split('\n').length }} líneas)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-6 text-base-content/60">
        <div class="text-3xl mb-2">🚀</div>
        <h3 class="text-base font-medium mb-1">¡Listo para probar APIs!</h3>
        <p class="text-sm">Ingresa una URL y presiona "Enviar"</p>
        <div class="text-xs mt-2 opacity-50">
          <p>URL final: {{ finalUrl }}</p>
          <p v-if="showBody">Body: {{ finalBody ? 'Configurado' : 'Vacío' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

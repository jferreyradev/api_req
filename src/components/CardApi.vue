<script setup>
import { ref } from 'vue'
import { useApiClient } from '../composables/useApiClient.js'
import { useApiForm } from '../composables/useApiForm.js'

// Usar los composables
const { response, isLoading, error, makeRequest: apiMakeRequest, downloadResponse } = useApiClient()
const { 
  url, 
  method, 
  activeTab, 
  requestBody, 
  isValidJson, 
  headers,
  addHeader,
  removeHeader,
  setExamplePost,
  setExampleUpdate,
  clearBody,
  formatJson,
  getRequestConfig
} = useApiForm()

const makeRequest = async () => {
  if (!url.value) return
  
  // Validar JSON si hay body y el método lo requiere
  if (['POST', 'PUT', 'PATCH'].includes(method.value) && requestBody.value.trim()) {
    if (!isValidJson.value) {
      error.value = 'El JSON del body no es válido. Por favor, corrige la sintaxis.'
      return
    }
  }
  
  try {
    const requestConfig = getRequestConfig()
    await apiMakeRequest(requestConfig)
  } catch (err) {
    // El error ya se maneja en el composable
    console.error('Error en la petición:', err)
  }
}
</script>

<template>
    <div class="card-md card-border bg-base-100">
  <div class="card-body">
      <h2 class="card-title">API Query Card</h2>
      
      <!-- Input y botón para consulta -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">API URL</span>
        </label>
        <div class="flex gap-2 mb-4">
          <select v-model="method" class="select select-bordered w-32">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
          
          <input 
            v-model="url"
            type="text" 
            placeholder="Ingresa la URL de la API"
            class="input input-bordered flex-1"
            @keyup.enter="makeRequest"
          />
          
          <button 
            @click="makeRequest"
            :disabled="isLoading || !url"
            class="btn btn-primary"
            :class="{ 'loading': isLoading }"
          >
            <span v-if="!isLoading">Consultar</span>
            <span v-else>Cargando...</span>
          </button>
        </div>

        <!-- Tabs para Headers y Body -->
        <div class="tabs tabs-bordered mb-4">
          <a 
            @click="activeTab = 'headers'" 
            class="tab"
            :class="{ 'tab-active': activeTab === 'headers' }"
          >
            Headers ({{ headers.filter(h => h.enabled && h.key && h.value).length }})
          </a>
          <a 
            v-if="['POST', 'PUT', 'PATCH'].includes(method)"
            @click="activeTab = 'body'" 
            class="tab"
            :class="{ 'tab-active': activeTab === 'body' }"
          >
            Body
          </a>
        </div>

        <!-- Content de Headers -->
        <div v-if="activeTab === 'headers'" class="space-y-3">
          <div v-for="(header, index) in headers" :key="index" class="flex gap-2 items-center">
            <input type="checkbox" v-model="header.enabled" class="checkbox checkbox-sm" />
            <input 
              v-model="header.key" 
              type="text" 
              placeholder="Header name"
              class="input input-bordered input-sm flex-1"
            />
            <input 
              v-model="header.value" 
              type="text" 
              placeholder="Header value"
              class="input input-bordered input-sm flex-1"
            />
            <button @click="removeHeader(index)" class="btn btn-error btn-sm btn-square">
              ×
            </button>
          </div>
          <button @click="addHeader" class="btn btn-outline btn-sm">
            + Agregar Header
          </button>
        </div>

        <!-- Content de Body -->
        <div v-if="activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(method)" class="space-y-3">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Request Body</span>
              <span class="label-text-alt">JSON format</span>
            </label>
            <textarea 
              v-model="requestBody" 
              placeholder='{\n  "key": "value",\n  "example": "data"\n}'
              class="textarea textarea-bordered h-40 font-mono text-sm"
              :class="{
                'textarea-error': !isValidJson,
                'textarea-success': isValidJson && requestBody.trim()
              }"
            ></textarea>
            <label class="label">
              <span class="label-text-alt" v-if="isValidJson && requestBody.trim()">
                <span class="text-success">✓</span> JSON válido - será enviado en el body de la petición
              </span>
              <span class="label-text-alt text-error" v-else-if="!isValidJson">
                <span class="text-error">✗</span> JSON inválido - revisa la sintaxis
              </span>
              <span class="label-text-alt" v-else>
                Ingresa el JSON que quieres enviar en el body
              </span>
            </label>
          </div>
          
          <!-- Botones de control -->
          <div class="flex gap-2 flex-wrap justify-between">
            <div class="flex gap-2 flex-wrap">
              <button 
                @click="setExamplePost"
                class="btn btn-outline btn-xs"
              >
                📝 Ejemplo Post
              </button>
              <button 
                @click="setExampleUpdate"
                class="btn btn-outline btn-xs"
              >
                ✏️ Ejemplo Update
              </button>
              <button 
                @click="clearBody"
                class="btn btn-outline btn-xs"
              >
                🗑️ Limpiar
              </button>
            </div>
            <div class="flex gap-2">
              <button 
                @click="formatJson"
                :disabled="!isValidJson || !requestBody.trim()"
                class="btn btn-primary btn-xs"
              >
                🎨 Formatear
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Área de resultados -->
      <div class="mt-4">
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {{ error }}</span>
        </div>

        <!-- Success state -->
        <div v-else-if="response" class="space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Resultado:</h3>
            <div class="flex gap-2 items-center">
              <div class="badge" :class="{
                'badge-success': response.status >= 200 && response.status < 300,
                'badge-error': response.status >= 400,
                'badge-warning': response.status >= 300 && response.status < 400
              }">
                {{ response.status }} {{ response.statusText }}
              </div>
              
              <!-- Botones de descarga -->
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-sm btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                  </svg>
                  Descargar
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a @click="downloadResponse('json')">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      JSON completo
                    </a>
                  </li>
                  <li>
                    <a @click="downloadResponse('txt')">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Solo datos (.txt)
                    </a>
                  </li>
                  <li>
                    <a @click="downloadResponse('csv')">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0V4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                      </svg>
                      CSV (si es array)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Response Headers -->
          <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" /> 
            <div class="collapse-title text-sm font-medium">
              Response Headers
            </div>
            <div class="collapse-content"> 
              <div class="overflow-x-auto">
                <table class="table table-zebra table-xs">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="[key, value] in Object.entries(response.headers)" :key="key">
                      <td class="font-mono text-xs">{{ key }}</td>
                      <td class="font-mono text-xs">{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Response Body -->
          <div class="mockup-code">
            <pre class="text-sm"><code>{{ typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data }}</code></pre>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-8 text-base-content/60">
          <div class="text-4xl mb-2">🚀</div>
          <p>Ingresa una URL y haz clic en "Consultar" para ver los resultados</p>
        </div>
      </div>
    </div>
  </div>
</template>


import { ref, watch } from 'vue'

export function useApiForm() {
  const url = ref('https://jsonplaceholder.typicode.com/posts/1')
  const method = ref('GET')
  const activeTab = ref('headers')
  
  const requestBody = ref('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}')
  const isValidJson = ref(true)
  const headers = ref([
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: '', value: '', enabled: true }
  ])

  // Watch para cambiar automáticamente al tab de body cuando se selecciona POST/PUT/PATCH
  watch(method, (newMethod) => {
    if (['POST', 'PUT', 'PATCH'].includes(newMethod) && activeTab.value === 'headers') {
      activeTab.value = 'body'
    } else if (!['POST', 'PUT', 'PATCH'].includes(newMethod) && activeTab.value === 'body') {
      activeTab.value = 'headers'
    }
    
    // Cambiar URL de ejemplo según el método
    if (newMethod === 'POST') {
      url.value = 'https://jsonplaceholder.typicode.com/posts'
    } else if (newMethod === 'PUT') {
      url.value = 'https://jsonplaceholder.typicode.com/posts/1'
    } else if (newMethod === 'DELETE') {
      url.value = 'https://jsonplaceholder.typicode.com/posts/1'
    } else {
      url.value = 'https://jsonplaceholder.typicode.com/posts/1'
    }
  })

  const addHeader = () => {
    headers.value.push({ key: '', value: '', enabled: true })
  }

  const removeHeader = (index) => {
    headers.value.splice(index, 1)
  }

  const setExamplePost = () => {
    requestBody.value = '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}'
  }

  const setExampleUpdate = () => {
    requestBody.value = '{\n  "id": 1,\n  "title": "updated title",\n  "body": "updated body",\n  "userId": 1\n}'
  }

  const clearBody = () => {
    requestBody.value = '{}'
  }

  const validateJson = () => {
    if (!requestBody.value.trim()) {
      isValidJson.value = true
      return
    }
    
    try {
      JSON.parse(requestBody.value)
      isValidJson.value = true
    } catch (e) {
      isValidJson.value = false
    }
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(requestBody.value)
      requestBody.value = JSON.stringify(parsed, null, 2)
      isValidJson.value = true
    } catch (e) {
      // Si no es JSON válido, no hacer nada
    }
  }

  const getRequestConfig = () => {
    // Preparar headers
    const requestHeaders = {}
    headers.value.forEach(header => {
      if (header.enabled && header.key && header.value) {
        requestHeaders[header.key] = header.value
      }
    })

    // Configurar petición
    const config = {
      url: url.value,
      method: method.value,
      headers: requestHeaders
    }

    // Agregar body si es necesario y está presente
    if (['POST', 'PUT', 'PATCH'].includes(method.value) && requestBody.value.trim()) {
      config.body = requestBody.value
    }

    return config
  }

  // Watch para validar JSON en tiempo real
  watch(requestBody, validateJson, { immediate: true })

  return {
    // Estado reactivo
    url,
    method,
    activeTab,
    requestBody,
    isValidJson,
    headers,
    
    // Métodos para headers
    addHeader,
    removeHeader,
    
    // Métodos para body
    setExamplePost,
    setExampleUpdate,
    clearBody,
    validateJson,
    formatJson,
    
    // Configuración de petición
    getRequestConfig
  }
}

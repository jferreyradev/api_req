import { ref, reactive } from 'vue'

export function useApiClient() {
  const response = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const makeRequest = async (config) => {
    const { url, method = 'GET', headers = {}, body = null } = config
    
    if (!url) {
      throw new Error('URL es requerida')
    }

    isLoading.value = true
    error.value = null
    response.value = null

    try {
      // Configurar opciones de fetch
      const fetchOptions = {
        method: method.toUpperCase(),
        headers: { ...headers }
      }

      // Agregar body si es necesario y está presente
      if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && body) {
        fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
      }

      const res = await fetch(url, fetchOptions)
      
      // Intentar parsear como JSON, si no es posible usar texto
      let data
      const contentType = res.headers.get('content-type')
      try {
        if (contentType && contentType.includes('application/json')) {
          data = await res.json()
        } else {
          data = await res.text()
        }
      } catch {
        data = await res.text()
      }

      response.value = {
        status: res.status,
        statusText: res.statusText,
        data: data,
        headers: Object.fromEntries(res.headers.entries())
      }

      return response.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const downloadResponse = (format = 'json') => {
    if (!response.value) return
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + 
                     '-' + new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].split('-')[0]
    const filename = `api-response-${timestamp}.${format}`
    
    let content = ''
    let mimeType = ''
    
    if (format === 'json') {
      content = JSON.stringify(response.value, null, 2)
      mimeType = 'application/json'
    } else if (format === 'txt') {
      content = typeof response.value.data === 'object' 
        ? JSON.stringify(response.value.data, null, 2)
        : response.value.data
      mimeType = 'text/plain'
    } else if (format === 'csv') {
      // Intentar convertir a CSV si los datos son un array de objetos
      if (Array.isArray(response.value.data) && response.value.data.length > 0) {
        const headers = Object.keys(response.value.data[0])
        const csvHeaders = headers.join(',')
        const csvRows = response.value.data.map(row => 
          headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(',')
        )
        content = [csvHeaders, ...csvRows].join('\n')
        mimeType = 'text/csv'
      } else {
        content = JSON.stringify(response.value.data, null, 2)
        mimeType = 'text/plain'
      }
    }
    
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    response.value = null
    error.value = null
    isLoading.value = false
  }

  return {
    // Estado reactivo
    response,
    isLoading,
    error,
    
    // Métodos
    makeRequest,
    downloadResponse,
    reset
  }
}

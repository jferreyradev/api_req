<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">API Tester</h1>
    
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <h2 class="card-title">Make Request</h2>
        
        <div class="form-control w-full mb-4">
          <div class="flex gap-3">
            <select v-model="request.method" class="select select-bordered w-32">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            
            <input 
              v-model="request.url" 
              type="text" 
              placeholder="https://api.example.com/endpoint"
              class="input input-bordered flex-1"
            />
            
            <button @click="sendRequest" class="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl" v-if="response">
      <div class="card-body">
        <h2 class="card-title">Response</h2>
        <div class="mockup-code">
          <pre><code>{{ JSON.stringify(response, null, 2) }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const response = ref(null)
const request = reactive({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1'
})

const sendRequest = async () => {
  try {
    const res = await fetch(request.url, { method: request.method })
    const data = await res.json()
    response.value = data
  } catch (error) {
    response.value = { error: error.message }
  }
}
</script>

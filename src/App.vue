<script setup>
import { ref } from 'vue'
import CardApi from './components/CardApi.vue'

const currentTheme = ref('synthwave')

const themes = [
  { name: 'synthwave', label: '🌃 Synthwave', description: 'Retro futuristic' },
  { name: 'cyberpunk', label: '🤖 Cyberpunk', description: 'Neon tech vibes' },
  { name: 'dracula', label: '🧛 Dracula', description: 'Dark elegant' },
  { name: 'forest', label: '🌲 Forest', description: 'Nature inspired' },
  { name: 'luxury', label: '💎 Luxury', description: 'Premium gold' },
  { name: 'cupcake', label: '🧁 Cupcake', description: 'Sweet pastels' },
  { name: 'bumblebee', label: '🐝 Bumblebee', description: 'Bright yellow' },
  { name: 'emerald', label: '💚 Emerald', description: 'Fresh green' }
]

const changeTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
}

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme.value)
</script>

<template>

  <CardApi></CardApi>

</template>

<style scoped>
/* Ya no necesitamos estilos personalizados, Tailwind se encarga */
</style>

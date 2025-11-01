import { ref, watch } from 'vue'

const isDarkMode = ref(false)

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme-mode')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    // Check system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
}

// Apply theme to document
function applyTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
    document.documentElement.classList.remove('light-mode')
  } else {
    document.documentElement.classList.add('light-mode')
    document.documentElement.classList.remove('dark-mode')
  }
}

// Toggle theme
function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}

// Watch for changes and save to localStorage
watch(isDarkMode, (newValue) => {
  localStorage.setItem('theme-mode', newValue ? 'dark' : 'light')
  applyTheme()
})

export function useTheme() {
  return {
    isDarkMode,
    initTheme,
    toggleTheme,
    applyTheme
  }
}

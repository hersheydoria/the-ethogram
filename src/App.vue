<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { Sun, Moon } from 'lucide-vue-next'
import { allArticles } from './articles/index.js'
import { useTheme } from './composables/useTheme'
import AnimatedAnimalBackground from './components/AnimatedAnimalBackground.vue'
import { useRouter } from 'vue-router'

const { isDarkMode, initTheme, toggleTheme } = useTheme()
const router = useRouter()

const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedTags = ref([])

// Initialize theme on mount
onMounted(() => {
  initTheme()
})

// All blog posts data - imported from articles folder
const allBlogPosts = ref(allArticles)

const handleCategoryChange = (category) => {
  selectedCategory.value = category
  selectedTags.value = [] // Reset tags when changing category
  router.push('/blog')
}

const handleTagFilterChange = (tags) => {
  selectedTags.value = tags
}

const handleSearchQuery = (query) => {
  searchQuery.value = query
}

const handleReadPost = (postId) => {
  router.push(`/blog/${postId}`)
}

// Provide data to child components
provide('blogData', {
  allBlogPosts,
  selectedCategory,
  searchQuery,
  selectedTags,
  handleCategoryChange,
  handleTagFilterChange,
  handleSearchQuery,
  handleReadPost
})

const handleClearFilter = () => {
  selectedCategory.value = 'all'
  selectedTags.value = []
}

const handleClearSearch = () => {
  searchQuery.value = ''
  selectedTags.value = []
}



// Navigation handlers for router-based navigation
const goToHome = () => router.push('/')
const goToArticles = () => router.push('/blog')
const goToAbout = () => router.push('/about')
const goToTeams = () => router.push('/teams')
const goToPaws = () => router.push('/paws')
const goToDoctorFeature = () => router.push('/doctor-feature')

const handleFooterCategoryFilter = (category) => {
  selectedCategory.value = category
  router.push('/blog')
}

const handleFooterNavigation = (linkType) => {
  // Handle footer navigation if needed
}
</script>

<template>
  <AnimatedAnimalBackground />
  <div class="app">
    <!-- Router View for all pages -->
    <router-view />
    
    <!-- Footer on all pages -->
    <Footer 
      @category-filter="handleFooterCategoryFilter" 
      @navigate="handleFooterNavigation" 
    />

    <!-- Floating Theme Toggle Button -->
    <button class="floating-theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
      <Sun v-if="isDarkMode" :size="24" />
      <Moon v-else :size="24" />
    </button>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Light Mode (Default) */
:root.light-mode {
  --bg-primary: #FEFAE0;
  --bg-secondary: #DDA15E;
  --text-primary: #283618;
  --text-secondary: #606C38;
  --border-color: #BC6C25;
  --card-bg: #5A7A94;
  --card-shadow: rgba(40, 54, 24, 0.1);
}

/* Dark Mode */
:root.dark-mode {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --border-color: #334155;
  --card-bg: #546B82;
  --card-shadow: rgba(0, 0, 0, 0.5);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}

/* Floating Theme Toggle Button */
.floating-theme-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #4A6D42;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(74, 109, 66, 0.4);
  transition: all 0.3s ease;
}

.floating-theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(74, 109, 66, 0.5);
}

.floating-theme-toggle:active {
  transform: scale(0.95);
}

:root.dark-mode .floating-theme-toggle {
  background: #5A7F54;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

:root.dark-mode .floating-theme-toggle:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
  .floating-theme-toggle {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
  }
}
</style>


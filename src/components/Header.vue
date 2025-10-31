<template>
  <header class="header">
    <div class="header-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>
    
    <div class="container">
      <div class="header-top">
        <div class="logo-section">
          <h1 class="logo">🐾 Living Links</h1>
          <p class="tagline">Linking hearts to save animals and the planet</p>
        </div>
        <div class="header-buttons">
          <button @click="$emit('navigate-to-home')" class="home-btn">Home</button>
        </div>
      </div>
      
      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-box">
          <input 
            v-model="localSearchQuery"
            type="text" 
            placeholder="🔍 Search articles..."
            class="search-input"
            @input="handleSearchInput(localSearchQuery)"
          />
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-section">
        <p class="filter-label">Filter by Category:</p>
        <nav class="nav">
          <button 
            @click="handleCategoryClick('all')"
            class="nav-link"
            :class="{ active: activeCategory === 'all' }"
          >
            All Posts
          </button>
          <button 
            @click="handleCategoryClick('personal-experiences')"
            class="nav-link"
            :class="{ active: activeCategory === 'personal-experiences' }"
          >
            Personal Experiences
          </button>
          <button 
            @click="handleCategoryClick('personal-perspectives')"
            class="nav-link"
            :class="{ active: activeCategory === 'personal-perspectives' }"
          >
            Personal Perspectives
          </button>
          <button 
            @click="handleCategoryClick('educational-articles')"
            class="nav-link"
            :class="{ active: activeCategory === 'educational-articles' }"
          >
            Educational Articles
          </button>
          <button 
            @click="handleCategoryClick('spotlight-initiatives')"
            class="nav-link"
            :class="{ active: activeCategory === 'spotlight-initiatives' }"
          >
            Spotlight on Initiatives
          </button>
          <button 
            @click="handleCategoryClick('creative-expressions')"
            class="nav-link"
            :class="{ active: activeCategory === 'creative-expressions' }"
          >
            Creative Expressions
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'all'
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const localSearchQuery = ref('')
const activeCategory = ref('all')

const emit = defineEmits(['category-change', 'search', 'navigate-to-home'])

// Watch for parent updates
watch(() => props.selectedCategory, (newVal) => {
  activeCategory.value = newVal
})

watch(() => props.searchQuery, (newVal) => {
  localSearchQuery.value = newVal
})

const handleCategoryClick = (category) => {
  activeCategory.value = category
  emit('category-change', category)
}

const handleSearchInput = (query) => {
  localSearchQuery.value = query
  emit('search', query)
}

const clearCategory = () => {
  activeCategory.value = 'all'
  emit('category-change', 'all')
}

const clearSearch = () => {
  localSearchQuery.value = ''
  emit('search', '')
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  color: white;
  padding: 1.8rem 0 1.5rem;
  box-shadow: 
    0 4px 20px rgba(37, 99, 235, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid rgba(37, 99, 235, 0.4);
}

/* Animated Background Blobs */
.header-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: white;
  bottom: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: white;
  top: -50px;
  left: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.header-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.8rem;
  gap: 2rem;
  animation: slideDown 0.6s ease-out;
  position: relative;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-section {
  text-align: center;
  flex: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 4rem);
}

.logo {
  font-size: 2.4rem;
  margin-bottom: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  color: white;
}

.tagline {
  font-size: 0.95rem;
  opacity: 0.95;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.3rem;
}

.home-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;
  white-space: nowrap;
  backdrop-filter: blur(5px);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.home-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.home-btn:active {
  transform: translateY(-1px);
}

/* Search Container Styles */
.search-container {
  margin-bottom: 1.4rem;
}

.search-box {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 450px;
  padding: 1rem 1.8rem;
  font-size: 0.95rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  font-weight: 500;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

/* Filter Section */
.filter-section {
  margin-top: 1.2rem;
  animation: slideUp 0.6s ease-out 0.1s backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-label {
  text-align: center;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
  opacity: 0.9;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.nav-link {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 0.5rem 1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  backdrop-filter: blur(4px);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  background: white;
  color: #2563eb;
  border-color: white;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .header {
    padding: 1.2rem 0;
  }

  .header-top {
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .logo {
    font-size: 1.8rem;
  }

  .tagline {
    font-size: 0.85rem;
  }

  .home-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .search-input {
    font-size: 0.85rem;
    padding: 0.7rem 1.2rem;
    max-width: 300px;
  }

  .nav-link {
    padding: 0.3rem 0.7rem;
    font-size: 0.7rem;
  }

  .filter-label {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .search-container {
    margin-bottom: 1rem;
  }

  filter-section {
    margin-top: 1.2rem;
  }
}
</style>

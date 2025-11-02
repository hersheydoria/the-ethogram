<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo" @click="$emit('navigate-to-landing')">
        <img src="../assets/logo.png" alt="The Ethogram Logo" class="navbar-logo-img" />
        <span>The Ethogram</span>
      </div>
      
      <!-- Hamburger Menu Button (Mobile) -->
      <button class="hamburger-menu" @click="toggleMobileMenu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <!-- Right-side Navigation Wrapper -->
      <div class="navbar-right-content" :class="{ active: showMobileMenu }">
        <!-- Home Button -->
        <button @click="handleMobileNavClick($emit('navigate-to-blog'))" class="navbar-home-btn">
          Home
        </button>

        <!-- About Us Button -->
        <button @click="handleMobileNavClick($emit('navigate-to-about'))" class="navbar-about-btn">
          About Us
        </button>
        
        <!-- Categories Dropdown -->
        <div class="categories-dropdown-wrapper" @mouseenter="openMenu" @mouseleave="closeMenu">
          <button 
            @click.stop="toggleMenu"
            class="dropdown-toggle"
          >
            Categories ▼
          </button>
          
          <div v-if="showMenu" class="categories-dropdown">
            <!-- All Posts Option -->
            <button 
              @click="selectCategory('all')"
              class="dropdown-item"
              :class="{ active: activeCategory === 'all' }"
            >
              All Posts
            </button>
            
            <!-- Category Options -->
            <button 
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              class="dropdown-item"
              :class="{ active: activeCategory === category.id }"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="navbar-search">
          <input 
            v-model="localSearchQuery"
            type="text" 
            placeholder="Search articles..."
            class="search-input"
            @input="handleSearchInput(localSearchQuery)"
          />
        </div>
      </div>
    </div>
    
    <!-- Tag Filter Section (Below categories when selected) -->
    <div v-if="activeCategory !== 'all' && availableTags.length > 0" class="tag-filter-bar">
      <div class="tag-filter-container">
        <span class="tag-filter-label">Filter by Tags:</span>
        <div class="tags-list">
          <button 
            v-for="tag in availableTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="tag-filter-btn"
            :class="{ active: selectedTags.includes(tag) }"
          >
            {{ tag }}
          </button>
        </div>
        <button 
          v-if="selectedTags.length > 0"
          @click="clearTags"
          class="clear-tags-btn"
        >
          ✕ Clear
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { initTheme } = useTheme()

const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'all'
  },
  searchQuery: {
    type: String,
    default: ''
  },
  allPosts: {
    type: Array,
    default: () => []
  }
})

const localSearchQuery = ref('')
const activeCategory = ref('all')
const showMenu = ref(false)
const showMobileMenu = ref(false)
const selectedTags = ref([])
let closeMenuTimeout = null
let searchTimeout = null

const emit = defineEmits(['category-change', 'search', 'navigate-to-landing', 'navigate-to-blog', 'navigate-to-about', 'navigate-to-blog-with-filters', 'tag-filter-change'])

// Category definitions
const categories = computed(() => [
  { 
    id: 'personal-experiences', 
    name: 'Personal Experiences'
  },
  { 
    id: 'professional-perspectives', 
    name: 'Professional Perspectives'
  },
  { 
    id: 'educational-articles', 
    name: 'Educational Articles'
  },
  { 
    id: 'spotlight-initiatives', 
    name: 'Spotlight on Initiatives'
  },
  { 
    id: 'creative-expressions', 
    name: 'Creative Expressions'
  }
])

// Get available tags for current category
const availableTags = computed(() => {
  if (activeCategory.value === 'all') return []
  
  const articlesInCategory = props.allPosts.filter(p => p.category === activeCategory.value)
  const tagsSet = new Set()
  
  articlesInCategory.forEach(article => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  
  return Array.from(tagsSet).sort()
})

// Watch for parent updates
watch(() => props.selectedCategory, (newVal) => {
  activeCategory.value = newVal
})

watch(() => props.searchQuery, (newVal) => {
  localSearchQuery.value = newVal
})

const toggleMenu = () => {
  if (closeMenuTimeout) clearTimeout(closeMenuTimeout)
  showMenu.value = !showMenu.value
}

const openMenu = () => {
  if (closeMenuTimeout) clearTimeout(closeMenuTimeout)
  showMenu.value = true
}

const closeMenu = () => {
  closeMenuTimeout = setTimeout(() => {
    showMenu.value = false
  }, 150) // Small delay to allow clicks to register
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleMobileNavClick = (action) => {
  showMobileMenu.value = false
}

const selectCategory = (category) => {
  activeCategory.value = category
  selectedTags.value = [] // Reset tags when changing category
  emit('category-change', category)
  if (closeMenuTimeout) clearTimeout(closeMenuTimeout)
  showMenu.value = false // Close dropdown after selection immediately
}

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  emit('tag-filter-change', selectedTags.value)
}

const clearTags = () => {
  selectedTags.value = []
  emit('tag-filter-change', [])
}

const handleSearchInput = (query) => {
  localSearchQuery.value = query
  emit('search', query)
  
  // Clear previous timeout
  if (searchTimeout) clearTimeout(searchTimeout)
  
  // Only navigate to blog after user stops typing for 500ms
  if (query.trim() !== '') {
    searchTimeout = setTimeout(() => {
      emit('navigate-to-blog-with-filters')
    }, 500)
  }
}

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 50%, #606C38 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.3);
  z-index: 100;
  transition: background 0.3s ease;
  position: sticky;
  top: 0;
}

:root.light-mode .navbar {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 50%, #606C38 100%);
}

:root.dark-mode .navbar {
  background: linear-gradient(135deg, #7A3C0E 0%, #A8643A 50%, #3D4620 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

:root.dark-mode .categories-dropdown {
  background: linear-gradient(135deg, #6B3410 0%, #8F5428 100%);
  border-color: rgba(168, 100, 58, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

:root.dark-mode .dropdown-item {
  color: #e5e7eb;
}

:root.dark-mode .dropdown-item:hover {
  background: rgba(188, 108, 37, 0.2);
  color: #DDA15E;
}

:root.dark-mode .dropdown-item.active {
  background: rgba(188, 108, 37, 0.3);
  color: #DDA15E;
  border-left-color: #DDA15E;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 70px;
  justify-content: space-between;
}

/* Logo Section */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 1.5rem;
  font-weight: 800;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.navbar-logo-img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

/* Hamburger Menu Button */
.hamburger-menu {
  display: none;
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 5px;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Right Content Wrapper */
.navbar-right-content {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}

/* Search Section */
.navbar-search {
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: 100%;
  max-width: 280px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

/* Menu Button */
.categories-dropdown-wrapper {
  position: relative;
}

.dropdown-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.dropdown-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.categories-dropdown-wrapper:hover .dropdown-toggle {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
}

.categories-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1000;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  width: 100%;
  background: transparent;
  border: none;
  color: #333;
  padding: 0.8rem 1.2rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
}

.dropdown-item:hover {
  background: #f3f4f6;
  color: #2563eb;
  padding-left: 1.5rem;
}

.dropdown-item.active {
  background: #dbeafe;
  color: #2563eb;
  font-weight: 700;
  border-left: 3px solid #2563eb;
  padding-left: calc(1.2rem - 3px);
}

.dropdown-item:first-child {
  border-radius: 12px 12px 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 12px 12px;
}

/* Home Button */
.navbar-home-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.navbar-home-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.navbar-about-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.navbar-about-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

/* Menu Dropdown */
.menu-dropdown {
  background: rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.menu-title {
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.menu-item {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateX(4px);
}

.menu-item.active {
  background: white;
  color: #2563eb;
  border-color: white;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.menu-label-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.menu-label {
  display: block;
}

.tag-filter-active {
  font-size: 0.7rem;
  font-weight: 600;
  color: #f97316;
  opacity: 0.9;
}

/* Tag Filter Bar */
.tag-filter-bar {
  background: rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tag-filter-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tag-filter-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tags-list {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.tag-filter-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.85);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tag-filter-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.tag-filter-btn.active {
  background: white;
  color: #2563eb;
  border-color: white;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.clear-tags-btn {
  background: rgba(249, 115, 22, 0.3);
  border: 1px solid #f97316;
  color: #fbbf24;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.clear-tags-btn:hover {
  background: rgba(249, 115, 22, 0.5);
  border-color: #fbbf24;
  transform: translateY(-1px);
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .navbar-container {
    gap: 1rem;
    padding: 0 1.5rem;
    height: 60px;
  }

  .navbar-logo {
    font-size: 1.3rem;
    font-weight: 800;
  }

  .navbar-logo-img {
    width: 55px;
    height: 55px;
  }

  .search-input {
    max-width: 250px;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }

  .navbar-home-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .navbar-about-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }

  .dropdown-toggle {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .categories-dropdown {
    min-width: 200px;
  }

  .tag-filter-container {
    padding: 0.8rem 1.5rem;
    gap: 1rem;
  }

  .tag-filter-label {
    font-size: 0.8rem;
  }

  .tag-filter-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0.8rem 1rem;
    gap: 0.8rem;
    height: auto;
  }

  .hamburger-menu {
    display: flex;
  }

  .navbar-logo {
    font-size: 1.4rem;
    font-weight: 800;
    flex: 1;
  }

  .navbar-logo-img {
    width: 60px;
    height: 60px;
  }

  .navbar-right-content {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: linear-gradient(135deg, #7A3C0E 0%, #A8643A 50%, #3D4620 100%);
    padding: 1rem;
    max-width: 100%;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    align-items: flex-start;
  }

  .navbar-right-content.active {
    transform: translateX(0);
  }

  .navbar-home-btn {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    width: 100%;
    text-align: left;
  }

  .navbar-about-btn {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    width: 100%;
    text-align: left;
  }

  .categories-dropdown-wrapper {
    flex-shrink: 0;
    width: 100%;
    position: relative;
  }

  .dropdown-toggle {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    width: 100%;
    text-align: left;
    position: relative;
  }

  .navbar-search {
    width: 100%;
    justify-content: flex-start;
  }

  .search-input {
    width: 100%;
    max-width: none;
  }

  .categories-dropdown {
    position: static;
    width: 100%;
    background: rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 0;
    box-shadow: none;
    min-width: auto;
    z-index: 999;
    margin-top: 0;
    animation: none;
    display: flex;
    flex-direction: column;
  }

  .dropdown-item {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
    border: none;
    text-align: left;
    transition: all 0.2s ease;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #DDA15E;
    padding-left: 1.8rem;
  }

  .dropdown-item.active {
    background: rgba(255, 255, 255, 0.15);
    color: #DDA15E;
    font-weight: 700;
    border-left: 3px solid #DDA15E;
    padding-left: calc(1.5rem - 3px);
  }

  .tag-filter-container {
    padding: 0.8rem 1rem;
    gap: 0.8rem;
  }

  .tag-filter-label {
    font-size: 0.75rem;
  }

  .tags-list {
    gap: 0.4rem;
  }

  .tag-filter-btn {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
  }

  .clear-tags-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0.6rem;
    height: auto;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .navbar-logo {
    font-size: 1.3rem;
    font-weight: 800;
    order: 1;
  }

  .navbar-logo-img {
    width: 55px;
    height: 55px;
  }

  .navbar-right-content {
    flex-basis: 100%;
    order: 2;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .navbar-home-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }

  .navbar-about-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }

  .categories-dropdown-wrapper {
    flex-shrink: 0;
  }

  .dropdown-toggle {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .navbar-search {
    flex-basis: 100%;
    min-width: 0;
    justify-content: center;
  }

  .search-input {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    max-width: 100%;
  }

  .categories-dropdown {
    min-width: 160px;
  }

  .dropdown-item {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }

  .tag-filter-container {
    padding: 0.6rem;
    gap: 0.6rem;
  }

  .tag-filter-label {
    font-size: 0.7rem;
  }

  .tags-list {
    gap: 0.3rem;
  }

  .tag-filter-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }

  .clear-tags-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
}
</style>

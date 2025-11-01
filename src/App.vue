<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Landing from './components/Landing.vue'
import Navbar from './components/Navbar.vue'
import BlogList from './components/BlogList.vue'
import BlogPost from './components/BlogPost.vue'
import AboutUs from './components/AboutUs.vue'
import Teams from './components/Teams.vue'
import Footer from './components/Footer.vue'
import { Sun, Moon } from 'lucide-vue-next'
import { allArticles } from './articles/index.js'
import { useTheme } from './composables/useTheme'

const { isDarkMode, initTheme, toggleTheme } = useTheme()

const currentPage = ref('landing') // 'landing', 'blog', 'about', 'team'
const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedPostId = ref(null)
const selectedTags = ref([])

// Restore page state from localStorage on mount
onMounted(() => {
  initTheme()
  const savedPage = localStorage.getItem('currentPage')
  const savedCategory = localStorage.getItem('selectedCategory')
  const savedPostId = localStorage.getItem('selectedPostId')
  
  // Only restore valid pages
  if (savedPage && (savedPage === 'landing' || savedPage === 'blog' || savedPage === 'about' || savedPage === 'team')) {
    currentPage.value = savedPage
  }
  if (savedCategory) {
    selectedCategory.value = savedCategory
  }
  if (savedPostId) {
    selectedPostId.value = parseInt(savedPostId)
  }
})

// Save page state to localStorage whenever it changes
watch(currentPage, (newPage) => {
  localStorage.setItem('currentPage', newPage)
})

watch(selectedCategory, (newCategory) => {
  localStorage.setItem('selectedCategory', newCategory)
})

watch(selectedPostId, (newPostId) => {
  if (newPostId) {
    localStorage.setItem('selectedPostId', newPostId)
  } else {
    localStorage.removeItem('selectedPostId')
  }
})

// All blog posts data - imported from articles folder
const allBlogPosts = ref(allArticles)

const selectedPost = computed(() => {
  return allBlogPosts.value.find(post => post.id === selectedPostId.value)
})

const handleCategoryChange = (category) => {
  selectedCategory.value = category
  selectedTags.value = [] // Reset tags when changing category
  selectedPostId.value = null
  // Navigate to blog page if not already there
  if (currentPage.value !== 'blog') {
    currentPage.value = 'blog'
  }
  window.scrollTo(0, 0)
}

const handleTagFilterChange = (tags) => {
  selectedTags.value = tags
  selectedPostId.value = null
}

const handleSearchQuery = (query) => {
  searchQuery.value = query
  selectedPostId.value = null
}

const handleReadPost = (postId) => {
  selectedPostId.value = postId
  window.scrollTo(0, 0)
}

const handleBackToList = () => {
  selectedPostId.value = null
}

const handleClearFilter = () => {
  selectedCategory.value = 'all'
  selectedPostId.value = null
}

const handleClearSearch = () => {
  searchQuery.value = ''
  selectedPostId.value = null
}

const goToArticles = () => {
  currentPage.value = 'blog'
  selectedCategory.value = 'all'
  selectedPostId.value = null
  searchQuery.value = ''
  selectedTags.value = []
  window.scrollTo(0, 0)
}

const goToBlogWithCurrentFilters = () => {
  // Navigate to blog page while keeping current filters (category, search, tags)
  currentPage.value = 'blog'
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const goToHome = () => {
  currentPage.value = 'landing'
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const goToAbout = () => {
  currentPage.value = 'about'
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const goToTeams = () => {
  currentPage.value = 'team'
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const goBackFromTeams = () => {
  currentPage.value = 'about'
  window.scrollTo(0, 0)
}

const handleFooterCategoryFilter = (category) => {
  currentPage.value = 'blog'
  selectedCategory.value = category
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const handleFooterNavigation = (linkType) => {
  // Navigation for removed pages - this is now a no-op
  // Pages like 'about', 'resources', and 'contribute' have been removed
}
</script>

<template>
  <div class="app">
    <!-- Landing Page -->
    <template v-if="currentPage === 'landing'">
      <Landing @navigate-to-articles="goToArticles" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- About Us Page -->
    <template v-else-if="currentPage === 'about'">
      <Navbar 
        :selected-category="selectedCategory"
        :search-query="searchQuery"
        :all-posts="allBlogPosts"
        @category-change="handleCategoryChange"
        @search="handleSearchQuery"
        @navigate-to-landing="goToHome"
        @navigate-to-blog="goToArticles"
        @navigate-to-blog-with-filters="goToBlogWithCurrentFilters"
        @navigate-to-about="goToAbout"
        @tag-filter-change="handleTagFilterChange"
      />
      <AboutUs @navigate-to-articles="goToArticles" @navigate-to-team="goToTeams" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- Blog Page -->
    <template v-else-if="currentPage === 'blog'">
      <Navbar 
        :selected-category="selectedCategory"
        :search-query="searchQuery"
        :all-posts="allBlogPosts"
        @category-change="handleCategoryChange"
        @search="handleSearchQuery"
        @navigate-to-landing="goToHome"
        @navigate-to-blog="goToArticles"
        @navigate-to-blog-with-filters="goToBlogWithCurrentFilters"
        @navigate-to-about="goToAbout"
        @tag-filter-change="handleTagFilterChange"
      />
      <template v-if="selectedPostId === null">
        <BlogList 
          :selected-category="selectedCategory" 
          :search-query="searchQuery"
          :selected-tags="selectedTags"
          :all-posts="allBlogPosts" 
          @read-post="handleReadPost"
          @clear-filter="handleClearFilter"
          @clear-search="handleClearSearch"
        />
      </template>
      <template v-else>
        <BlogPost :post="selectedPost" :all-posts="allBlogPosts" @back="handleBackToList" @select-post="handleReadPost" />
      </template>
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- Teams Page -->
    <template v-else-if="currentPage === 'team'">
      <Navbar 
        :selected-category="selectedCategory"
        :search-query="searchQuery"
        :all-posts="allBlogPosts"
        @category-change="handleCategoryChange"
        @search="handleSearchQuery"
        @navigate-to-landing="goToHome"
        @navigate-to-blog="goToArticles"
        @navigate-to-blog-with-filters="goToBlogWithCurrentFilters"
        @navigate-to-about="goToAbout"
        @tag-filter-change="handleTagFilterChange"
      />
      <Teams @go-back="goBackFromTeams" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
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


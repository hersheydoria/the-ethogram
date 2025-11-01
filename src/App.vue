<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Landing from './components/Landing.vue'
import Navbar from './components/Navbar.vue'
import BlogList from './components/BlogList.vue'
import BlogPost from './components/BlogPost.vue'
import AboutUs from './components/AboutUs.vue'
import Footer from './components/Footer.vue'
import { allArticles } from './articles/index.js'
import { useTheme } from './composables/useTheme'

const { isDarkMode, initTheme } = useTheme()

const currentPage = ref('landing') // 'landing', 'blog', 'about'
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
  if (savedPage && (savedPage === 'landing' || savedPage === 'blog' || savedPage === 'about')) {
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
        @navigate-to-about="goToAbout"
        @tag-filter-change="handleTagFilterChange"
      />
      <AboutUs @navigate-to-articles="goToArticles" />
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
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --card-bg: #ffffff;
  --card-shadow: rgba(0, 0, 0, 0.1);
}

/* Dark Mode */
:root.dark-mode {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --border-color: #334155;
  --card-bg: #1e293b;
  --card-shadow: rgba(0, 0, 0, 0.5);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

:root.light-mode body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
}

:root.light-mode .app {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>

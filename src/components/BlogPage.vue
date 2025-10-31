<template>
  <div class="blog-page">
    <Header 
      @category-change="handleCategoryChange"
      @search="handleSearchQuery"
    />
    <BlogList 
      :selected-category="selectedCategory" 
      :search-query="searchQuery"
      :all-posts="allPosts" 
      @read-post="handleReadPost" 
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Header from './Header.vue'
import BlogList from './BlogList.vue'

const props = defineProps({
  selectedCategory: String,
  searchQuery: String,
  allPosts: Array,
  onCategoryChange: Function,
  onSearchQuery: Function,
  onReadPost: Function
})

const handleCategoryChange = (category) => {
  props.onCategoryChange?.(category)
}

const handleSearchQuery = (query) => {
  props.onSearchQuery?.(query)
}

const handleReadPost = (postId) => {
  props.onReadPost?.(postId)
}
</script>

<style scoped>
.blog-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

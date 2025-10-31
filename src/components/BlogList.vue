<template>
  <section class="blog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Latest Articles</h2>
        <p class="article-count">{{ filteredPosts.length }} article<span v-if="filteredPosts.length !== 1">s</span> found</p>
      </div>

      <!-- Filter Info Bar -->
      <div v-if="activeFilters.length > 0" class="filter-info">
        <p>Filters applied:</p>
        <div class="filter-tags">
          <span v-for="filter in activeFilters" :key="filter" class="filter-tag">
            {{ filter }}
            <button @click="clearFilter(filter)" class="clear-filter-btn" :title="`Clear ${filter}`">✕</button>
          </span>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="blog-grid">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @read-post="$emit('read-post', $event)"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="filteredPosts.length === 0" class="no-posts">
        <div class="no-posts-icon">🔍</div>
        <p class="no-posts-title">No articles found</p>
        <p class="no-posts-subtitle">
          Try adjusting your search or category filters
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import BlogCard from './BlogCard.vue'

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
    required: true
  }
})

const emit = defineEmits(['read-post', 'clear-filter', 'clear-search'])

const filteredPosts = computed(() => {
  let posts = props.allPosts

  // Filter by category
  if (props.selectedCategory !== 'all') {
    posts = posts.filter(post => post.category === props.selectedCategory)
  }

  // Filter by search query
  if (props.searchQuery.trim()) {
    const query = props.searchQuery.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
  }

  return posts
})

const activeFilters = computed(() => {
  const filters = []
  if (props.selectedCategory !== 'all') {
    filters.push(`Category: ${capitalize(props.selectedCategory)}`)
  }
  if (props.searchQuery.trim()) {
    filters.push(`Search: "${props.searchQuery}"`)
  }
  return filters
})

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const clearFilter = (filter) => {
  if (filter.startsWith('Category:')) {
    emit('clear-filter')
  } else if (filter.startsWith('Search:')) {
    emit('clear-search')
  }
}
</script>

<style scoped>
.blog-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  flex: 1;
  min-height: 60vh;
  position: relative;
  overflow: hidden;
}

.blog-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(37, 52, 79, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(97, 120, 145, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-count {
  font-size: 1.1rem;
  color: #f97316;
  font-weight: 600;
}

/* Filter Info Bar */
.filter-info {
  background: white;
  border-radius: 15px;
  padding: 1.2rem 1.8rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 15px rgba(37, 83, 235, 0.1);
  border-left: 5px solid #2563eb;
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-info p {
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tag {
  background: linear-gradient(135deg, #25344F 0%, #617891 100%);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 4px 12px rgba(37, 52, 79, 0.3);
  animation: pulse 0.5s ease-out;
}

.clear-filter-btn {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
  padding: 0;
  line-height: 1;
}

.clear-filter-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.15);
}

.clear-filter-btn:active {
  transform: scale(0.95);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

/* No Posts Message */
.no-posts {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 2px dashed rgba(102, 126, 234, 0.2);
}

.no-posts-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.no-posts-title {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 800;
  margin-bottom: 0.8rem;
}

.no-posts-subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .blog-section {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .filter-info {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .filter-tags {
    gap: 0.5rem;
  }

  .filter-tag {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
}
</style>
  {
    id: 2,
    title: 'Stories from the Veterinary Students During Their Internships',
    excerpt: 'Real experiences and insights from veterinary students during their clinical rotations. Learn from their journey in animal care.',
    category: 'education',
    date: '2025-10-27',
    image: '�‍🎓',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'The Importance of Spay/Neuter Campaigns',
    excerpt: 'Discover how spay and neuter programs help control animal populations and prevent health issues in dogs and cats.',
    category: 'welfare',
    date: '2025-10-26',
    image: '🏥',
    readTime: '5 min read'
  },
  {
    id: 4,
    title: 'Humane Euthanasia and Its Ethical Considerations',
    excerpt: 'An in-depth look at the ethical aspects of humane euthanasia and the compassionate care involved in end-of-life decisions.',
    category: 'ethics',
    date: '2025-10-25',
    image: '�',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Emotional Resilience and Compassion Fatigue Among Veterinarians',
    excerpt: 'Understanding burnout and compassion fatigue in veterinary professionals and strategies for building emotional resilience.',
    category: 'wellbeing',
    date: '2025-10-24',
    image: '❤️',
    readTime: '7 min read'
  },
  {
    id: 6,
    title: 'Experiences as Pet Owners Implementing Animal Welfare Practices',
    excerpt: 'Learn from real pet owners about their experiences implementing animal welfare practices in their daily life at home.',
    category: 'lifestyle',
    date: '2025-10-23',
    image: '🐕',
    readTime: '6 min read'
  },
  {
    id: 7,
    title: 'From Bite to Cure: Anti-Venom Accessibility and Awareness',
    excerpt: 'An interview exploring the challenges and solutions in evaluating anti-venom accessibility and knowledge gaps in local areas.',
    category: 'interviews',
    date: '2025-10-22',
    image: '🐍',
    readTime: '9 min read'
  },
  {
    id: 8,
    title: 'Creative Expressions: Artworks for Animal Advocacy',
    excerpt: 'Explore beautiful and meaningful artworks created to raise awareness about animal welfare and promote compassion.',
    category: 'creative',
    date: '2025-10-21',
    image: '🎨',
    readTime: '4 min read'
  },
  {
    id: 9,
    title: 'Shifting from Impoundment to CNVR for Better Animal Welfare',
    excerpt: 'A look at local and national campaigns shifting towards community-based animal welfare solutions instead of traditional impounding.',
    category: 'campaigns',
    date: '2025-10-20',
    image: '🏘️',
    readTime: '7 min read'
  },
  {
    id: 10,
    title: 'Previous Works: Spotlight on Current and Past Initiatives',
    excerpt: 'Celebrating the achievements and initiatives from previous batches of animal welfare projects and their lasting impact.',
    category: 'initiatives',
    date: '2025-10-19',
    image: '⭐',
    readTime: '5 min read'
  },
  {
    id: 11,
    title: 'Sustainable Livestock Management for Productivity and Welfare',
    excerpt: 'Balancing productivity with animal welfare in livestock management through sustainable and ethical farming practices.',
    category: 'livestock',
    date: '2025-10-18',
    image: '🐄',
    readTime: '6 min read'
  },
  {
    id: 12,
    title: 'Ethical Wildlife Conservation and Habitat Protection',
    excerpt: 'Exploring ethical approaches to wildlife conservation and the importance of protecting natural habitats for animal populations.',
    category: 'wildlife',
    date: '2025-10-17',
    image: '🦁',
    readTime: '7 min read'
  },
  {
    id: 13,
    title: 'Recognizing and Preventing Animal Cruelty in the Community',
    excerpt: 'Learn how to identify signs of animal cruelty and what steps you can take to protect animals in your community.',
    category: 'awareness',
    date: '2025-10-16',
    image: '🚨',
    readTime: '6 min read'
  },
  {
    id: 14,
    title: 'NGO and Government Projects in Animal Rescue and Protection',
    excerpt: 'Discover the important work of NGOs and government agencies in animal rescue, rehabilitation, and long-term protection efforts.',
    category: 'rescue',
    date: '2025-10-15',
    image: '�',
    readTime: '7 min read'
  },
  {
    id: 15,
    title: 'School-Led Outreach and Veterinary Missions',
    excerpt: 'Spotlight on educational institutions leading animal welfare initiatives and veterinary missions in underserved communities.',
    category: 'outreach',
    date: '2025-10-14',
    image: '🏫',
    readTime: '6 min read'
  },
  {
    id: 16,
    title: 'The One Health Approach: Animals, Humans, and Environment',
    excerpt: 'Understanding the interconnection between animal welfare, human health, and environmental protection in a holistic approach.',
    category: 'onehealth',
    date: '2025-10-13',
    image: '🌍',
    readTime: '8 min read'
  },
  {
    id: 17,
    title: 'Educational Articles: Responsible Pet Ownership',
    excerpt: 'Comprehensive guide to responsible pet ownership covering nutrition, training, healthcare, and creating a safe home environment.',
    category: 'education',
    date: '2025-10-12',
    image: '📚',
    readTime: '9 min read'
  },
  {
    id: 18,
    title: 'Protecting the Philippine Eagle: The Phil. Eagle Foundation\'s Mission',
    excerpt: 'Documentary featuring the Philippine Eagle Foundation\'s crucial work in protecting and conserving the endangered Philippine Eagle.',
    category: 'wildlife',
    date: '2025-10-11',
    image: '🦅',
    readTime: '10 min read'
  }
]

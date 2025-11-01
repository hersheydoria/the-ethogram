<template>
  <div class="teams-page">
    <!-- Header -->
    <section class="teams-header">
      <h1>Meet Our Teams</h1>
      <p class="teams-subtitle">Save the animals, Save the Planet</p>
      <p class="teams-description">
        Our mission is powered by dedicated committees working together to create lasting impact for animal welfare and conservation.
      </p>
    </section>

    <!-- Committees Grid -->
    <section class="committees-section">
      <div class="committees-grid">
        <div 
          v-for="(committee, index) in committees" 
          :key="index"
          class="committee-card"
        >
          <div class="committee-header">
            <h2 class="committee-name">{{ committee.name }}</h2>
            <span class="member-count">{{ committee.heads.length + committee.members.length }} members</span>
          </div>
          <p class="committee-description">{{ committee.description }}</p>
          
          <!-- Committee Heads Section -->
          <div v-if="committee.heads.length > 0" class="heads-section">
            <h3 class="section-title">Committee Heads</h3>
            <div class="heads-container">
              <div v-for="(head, headIndex) in committee.heads" :key="`head-${headIndex}`" class="member-item head-item">
                <img :src="head.image" :alt="head.name" class="member-image">
                <div class="member-info">
                  <p class="member-name">{{ head.name }}</p>
                  <p class="member-role">{{ head.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Committee Members Section -->
          <div v-if="committee.members.length > 0" class="members-section">
            <h3 class="section-title">Members</h3>
            <div class="members-container">
              <div v-for="(member, memberIndex) in committee.members" :key="`member-${memberIndex}`" class="member-item">
                <img :src="member.image" :alt="member.name" class="member-image">
                <p class="member-name">{{ member.name }}</p>
              </div>
            </div>
          </div>

          <div class="committee-icon">
            <Users :size="32" />
          </div>
        </div>
      </div>
    </section>

    <!-- Total Members Stats -->
    <section class="stats-section">
      <div class="stats-card">
        <div class="stat-number">{{ totalMembers }}</div>
        <p class="stat-label">Total Team Members</p>
      </div>
      <div class="stats-card">
        <div class="stat-number">{{ committees.length }}</div>
        <p class="stat-label">Active Committees</p>
      </div>
    </section>

    <!-- Back Button -->
    <div class="back-button-container">
      <button @click="goBack" class="back-button">
        ← Back to About Us
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Users } from 'lucide-vue-next';

const committees = [
  {
    name: 'PROJECT MANAGEMENT & OVERSIGHT COMMITTEE',
    description: 'Guides overall project direction, strategy, and ensures alignment with our mission to advance animal welfare.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: [
      { name: 'Member 1', image: 'https://via.placeholder.com/60?text=M1' },
      { name: 'Member 2', image: 'https://via.placeholder.com/60?text=M2' },
      { name: 'Member 3', image: 'https://via.placeholder.com/60?text=M3' },
      { name: 'Member 4', image: 'https://via.placeholder.com/60?text=M4' },
      { name: 'Member 5', image: 'https://via.placeholder.com/60?text=M5' },
      { name: 'Member 6', image: 'https://via.placeholder.com/60?text=M6' },
      { name: 'Member 7', image: 'https://via.placeholder.com/60?text=M7' },
      { name: 'Member 8', image: 'https://via.placeholder.com/60?text=M8' },
      { name: 'Member 9', image: 'https://via.placeholder.com/60?text=M9' },
      { name: 'Member 10', image: 'https://via.placeholder.com/60?text=M10' },
      { name: 'Member 11', image: 'https://via.placeholder.com/60?text=M11' },
      { name: 'Member 12', image: 'https://via.placeholder.com/60?text=M12' },
      { name: 'Member 13', image: 'https://via.placeholder.com/60?text=M13' },
      { name: 'Member 14', image: 'https://via.placeholder.com/60?text=M14' },
      { name: 'Member 15', image: 'https://via.placeholder.com/60?text=M15' }
    ]
  },
  {
    name: 'CONTENT & EDITORIAL COMMITTEE',
    description: 'Curates, reviews, and oversees all content to ensure quality, accuracy, and relevance to our audience.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: [
      { name: 'Member 1', image: 'https://via.placeholder.com/60?text=M1' },
      { name: 'Member 2', image: 'https://via.placeholder.com/60?text=M2' },
      { name: 'Member 3', image: 'https://via.placeholder.com/60?text=M3' },
      { name: 'Member 4', image: 'https://via.placeholder.com/60?text=M4' },
      { name: 'Member 5', image: 'https://via.placeholder.com/60?text=M5' },
      { name: 'Member 6', image: 'https://via.placeholder.com/60?text=M6' },
      { name: 'Member 7', image: 'https://via.placeholder.com/60?text=M7' },
      { name: 'Member 8', image: 'https://via.placeholder.com/60?text=M8' },
      { name: 'Member 9', image: 'https://via.placeholder.com/60?text=M9' },
      { name: 'Member 10', image: 'https://via.placeholder.com/60?text=M10' },
      { name: 'Member 11', image: 'https://via.placeholder.com/60?text=M11' },
      { name: 'Member 12', image: 'https://via.placeholder.com/60?text=M12' },
      { name: 'Member 13', image: 'https://via.placeholder.com/60?text=M13' },
      { name: 'Member 14', image: 'https://via.placeholder.com/60?text=M14' },
      { name: 'Member 15', image: 'https://via.placeholder.com/60?text=M15' },
      { name: 'Member 16', image: 'https://via.placeholder.com/60?text=M16' },
      { name: 'Member 17', image: 'https://via.placeholder.com/60?text=M17' }
    ]
  },
  {
    name: 'TECHNICAL & WEBSITE MANAGEMENT COMMITTEE',
    description: 'Manages website infrastructure, functionality, updates, and ensures optimal user experience.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 22 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'CREATIVES COMMITTEE',
    description: 'Develops visual design, graphics, photography, and creative assets for all platforms.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 22 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'PUBLICATIONS & PROMOTIONS COMMITTEE',
    description: 'Handles marketing, social media campaigns, and strategic promotion of our initiatives.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 22 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'PARTNERSHIPS & OUTREACH COMMITTEE',
    description: 'Builds relationships with organizations, coordinates collaborations, and expands our network.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 22 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'DOCUMENTATION & ARCHIVING COMMITTEE',
    description: 'Maintains records, archives important information, and preserves our organizational knowledge.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 12 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'TREASURY COMMITTEE',
    description: 'Manages finances, budgeting, and ensures responsible stewardship of resources.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 8 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'QUALITY ASSURANCE & FEEDBACK COMMITTEE',
    description: 'Reviews quality standards, gathers feedback, and implements continuous improvements.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 11 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  },
  {
    name: 'LOGISTICS & OPERATIONS COMMITTEE',
    description: 'Coordinates operations, logistics, scheduling, and day-to-day organizational support.',
    heads: [
      { name: 'Head Name', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: Array.from({ length: 12 }, (_, i) => ({ 
      name: `Member ${i + 1}`, 
      image: `https://via.placeholder.com/60?text=M${i + 1}` 
    }))
  }
];

const totalMembers = computed(() => 
  committees.reduce((sum, committee) => sum + committee.heads.length + committee.members.length, 0)
);

const emit = defineEmits(['go-back']);

const goBack = () => {
  emit('go-back');
};
</script>

<style scoped>
.teams-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
  padding: 4rem 1rem;
}

:root.light-mode .teams-page {
  background: var(--bg-primary);
}

:root.dark-mode .teams-page {
  background: var(--bg-primary);
}

/* Header */
.teams-header {
  max-width: 900px;
  margin: 0 auto 4rem;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

:root.light-mode .teams-header {
  background: #CBD5E1;
}

:root.dark-mode .teams-header {
  background: #334155;
}

.teams-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

:root.dark-mode .teams-header h1 {
  color: #DDA15E;
  -webkit-text-fill-color: unset;
}

.teams-subtitle {
  font-size: 1.25rem;
  color: #606C38;
  margin-bottom: 1rem;
  font-weight: 600;
}

:root.dark-mode .teams-subtitle {
  color: #DDA15E;
}

.teams-description {
  font-size: 1.05rem;
  color: #64748b;
  line-height: 1.6;
}

:root.dark-mode .teams-description {
  color: #cbd5e1;
}

/* Committees Grid */
.committees-section {
  max-width: 1200px;
  margin: 0 auto 4rem;
}

.committees-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .committees-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.committee-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #BC6C25;
  position: relative;
  overflow: hidden;
  min-height: 550px;
}

:root.light-mode .committee-card {
  background: #CBD5E1;
}

:root.dark-mode .committee-card {
  background: #334155;
  border-left-color: #DDA15E;
}

.committee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(188, 108, 37, 0.15);
}

.committee-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.committee-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
}

:root.dark-mode .committee-name {
  color: #f1f5f9;
}

.member-count {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.committee-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 1rem 0 0 0;
}

:root.dark-mode .committee-description {
  color: #cbd5e1;
}

.committee-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  opacity: 0.1;
  color: #BC6C25;
}

:root.dark-mode .committee-icon {
  color: #DDA15E;
}

/* Heads Section */
.heads-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #E2E8F0;
}

:root.dark-mode .heads-section {
  border-top-color: #475569;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #BC6C25;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

:root.dark-mode .section-title {
  color: #DDA15E;
}

.heads-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Members Section */
.members-section {
  margin-top: 1.5rem;
}

.members-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 1rem;
}

/* Member Item (Individual) */
.member-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease;
}

.head-item {
  flex-direction: row;
  align-items: flex-start;
  text-align: left;
  gap: 1rem;
}

.member-item:hover {
  transform: translateY(-3px);
}

.member-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #BC6C25;
  transition: all 0.3s ease;
}

.head-item .member-image {
  width: 70px;
  height: 70px;
  border: 3px solid #BC6C25;
}

:root.dark-mode .member-image {
  border-color: #DDA15E;
}

.member-item:hover .member-image {
  border-color: #DDA15E;
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.2);
}

:root.dark-mode .member-item:hover .member-image {
  box-shadow: 0 4px 12px rgba(221, 161, 94, 0.3);
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

:root.dark-mode .member-name {
  color: #f1f5f9;
}

.head-item .member-name {
  font-size: 0.95rem;
}

.member-role {
  font-size: 0.8rem;
  color: #BC6C25;
  margin: 0.25rem 0 0 0;
  font-weight: 500;
}

:root.dark-mode .member-role {
  color: #DDA15E;
}

/* Stats Section */
.stats-section {
  max-width: 1200px;
  margin: 0 auto 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stats-card {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.05rem;
  opacity: 0.95;
  margin: 0;
}

/* Back Button */
.back-button-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.back-button {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.25);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(188, 108, 37, 0.35);
  background: linear-gradient(135deg, #DDA15E 0%, #BC6C25 100%);
}

.back-button:active {
  transform: translateY(0px);
}

@media (max-width: 768px) {
  .teams-page {
    padding: 2rem 1rem;
  }

  .teams-header {
    margin-bottom: 2rem;
    padding: 1.5rem;
  }

  .teams-header h1 {
    font-size: 2rem;
  }

  .teams-subtitle {
    font-size: 1.1rem;
  }

  .committees-section {
    margin-bottom: 2rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}
</style>

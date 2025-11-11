<template>
  <Navbar />
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
            <span class="member-count">{{ committee.heads.length + committee.members.length + (committee.blockReps?.length || 0) + (committee.projectManagers?.length || 0) }} members</span>
          </div>
          <p class="committee-description">{{ committee.description }}</p>
          
          <!-- Project Managers Section -->
          <div v-if="committee.projectManagers && committee.projectManagers.length > 0" class="project-managers-section">
            <h3 class="section-title">Overseeing Project Managers</h3>
            <div class="project-managers-container two-column">
              <div v-for="(manager, managerIndex) in committee.projectManagers" :key="`manager-${managerIndex}`" class="member-item head-item">
                <img :src="manager.image" :alt="manager.name" class="member-image">
                <div class="member-info">
                  <p class="member-name">{{ manager.name }}</p>
                  <p class="member-role">{{ manager.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Block Representatives Section -->
          <div v-if="committee.blockReps && committee.blockReps.length > 0" class="block-reps-section">
            <h3 class="section-title">Block Representatives</h3>
            <div class="block-reps-container two-column">
              <div v-for="(rep, repIndex) in committee.blockReps" :key="`rep-${repIndex}`" class="member-item head-item">
                <img :src="rep.image" :alt="rep.name" class="member-image">
                <div class="member-info">
                  <p class="member-name">{{ rep.name }}</p>
                  <p class="member-role">{{ rep.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Committee Heads Section -->
          <div v-if="committee.heads.length > 0" class="heads-section">
            <h3 class="section-title">{{ committee.blockReps ? 'Committee Heads' : 'Committee Heads' }}</h3>
            <div class="heads-container" :class="{ 'two-column': committee.blockReps }">
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
            <div class="members-list">
              <div v-for="(member, memberIndex) in committee.members" :key="`member-${memberIndex}`" class="member-name-text">
                <User :size="16" class="member-icon" />
                <span>{{ member.name }}</span>
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
import { Users, User } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const committees = [
  {
    name: 'PROJECT MANAGEMENT & OVERSIGHT COMMITTEE',
    description: 'Guides overall project direction, strategy, and ensures alignment with our mission to advance animal welfare. This committee comprises the heads of all major committees, block representatives, and overseeing project managers.',
    projectManagers: [
      { name: 'Yyannah Kiss S. Tan', role: 'Overseeing Project Manager', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Lucia Francheska G. Buhisan', role: 'Overseeing Project Manager', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    heads: [
      { name: 'Ela May S. Minerva', role: 'Committee Head - Content & Editorial', image: new URL('../assets/Minerva, Ela May - Head.JPG', import.meta.url).href },
      { name: 'Ken Cydric F. Ablir', role: 'Committee Head - Technical & Website Management', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Althea May Chiong', role: 'Committee Head - Creatives', image: new URL('../assets/Chiong, Althea May-Head.png', import.meta.url).href },
      { name: 'Pearl Odette M. Abcede', role: 'Committee Head - Publications & Promotions', image: new URL('../assets/ABCEDE, PEARL ODETTE M. - HEAD.jpg', import.meta.url).href },
      { name: 'Justine Hopia', role: 'Committee Head - Partnerships & Outreach', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Samantha Intong', role: 'Committee Head - Documentation & Archiving', image: new URL('../assets/Intong, Samantha Andrea - Head.jpg', import.meta.url).href },
      { name: 'Analysta D. Lagurin', role: 'Committee Head - Treasury', image: new URL('../assets/LAGURIN, ANALYSTA DATU- HEAD.jpg', import.meta.url).href },
      { name: 'Danielle Louiesse Dazo', role: 'Committee Head - Quality Assurance & Feedback', image: new URL('../assets/Dazo, Danielle Louiesse-Head.jpeg', import.meta.url).href },
      { name: 'Salyana Desnia L. Abuhon', role: 'Committee Head - Logistics & Operations', image: new URL('../assets/Abuhon, Salyana Desnia L. - Head.jpg', import.meta.url).href }
    ],
    blockReps: [
      { name: 'Block Representative 1', role: 'Block Representative', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Block Representative 2', role: 'Block Representative', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Block Representative 3', role: 'Block Representative', image: 'https://via.placeholder.com/80?text=Head' },
      { name: 'Block Representative 4', role: 'Block Representative', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: []
  },
  {
    name: 'CONTENT & EDITORIAL COMMITTEE',
    description: 'Curates, reviews, and oversees all content to ensure quality, accuracy, and relevance to our audience.',
    heads: [
      { name: 'Ela May S. Minerva', role: 'Committee Head', image: new URL('../assets/Minerva, Ela May - Head.JPG', import.meta.url).href }
    ],
    members: [
      { name: 'Janine D. Pantonial' },
      { name: 'Trexie Dace M. Amolat' },
      { name: 'Gerilde D. Maisog' },
      { name: 'Alexa Denise G. Jalop' },
      { name: 'Shayne Louisse M. Erandio' },
      { name: 'Simone P. Lanic' },
      { name: 'Christine Deanne Lynn B. Galela' },
      { name: 'Camella Jade D. Adelin' },
      { name: 'Jeth B. Bacala' },
      { name: 'Vhea Czaryse I. Loking' },
      { name: 'Evy Mariel D. Dabajo' },
      { name: 'Karylle Mae L. Galapin' },
      { name: 'Erritz Melody L. Aloyon' },
      { name: 'Vince Jeffrey P. Saligue' },
      { name: 'Katherine Joy J. Baclayo' },
      { name: 'Charm Amancio' },
      { name: 'Lorraine Jasmine Tumale' }
    ]
  },
  {
    name: 'TECHNICAL & WEBSITE MANAGEMENT COMMITTEE',
    description: 'Manages website infrastructure, functionality, updates, and ensures optimal user experience.',
    heads: [
      { name: 'Ken Cydric F. Ablir', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: [
      { name: 'Nicole Cabardo' },
      { name: 'Michelle Monot' },
      { name: 'Cherry Quiñonez' },
      { name: 'Jud Moreno' },
      { name: 'Charliemaine Cariaga' },
      { name: 'Tim Lance Dabon' },
      { name: 'Cyrus Casuela' },
      { name: 'Errich Wilson Seraspe' }
    ]
  },
  {
    name: 'CREATIVES COMMITTEE',
    description: 'Develops visual design, graphics, photography, and creative assets for all platforms.',
    heads: [
      { name: 'Althea May Chiong', role: 'Committee Head', image: new URL('../assets/Chiong, Althea May-Head.png', import.meta.url).href }
    ],
    members: [
      { name: 'Eric Galo' },
      { name: 'Mary Adecer' },
      { name: 'Alexa Astibe' },
      { name: 'Yrrah Orquillas' },
      { name: 'Kara Cabanog' },
      { name: 'Rea Baes' },
      { name: 'Richelle Panes' },
      { name: 'Jasmin Lauro' },
      { name: 'Bronzel Regidor' },
      { name: 'Tim Dabon' },
      { name: 'Ashlee Rama' },
      { name: 'Mynche Tidalgo' },
      { name: 'Aivan Andalesio' },
      { name: 'Bianca Cayanga' },
      { name: 'Marr Mongado' },
      { name: 'Dustin Caminade' },
      { name: 'Ivan Namalata' },
      { name: 'Ladyfer Obenieta' },
      { name: 'Lorraine Dayoc' },
      { name: 'Xanthe Dimalibot' },
      { name: 'Shane Mundo' },
      { name: 'Christine Chagas' },
      { name: 'Jhanelle Clor' }
    ]
  },
  {
    name: 'PUBLICATIONS & PROMOTIONS COMMITTEE',
    description: 'Handles marketing, social media campaigns, and strategic promotion of our initiatives.',
    heads: [
      { name: 'Pearl Odette M. Abcede', role: 'Committee Head', image: new URL('../assets/ABCEDE, PEARL ODETTE M. - HEAD.jpg', import.meta.url).href }
    ],
    members: [
      { name: 'Dei Salundaguit' },
      { name: 'Marianne Angela Langoyan' },
      { name: 'Felicity Franco' },
      { name: 'Shin Alexander D. Nercua' },
      { name: 'Alliah T. Fuerte' },
      { name: 'Aljo Luab Enriquez' },
      { name: 'Pauline Dominique V. Tamala' },
      { name: 'Janna Marie T. Paredes' },
      { name: 'Hannah Junel Matea V. Nini' },
      { name: 'Xyvyl Dhyn L. Jimenez' },
      { name: 'Gwyn Marie Gonzales' },
      { name: 'Irene Grace B. Reyes' },
      { name: 'Elyn-Je Pabualan' },
      { name: 'Gian Joshua D. Padullon' },
      { name: 'Carl Avila' },
      { name: 'Manuel Dela Merced' },
      { name: 'Kryssha Dane Auguis' },
      { name: 'Aya Shikinah F. Hibaler' },
      { name: 'Ian Zachary C. Nalangan' }
    ]
  },
  {
    name: 'PARTNERSHIPS & OUTREACH COMMITTEE',
    description: 'Builds relationships with organizations, coordinates collaborations, and expands our network.',
    heads: [
      { name: 'Justine Hopia', role: 'Committee Head', image: 'https://via.placeholder.com/80?text=Head' }
    ],
    members: [
      { name: 'Clarence Dave P. Jamisola' },
      { name: 'J Mendoza' },
      { name: 'Mary Joy L. Camarillo' },
      { name: 'Yanna Deguito' },
      { name: 'Niel Alberca' },
      { name: 'El-Issah Arenal' },
      { name: 'Ceejay Quiña' },
      { name: 'Miriam Dragon' },
      { name: 'Trisha Cabezas' },
      { name: 'Xyra Iniego' },
      { name: 'Leslee Delfin' },
      { name: 'Mark Laurenz Dela Cruz' },
      { name: 'Zaccheus Plaza' },
      { name: 'Alexa Paeste' },
      { name: 'Blessy Jane Jancinal' },
      { name: 'Shiangzane Laugo' },
      { name: 'Angelica Ybiernas' },
      { name: 'Louise Coleen Vergara' },
      { name: 'Mohaira Sacandal' },
      { name: 'Matthew Asumen' },
      { name: 'Joshua Millanes' },
      { name: 'Bianca Cordova' }
    ]
  },
  {
    name: 'DOCUMENTATION & ARCHIVING COMMITTEE',
    description: 'Maintains records, archives important information, and preserves our organizational knowledge.',
    heads: [
      { name: 'Samantha Intong', role: 'Committee Head', image: new URL('../assets/Intong, Samantha Andrea - Head.jpg', import.meta.url).href }
    ],
    members: [
      { name: 'Tasha Marieel Alejo' },
      { name: 'Francine Matias' },
      { name: 'Kristin Moreno' },
      { name: 'Devine Grace Montalaba' },
      { name: 'Frances Suba' },
      { name: 'Jerraine Siso' },
      { name: 'Abegail Valerio' },
      { name: 'Vyne Dagohoy' },
      { name: 'Shekinah Balmes' },
      { name: 'Earl Garnada' },
      { name: 'Zacchaeus Plaza' },
      { name: 'Janine Salvar' }
    ]
  },
  {
    name: 'TREASURY COMMITTEE',
    description: 'Manages finances, budgeting, and ensures responsible stewardship of resources.',
    heads: [
      { name: 'Analysta D. Lagurin', role: 'Committee Head', image: new URL('../assets/LAGURIN, ANALYSTA DATU- HEAD.jpg', import.meta.url).href }
    ],
    members: [
      { name: 'Alexah Sofia L. Simon' },
      { name: 'Reshelle Lyanara R. Libante' },
      { name: 'Leila Jean B. Arquintillo' },
      { name: 'John Lloyd S. Kuizon' },
      { name: 'Blessy Mae P. Francisco' },
      { name: 'Lestley Amihan' },
      { name: 'Bianca Issabel M. Bueno' },
      { name: 'Rylla Mae Zapata' }
    ]
  },
  {
    name: 'QUALITY ASSURANCE & FEEDBACK COMMITTEE',
    description: 'Reviews quality standards, gathers feedback, and implements continuous improvements.',
    heads: [
      { name: 'Danielle Louiesse Dazo', role: 'Committee Head', image: new URL('../assets/Dazo, Danielle Louiesse-Head.jpeg', import.meta.url).href }
    ],
    members: [
      { name: 'Emmanuel Baclig' },
      { name: 'Mara Jullienne Cañizares' },
      { name: 'Claire Gumahin' },
      { name: 'Joel Phillips Macrohon' },
      { name: 'Hazel Ann Meniano' },
      { name: 'Sophia Uzzielle Paalisbo' },
      { name: 'Christian Resma' },
      { name: 'Zyan Rivera' },
      { name: 'Josselle Silvestre' },
      { name: 'Mikyla Razel Tablon' },
      { name: 'Samantha Kate Williams' }
    ]
  },
  {
    name: 'LOGISTICS & OPERATIONS COMMITTEE',
    description: 'Coordinates operations, logistics, scheduling, and day-to-day organizational support.',
    heads: [
      { name: 'Salyana Desnia L. Abuhon', role: 'Committee Head', image: new URL('../assets/Abuhon, Salyana Desnia L. - Head.jpg', import.meta.url).href }
    ],
    members: [
      { name: 'Sire Vince P. Batilona' },
      { name: 'Ivan Manasses L. Briones' },
      { name: 'Christian Ben Ligan' },
      { name: 'Time Lance Dabon' },
      { name: 'Mike Jermaine Destajo' },
      { name: 'Brian Miguel A. Tejada' },
      { name: 'Maru R. Majorenos' },
      { name: 'Bea Ledonna Faye T. Tejada' },
      { name: 'Lean Derek L. Benolirao' },
      { name: 'Karyl Aren M. Cavan' },
      { name: 'Alex Krixannedra D. Pedrajas' },
      { name: 'Kizza Kate A. Dela Llana' },
      { name: 'Xyrich M. Esperil' }
    ]
  }
];

const totalMembers = computed(() => 
  committees.reduce((sum, committee) => sum + committee.heads.length + committee.members.length, 0)
);

const router = useRouter()

const goBack = () => {
  router.push('/about')
}
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
  background: transparent;
  border-radius: 0;
  box-shadow: none;
}

:root.light-mode .teams-header {
  background: transparent;
}

:root.dark-mode .teams-header {
  background: transparent;
}

.teams-header h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -1px;
}

:root.dark-mode .teams-header h1 {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.teams-subtitle {
  font-size: 1.25rem;
  color: #606C38;
  margin-bottom: 1rem;
  font-weight: 600;
}

:root.light-mode .teams-subtitle {
  color: #4B5563;
}

:root.dark-mode .teams-subtitle {
  color: #DDA15E;
}

.teams-description {
  font-size: 1.05rem;
  color: #64748b;
  line-height: 1.6;
}

:root.light-mode .teams-description {
  color: #4B5563;
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
  grid-template-columns: repeat(2, 1fr);
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
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  border-left: 4px solid #BC6C25;
  position: relative;
  overflow: hidden;
  min-height: 650px;
  backdrop-filter: blur(10px);
}

:root.light-mode .committee-card {
  background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 100%);
  color: #1F2937;
  border: 1px solid rgba(188, 108, 37, 0.1);
}

:root.dark-mode .committee-card {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%);
  border-left-color: #DDA15E;
  color: #f1f5f9;
  border: 1px solid rgba(221, 161, 94, 0.15);
}

.committee-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #BC6C25 0%, #DDA15E 50%, #A16207 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.committee-card:hover::before {
  opacity: 1;
}

.committee-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(188, 108, 37, 0.2);
}

:root.light-mode .committee-card:hover {
  box-shadow: 0 20px 40px rgba(188, 108, 37, 0.15), 0 0 40px rgba(188, 108, 37, 0.05);
  background: linear-gradient(135deg, #FFFFFF 0%, rgba(248, 250, 252, 0.98) 100%);
}

:root.dark-mode .committee-card:hover {
  box-shadow: 0 20px 40px rgba(221, 161, 94, 0.15), 0 0 40px rgba(221, 161, 94, 0.05);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%);
}

.committee-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(188, 108, 37, 0.1);
}

:root.dark-mode .committee-header {
  border-bottom-color: rgba(221, 161, 94, 0.15);
}

.committee-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
  background: linear-gradient(135deg, #BC6C25 0%, #A16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.light-mode .committee-name {
  color: #1F2937;
  background: linear-gradient(135deg, #BC6C25 0%, #A16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark-mode .committee-name {
  background: linear-gradient(135deg, #DDA15E 0%, #F4A460 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.member-count {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.3);
  transition: all 0.3s ease;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.member-count:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.4);
}

:root.dark-mode .member-count {
  box-shadow: 0 4px 15px rgba(221, 161, 94, 0.4);
}

:root.dark-mode .member-count:hover {
  box-shadow: 0 6px 20px rgba(221, 161, 94, 0.5);
}

.committee-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  padding: 0.75rem 1rem;
  background: rgba(188, 108, 37, 0.05);
  border-left: 3px solid #BC6C25;
  border-radius: 6px;
  transition: all 0.3s ease;
}

:root.light-mode .committee-description {
  color: #4B5563;
  background: linear-gradient(90deg, rgba(188, 108, 37, 0.08), rgba(188, 108, 37, 0.02));
  border-left-color: #BC6C25;
}

:root.dark-mode .committee-description {
  color: #cbd5e1;
  background: linear-gradient(90deg, rgba(221, 161, 94, 0.1), rgba(221, 161, 94, 0.03));
  border-left-color: #DDA15E;
}

.committee-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  opacity: 0.08;
  color: #BC6C25;
  transition: all 0.4s ease;
  transform: rotate(0deg);
}

:root.dark-mode .committee-icon {
  color: #DDA15E;
}

.committee-card:hover .committee-icon {
  opacity: 0.15;
  transform: rotate(15deg) scale(1.1);
}

/* Heads Section */
.heads-section, .block-reps-section, .project-managers-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(188, 108, 37, 0.15);
}

:root.dark-mode .heads-section {
  border-top-color: rgba(221, 161, 94, 0.2);
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #BC6C25;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #BC6C25 0%, #A16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark-mode .section-title {
  background: linear-gradient(90deg, #DDA15E 0%, #F4A460 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.heads-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.heads-container.two-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.block-reps-container,
.project-managers-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Members Section */
.members-section {
  margin-top: 1.5rem;
}

.members-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 2rem;
}

.member-name-text {
  font-size: 0.9rem;
  color: #1e293b;
  margin: 0;
  padding: 0.8rem 1rem;
  line-height: 1.5;
  position: relative;
  padding-left: 2.2rem;
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.08), rgba(221, 161, 94, 0.04));
  border-left: 3px solid #BC6C25;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 2px 8px rgba(188, 108, 37, 0.05);
}

.member-name-text:hover {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.15), rgba(221, 161, 94, 0.1));
  border-left-color: #DDA15E;
  padding-left: 2.4rem;
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.15);
  transform: translateX(6px);
}

.member-icon {
  color: #BC6C25;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.member-name-text:hover .member-icon {
  color: #DDA15E;
  transform: scale(1.2);
}

:root.light-mode .member-name-text {
  color: #1F2937;
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.08), rgba(221, 161, 94, 0.04));
  box-shadow: 0 2px 6px rgba(188, 108, 37, 0.06);
}

:root.light-mode .member-name-text:hover {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.18), rgba(221, 161, 94, 0.12));
  box-shadow: 0 6px 16px rgba(188, 108, 37, 0.12);
}

:root.dark-mode .member-name-text {
  color: #f1f5f9;
  background: linear-gradient(135deg, rgba(221, 161, 94, 0.12), rgba(188, 108, 37, 0.06));
  border-left-color: #DDA15E;
  box-shadow: 0 2px 8px rgba(221, 161, 94, 0.08);
}

:root.dark-mode .member-name-text:hover {
  background: linear-gradient(135deg, rgba(221, 161, 94, 0.2), rgba(188, 108, 37, 0.12));
  border-left-color: #F4A460;
  box-shadow: 0 6px 16px rgba(221, 161, 94, 0.15);
}

:root.dark-mode .member-icon {
  color: #DDA15E;
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

@media (max-width: 768px) {
  .project-managers-container,
  .block-reps-container {
    grid-template-columns: 1fr;
  }

  .project-managers-container .head-item,
  .block-reps-container .head-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .project-managers-container .member-image,
  .block-reps-container .member-image {
    width: 70px;
    height: 70px;
  }

  .project-managers-container .member-info,
  .block-reps-container .member-info {
    width: 100%;
  }

  .heads-container.two-column {
    grid-template-columns: 1fr;
  }

  .heads-container.two-column .head-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .heads-container.two-column .member-image {
    width: 70px;
    height: 70px;
  }

  .heads-container.two-column .member-info {
    width: 100%;
  }
}

.member-item:hover {
  transform: translateY(-3px);
}

.member-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #BC6C25;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.15);
}

.head-item .member-image {
  width: 80px;
  height: 80px;
  border: 3px solid #BC6C25;
  box-shadow: 0 6px 16px rgba(188, 108, 37, 0.25);
}

:root.dark-mode .member-image {
  border-color: #DDA15E;
  box-shadow: 0 4px 12px rgba(221, 161, 94, 0.2);
}

:root.dark-mode .head-item .member-image {
  box-shadow: 0 6px 16px rgba(221, 161, 94, 0.3);
}

.member-item:hover .member-image {
  border-color: #DDA15E;
  box-shadow: 0 8px 24px rgba(188, 108, 37, 0.35);
  transform: scale(1.05) rotate(-2deg);
}

:root.dark-mode .member-item:hover .member-image {
  box-shadow: 0 8px 24px rgba(221, 161, 94, 0.4);
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

:root.light-mode .member-name {
  color: #1F2937;
}

:root.dark-mode .member-name {
  color: #f1f5f9;
}

:root.light-mode .committee-card:hover .member-name {
  color: #1F2937;
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
  background: #5A7A94;
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(90, 122, 148, 0.2);
}

:root.dark-mode .stats-card {
  background: rgba(20, 30, 50, 0.8);
  border: 2px solid rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
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
  background: #4A6D42;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 109, 66, 0.25);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 109, 66, 0.35);
  background: #3D5C35;
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

  .members-list {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}
</style>

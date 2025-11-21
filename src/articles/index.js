// Personal Experiences
import article2 from './personal-experiences/article-2-vet-students-internship.js'
import article8 from './personal-experiences/article-8-busy-veterinarians.js'

// Professional Perspectives
import article7 from './professional-perspectives/article-7-compassion-fatigue.js'
import article9 from './professional-perspectives/article-9-snakes-welfare.js'
import article21 from './professional-perspectives/article-21-philippine-eagle.js'

// Educational Articles
import article1 from './educational-articles/article-1-handle-with-care.js'
import article3 from './educational-articles/article-3-poultry-welfare.js'
import article4 from './educational-articles/article-4-spay-neuter-campaigns.js'
import article5 from './educational-articles/article-5-humane-euthanasia.js'
import article6 from './educational-articles/article-6-tethering-dogs.js'
import article14 from './educational-articles/article-14-livestock-welfare.js'
import article15 from './educational-articles/article-15-mt-apo-eagle.js'
import article20 from './educational-articles/article-20-five-freedoms.js'
import article19 from './educational-articles/article-19-farm-to-table.js'
import article22 from './educational-articles/article-22-five-freedoms-analysis.js'

// Spotlight on Initiatives
import article10 from './spotlight-initiatives/article-10-anti-venom.js'
import article12 from './spotlight-initiatives/article-12-cnvr.js'
import article13 from './spotlight-initiatives/article-13-trailblazers.js'
import article16 from './spotlight-initiatives/article-16-animal-welfare-funding.js'
import article17 from './spotlight-initiatives/article-17-bark-pawgram.js'
import article18 from './spotlight-initiatives/article-18-repawnsible-parenting.js'

// Creative Expressions
import article11 from './creative-expressions/article-11-creative-works.js'

export const allArticles = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
  article21,
  article22
].sort((a, b) => a.id - b.id)

export default allArticles

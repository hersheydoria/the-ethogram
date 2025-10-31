<script setup>
import { ref, computed } from 'vue'
import Landing from './components/Landing.vue'
import Header from './components/Header.vue'
import BlogList from './components/BlogList.vue'
import BlogPost from './components/BlogPost.vue'
import Footer from './components/Footer.vue'
import AboutUs from './components/AboutUs.vue'
import Resources from './components/Resources.vue'
import Contribute from './components/Contribute.vue'

const currentPage = ref('landing') // 'landing', 'blog', 'about', 'resources', 'contribute'
const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedPostId = ref(null)

// All blog posts data
const allBlogPosts = ref([
  {
    id: 1,
    title: 'Animal Behavior and Stress Reduction in Clinical Setting',
    excerpt: 'Explore how understanding animal behavior helps reduce stress in veterinary clinical settings and improves patient care outcomes.',
    category: 'educational-articles',
    date: '2025-10-28',
    image: '🏥',
    imageUrl: 'https://images.unsplash.com/photo-1631217314830-d47c3c1cea12?w=500&h=300&fit=crop',
    readTime: '7 min read',
    media: [
      {
        type: 'image',
        title: 'Fear-Free Certification Benefits',
        description: 'Modern clinics implementing low-stress handling techniques show improved animal outcomes'
      }
    ],
    relatedLinks: [
      {
        name: 'Fear Free Pets',
        url: 'https://www.fearfreehappyhomes.com/',
        icon: '🔗'
      },
      {
        name: 'International Veterinary Academy of Pain Management',
        url: 'https://www.ivapm.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>Understanding Animal Behavior in Clinical Settings</h2>
      <p>Animal behavior plays a crucial role in veterinary medicine. Understanding how animals respond to stress, fear, and unfamiliar environments helps veterinarians provide better care and reduce anxiety in their patients.</p>
      
      <h3>The Impact of Stress on Animals</h3>
      <p>When animals experience stress in clinical settings, they may exhibit various behavioral changes including:</p>
      <ul>
        <li>Increased heart rate and blood pressure</li>
        <li>Aggression or defensive behavior</li>
        <li>Withdrawal and lethargy</li>
        <li>Loss of appetite</li>
        <li>Difficulty with procedures and examinations</li>
      </ul>
      
      <h3>Techniques for Stress Reduction</h3>
      <p>Modern veterinary clinics are implementing several evidence-based techniques to minimize stress:</p>
      
      <h4>1. Fear-Free Certification</h4>
      <p>Many veterinarians are obtaining Fear-Free certification to create anxiety-reducing environments. This includes gentle handling techniques, calming music, and familiar comfort items.</p>
      
      <h4>2. Environmental Modifications</h4>
      <p>Clinics are redesigning spaces with soft lighting, reducing noise levels, and creating separate waiting areas for cats and dogs to prevent cross-species stress.</p>
      
      <h4>3. Behavioral Protocols</h4>
      <p>Staff training on proper restraint techniques and animal body language helps minimize fear responses and build trust with animals.</p>
      
      <h3>Benefits of Low-Stress Handling</h3>
      <blockquote>
        Research shows that low-stress handling not only improves animal welfare but also leads to better diagnostic outcomes and faster recovery from procedures.
      </blockquote>
      
      <p>By prioritizing animal behavior and stress reduction, veterinary clinics create a more humane healthcare experience for their patients while improving the efficiency of their treatments.</p>
    `
  },
  {
    id: 2,
    title: 'Stories from the Veterinary Students During Their Internships',
    excerpt: 'Real experiences and insights from veterinary students during their clinical rotations. Learn from their journey in animal care.',
    category: 'personal-experiences',
    date: '2025-10-27',
    image: '👨‍🎓',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop',
    readTime: '6 min read',
    media: [
      {
        type: 'image',
        title: 'Veterinary Internship Experience',
        description: 'Students learning hands-on surgical and diagnostic skills'
      }
    ],
    relatedLinks: [
      {
        name: 'Association of American Veterinary Medical Colleges',
        url: 'https://www.aavmc.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>Learning Through Hands-On Experience</h2>
      <p>Veterinary internships provide invaluable real-world experience that textbooks cannot offer. Let's explore some inspiring stories from veterinary students during their clinical rotations.</p>
      
      <h3>The First Emergency Surgery</h3>
      <p>Maria, a third-year veterinary student, recalls her first experience assisting in an emergency surgery: "I was nervous, but the attending veterinarian walked me through every step. Seeing a dog recover after a complex procedure was incredibly rewarding. It reminded me why I chose this profession."</p>
      
      <h3>Building Relationships with Clients</h3>
      <p>Good veterinary practice goes beyond medical knowledge. During his rotation in small animal medicine, James learned the importance of clear communication: "I realized that explaining conditions and treatment options in simple terms builds trust with pet owners and leads to better compliance with medical recommendations."</p>
      
      <h3>Challenges and Growth</h3>
      <h4>Dealing with Loss</h4>
      <p>One of the hardest lessons came when students had to help with euthanasia procedures. Many students noted that compassionate end-of-life care is an essential part of veterinary medicine that requires both technical skill and emotional intelligence.</p>
      
      <h4>Time Management</h4>
      <p>Balancing multiple cases, administrative duties, and continuing education during long shifts taught students the importance of organization and prioritization.</p>
      
      <h3>Key Takeaways</h3>
      <ul>
        <li>Hands-on experience accelerates learning and skill development</li>
        <li>Communication skills are as important as technical knowledge</li>
        <li>Compassion and empathy are essential qualities in veterinary medicine</li>
        <li>Teamwork and collaboration make clinics function effectively</li>
      </ul>
      
      <p>These internship experiences shape the next generation of veterinarians and instill in them the importance of animal welfare and ethical practice.</p>
    `
  },
  {
    id: 3,
    title: 'The Importance of Spay/Neuter Campaigns',
    excerpt: 'Explore the critical role of spay/neuter campaigns in population control, disease prevention, and animal welfare outcomes.',
    category: 'spotlight-initiatives',
    date: '2025-10-26',
    image: '🏥',
    imageUrl: 'https://images.unsplash.com/photo-1587300411107-ec26199fb4b1?w=500&h=300&fit=crop',
    readTime: '5 min read',
    media: [
      {
        type: 'image',
        title: 'Spay/Neuter Clinic Operations',
        description: 'Community spay/neuter clinics providing affordable services to pet owners'
      }
    ],
    relatedLinks: [
      {
        name: 'Spay/Neuter Awareness',
        url: 'https://www.avma.org/',
        icon: '🔗'
      },
      {
        name: 'Humane Society - Spay/Neuter Resources',
        url: 'https://www.humanesociety.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>Why Spay and Neuter Programs Matter</h2>
      <p>Spaying and neutering are among the most important interventions in animal welfare. These procedures have significant benefits for individual animals and populations alike.</p>
      
      <h3>Population Control</h3>
      <p>The statistics are staggering: millions of unwanted animals end up in shelters each year. Spay and neuter programs are the most effective way to prevent overpopulation:</p>
      <ul>
        <li>One unspayed female dog can produce 2 litters per year with 6-10 puppies each</li>
        <li>Within 7 years, that one dog could result in over 4,000 descendants</li>
        <li>Spaying or neutering prevents this exponential growth</li>
      </ul>
      
      <h3>Health Benefits</h3>
      <h4>For Female Animals</h4>
      <p>Spaying eliminates the risk of uterine infections (pyometra) and significantly reduces the risk of breast cancer, especially when performed before the first heat cycle.</p>
      
      <h4>For Male Animals</h4>
      <p>Neutering prevents testicular cancer and reduces the risk of prostate problems. It also reduces aggressive behavior and roaming tendencies.</p>
      
      <h3>Behavioral Improvements</h3>
      <p>Spayed and neutered animals tend to:</p>
      <ul>
        <li>Show reduced aggression</li>
        <li>Have fewer urinary marking issues</li>
        <li>Display reduced roaming behaviors</li>
        <li>Be more focused and trainable</li>
      </ul>
      
      <h3>Community Campaigns</h3>
      <p>Many communities run subsidized spay/neuter clinics to make the procedure affordable for low-income pet owners. These programs have shown tremendous success in reducing shelter intake and euthanasia rates.</p>
      
      <h3>The Bottom Line</h3>
      <blockquote>
        Spaying and neutering is not just about pet population control—it's about preventing suffering, improving individual animal health, and creating more humane communities.
      </blockquote>
    `
  },
  {
    id: 4,
    title: 'Humane Euthanasia and Its Ethical Considerations',
    excerpt: 'An in-depth discussion on the ethical implications, protocols, and compassionate approaches to end-of-life care for animals.',
    category: 'personal-perspectives',
    date: '2025-10-25',
    image: '💙',
    imageUrl: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=500&h=300&fit=crop',
    readTime: '8 min read',
    relatedLinks: [
      {
        name: 'AVMA Guidelines on Euthanasia',
        url: 'https://www.avma.org/',
        icon: '🔗'
      },
      {
        name: 'Pet Loss Support Groups',
        url: 'https://www.iahaio.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>The Ethics of Humane Euthanasia</h2>
      <p>One of the most challenging aspects of veterinary medicine is providing humane euthanasia when an animal's quality of life can no longer be maintained. This decision requires careful ethical consideration.</p>
      
      <h3>Understanding Quality of Life</h3>
      <p>The primary factor in euthanasia decisions is an animal's quality of life. Veterinarians use the HHHHHMM scale to evaluate this:</p>
      <ul>
        <li><strong>H</strong>urt - Is pain present?</li>
        <li><strong>H</strong>ungry - Can the animal eat adequately?</li>
        <li><strong>H</strong>ydration - Can the animal drink adequately?</li>
        <li><strong>H</strong>ygiene - Can the animal keep itself clean?</li>
        <li><strong>H</strong>appiness - Can the animal engage in activities it enjoys?</li>
        <li><strong>H</strong>ope - Is there a reasonable chance of improvement?</li>
        <li><strong>M</strong>obility - Can the animal move adequately?</li>
        <li><strong>M</strong>ore good days than bad - Overall quality assessment</li>
      </ul>
      
      <h3>The Euthanasia Process</h3>
      <p>Humane euthanasia typically involves a two-step process:</p>
      <ol>
        <li>Sedation or anesthesia to ensure the animal feels no pain</li>
        <li>Administration of an overdose of anesthetic agent to stop vital functions</li>
      </ol>
      
      <h3>Ethical Principles</h3>
      <h4>Autonomy and Decision-Making</h4>
      <p>Pet owners must make informed decisions about their animal's care. Veterinarians have an ethical obligation to provide honest, compassionate communication about prognosis and options.</p>
      
      <h4>Preventing Suffering</h4>
      <p>The primary ethical principle is to prevent unnecessary suffering. When treatment is no longer beneficial, euthanasia can be the most humane option.</p>
      
      <h3>Supporting Pet Owners</h3>
      <p>Many veterinary clinics now offer grief counseling and memorial services to help pet owners process their loss. This support is an important part of compassionate veterinary care.</p>
      
      <h3>Professional Support for Veterinarians</h3>
      <p>Performing euthanasia regularly can take an emotional toll on veterinary professionals. Many clinics now provide support and counseling for staff members dealing with compassion fatigue.</p>
      
      <blockquote>
        Euthanasia, when performed with compassion and ethical consideration, is an act of kindness that prevents suffering.
      </blockquote>
    `
  },
  {
    id: 5,
    title: 'Emotional Resilience and Compassion Fatigue Among Veterinarians',
    excerpt: 'Understanding the mental health challenges veterinarians face and strategies to build resilience and prevent burnout.',
    category: 'personal-perspectives',
    date: '2025-10-24',
    image: '❤️',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-1c5f9dd4ee56?w=500&h=300&fit=crop',
    readTime: '7 min read',
    relatedLinks: [
      {
        name: 'Veterinary Mental Health Resources',
        url: 'https://www.aaha.org/',
        icon: '🔗'
      },
      {
        name: 'AVMA Wellbeing Resources',
        url: 'https://www.avma.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>The Hidden Struggle of Veterinary Professionals</h2>
      <p>Veterinary medicine is a noble profession, but it comes with significant emotional challenges. Compassion fatigue—the emotional exhaustion that results from caring for suffering animals—affects many practitioners.</p>
      
      <h3>What is Compassion Fatigue?</h3>
      <p>Compassion fatigue is a state of physical and emotional exhaustion that develops as a result of prolonged exposure to emotionally demanding situations. Common symptoms include:</p>
      <ul>
        <li>Emotional numbness</li>
        <li>Reduced empathy</li>
        <li>Loss of motivation</li>
        <li>Sleep disturbances</li>
        <li>Physical symptoms like headaches and body pain</li>
      </ul>
      
      <h3>Stressors in Veterinary Practice</h3>
      <h4>Emotional Burden</h4>
      <p>Daily exposure to animal suffering, performing euthanasia, and delivering bad news to pet owners creates significant emotional stress.</p>
      
      <h4>High Pressure and Long Hours</h4>
      <p>Emergency veterinary work involves high-stakes decisions, long shifts, and physical exhaustion that compounds emotional stress.</p>
      
      <h4>Financial Stress</h4>
      <p>Many veterinarians face student debt and financial pressures that add to their overall stress levels.</p>
      
      <h3>Building Emotional Resilience</h3>
      <h4>Healthy Coping Mechanisms</h4>
      <ul>
        <li>Regular exercise and physical activity</li>
        <li>Mindfulness and meditation practices</li>
        <li>Maintaining work-life balance</li>
        <li>Pursuing hobbies and interests outside of work</li>
      </ul>
      
      <h4>Professional Support</h4>
      <p>Many veterinary organizations now recognize the importance of mental health support, offering counseling services, peer support groups, and wellness programs.</p>
      
      <h3>Workplace Changes</h4>
      <p>Progressive clinics are implementing:</p>
      <ul>
        <li>Flexible scheduling to prevent burnout</li>
        <li>Team debriefings after difficult cases</li>
        <li>Mental health resources and referrals</li>
        <li>Professional development opportunities</li>
      </ul>
      
      <blockquote>
        Taking care of veterinary professionals' mental health is not a luxury—it's essential for maintaining high-quality animal care.
      </blockquote>
    `
  },
  {
    id: 6,
    title: 'Experiences as Pet Owners Implementing Animal Welfare Practices',
    excerpt: 'Personal stories and experiences from pet owners who actively implement animal welfare practices in their daily lives.',
    category: 'personal-experiences',
    date: '2025-10-23',
    image: '🐕',
    imageUrl: 'https://images.unsplash.com/photo-1587300411107-ec26199fb4b1?w=500&h=300&fit=crop',
    readTime: '6 min read',
    media: [
      {
        type: 'image',
        title: 'Pet Enrichment Ideas',
        description: 'Creative ways to create enriching environments for cats and dogs'
      }
    ],
    relatedLinks: [
      {
        name: 'Fear Free Pets - Happy Homes',
        url: 'https://www.fearfreehappyhomes.com/',
        icon: '🔗'
      },
      {
        name: 'International Association of Canine Professionals',
        url: 'https://www.iacp.org/',
        icon: '🔗'
      }
    ],
    content: `
      <h2>Pet Ownership and Animal Welfare at Home</h2>
      <p>Responsible pet ownership is the foundation of good animal welfare. Pet owners share their practical experiences implementing humane practices at home.</p>
      
      <h3>Creating a Safe and Enriching Environment</h3>
      <h4>Sarah's Story: Creating a Feline Paradise</h4>
      <p>"When I adopted my two cats, I wanted to create an environment where they could express natural behaviors. I built vertical spaces with cat trees, installed window perches, and rotated toys regularly. I noticed they're calmer and happier when they have space to climb and explore."</p>
      
      <h3>Nutrition and Health Practices</h3>
      <h4>David's Commitment to Quality Nutrition</h4>
      <p>"I learned that what goes into my dog's bowl directly affects his health. I switched to high-quality dog food recommended by my veterinarian and saw improvements in his coat, energy levels, and digestive health."</p>
      
      <h3>Exercise and Mental Stimulation</h3>
      <p>Pet owners emphasize the importance of:</p>
      <ul>
        <li>Daily walks and playtime</li>
        <li>Interactive toys and games</li>
        <li>Training sessions that provide mental challenges</li>
        <li>Socialization with other animals and people</li>
      </ul>
      
      <h3>Preventive Healthcare</h3>
      <h4>Regular Veterinary Care</h4>
      <p>Responsible pet owners prioritize regular checkups, vaccinations, and preventive treatments to catch health issues early.</p>
      
      <h3>Addressing Behavioral Issues Humanely</h3>
      <p>Many pet owners are moving away from punishment-based training methods toward positive reinforcement and professional training when needed.</p>
      
      <h3>The Pet Owner's Impact</h3>
      <blockquote>
        Every daily choice we make as pet owners—from the food we provide to how we interact with our animals—directly impacts their welfare and quality of life.
      </blockquote>
    `
  },
  {
    id: 7,
    title: 'From Bite to Cure: Anti-Venom Accessibility and Awareness',
    excerpt: 'An interview with wildlife specialists about anti-venom programs, snake bite prevention, and conservation efforts.',
    category: 'educational-articles',
    date: '2025-10-22',
    image: '🐍',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=300&fit=crop',
    readTime: '9 min read',
    content: `
      <h2>An Interview on Anti-Venom Access and Community Education</h2>
      
      <h3>The Challenge of Snake Bite Management</h3>
      <p>Dr. Ramos, a wildlife veterinarian with 15 years of experience, discusses the critical issue of anti-venom accessibility in rural communities.</p>
      
      <h4>Q: What are the main challenges in anti-venom availability?</h4>
      <p><strong>Dr. Ramos:</strong> "In rural areas, anti-venom availability is inconsistent. Some clinics don't stock it due to cost and short shelf life. When a snake bite occurs, the critical window for treatment can be lost during transport to a facility that has anti-venom."</p>
      
      <h4>Q: How common are snake bites in your area?</h4>
      <p><strong>Dr. Ramos:</strong> "We see about 50-100 snake bite cases annually in this region. About 80% are dry bites with no venom injection, but we can't know without treatment. The other 20% can be life-threatening if not treated quickly."</p>
      
      <h3>Knowledge Gaps in the Community</h3>
      <h4>Q: What misconceptions do pet owners have?</h4>
      <p><strong>Dr. Ramos:</strong> "Many people think traditional remedies like applying mud or tourniquet application will help. These often make things worse. First aid should involve immobilization and immediate veterinary care."</p>
      
      <h3>Solutions and Recommendations</h3>
      <h4>Community Education Programs</h4>
      <p>Dr. Ramos has implemented education programs teaching pet owners about:</p>
      <ul>
        <li>Snake identification and behavior</li>
        <li>Proper first aid for snake bites</li>
        <li>When to seek emergency care</li>
        <li>Prevention strategies</li>
      </ul>
      
      <h4>Improving Accessibility</h4>
      <ul>
        <li>Establishing regional anti-venom storage centers</li>
        <li>Creating network agreements between clinics</li>
        <li>Training more professionals in snake bite management</li>
      </ul>
      
      <h3>Looking Forward</h3>
      <p>"With better education and improved access to anti-venom, we can significantly reduce mortality and morbidity from snake bites. It's about creating partnerships between veterinary clinics, wildlife organizations, and communities."</p>
    `
  },
  {
    id: 8,
    title: 'Creative Expressions: Artworks for Animal Advocacy',
    excerpt: 'Explore powerful artworks, photography, and creative works designed to raise awareness and advocate for animal welfare.',
    category: 'creative-expressions',
    date: '2025-10-21',
    image: '🎨',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    readTime: '4 min read',
    content: `
      <h2>Art as a Tool for Animal Advocacy</h2>
      <p>Art has a unique power to communicate messages about animal welfare in ways that statistics and research papers cannot. Through creative expression, artists raise awareness and inspire compassion.</p>
      
      <h3>Visual Art and Illustration</h3>
      <p>Artists are creating stunning visual representations of animal welfare issues that capture hearts and minds. From paintings depicting endangered species to digital art highlighting rescue stories, visual media makes abstract concepts concrete and emotional.</p>
      
      <h3>Photography as Documentation</h3>
      <p>Documentary photographers capture the realities of animal welfare—both the challenges and the triumphs. These images tell stories that words alone cannot convey.</p>
      
      <h3>Street Art and Murals</h3>
      <p>Communities are transforming public spaces with murals that celebrate local wildlife and promote conservation messages. These artworks make animal welfare visible in everyday spaces.</p>
      
      <h3>Digital and Interactive Art</h3>
      <p>Modern artists are using technology to create interactive experiences that engage audiences with animal welfare topics. Virtual reality experiences allow people to see the world from an animal's perspective.</p>
      
      <h3>The Impact of Art</h3>
      <blockquote>
        Art doesn't just reflect our values about animal welfare—it actively shapes them by touching hearts and inspiring action.
      </blockquote>
      
      <p>When we engage with art about animals, we're not just consuming content; we're joining a conversation about compassion and responsibility toward the creatures we share our planet with.</p>
    `
  },
  {
    id: 9,
    title: 'Shifting from Impoundment to CNVR for Better Animal Welfare',
    excerpt: 'A look at local and national campaigns shifting towards community-based animal welfare solutions instead of traditional impounding.',
    category: 'spotlight-initiatives',
    date: '2025-10-20',
    image: '🏘️',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop',
    readTime: '7 min read',
    content: `
      <h2>Beyond the Pound: Community-Centered Animal Welfare</h2>
      <p>Traditional animal control focused on impounding animals. Modern communities are shifting toward Trap-Neuter-Return (TNR) and community-based programs that are more humane and effective.</p>
      
      <h3>Understanding TNR/CNVR</h3>
      <p>Community-based Neuter/Vaccination/Return (CNVR) programs involve:</p>
      <ul>
        <li>Trapping community animals humanely</li>
        <li>Providing veterinary care (spay/neuter and vaccination)</li>
        <li>Returning animals to their communities with caretakers</li>
      </ul>
      
      <h3>Why CNVR is More Effective</h3>
      <h4>Population Control Without Killing</h4>
      <p>Unlike impoundment and euthanasia, CNVR humanely controls population while preserving animal life and community relationships.</p>
      
      <h4>Disease Prevention</h4>
      <p>Vaccination against rabies and other diseases occurs during the procedure, protecting both animals and the community.</p>
      
      <h4>Cost-Effectiveness</h4>
      <p>CNVR programs cost less than traditional animal control while achieving better outcomes.</p>
      
      <h3>Success Stories</h3>
      <p>Many communities have successfully implemented CNVR programs:</p>
      <ul>
        <li>Reduced stray populations by up to 85% over 5 years</li>
        <li>Decreased euthanasia rates significantly</li>
        <li>Improved community relationships with animals</li>
      </ul>
      
      <h3>Building Support for CNVR</h3>
      <p>Community education is essential. When residents understand the benefits of CNVR, they become advocates for the program.</p>
      
      <blockquote>
        CNVR represents a fundamental shift in how communities can care for animals—moving from control and elimination to compassion and stewardship.
      </blockquote>
    `
  },
  {
    id: 10,
    title: 'Previous Works: Spotlight on Current and Past Initiatives',
    excerpt: 'A comprehensive overview of major animal welfare initiatives and programs that have made significant impacts.',
    category: 'spotlight-initiatives',
    date: '2025-10-19',
    image: '⭐',
    imageUrl: 'https://images.unsplash.com/photo-1552582711-ddc88a101f64?w=500&h=300&fit=crop',
    readTime: '6 min read',
    image: '⭐',
    readTime: '5 min read',
    content: `
      <h2>Building on Past Success</h2>
      <p>Animal welfare initiatives often build on the work of those who came before. Recognizing and celebrating past achievements helps current projects learn and improve.</p>
      
      <h3>Notable Past Projects</h3>
      <h4>The Community Shelter Initiative (2022-2023)</h4>
      <p>This project established low-cost veterinary services in underserved communities, spaying and neutering over 2,000 animals and vaccinating thousands more.</p>
      
      <h4>Urban Wildlife Corridor Project (2021-2023)</h4>
      <p>Student leaders worked with city planners to create safe passages for wildlife, reducing animal-vehicle collisions by 40% in project areas.</p>
      
      <h3>Lessons Learned</h3>
      <ul>
        <li>Community partnerships are crucial to long-term success</li>
        <li>Education and awareness drive behavioral change</li>
        <li>Sustainable funding models are essential</li>
        <li>Student involvement creates lasting impact</li>
      </ul>
      
      <h3>Current Initiatives Building on Past Work</h3>
      <p>Today's projects are expanding on these foundations:</p>
      <ul>
        <li>Mobile veterinary clinics reaching more communities</li>
        <li>Extended wildlife corridor networks</li>
        <li>Youth mentorship programs in animal welfare</li>
      </ul>
      
      <h3>The Future</h3>
      <p>By documenting and celebrating past initiatives, we create a knowledge base that helps future projects succeed and expands the scope of animal welfare work in our communities.</p>
    `
  },
  {
    id: 11,
    title: 'Sustainable Livestock Management for Productivity and Welfare',
    excerpt: 'Best practices for managing livestock in ways that prioritize both animal welfare and sustainable agricultural practices.',
    category: 'educational-articles',
    date: '2025-10-18',
    image: '🐄',
    imageUrl: 'https://images.unsplash.com/photo-1552582711-ddc88a101f64?w=500&h=300&fit=crop',
    readTime: '6 min read',
    content: `
      <h2>Sustainable Farming and Animal Welfare</h2>
      <p>Sustainable livestock management ensures that animals are raised humanely while maintaining economic productivity. This is not an either-or choice—it's both.</p>
      
      <h3>Core Principles of Sustainable Livestock Management</h3>
      <h4>Natural Behavior Expression</h4>
      <p>Animals should be able to express natural behaviors such as grazing, foraging, and socializing. This improves both welfare and productivity.</p>
      
      <h4>Health and Disease Prevention</h4>
      <p>Prevention through proper housing, nutrition, and management reduces disease and the need for antibiotics.</p>
      
      <h4>Environmental Stewardship</h4>
      <p>Sustainable practices minimize environmental impact through:</p>
      <ul>
        <li>Rotational grazing</li>
        <li>Soil conservation</li>
        <li>Reduced chemical inputs</li>
        <li>Waste management systems</li>
      </ul>
      
      <h3>The Economics of Animal Welfare</h3>
      <p>Research consistently shows that welfare-focused farming is profitable:</p>
      <ul>
        <li>Healthier animals require less medical treatment</li>
        <li>Better nutrition improves productivity</li>
        <li>Reduced stress improves reproduction rates</li>
        <li>Consumers increasingly prefer responsibly-raised products</li>
      </ul>
      
      <h3>Practical Implementations</h3>
      <h4>Pasture-Based Systems</h4>
      <p>Allowing animals to graze on pasture improves their health, reduces disease, and produces higher-quality products.</p>
      
      <h4>Herd Management</h4>
      <p>Proper stocking densities and grouping strategies reduce stress and aggression among animals.</p>
      
      <h3>Moving Forward</h3>
      <blockquote>
        Sustainable livestock management proves that animal welfare and economic viability are not competing interests—they're complementary goals.
      </blockquote>
    `
  },
  {
    id: 12,
    title: 'Ethical Wildlife Conservation and Habitat Protection',
    excerpt: 'Comprehensive guide to ethical wildlife conservation practices that protect species and their natural habitats.',
    category: 'educational-articles',
    date: '2025-10-17',
    image: '🦁',
    imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&h=300&fit=crop',
    readTime: '7 min read',
    content: `
      <h2>Conservation with Compassion</h2>
      <p>Wildlife conservation must be grounded in ethical principles that respect animal welfare and ecological integrity. This means protecting not just individual species, but entire ecosystems.</p>
      
      <h3>The Importance of Habitat Protection</h3>
      <p>Habitat destruction is the primary driver of species extinction. Protecting natural habitats is fundamental to conservation:</p>
      <ul>
        <li>Forests provide shelter, food, and breeding grounds</li>
        <li>Wetlands support diverse species and ecosystems</li>
        <li>Grasslands maintain natural predator-prey relationships</li>
        <li>Marine habitats protect entire ocean ecosystems</li>
      </ul>
      
      <h3>Ethical Considerations in Conservation</h3>
      <h4>Animal Welfare in Research</h4>
      <p>Conservation efforts involving animal research must prioritize welfare, using minimal invasive techniques and anesthesia when necessary.</p>
      
      <h4>Human-Wildlife Conflict</h4>
      <p>Solutions must balance human needs with animal protection through:</p>
      <ul>
        <li>Habitat corridors allowing safe passage</li>
        <li>Community education and engagement</li>
        <li>Non-lethal conflict resolution</li>
      </ul>
      
      <h3>Community-Based Conservation</h3>
      <p>Successful conservation involves local communities as stewards rather than obstacles:</p>
      <ul>
        <li>Indigenous knowledge and practices</li>
        <li>Economic benefits from conservation</li>
        <li>Education and involvement programs</li>
      </ul>
      
      <h3>Global Conservation Efforts</h3>
      <p>From protecting endangered primates to preserving coral reefs, conservation efforts worldwide demonstrate humanity's capacity to change course and restore ecosystems.</p>
      
      <blockquote>
        Ethical wildlife conservation recognizes that humans are part of nature, not separate from it, and that our actions have consequences for all species.
      </blockquote>
    `
  },
  {
    id: 13,
    title: 'Recognizing and Preventing Animal Cruelty in the Community',
    excerpt: 'Understanding the signs of animal abuse and practical steps community members can take to report and prevent cruelty.',
    category: 'personal-perspectives',
    date: '2025-10-16',
    image: '🚨',
    imageUrl: 'https://images.unsplash.com/photo-1587462414519-83a904a5ce97?w=500&h=300&fit=crop',
    readTime: '6 min read',
    content: `
      <h2>Being a Voice for Voiceless Animals</h2>
      <p>Animal cruelty happens more often than we like to admit, but community awareness and action can prevent suffering and save lives.</p>
      
      <h3>Signs of Animal Cruelty</h3>
      <h4>Physical Signs</h4>
      <ul>
        <li>Visible injuries, scars, or untreated wounds</li>
        <li>Signs of malnutrition or dehydration</li>
        <li>Untreated parasites or infections</li>
        <li>Signs of overwork or exhaustion</li>
      </ul>
      
      <h4>Behavioral Signs</h4>
      <ul>
        <li>Extreme fear or aggression</li>
        <li>Lack of socialization or human contact</li>
        <li>Stereotypic behaviors (pacing, self-injury)</li>
        <li>Lack of appropriate shelter or living conditions</li>
      </ul>
      
      <h3>What You Can Do</h3>
      <h4>Document and Report</h4>
      <p>If you suspect animal cruelty:</p>
      <ol>
        <li>Photograph or video evidence (from a safe distance)</li>
        <li>Document specific observations and dates</li>
        <li>Report to local animal control or law enforcement</li>
        <li>Contact local animal welfare organizations</li>
      </ol>
      
      <h4>Support Investigations</h4>
      <p>Provide information to authorities investigating animal cruelty. Your eyewitness account may be crucial.</p>
      
      <h3>Prevention Through Education</h3>
      <p>Teaching children about animal welfare helps prevent future cruelty:</p>
      <ul>
        <li>Age-appropriate education about pet care</li>
        <li>Teaching empathy and respect for animals</li>
        <li>Explaining consequences of animal cruelty</li>
      </ul>
      
      <h3>Community Resources</h3>
      <p>Many communities have animal welfare hotlines and organizations ready to help. Knowing these resources allows quick reporting and intervention.</p>
      
      <blockquote>
        Every act of intervention against cruelty is an act of compassion that can change an animal's life.
      </blockquote>
    `
  },
  {
    id: 14,
    title: 'NGO and Government Projects in Animal Rescue and Protection',
    excerpt: 'Spotlight on significant rescue and protection projects run by NGOs and government agencies making real differences.',
    category: 'spotlight-initiatives',
    date: '2025-10-15',
    image: '🙏',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop',
    readTime: '7 min read',
    content: `
      <h2>Organized Efforts for Animal Protection</h2>
      <p>Non-governmental organizations and government agencies play crucial roles in rescuing and protecting animals. Their coordinated efforts save millions of lives annually.</p>
      
      <h3>The Role of NGOs</h3>
      <h4>Rescue Operations</h4>
      <p>NGOs conduct rescue operations for animals in:</p>
      <ul>
        <li>Disaster zones (earthquakes, floods, fires)</li>
        <li>Illegal trade and smuggling situations</li>
        <li>Abusive or neglectful situations</li>
        <li>Remote or inaccessible areas</li>
      </ul>
      
      <h4>Rehabilitation and Care</h4>
      <p>These organizations provide medical care, behavioral rehabilitation, and recovery services for traumatized animals.</p>
      
      <h3>Government Programs</h3>
      <h4>Animal Control Services</h4>
      <p>Government agencies enforce animal welfare laws and provide emergency services.</p>
      
      <h4>Wildlife Management</h4>
      <p>Government agencies manage wildlife populations and protect natural habitats.</p>
      
      <h3>Collaboration and Impact</h3>
      <p>When NGOs and government agencies work together, they achieve greater impact:</p>
      <ul>
        <li>Coordinated rescue operations</li>
        <li>Shared resources and expertise</li>
        <li>Consistent enforcement of animal welfare laws</li>
        <li>Comprehensive animal welfare programs</li>
      </ul>
      
      <h3>Examples of Successful Projects</h3>
      <p>Throughout the world, NGOs and government agencies have:</p>
      <ul>
        <li>Rescued and rehabilitated thousands of abused animals</li>
        <li>Saved endangered species from extinction</li>
        <li>Created sustainable sanctuaries and wildlife reserves</li>
        <li>Implemented community education and outreach programs</li>
      </ul>
      
      <blockquote>
        The combination of NGO passion and government resources creates powerful forces for animal protection.
      </blockquote>
    `
  },
  {
    id: 15,
    title: 'School-Led Outreach and Veterinary Missions',
    excerpt: 'How educational institutions are conducting community outreach and veterinary missions to provide care and awareness.',
    category: 'spotlight-initiatives',
    date: '2025-10-14',
    image: '🏫',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop',
    readTime: '6 min read',
    content: `
      <h2>Education in Action: School-Led Animal Welfare Initiatives</h2>
      <p>Educational institutions are at the forefront of animal welfare work, combining teaching, research, and community service.</p>
      
      <h3>Veterinary School Missions</h3>
      <h4>Free Clinic Days</h4>
      <p>Many veterinary schools operate free or low-cost clinics providing:</p>
      <ul>
        <li>Vaccinations and preventive care</li>
        <li>Spay and neuter services</li>
        <li>Dental procedures</li>
        <li>Basic diagnostic services</li>
      </ul>
      
      <h4>Community Education</h4>
      <p>Student-led education programs teach communities about:</p>
      <ul>
        <li>Responsible pet ownership</li>
        <li>Recognizing signs of animal illness or abuse</li>
        <li>Wildlife conservation</li>
        <li>Zoonotic disease prevention</li>
      </ul>
      
      <h3>International Missions</h3>
      <p>Veterinary schools often send teams to underserved communities internationally to:</p>
      <ul>
        <li>Provide emergency veterinary care</li>
        <li>Conduct spay and neuter programs</li>
        <li>Vaccinate animals against rabies and other diseases</li>
        <li>Train local veterinary practitioners</li>
      </ul>
      
      <h3>Research and Education</h3>
      <p>Schools conduct research on animal welfare issues relevant to their communities, creating evidence-based solutions.</p>
      
      <h3>Student Development</h3>
      <p>Participation in outreach programs gives students:</p>
      <ul>
        <li>Real-world clinical experience</li>
        <li>Understanding of community health needs</li>
        <li>Compassion and commitment to service</li>
        <li>Professional networking opportunities</li>
      </ul>
      
      <blockquote>
        When educational institutions engage in community animal welfare work, they create a win-win: providing needed services while training compassionate professionals.
      </blockquote>
    `
  },
  {
    id: 16,
    title: 'The One Health Approach: Animals, Humans, and Environment',
    excerpt: 'Understanding the interconnection between animal welfare, human health, and environmental protection in a holistic approach.',
    category: 'educational-articles',
    date: '2025-10-13',
    image: '🌍',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
    readTime: '8 min read',
    content: `
      <h2>One Health: A Unified Approach to Wellness</h2>
      <p>The health of humans, animals, and the environment are inextricably linked. The "One Health" approach recognizes this interdependence and promotes integrated solutions.</p>
      
      <h3>Understanding the Connections</h3>
      <h4>Zoonotic Diseases</h4>
      <p>75% of emerging infectious diseases are zoonotic—transmitted from animals to humans. Examples include:</p>
      <ul>
        <li>COVID-19 (likely animal origin)</li>
        <li>Avian influenza</li>
        <li>Ebola</li>
        <li>Rabies</li>
      </ul>
      <p>Better animal welfare and veterinary care prevent disease spread.</p>
      
      <h4>Environmental Health</h4>
      <p>Environmental degradation affects all species:</p>
      <ul>
        <li>Pollution affects both animals and human health</li>
        <li>Habitat loss increases human-wildlife conflict</li>
        <li>Climate change impacts all species</li>
        <li>Deforestation increases zoonotic disease transmission</li>
      </ul>
      
      <h3>Antibiotic Resistance: A One Health Issue</h3>
      <p>Overuse of antibiotics in both human medicine and animal agriculture drives resistance. One Health approaches include:</p>
      <ul>
        <li>Reducing unnecessary antibiotic use in livestock</li>
        <li>Improving animal welfare to reduce disease need</li>
        <li>Supporting antibiotic stewardship programs</li>
      </ul>
      
      <h3>Implementation of One Health</h3>
      <h4>Collaborative Teams</h4>
      <p>One Health requires collaboration between:</p>
      <ul>
        <li>Veterinarians</li>
        <li>Medical professionals</li>
        <li>Environmental specialists</li>
        <li>Public health officials</li>
      </ul>
      
      <h4>Policy and Prevention</h4>
      <p>One Health principles inform policies on:</p>
      <ul>
        <li>Disease surveillance and monitoring</li>
        <li>Livestock management practices</li>
        <li>Environmental protection</li>
        <li>Emergency preparedness</li>
      </ul>
      
      <h3>Real-World Impact</h3>
      <p>Countries implementing One Health approaches have achieved:</p>
      <ul>
        <li>Better disease outbreak prevention</li>
        <li>Improved public health outcomes</li>
        <li>Enhanced environmental protection</li>
        <li>More sustainable food systems</li>
      </ul>
      
      <blockquote>
        One Health recognizes that to protect human health, we must care for animals and the environment—they're not separate issues.
      </blockquote>
    `
  },
  {
    id: 17,
    title: 'Educational Articles: Responsible Pet Ownership',
    excerpt: 'Comprehensive guide to being a responsible pet owner, covering nutrition, healthcare, training, and ethical considerations.',
    category: 'educational-articles',
    date: '2025-10-12',
    image: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1587300411107-ec26199fb4b1?w=500&h=300&fit=crop',
    readTime: '9 min read',
    content: `
      <h2>The Complete Guide to Responsible Pet Ownership</h2>
      <p>Being a pet owner is a tremendous responsibility. This comprehensive guide covers everything you need to know to provide excellent care for your animal companion.</p>
      
      <h3>Before Getting a Pet</h3>
      <h4>Consider Your Lifestyle</h4>
      <ul>
        <li>Do you have enough time for daily care and interaction?</li>
        <li>Can you afford food, healthcare, and emergencies?</li>
        <li>Does your living situation allow pets?</li>
        <li>How long can you commit to the animal's lifetime?</li>
      </ul>
      
      <h4>Choose the Right Pet</h4>
      <p>Different animals have different needs. Consider:</p>
      <ul>
        <li>Energy levels and exercise needs</li>
        <li>Space requirements</li>
        <li>Lifespan and long-term care needs</li>
        <li>Potential allergies in your household</li>
      </ul>
      
      <h3>Nutrition and Health</h3>
      <h4>Proper Nutrition</h4>
      <ul>
        <li>Choose high-quality food appropriate for your pet's age and size</li>
        <li>Follow feeding guidelines on packaging</li>
        <li>Provide fresh water at all times</li>
        <li>Discuss nutrition with your veterinarian</li>
      </ul>
      
      <h4>Preventive Healthcare</h4>
      <ul>
        <li>Annual veterinary checkups (twice yearly for senior pets)</li>
        <li>Keep vaccinations current</li>
        <li>Regular parasite prevention</li>
        <li>Dental care</li>
        <li>Spay or neuter your pet</li>
      </ul>
      
      <h3>Exercise and Mental Stimulation</h3>
      <p>Different pets need different amounts of activity:</p>
      <ul>
        <li>Dogs need daily walks and playtime</li>
        <li>Cats need interactive toys and climbing structures</li>
        <li>Rabbits need space to run and explore</li>
        <li>Birds need mental enrichment and social interaction</li>
      </ul>
      
      <h3>Training and Behavior</h3>
      <ul>
        <li>Start training early using positive reinforcement</li>
        <li>Be consistent with rules and boundaries</li>
        <li>Seek professional help if behavior problems develop</li>
        <li>Never use punishment-based training methods</li>
      </ul>
      
      <h3>Creating a Safe Environment</h3>
      <ul>
        <li>Remove toxic substances (plants, chemicals, foods)</li>
        <li>Ensure proper identification (tags, microchip, collar)</li>
        <li>Create safe spaces where pets can retreat</li>
        <li>Pet-proof your home</li>
      </ul>
      
      <h3>Emergency Preparedness</h3>
      <ul>
        <li>Know the location of emergency veterinary clinics</li>
        <li>Keep emergency supplies and first aid kit</li>
        <li>Have photos of your pet for identification</li>
        <li>Have a plan for evacuation in emergencies</li>
      </ul>
      
      <h3>Socialization and Interaction</h3>
      <p>Regular social interaction with humans, other pets, and environments is crucial for a healthy, well-adjusted pet.</p>
      
      <blockquote>
        Responsible pet ownership is a lifelong commitment to providing the best possible care, love, and protection for your animal companion.
      </blockquote>
    `
  },
  {
    id: 18,
    title: 'Protecting the Philippine Eagle: The Phil. Eagle Foundation\'s Mission',
    excerpt: 'Documentary featuring the Philippine Eagle Foundation\'s crucial work in protecting and conserving the endangered Philippine Eagle.',
    category: 'spotlight-initiatives',
    date: '2025-10-11',
    image: '🦅',
    imageUrl: 'https://images.unsplash.com/photo-1552592081-6f9e8a3e2d9d?w=500&h=300&fit=crop',
    readTime: '10 min read',
    content: `
      <h2>Saving the Philippine Eagle: A Conservation Story</h2>
      <p>The Philippine Eagle, one of the world's rarest and most powerful birds, stands on the brink of extinction. The Philippine Eagle Foundation works tirelessly to save this national bird.</p>
      
      <h3>The Plight of the Philippine Eagle</h3>
      <h4>Extinction Risk</h4>
      <p>With fewer than 400 breeding pairs left in the wild, the Philippine Eagle is critically endangered. It has lost approximately 99.5% of its original population.</p>
      
      <h4>Main Threats</h4>
      <ul>
        <li><strong>Habitat Loss:</strong> Deforestation has destroyed over 90% of the old-growth forest where eagles nest</li>
        <li><strong>Shooting:</strong> Despite legal protection, eagles are illegally killed</li>
        <li><strong>Electrocution:</strong> Power lines cause fatal accidents</li>
        <li><strong>Pesticide Poisoning:</strong> Bioaccumulation of chemicals in their food chain</li>
        <li><strong>Low Reproduction Rate:</strong> Eagles produce only one chick every two years</li>
      </ul>
      
      <h3>The Philippine Eagle Foundation's Work</h3>
      <h4>Research and Monitoring</h4>
      <p>Scientists track wild eagle populations, study nesting behavior, and identify key habitat areas for protection.</p>
      
      <h4>Habitat Protection</h4>
      <p>The foundation works with communities and government to protect old-growth forests where eagles breed and hunt.</p>
      
      <h4>Community Engagement</h4>
      <p>Education programs teach local communities about the ecological importance of eagles and the need for protection. Alternative livelihoods programs reduce pressure on forests.</p>
      
      <h4>Captive Breeding Program</h4>
      <p>While not a long-term solution, the foundation's breeding center helps maintain genetic diversity and serves educational purposes.</p>
      
      <h3>Success Stories</h3>
      <h4>Population Stabilization</h4>
      <p>In protected areas where forests remain intact and communities are engaged, eagle populations have stabilized and even increased slightly.</p>
      
      <h4>International Recognition</h4>
      <p>The foundation's work has garnered international support and funding, creating partnerships for conservation.</p>
      
      <h3>Hope for the Future</h3>
      <p>While challenges remain, the Philippine Eagle Foundation's work offers hope. Key factors for continued success include:</p>
      <ul>
        <li>Continued habitat protection and restoration</li>
        <li>Increased community involvement in conservation</li>
        <li>Stronger enforcement of protection laws</li>
        <li>Sustainable funding for long-term programs</li>
        <li>International cooperation and support</li>
      </ul>
      
      <h3>How You Can Help</h3>
      <ul>
        <li>Support the Philippine Eagle Foundation through donations</li>
        <li>Spread awareness about the Philippine Eagle's plight</li>
        <li>Support sustainable forestry and land management practices</li>
        <li>Advocate for stronger wildlife protection laws</li>
        <li>Participate in habitat restoration efforts</li>
      </ul>
      
      <blockquote>
        The Philippine Eagle's survival depends on our commitment to protecting not just the bird, but the ecosystems it depends on.
      </blockquote>
      
      <p>The Philippine Eagle Foundation's mission reminds us that every species has value, and that with dedication and community support, we can prevent extinction and restore our natural heritage.</p>
    `
  }
])

const selectedPost = computed(() => {
  return allBlogPosts.value.find(post => post.id === selectedPostId.value)
})

const handleCategoryChange = (category) => {
  selectedCategory.value = category
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

const handleFooterCategoryFilter = (category) => {
  currentPage.value = 'blog'
  selectedCategory.value = category
  selectedPostId.value = null
  window.scrollTo(0, 0)
}

const handleFooterNavigation = (linkType) => {
  // Handle navigation for different footer links
  const pageMap = {
    'about': 'about',
    'resources': 'resources',
    'contribute': 'contribute'
  }
  
  if (pageMap[linkType]) {
    currentPage.value = pageMap[linkType]
    window.scrollTo(0, 0)
  }
}

const handleNavigatePage = (page) => {
  // Handle navigation from dropdown menu
  const pageMap = {
    'about': 'about',
    'resources': 'resources',
    'contribute': 'contribute'
  }
  
  if (pageMap[page]) {
    currentPage.value = pageMap[page]
    window.scrollTo(0, 0)
  }
}
</script>

<template>
  <div class="app">
    <!-- Landing Page -->
    <template v-if="currentPage === 'landing'">
      <Landing @navigate-to-articles="goToArticles" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- Blog Page -->
    <template v-else-if="currentPage === 'blog'">
      <Header 
        :selected-category="selectedCategory"
        :search-query="searchQuery"
        @category-change="handleCategoryChange"
        @search="handleSearchQuery"
        @navigate-to-home="goToHome"
        @navigate-to-page="handleNavigatePage"
      />
      <template v-if="selectedPostId === null">
        <BlogList 
          :selected-category="selectedCategory" 
          :search-query="searchQuery"
          :all-posts="allBlogPosts" 
          @read-post="handleReadPost"
          @clear-filter="handleClearFilter"
          @clear-search="handleClearSearch"
        />
      </template>
      <template v-else>
        <BlogPost :post="selectedPost" @back="handleBackToList" />
      </template>
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- About Us Page -->
    <template v-else-if="currentPage === 'about'">
      <AboutUs @back="goToHome" @navigate-to-articles="goToArticles" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- Resources Page -->
    <template v-else-if="currentPage === 'resources'">
      <Resources @back="goToHome" @navigate-to-articles="goToArticles" />
      <Footer @category-filter="handleFooterCategoryFilter" @navigate="handleFooterNavigation" />
    </template>

    <!-- Contribute Page -->
    <template v-else-if="currentPage === 'contribute'">
      <Contribute @back="goToHome" @navigate-to-articles="goToArticles" />
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

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

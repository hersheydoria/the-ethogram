# Living Links - Animal Welfare Blog

![Living Links](https://img.shields.io/badge/Living_Links-Animal_Welfare-purple)
![Vue 3](https://img.shields.io/badge/Vue-3.5-green)
![Vite](https://img.shields.io/badge/Vite-7.1-blue)

A modern, responsive blog website dedicated to animal welfare for dogs and cats. Living Links provides valuable information, tips, and heartwarming stories about pet care and animal welfare.

## 🐾 Features

- **Responsive Design**: Beautiful layout that works seamlessly on desktop, tablet, and mobile devices
- **Category Filtering**: Easy navigation between Dogs, Cats, and Welfare articles
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Blog Posts**: Pre-populated with 9 engaging articles about animal welfare
- **Fast Performance**: Built with Vue 3 and Vite for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd living-links
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Build

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎨 Project Structure

```
living-links/
├── src/
│   ├── components/
│   │   ├── Header.vue       # Navigation and branding
│   │   ├── Hero.vue         # Welcome section
│   │   ├── BlogList.vue     # Blog posts container
│   │   ├── BlogCard.vue     # Individual blog post card
│   │   └── Footer.vue       # Footer with links
│   ├── App.vue              # Main application component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
└── package.json            # Project dependencies
```

## 🐕 Blog Categories

- **Dogs**: Articles about dog care, nutrition, training, and health
- **Cats**: Information about cat behavior, safety, and wellbeing
- **Welfare**: General animal welfare topics and adoption resources

## 🛠️ Technologies Used

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-generation frontend tooling
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features

## 📝 Adding New Blog Posts

To add new blog posts, edit the `blogPosts` array in `src/components/BlogList.vue`:

```javascript
{
  id: 10,
  title: 'Your Article Title',
  excerpt: 'A brief description of your article...',
  category: 'dogs', // 'dogs', 'cats', or 'welfare'
  date: '2025-10-30',
  image: '🐕', // Emoji icon
  readTime: '5 min read'
}
```

## 🤝 Contributing

We welcome contributions! Whether it's:
- Adding new blog content
- Improving the UI/UX
- Fixing bugs
- Adding new features

## 📄 License

This project is open source and available under the MIT License.

## 💙 About Living Links

Living Links is dedicated to improving the lives of dogs and cats through education, awareness, and community support. We believe in the power of information to create positive change in animal welfare.

---

Made with ❤️ for animals

# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases professional work, skills, and experience with a beautiful and interactive design.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Fast Performance**: Built with Next.js for optimal performance
- **SEO Optimized**: Proper meta tags and structured data
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Detailed project pages with filtering
- **Skills Visualization**: Interactive skill bars and categories
- **Experience Timeline**: Professional experience timeline
- **Social Integration**: Social media links and professional networks

## 📁 Project Structure

```
my-portfolio-v2/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── skills/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navigation.tsx
│       ├── HeroSection.tsx
│       ├── FeaturedProjects.tsx
│       ├── SkillsOverview.tsx
│       ├── ContactCTA.tsx
│       ├── AboutHero.tsx
│       ├── PersonalInfo.tsx
│       ├── ExperienceTimeline.tsx
│       ├── Education.tsx
│       ├── ProjectFilters.tsx
│       ├── ProjectsGrid.tsx
│       ├── SkillsHero.tsx
│       ├── SkillCategories.tsx
│       ├── ToolsAndTechnologies.tsx
│       ├── ContactHero.tsx
│       ├── ContactForm.tsx
│       └── ContactInfo.tsx
├── public/
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **React 19** - Latest React features
- **ESLint** - Code linting and formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-portfolio-v2.git
cd my-portfolio-v2
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization Guide

### Personal Information

1. **Update Personal Details**:

   - Edit `src/components/PersonalInfo.tsx` to update your personal information
   - Modify contact details in `src/components/ContactInfo.tsx`
   - Update social media links in the contact section

2. **Update Hero Section**:

   - Edit `src/components/HeroSection.tsx` to change your name, title, and description
   - Update statistics and experience numbers

3. **Update About Page**:

   - Modify `src/components/AboutHero.tsx` for your personal story
   - Update experience timeline in `src/components/ExperienceTimeline.tsx`
   - Edit education details in `src/components/Education.tsx`

4. **Update Projects**:

   - Edit project data in `src/components/FeaturedProjects.tsx` and `src/components/ProjectsGrid.tsx`
   - Add your own project images and descriptions
   - Update project links and technologies

5. **Update Skills**:
   - Modify skill levels in `src/components/SkillCategories.tsx`
   - Update additional skills in `src/components/ToolsAndTechnologies.tsx`

### Styling

1. **Colors**: The portfolio uses a blue-purple gradient theme. You can customize colors in the Tailwind classes throughout the components.

2. **Animations**: Custom animations are defined in `src/app/globals.css`. You can modify or add new animations as needed.

3. **Layout**: The layout is responsive and uses Tailwind's grid and flexbox utilities. Components are modular and easy to customize.

### Content Updates

1. **Meta Information**: Update SEO meta tags in `src/app/layout.tsx`
2. **Navigation**: Modify navigation items in `src/components/Navigation.tsx`
3. **Contact Form**: The contact form is currently a mock. You'll need to integrate with a backend service or email service like SendGrid, Formspree, or Netlify Forms.

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful gradient backgrounds throughout
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **Hover Effects**: Interactive hover states on cards and buttons
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Modern Typography**: Clean typography with proper hierarchy
- **Card-based Layout**: Modern card-based design for content sections

## 📱 Pages

1. **Home** (`/`) - Hero section, featured projects, skills overview, contact CTA
2. **About** (`/about`) - Personal story, experience timeline, education
3. **Projects** (`/projects`) - Project showcase with filtering
4. **Skills** (`/skills`) - Detailed skills and technologies
5. **Contact** (`/contact`) - Contact form and information

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Create components in `src/components/`
4. Update navigation in `src/components/Navigation.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify

### Other Platforms

The portfolio can be deployed to any static hosting platform that supports Next.js.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Note**: This is a template portfolio. Remember to replace all placeholder content with your own information, projects, and personal details before deploying.

# WeForward - Logistics & Freight Solutions

A modern, responsive website for WeForward logistics company built with React, TypeScript, and Firebase.

## 🚀 Features

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v3** - Utility-first CSS framework
- **Firebase** - Backend services for blog and authentication

### Website Features
- **� Modern Homepage** - Hero section with service showcase
- **📝 Blog System** - Dynamic blog with pagination and admin panel
- **� Contact Form** - EmailJS integration for contact inquiries
- **🎨 Beautiful UI** - Responsive design with smooth animations
- **⚡ Fast Performance** - Optimized bundles and lazy loading
- **� Admin Panel** - Blog management with authentication

## 🌐 Live Sections

### 1. Homepage
- Hero section with company branding
- Services showcase (Air, Sea, Road, Rail freight)
- Animated background and smooth transitions
- Contact information and call-to-action

### 2. Blog System
- Paginated blog posts (9 per page)
- Full-width image cards with hover effects
- Individual blog post pages
- Admin panel for content management

### 3. Admin Features
- Secure login system
- Add new blog posts with image upload
- View and delete existing posts
- Simple, intuitive interface

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd weforward

# Install dependencies
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── components/
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Site footer
│   ├── HeroSection.tsx        # Homepage hero
│   ├── Services.tsx           # Services showcase
│   ├── Contact.tsx            # Contact form
│   ├── Loader.tsx             # Loading screen
│   └── admin/                 # Admin panel components
├── pages/
│   ├── HomePage.tsx           # Main landing page
│   ├── BlogPage.tsx           # Blog listing with pagination
│   ├── BlogPostDetail.tsx     # Individual blog posts
│   └── admin/                 # Admin pages
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   └── utils.ts               # Utility functions
└── assets/                    # Images and static files
```

## � Deployment (cPanel)

### Build the Project
```bash
npm run build
```

### Upload to cPanel
1. Access your cPanel File Manager
2. Navigate to `public_html`
3. Upload ALL contents from the `dist/` folder
4. Ensure `.htaccess` file is uploaded for proper routing

### What Gets Deployed
- ✅ Static HTML, CSS, JS files
- ✅ Optimized images and assets  
- ✅ Firebase integration (hardcoded config)
- ✅ Client-side routing support
- ✅ Admin panel at `/admin/login`

See `CPANEL_DEPLOYMENT.md` for detailed deployment instructions.

## 📊 Performance Features
- **Code Splitting** - Lazy loading for admin routes
- **Bundle Optimization** - Manual chunk splitting
- **Image Optimization** - WebP format with optimized sizes
- **CSS Optimization** - Minimal CSS bundle with Tailwind

## 🔧 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend Services
- **Firebase Firestore** - Blog post storage
- **Firebase Auth** - Admin authentication
- **Firebase Storage** - Image uploads
- **EmailJS** - Contact form handling

### Build Tools
- **Vite** - Fast development and optimized builds
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development
```bash
# Clone the repository
git clone <your-repo-url>
cd weforward

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build  
npm run preview
```

## 📱 Features

### Homepage
- Modern hero section with company branding
- Animated service cards (Air, Sea, Road, Rail freight)
- Contact information and call-to-action
- Smooth scroll animations

### Blog System
- Paginated blog listing (9 posts per page)
- Full-width image cards with hover effects
- Individual blog post detail pages
- SEO-optimized content

### Admin Panel
- Secure authentication system
- Add new blog posts with image upload
- View and manage existing posts
- Simple, intuitive interface

### Contact
- EmailJS-powered contact form
- Form validation with error handling
- Responsive design

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**WeForward - Delivering Excellence in Logistics Solutions** 🚀

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React, TypeScript, Vite, and modern web technologies.

# 🍌 Banana AI Studio

A cutting-edge AI-powered image generation and editing platform built with React. Create stunning visuals, edit existing images with professional tools, and manage your creative projects all in one place.

![Banana AI Studio](https://img.shields.io/badge/AI%20Studio-v1.0.0-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)

## 🌟 Features

### 🎨 **AI Image Generation**
- Multiple AI models (Flux Pro, Imagen 4, Recraft V3, Ideogram V3)
- Text-to-image generation with customizable prompts
- Multiple aspect ratios and quality settings
- Style presets and advanced controls
- Real-time generation progress tracking

### 🖼️ **Professional Image Editor**
- Drag & drop image upload
- Professional filter presets (Vintage, Dramatic, Cool, Warm, etc.)
- AI-powered image enhancement (upscale, sharpen, denoise)
- AI modification with text prompts
- Real-time preview with undo/redo functionality

### 🖼️ **Smart Gallery Management**
- Organized image collection with search and filtering
- Multiple view modes (grid and list)
- Batch selection and operations
- Image download and export
- Automatic categorization by source type

### 🎯 **Modern UI/UX**
- Dark theme with neural network aesthetics
- Glass morphism design elements
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation and controls

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/j31k/Banana.git
   cd Banana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Or build and serve in one command
npm run serve
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Site footer
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Generator.jsx   # AI image generation
│   ├── Editor.jsx      # Image editing tools
│   └── Gallery.jsx     # Image management
├── hooks/              # Custom React hooks
│   └── useImageContext.jsx  # Global image state
├── utils/              # Utility functions
│   └── mockAI.js       # AI service simulation
├── styles/             # Styling
│   └── globals.css     # Global styles and variables
└── services/           # API and external services
```

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **React Router** - Client-side routing and navigation
- **React Konva** - Canvas manipulation and drawing
- **React Dropzone** - File upload with drag & drop
- **Vite** - Fast build tool and development server

### Styling
- **Custom CSS** - Modern CSS with CSS variables
- **Glass Morphism** - Contemporary design aesthetics
- **Responsive Design** - Mobile-first approach

### Backend (API Ready)
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **File Upload** - Multer for image handling
- **RESTful API** - Standard API endpoints

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080
VITE_AI_SERVICE_URL=your_ai_service_url

# Feature Flags
VITE_ENABLE_AI_GENERATION=true
VITE_ENABLE_IMAGE_UPLOAD=true
VITE_MAX_IMAGE_SIZE=10485760

# Analytics (optional)
VITE_ANALYTICS_ID=your_analytics_id
```

### AI Model Configuration
The application supports multiple AI models:

- **Flux Pro Ultra** - Fast, high-quality generation
- **Imagen 4** - Google's latest model
- **Recraft V3** - Realistic image specialist
- **Ideogram V3** - Character consistency expert

## 📱 Pages Overview

### 🏠 **Home Page** (`/`)
- Hero section with animated demonstrations
- Feature highlights and statistics
- Recent gallery preview
- Call-to-action sections

### ✨ **Generator** (`/generate`)
- AI model selection and configuration
- Prompt input with suggestions
- Real-time generation progress
- Generated image management
- Style and quality controls

### 🎨 **Editor** (`/edit`)
- Image upload with drag & drop
- Professional filter presets
- AI-powered enhancement tools
- Real-time preview and editing
- Export and save functionality

### 🖼️ **Gallery** (`/gallery`)
- Image collection management
- Search and filtering capabilities
- Grid and list view modes
- Batch operations and selection
- Download and sharing options

## 🎯 Key Features in Detail

### AI Integration
- **Mock AI Services** - Simulated AI responses for development
- **Real-time Processing** - Progress tracking and status updates
- **Error Handling** - Graceful failure and retry mechanisms
- **Model Selection** - Multiple AI models with different specialties

### Image Management
- **Upload Support** - JPEG, PNG, WebP, GIF formats
- **Storage System** - Local storage with gallery persistence
- **Metadata Tracking** - Creation dates, prompts, and settings
- **Export Options** - Multiple format and quality options

### User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - WCAG compliant interface elements
- **Performance** - Optimized loading and rendering
- **Offline Support** - Service worker for offline functionality

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm start           # Start production server
npm run serve       # Build and serve
npm run lint        # Run ESLint
```

### Development Workflow
1. Start the development server with `npm run dev`
2. Make changes to source files
3. View changes in real-time with hot reload
4. Test across different devices and browsers
5. Build and deploy to production

## 🔮 Future Enhancements

### Planned Features
- **Real AI Integration** - Connect to actual AI services (OpenAI, Stability, etc.)
- **Advanced Editing** - More sophisticated image manipulation tools
- **Collaboration** - Share projects and collaborate with others
- **Templates** - Pre-designed templates and presets
- **Animation** - Video and GIF generation capabilities
- **3D Integration** - 3D model generation and editing

### Technical Improvements
- **PWA Support** - Progressive Web App capabilities
- **Cloud Storage** - Integration with cloud storage providers
- **API Optimization** - Enhanced API performance and caching
- **Mobile App** - Native mobile applications
- **Real-time Collaboration** - WebSocket-based collaboration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility
- Test across different browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the fast build tooling
- **Picsum Photos** - For placeholder images during development
- **Design Community** - For inspiration and design patterns
- **Open Source Community** - For the incredible tools and libraries

## 📞 Support & Contact

- **GitHub Issues** - [Report bugs or request features](https://github.com/j31k/Banana/issues)
- **Documentation** - [View full documentation](https://github.com/j31k/Banana/wiki)
- **Community** - Join our Discord server for discussions

---

<div align="center">

**Made with 🍌 and ❤️ by the Banana AI Studio Team**

*Transform your imagination into reality with AI-powered creativity*

</div>
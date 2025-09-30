import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useImageContext } from '../hooks/useImageContext'

const Home = () => {
  const { gallery } = useImageContext()
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: '✨',
      title: 'AI Generation',
      description: 'Create stunning images from text prompts using state-of-the-art AI models',
      link: '/generate',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '🎨',
      title: 'Advanced Editing',
      description: 'Professional-grade tools for filters, effects, and precise modifications',
      link: '/edit',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🖼️',
      title: 'Smart Gallery',
      description: 'Organize and manage your creations with intelligent categorization',
      link: '/gallery',
      gradient: 'from-pink-500 to-orange-600'
    }
  ]

  const stats = [
    { label: 'Images Generated', value: '10M+', icon: '🚀' },
    { label: 'Active Users', value: '500K+', icon: '👥' },
    { label: 'AI Models', value: '15+', icon: '🤖' },
    { label: 'Satisfaction', value: '99%', icon: '⭐' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="neural-bg"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">AI-Powered Creative Studio</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Create <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Magical Images
                </span> with AI
              </h1>
              
              <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Transform your imagination into reality with our cutting-edge AI image generation 
                and editing platform. Professional tools, endless possibilities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/generate" className="btn btn-gradient text-lg px-8 py-4">
                <span>✨</span>
                Generate Images
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link to="/edit" className="btn btn-secondary text-lg px-8 py-4">
                <span>🎨</span>
                Edit Images
              </Link>
            </div>

            {/* Demo Animation */}
            <div className="relative max-w-2xl mx-auto">
              <div className="glass p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm text-text-muted ml-auto">Banana AI Studio</span>
                </div>
                
                <div className="bg-bg-secondary rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                  {animationStep === 0 && (
                    <div className="text-center fade-in">
                      <div className="text-4xl mb-2">💭</div>
                      <p className="text-text-secondary">Enter your prompt...</p>
                    </div>
                  )}
                  
                  {animationStep === 1 && (
                    <div className="text-center fade-in">
                      <div className="loading mb-4 mx-auto"></div>
                      <p className="text-text-secondary">AI is working its magic...</p>
                    </div>
                  )}
                  
                  {animationStep === 2 && (
                    <div className="text-center fade-in">
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-primary font-medium">Amazing image created!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="text-primary">AI Tools</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Everything you need to create, edit, and manage your digital artwork in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group card hover:scale-105 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-bg-secondary/50 to-bg-tertiary/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Gallery Preview */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Your Recent Creations</h2>
                <p className="text-text-secondary">Amazing work! Keep creating.</p>
              </div>
              <Link to="/gallery" className="btn btn-secondary">
                View All
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.slice(0, 4).map((image, index) => (
                <div key={image.id} className="gallery-item group">
                  <img 
                    src={image.url} 
                    alt={image.prompt || 'Generated image'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium truncate">
                        {image.prompt || 'Untitled'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="glass max-w-4xl mx-auto text-center p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using Banana AI Studio 
              to bring their imagination to life.
            </p>
            <Link to="/generate" className="btn btn-gradient text-lg px-8 py-4">
              <span>🚀</span>
              Start Creating Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
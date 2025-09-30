import React, { useState, useRef } from 'react'
import { useImageContext } from '../hooks/useImageContext'
import { image_generation } from '../utils/mockAI'

const Generator = () => {
  const { actions, isLoading, error, generatedImages } = useImageContext()
  const [prompt, setPrompt] = useState('')
  const [settings, setSettings] = useState({
    model: 'flux-pro/ultra',
    aspectRatio: '16:9',
    style: 'realistic',
    quality: 'high'
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      actions.setError('Please enter a description for your image')
      return
    }

    actions.clearError()
    actions.setLoading(true)

    try {
      // Simulate AI image generation
      const result = await image_generation({
        query: prompt,
        model: settings.model,
        aspect_ratio: settings.aspectRatio,
        task_summary: `Generate image: ${prompt}`
      })

      const generatedImage = actions.addGeneratedImage({
        url: result.url,
        prompt: prompt,
        settings: { ...settings },
        model: settings.model,
        timestamp: Date.now()
      })

      // Auto-save to gallery
      actions.addToGallery(generatedImage)

    } catch (err) {
      actions.setError('Failed to generate image. Please try again.')
      console.error('Generation error:', err)
    } finally {
      actions.setLoading(false)
    }
  }

  const presetPrompts = [
    'A futuristic cityscape at sunset with flying cars',
    'A magical forest with glowing mushrooms and fairy lights',
    'An astronaut riding a horse on Mars',
    'A steampunk laboratory with intricate machinery',
    'A serene Japanese garden with cherry blossoms',
    'A cyberpunk street market with neon lights'
  ]

  const models = [
    { id: 'flux-pro/ultra', name: 'Flux Pro Ultra', description: 'Fastest, high quality' },
    { id: 'imagen4', name: 'Imagen 4', description: 'Latest Google model' },
    { id: 'recraft-v3', name: 'Recraft V3', description: 'Realistic images' },
    { id: 'ideogram/V_3', name: 'Ideogram V3', description: 'Face consistency' }
  ]

  const aspectRatios = [
    { value: '1:1', label: 'Square', icon: '⬜' },
    { value: '16:9', label: 'Landscape', icon: '📺' },
    { value: '9:16', label: 'Portrait', icon: '📱' },
    { value: '4:3', label: 'Standard', icon: '🖼️' }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Image <span className="text-primary">Generator</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with cutting-edge AI technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Generation Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prompt Input */}
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Describe Your Image</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A majestic dragon flying over a medieval castle at sunset..."
                      className="w-full h-32 bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-primary transition-colors"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-text-muted">
                        {prompt.length}/500 characters
                      </span>
                      <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="btn btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <div className="loading"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <span>✨</span>
                            Generate Image
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Preset Prompts */}
                  <div>
                    <h4 className="text-sm font-medium text-text-secondary mb-3">Try these prompts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {presetPrompts.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(preset)}
                          className="text-sm px-3 py-1.5 bg-bg-secondary hover:bg-surface border border-border rounded-full transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="card bg-error/10 border-error/20">
                  <div className="flex items-center gap-3">
                    <span className="text-error text-xl">⚠️</span>
                    <div>
                      <h4 className="font-medium text-error">Generation Error</h4>
                      <p className="text-sm text-error/80">{error}</p>
                    </div>
                    <button
                      onClick={actions.clearError}
                      className="ml-auto text-error hover:text-error/80"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Generated Images */}
              {generatedImages.length > 0 && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Generated Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedImages.map((image) => (
                      <div key={image.id} className="group relative">
                        <div className="aspect-video bg-bg-secondary rounded-lg overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                          <button 
                            onClick={() => actions.setCurrentImage(image)}
                            className="btn btn-secondary"
                          >
                            <span>🎨</span>
                            Edit
                          </button>
                          <button 
                            onClick={() => actions.addToGallery(image)}
                            className="btn btn-primary"
                          >
                            <span>💾</span>
                            Save
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-sm bg-black/50 rounded px-2 py-1 truncate">
                            {image.prompt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              {/* AI Model */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">AI Model</h3>
                <div className="space-y-3">
                  {models.map((model) => (
                    <label
                      key={model.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="model"
                        value={model.id}
                        checked={settings.model === model.id}
                        onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value }))}
                        className="text-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-text-muted">{model.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Aspect Ratio</h3>
                <div className="grid grid-cols-2 gap-3">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.value}
                      onClick={() => setSettings(prev => ({ ...prev, aspectRatio: ratio.value }))}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.aspectRatio === ratio.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-lg mb-1">{ratio.icon}</div>
                      <div className="text-sm font-medium">{ratio.label}</div>
                      <div className="text-xs text-text-muted">{ratio.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Options */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Style</h3>
                <select
                  value={settings.style}
                  onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value }))}
                  className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="realistic">Realistic</option>
                  <option value="artistic">Artistic</option>
                  <option value="anime">Anime</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="abstract">Abstract</option>
                  <option value="photographic">Photographic</option>
                </select>
              </div>

              {/* Quality */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quality</h3>
                <div className="space-y-2">
                  {['standard', 'high', 'ultra'].map((quality) => (
                    <label
                      key={quality}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="quality"
                        value={quality}
                        checked={settings.quality === quality}
                        onChange={(e) => setSettings(prev => ({ ...prev, quality: e.target.value }))}
                        className="text-primary"
                      />
                      <span className="capitalize font-medium">{quality}</span>
                      {quality === 'ultra' && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                          Pro
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Generation Stats */}
              <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h3 className="text-lg font-semibold mb-4">Generation Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Images Generated</span>
                    <span className="font-medium">{generatedImages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Selected Model</span>
                    <span className="font-medium text-primary">
                      {models.find(m => m.id === settings.model)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-warning animate-pulse' : 'bg-success'}`}></div>
                      <span className="text-sm font-medium">
                        {isLoading ? 'Generating...' : 'Ready'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generator
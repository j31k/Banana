import React, { useState, useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useImageContext } from '../hooks/useImageContext'
import { FILTER_PRESETS, image_edit, enhance_image } from '../utils/mockAI'

const Editor = () => {
  const { currentImage, actions, isLoading, activeFilters } = useImageContext()
  const [selectedFilter, setSelectedFilter] = useState('')
  const [editMode, setEditMode] = useState('filters') // 'filters', 'enhance', 'modify'
  const canvasRef = useRef(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = {
          id: `uploaded_${Date.now()}`,
          url: reader.result,
          name: file.name,
          type: 'uploaded',
          createdAt: new Date().toISOString()
        }
        actions.setCurrentImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }, [actions])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    multiple: false
  })

  const applyFilter = (filterName) => {
    const filterConfig = FILTER_PRESETS[filterName]
    if (filterConfig) {
      setSelectedFilter(filterName)
      Object.entries(filterConfig.filters).forEach(([name, value]) => {
        actions.applyFilter(name, value)
      })
    }
  }

  const resetFilters = () => {
    setSelectedFilter('')
    Object.keys(activeFilters).forEach(filterName => {
      actions.removeFilter(filterName)
    })
  }

  const handleEnhancement = async (type) => {
    if (!currentImage) return

    actions.setLoading(true)
    try {
      const result = await enhance_image({
        image_url: currentImage.url,
        enhancement_type: type
      })
      
      const enhancedImage = {
        ...currentImage,
        url: result.url,
        enhanced: true,
        enhancement_type: type
      }
      
      actions.setCurrentImage(enhancedImage)
      actions.addToGallery(enhancedImage)
    } catch (error) {
      actions.setError('Failed to enhance image')
    } finally {
      actions.setLoading(false)
    }
  }

  const handleModification = async (prompt) => {
    if (!currentImage || !prompt) return

    actions.setLoading(true)
    try {
      const result = await image_edit({
        image_url: currentImage.url,
        prompt: prompt,
        edit_type: 'modify'
      })
      
      const modifiedImage = {
        ...currentImage,
        url: result.url,
        modified: true,
        edit_prompt: prompt
      }
      
      actions.setCurrentImage(modifiedImage)
      actions.addToGallery(modifiedImage)
    } catch (error) {
      actions.setError('Failed to modify image')
    } finally {
      actions.setLoading(false)
    }
  }

  const saveToGallery = () => {
    if (currentImage) {
      actions.addToGallery({
        ...currentImage,
        filters: activeFilters,
        editedAt: new Date().toISOString()
      })
    }
  }

  const editModes = [
    { id: 'filters', name: 'Filters', icon: '🎨' },
    { id: 'enhance', name: 'Enhance', icon: '✨' },
    { id: 'modify', name: 'AI Modify', icon: '🤖' }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Image <span className="text-primary">Editor</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Transform your images with professional editing tools and AI enhancements
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Tools Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Edit Mode Selector */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Edit Mode</h3>
                <div className="space-y-2">
                  {editModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setEditMode(mode.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        editMode === mode.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'hover:bg-surface border border-border'
                      }`}
                    >
                      <span className="text-lg">{mode.icon}</span>
                      <span className="font-medium">{mode.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              {editMode === 'filters' && (
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-text-muted hover:text-primary"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(FILTER_PRESETS).map(([key, filter]) => (
                      <button
                        key={key}
                        onClick={() => applyFilter(key)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedFilter === key
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhancement Tools */}
              {editMode === 'enhance' && (
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Enhance</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleEnhancement('upscale')}
                      disabled={!currentImage || isLoading}
                      className="w-full btn btn-secondary disabled:opacity-50"
                    >
                      <span>🔍</span>
                      Upscale 2x
                    </button>
                    <button
                      onClick={() => handleEnhancement('sharpen')}
                      disabled={!currentImage || isLoading}
                      className="w-full btn btn-secondary disabled:opacity-50"
                    >
                      <span>⚡</span>
                      Sharpen
                    </button>
                    <button
                      onClick={() => handleEnhancement('denoise')}
                      disabled={!currentImage || isLoading}
                      className="w-full btn btn-secondary disabled:opacity-50"
                    >
                      <span>🧹</span>
                      Denoise
                    </button>
                  </div>
                </div>
              )}

              {/* AI Modification */}
              {editMode === 'modify' && (
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">AI Modify</h3>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Describe what you want to change..."
                      className="w-full h-24 bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => handleModification('sample modification')}
                      disabled={!currentImage || isLoading}
                      className="w-full btn btn-primary disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="loading"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>🤖</span>
                          Apply Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={saveToGallery}
                    disabled={!currentImage}
                    className="w-full btn btn-primary disabled:opacity-50"
                  >
                    <span>💾</span>
                    Save to Gallery
                  </button>
                  <button
                    onClick={actions.undoLastAction}
                    disabled={!currentImage}
                    className="w-full btn btn-secondary disabled:opacity-50"
                  >
                    <span>↶</span>
                    Undo
                  </button>
                </div>
              </div>
            </div>

            {/* Main Canvas Area */}
            <div className="lg:col-span-3">
              <div className="card h-full min-h-[600px]">
                {!currentImage ? (
                  /* Upload Area */
                  <div
                    {...getRootProps()}
                    className={`dropzone h-full flex flex-col items-center justify-center ${
                      isDragActive ? 'drag-active' : ''
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <div className="text-6xl mb-6">🖼️</div>
                      <h3 className="text-2xl font-semibold mb-4">
                        {isDragActive ? 'Drop your image here!' : 'Upload an Image to Edit'}
                      </h3>
                      <p className="text-text-secondary mb-6 max-w-md">
                        Drag and drop an image file here, or click to select from your computer.
                        Supports JPG, PNG, WebP, and GIF formats.
                      </p>
                      <div className="btn btn-primary">
                        <span>📁</span>
                        Choose File
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Image Display */
                  <div className="relative h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        {currentImage.name || 'Editing Image'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-muted">
                          {Object.keys(activeFilters).length} filters applied
                        </span>
                        <button
                          onClick={() => actions.setCurrentImage(null)}
                          className="p-2 hover:bg-surface rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="canvas-container h-full max-h-[500px] flex items-center justify-center">
                      <img
                        ref={canvasRef}
                        src={currentImage.url}
                        alt="Editing"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        style={{
                          filter: Object.entries(activeFilters).map(([name, value]) => {
                            switch (name) {
                              case 'brightness': return `brightness(${value}%)`
                              case 'contrast': return `contrast(${value}%)`
                              case 'saturation': return `saturate(${value}%)`
                              case 'sepia': return `sepia(${value}%)`
                              case 'hue': return `hue-rotate(${value}deg)`
                              default: return ''
                            }
                          }).filter(Boolean).join(' ')
                        }}
                      />
                    </div>

                    {isLoading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <div className="glass p-6 text-center">
                          <div className="loading mb-3"></div>
                          <p className="text-text-secondary">Processing image...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
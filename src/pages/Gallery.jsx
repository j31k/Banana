import React, { useState, useMemo } from 'react'
import { useImageContext } from '../hooks/useImageContext'

const Gallery = () => {
  const { gallery, actions } = useImageContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [selectedImages, setSelectedImages] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Filter and sort images
  const filteredImages = useMemo(() => {
    let filtered = gallery

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(image =>
        (image.prompt || image.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(image => image.type === filterBy)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || b.savedAt) - new Date(a.createdAt || a.savedAt)
        case 'oldest':
          return new Date(a.createdAt || a.savedAt) - new Date(b.createdAt || b.savedAt)
        case 'name':
          return (a.name || a.prompt || '').localeCompare(b.name || b.prompt || '')
        default:
          return 0
      }
    })

    return filtered
  }, [gallery, searchTerm, sortBy, filterBy])

  const toggleImageSelection = (imageId) => {
    const newSelection = new Set(selectedImages)
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId)
    } else {
      newSelection.add(imageId)
    }
    setSelectedImages(newSelection)
  }

  const selectAllImages = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set())
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.id)))
    }
  }

  const deleteSelectedImages = () => {
    selectedImages.forEach(imageId => {
      actions.removeFromGallery(imageId)
    })
    setSelectedImages(new Set())
  }

  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = image.name || `image_${image.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const imageTypes = [
    { value: 'all', label: 'All Images', count: gallery.length },
    { value: 'generated', label: 'Generated', count: gallery.filter(img => img.type === 'generated').length },
    { value: 'uploaded', label: 'Uploaded', count: gallery.filter(img => img.type === 'uploaded').length }
  ]

  if (gallery.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-xl text-text-secondary">
                Your created and edited images will appear here
              </p>
            </div>

            <div className="card max-w-md mx-auto p-12">
              <div className="text-6xl mb-6">🖼️</div>
              <h3 className="text-2xl font-semibold mb-4">No Images Yet</h3>
              <p className="text-text-secondary mb-6">
                Start creating amazing images with our AI tools and they'll appear in your gallery.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/generate" className="btn btn-primary">
                  <span>✨</span>
                  Generate Images
                </a>
                <a href="/edit" className="btn btn-secondary">
                  <span>🎨</span>
                  Edit Images
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Your <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-text-secondary">
                {gallery.length} {gallery.length === 1 ? 'image' : 'images'} in your collection
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary min-w-[250px]"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  {imageTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFilterBy(type.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterBy === type.value
                          ? 'bg-primary text-white'
                          : 'bg-bg-secondary hover:bg-surface text-text-secondary'
                      }`}
                    >
                      {type.label} ({type.count})
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">By Name</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                {/* Selection Controls */}
                {selectedImages.size > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-secondary">
                      {selectedImages.size} selected
                    </span>
                    <button
                      onClick={deleteSelectedImages}
                      className="btn text-error hover:bg-error/10 px-3 py-1.5 text-sm"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                )}

                {/* View Mode */}
                <div className="flex items-center gap-1 bg-bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-surface'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-surface'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>

                {/* Select All */}
                <button
                  onClick={selectAllImages}
                  className="btn btn-secondary text-sm px-3 py-1.5"
                >
                  {selectedImages.size === filteredImages.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          {viewMode === 'grid' ? (
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`gallery-item group relative ${
                    selectedImages.has(image.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.prompt || image.name || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />

                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedImages.has(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary"
                    />
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => actions.setCurrentImage(image)}
                      className="btn btn-secondary"
                    >
                      <span>🎨</span>
                      Edit
                    </button>
                    <button
                      onClick={() => downloadImage(image)}
                      className="btn btn-primary"
                    >
                      <span>📥</span>
                      Download
                    </button>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium truncate">
                      {image.prompt || image.name || 'Untitled'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-300">
                        {image.type === 'generated' ? '✨ Generated' : '📁 Uploaded'}
                      </span>
                      <span className="text-xs text-gray-300">
                        {new Date(image.createdAt || image.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`card flex items-center gap-6 ${
                    selectedImages.has(image.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedImages.has(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />

                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-bg-secondary">
                    <img
                      src={image.url}
                      alt={image.prompt || image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      {image.name || image.prompt || 'Untitled'}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {image.type === 'generated' ? '✨ Generated' : '📁 Uploaded'} • 
                      {new Date(image.createdAt || image.savedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => actions.setCurrentImage(image)}
                      className="btn btn-secondary"
                    >
                      <span>🎨</span>
                      Edit
                    </button>
                    <button
                      onClick={() => downloadImage(image)}
                      className="btn btn-primary"
                    >
                      <span>📥</span>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredImages.length === 0 && gallery.length > 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No images found</h3>
              <p className="text-text-secondary">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gallery
// Mock AI functions for demonstration purposes
// In production, these would call real AI APIs

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate placeholder images using picsum with different seeds
const generatePlaceholderImage = (prompt, aspectRatio = '16:9', seed = null) => {
  const [width, height] = aspectRatio.split(':').map(Number)
  const baseWidth = 800
  const actualHeight = Math.round((baseWidth * height) / width)
  
  // Use prompt hash or random seed for consistent results
  const seedValue = seed || Math.abs(prompt.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0))
  
  return `https://picsum.photos/seed/${seedValue}/${baseWidth}/${actualHeight}`
}

// Mock image generation function
export const image_generation = async ({
  query,
  model = 'flux-pro/ultra',
  aspect_ratio = '16:9',
  task_summary
}) => {
  // Simulate processing time based on model
  const processingTimes = {
    'flux-pro/ultra': 2000,
    'imagen4': 3000,
    'recraft-v3': 2500,
    'ideogram/V_3': 3500
  }
  
  await delay(processingTimes[model] || 2500)
  
  // Simulate occasional failures for realism
  if (Math.random() < 0.05) {
    throw new Error('AI model temporarily unavailable')
  }
  
  const imageUrl = generatePlaceholderImage(query, aspect_ratio)
  
  return {
    url: imageUrl,
    model: model,
    aspect_ratio: aspect_ratio,
    prompt: query,
    generated_at: new Date().toISOString(),
    processing_time: processingTimes[model] || 2500
  }
}

// Mock image editing function
export const image_edit = async ({
  image_url,
  prompt,
  edit_type = 'modify'
}) => {
  await delay(1500)
  
  // Generate a slightly different image for editing
  const seed = Date.now()
  const editedUrl = generatePlaceholderImage(prompt + '_edited', '16:9', seed)
  
  return {
    url: editedUrl,
    original_url: image_url,
    edit_prompt: prompt,
    edit_type: edit_type,
    edited_at: new Date().toISOString()
  }
}

// Mock image analysis function
export const analyze_image = async (image_url) => {
  await delay(1000)
  
  // Return mock analysis data
  return {
    objects: ['person', 'building', 'sky', 'tree'],
    colors: ['blue', 'green', 'brown', 'white'],
    style: 'photographic',
    quality_score: Math.floor(Math.random() * 30) + 70,
    suggested_prompts: [
      'A person standing in front of a modern building',
      'Urban landscape with architectural elements',
      'Professional photography of city environment'
    ],
    technical_info: {
      dimensions: '800x450',
      format: 'JPEG',
      size: '156KB'
    }
  }
}

// Mock image enhancement function
export const enhance_image = async ({
  image_url,
  enhancement_type = 'upscale'
}) => {
  await delay(2000)
  
  // Return enhanced image URL (in reality would be processed)
  const seed = Date.now()
  const enhancedUrl = generatePlaceholderImage('enhanced_' + enhancement_type, '16:9', seed)
  
  return {
    url: enhancedUrl,
    original_url: image_url,
    enhancement_type: enhancement_type,
    enhancement_factor: enhancement_type === 'upscale' ? '2x' : '1x',
    enhanced_at: new Date().toISOString()
  }
}

// Mock style transfer function
export const apply_style_transfer = async ({
  image_url,
  style_name
}) => {
  await delay(2500)
  
  const seed = style_name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const styledUrl = generatePlaceholderImage('styled_' + style_name, '16:9', seed)
  
  return {
    url: styledUrl,
    original_url: image_url,
    style_applied: style_name,
    styled_at: new Date().toISOString()
  }
}

// Available filter presets
export const FILTER_PRESETS = {
  vintage: {
    name: 'Vintage',
    filters: {
      sepia: 40,
      contrast: 110,
      brightness: 90,
      saturation: 80
    }
  },
  dramatic: {
    name: 'Dramatic',
    filters: {
      contrast: 130,
      brightness: 85,
      saturation: 120,
      shadows: -20
    }
  },
  cool: {
    name: 'Cool',
    filters: {
      temperature: -200,
      tint: 10,
      saturation: 110
    }
  },
  warm: {
    name: 'Warm',
    filters: {
      temperature: 200,
      tint: -10,
      brightness: 105
    }
  },
  blackwhite: {
    name: 'Black & White',
    filters: {
      saturation: 0,
      contrast: 115
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    filters: {
      hue: 280,
      saturation: 140,
      contrast: 120,
      brightness: 95
    }
  }
}

// Available AI models with descriptions
export const AI_MODELS = {
  'flux-pro/ultra': {
    name: 'Flux Pro Ultra',
    description: 'Fastest generation with high quality results',
    speed: 'fast',
    quality: 'high',
    specialties: ['general', 'realistic', 'artistic']
  },
  'imagen4': {
    name: 'Imagen 4',
    description: 'Google\'s latest model with superior quality',
    speed: 'medium',
    quality: 'ultra',
    specialties: ['photorealistic', 'detailed', 'accurate']
  },
  'recraft-v3': {
    name: 'Recraft V3',
    description: 'Specialized in realistic image generation',
    speed: 'medium',
    quality: 'high',
    specialties: ['realistic', 'photography', 'portraits']
  },
  'ideogram/V_3': {
    name: 'Ideogram V3',
    description: 'Best for character consistency and faces',
    speed: 'slow',
    quality: 'ultra',
    specialties: ['faces', 'characters', 'consistency']
  }
}

// Sample prompts for inspiration
export const SAMPLE_PROMPTS = [
  'A majestic dragon soaring through clouds at golden hour',
  'Cyberpunk cityscape with neon lights reflecting on wet streets',
  'Ancient library filled with floating books and magical energy',
  'Astronaut exploring an alien jungle with bioluminescent plants',
  'Steampunk airship floating above Victorian London',
  'Underwater palace with mermaids and coral gardens',
  'Post-apocalyptic wasteland with overgrown ruins',
  'Medieval knight in enchanted armor standing in moonlight',
  'Futuristic laboratory with holographic displays and robots',
  'Mystical forest clearing with fairy circles and glowing mushrooms'
]

// Export utility functions
export const utils = {
  generatePlaceholderImage,
  delay,
  
  // Image processing utilities
  getImageDimensions: (aspectRatio) => {
    const [w, h] = aspectRatio.split(':').map(Number)
    const baseWidth = 1024
    return {
      width: baseWidth,
      height: Math.round((baseWidth * h) / w)
    }
  },
  
  // Generate random seed from text
  textToSeed: (text) => {
    return Math.abs(text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0))
  },
  
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}
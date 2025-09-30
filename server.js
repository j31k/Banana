import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8081

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// API Routes for future implementation
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Banana AI Studio API'
  })
})

// Mock API endpoints for AI services
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model, aspect_ratio } = req.body
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock response
    res.json({
      success: true,
      image_url: `https://picsum.photos/seed/${Date.now()}/800/600`,
      prompt,
      model,
      aspect_ratio,
      processing_time: 2000
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate image'
    })
  }
})

app.post('/api/edit', async (req, res) => {
  try {
    const { image_url, edit_type, parameters } = req.body
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    res.json({
      success: true,
      edited_image_url: `https://picsum.photos/seed/${Date.now()}/800/600`,
      original_url: image_url,
      edit_type,
      parameters
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to edit image'
    })
  }
})

// Catch-all handler: send back React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍌 Banana AI Studio server running on port ${PORT}`)
  console.log(`🌐 Access your app at: http://localhost:${PORT}`)
  console.log(`🎨 AI Studio ready for image generation and editing!`)
})
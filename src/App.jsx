import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Editor from './pages/Editor'
import Gallery from './pages/Gallery'
import { ImageProvider } from './hooks/useImageContext'

function App() {
  return (
    <ImageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generator />} />
            <Route path="/edit" element={<Editor />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ImageProvider>
  )
}

export default App
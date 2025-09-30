import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Facts from './pages/Facts'
import Recipes from './pages/Recipes'
import Nutrition from './pages/Nutrition'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facts" element={<Facts />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/nutrition" element={<Nutrition />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
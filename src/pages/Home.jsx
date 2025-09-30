import React from 'react'
import { Link } from 'react-router-dom'
import { bananaFacts } from '../data/bananaData'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Banana World! 🍌</h1>
        <p>
          Discover everything you need to know about the world's most beloved fruit. 
          From nutrition facts to delicious recipes, we've got it all covered!
        </p>
        <Link to="/facts">
          <button className="cta-button">Explore Fun Facts</button>
        </Link>
      </section>

      {/* Quick Facts Grid */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Quick Banana Facts
        </h2>
        <div className="card-grid">
          {bananaFacts.slice(0, 3).map(fact => (
            <div key={fact.id} className="card">
              <span className="card-icon">{fact.icon}</span>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Cards */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Explore More
        </h2>
        <div className="card-grid">
          <Link to="/nutrition" style={{ textDecoration: 'none' }}>
            <div className="card">
              <span className="card-icon">🥗</span>
              <h3>Nutrition Facts</h3>
              <p>Learn about the amazing health benefits and nutritional value of bananas.</p>
            </div>
          </Link>
          
          <Link to="/recipes" style={{ textDecoration: 'none' }}>
            <div className="card">
              <span className="card-icon">👨‍🍳</span>
              <h3>Delicious Recipes</h3>
              <p>Discover mouth-watering recipes featuring bananas as the star ingredient.</p>
            </div>
          </Link>
          
          <Link to="/facts" style={{ textDecoration: 'none' }}>
            <div className="card">
              <span className="card-icon">🤔</span>
              <h3>Amazing Facts</h3>
              <p>Explore fascinating and surprising facts about bananas that will amaze you.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
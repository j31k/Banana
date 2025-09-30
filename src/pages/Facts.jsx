import React from 'react'
import { bananaFacts, bananaTypes } from '../data/bananaData'

const Facts = () => {
  return (
    <div>
      <section className="hero">
        <h1>🤔 Amazing Banana Facts</h1>
        <p>
          Prepare to be amazed by these incredible facts about bananas! 
          From science to history, bananas are full of surprises.
        </p>
      </section>

      {/* Fun Facts Grid */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Did You Know?
        </h2>
        <div className="card-grid">
          {bananaFacts.map(fact => (
            <div key={fact.id} className="card">
              <span className="card-icon">{fact.icon}</span>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banana Types */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Types of Bananas 🍌
        </h2>
        <div className="card-grid">
          {bananaTypes.map((type, index) => (
            <div key={index} className="card">
              <span className="card-icon">🍌</span>
              <h3>{type.name}</h3>
              <p><strong>{type.description}</strong></p>
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>{type.characteristics}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Fun Facts */}
      <section style={{ marginTop: '4rem' }}>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #FFE135 0%, #FFC107 100%)', color: '#333' }}>
          <h3 style={{ color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>Bonus Facts! 🎉</h3>
          <div style={{ display: 'grid', gap: '1rem', fontSize: '1.1rem' }}>
            <p>🏃‍♂️ The phrase "going bananas" comes from the way monkeys get excited around bananas</p>
            <p>📱 You can use a banana peel to clean your phone screen (seriously!)</p>
            <p>🎨 Banana peels can be used to shine leather shoes</p>
            <p>🌡️ Bananas are naturally radioactive due to their potassium content</p>
            <p>🍌 A cluster of bananas is called a "hand" and a single banana is a "finger"</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Facts
import React from 'react'
import { nutritionFacts } from '../data/bananaData'

const Nutrition = () => {
  return (
    <div>
      <section className="hero">
        <h1>🥗 Banana Nutrition Facts</h1>
        <p>
          Discover why bananas are considered a superfood! 
          Packed with essential nutrients and health benefits.
        </p>
      </section>

      {/* Nutrition Facts Card */}
      <section>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="card-icon">📊</span>
          <h3>Nutrition Facts</h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{nutritionFacts.servingSize}</p>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#FF6B35'
          }}>
            {nutritionFacts.calories} Calories
          </div>
        </div>

        {/* Nutrients Grid */}
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Key Nutrients
        </h2>
        <div className="card-grid">
          {nutritionFacts.nutrients.map((nutrient, index) => (
            <div key={index} className="card">
              <h3 style={{ color: '#FF6B35', fontSize: '1.3rem' }}>{nutrient.name}</h3>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '1rem 0' }}>
                {nutrient.value}
              </div>
              <p style={{ 
                background: '#e8f5e8', 
                padding: '0.5rem', 
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>
                {nutrient.dailyValue} Daily Value
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Health Benefits */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Health Benefits 💪
        </h2>
        <div className="card-grid">
          <div className="card">
            <span className="card-icon">❤️</span>
            <h3>Heart Health</h3>
            <p>High potassium content helps maintain healthy blood pressure and supports cardiovascular health.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">🧠</span>
            <h3>Brain Function</h3>
            <p>Vitamin B6 supports brain development and helps produce serotonin and norepinephrine.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">💪</span>
            <h3>Energy Boost</h3>
            <p>Natural sugars provide quick energy, while fiber helps maintain steady blood sugar levels.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">🦴</span>
            <h3>Bone Health</h3>
            <p>Magnesium and manganese contribute to bone health and development.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">🛡️</span>
            <h3>Immune Support</h3>
            <p>Vitamin C helps boost the immune system and aids in iron absorption.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">😊</span>
            <h3>Mood Enhancement</h3>
            <p>Tryptophan helps produce serotonin, which can improve mood and reduce stress.</p>
          </div>
        </div>
      </section>

      {/* When to Eat Bananas */}
      <section style={{ marginTop: '4rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#FF6B35', fontSize: '2rem', marginBottom: '2rem' }}>
            Best Times to Eat Bananas 🕐
          </h3>
          <div style={{ display: 'grid', gap: '1.5rem', fontSize: '1.1rem' }}>
            <div>
              <strong>🌅 Morning:</strong> Start your day with sustained energy and essential nutrients
            </div>
            <div>
              <strong>🏃‍♂️ Pre-Workout:</strong> Quick energy boost 30-60 minutes before exercise
            </div>
            <div>
              <strong>💪 Post-Workout:</strong> Replenish glycogen and aid muscle recovery
            </div>
            <div>
              <strong>🍽️ Snack Time:</strong> Perfect healthy snack between meals
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Nutrition
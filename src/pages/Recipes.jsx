import React, { useState } from 'react'
import { recipes } from '../data/bananaData'

const RecipeCard = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="card">
      <span className="card-icon" style={{ fontSize: '4rem' }}>{recipe.image}</span>
      <h3>{recipe.title}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '1rem 0' }}>
        <div style={{ textAlign: 'center' }}>
          <strong>⏱️ Prep:</strong><br />{recipe.prepTime}
        </div>
        <div style={{ textAlign: 'center' }}>
          <strong>🍳 Cook:</strong><br />{recipe.cookTime}
        </div>
        <div style={{ textAlign: 'center' }}>
          <strong>📊 Level:</strong><br />{recipe.difficulty}
        </div>
        <div style={{ textAlign: 'center' }}>
          <strong>👥 Serves:</strong><br />{recipe.servings}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button 
          onClick={() => setShowIngredients(!showIngredients)}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: showIngredients ? '#FF6B35' : '#f0f0f0',
            color: showIngredients ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          📋 Ingredients
        </button>
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: showInstructions ? '#FF6B35' : '#f0f0f0',
            color: showInstructions ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          🥄 Steps
        </button>
      </div>

      {showIngredients && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#FF6B35' }}>Ingredients:</h4>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} style={{ marginBottom: '0.3rem' }}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {showInstructions && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#f0f8ff', 
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#FF6B35' }}>Instructions:</h4>
          <ol style={{ paddingLeft: '1.5rem' }}>
            {recipe.instructions.map((step, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

const Recipes = () => {
  return (
    <div>
      <section className="hero">
        <h1>👨‍🍳 Delicious Banana Recipes</h1>
        <p>
          Transform your bananas into amazing dishes! From breakfast to dessert, 
          these recipes will make you fall in love with bananas all over again.
        </p>
      </section>

      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Featured Recipes
        </h2>
        <div className="card-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Cooking Tips */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FF6B35', fontSize: '2.5rem' }}>
          Banana Cooking Tips 💡
        </h2>
        <div className="card-grid">
          <div className="card">
            <span className="card-icon">🍌</span>
            <h3>Ripeness Matters</h3>
            <p>Use overripe bananas (with brown spots) for baking - they're sweeter and mash easier!</p>
          </div>
          
          <div className="card">
            <span className="card-icon">❄️</span>
            <h3>Freeze for Later</h3>
            <p>Peel and freeze overripe bananas in chunks. Perfect for smoothies and baking!</p>
          </div>
          
          <div className="card">
            <span className="card-icon">🥄</span>
            <h3>Natural Sweetener</h3>
            <p>Mashed bananas can replace sugar in many recipes - use 1/2 cup mashed banana for 1 cup sugar.</p>
          </div>
          
          <div className="card">
            <span className="card-icon">🧈</span>
            <h3>Egg Substitute</h3>
            <p>1/4 cup mashed banana can replace 1 egg in vegan baking recipes!</p>
          </div>
        </div>
      </section>

      {/* Recipe Categories */}
      <section style={{ marginTop: '4rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#FF6B35', fontSize: '2rem', marginBottom: '2rem' }}>
            More Recipe Ideas 🎯
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <h4>🌅 Breakfast</h4>
              <p>Banana pancakes, oatmeal, smoothies, French toast</p>
            </div>
            <div>
              <h4>🍰 Desserts</h4>
              <p>Banana cake, ice cream, pudding, muffins</p>
            </div>
            <div>
              <h4>🥤 Drinks</h4>
              <p>Smoothies, milkshakes, banana water, cocktails</p>
            </div>
            <div>
              <h4>🍯 Snacks</h4>
              <p>Banana chips, energy balls, dried bananas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Recipes
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="bounce">🍌</span>
            Banana App
          </Link>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/facts">Fun Facts</Link></li>
              <li><Link to="/nutrition">Nutrition</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
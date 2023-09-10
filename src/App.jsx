import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/home'
import TraditionalHeroesPage from './pages/traditional-heroes'
import RQHeroesPage from './pages/rq-heroes'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/super-heroes" element={<TraditionalHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQHeroesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

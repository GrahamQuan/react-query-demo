import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import HomePage from './pages/home'
import TraditionalHeroesPage from './pages/traditional-heroes'
import RQHeroesPage from './pages/rq-heroes'
import RqHeroesDetailPage from './pages/rq-heroes-detail'
import ParallelPage from './pages/parallel'
import DependentQueries from './pages/dependent-queries'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <li>
                <Link to="/parallel">Parallel</Link>
              </li>
              <li>
                <Link to="/dependent-queries">DependentQueries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<TraditionalHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQHeroesPage />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RqHeroesDetailPage />}
            />
            <Route
              path="/parallel"
              element={<ParallelPage heroIds={[1, 3]} />}
            />
            <Route
              path="/dependent-queries"
              element={<DependentQueries email="johndoe@example.com" />}
            />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App

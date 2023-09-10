import { useParams, useNavigate } from 'react-router-dom'

import { useHeroById } from '../hooks/useHeroesData'

const RqHeroesDetailPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { isLoading, data } = useHeroById(params.heroId)

  if (isLoading) return <h2>loading...</h2>

  return (
    <div>
      <h3>RqHeroesDetailPage</h3>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <br />
      <div>
        {data.data.alterEgo}
        {' - '}
        {data.data.name}
      </div>
    </div>
  )
}

export default RqHeroesDetailPage

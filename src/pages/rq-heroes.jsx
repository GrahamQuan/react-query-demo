import { useHeroesData } from '../hooks/useHeroesData'
import { Link } from 'react-router-dom'

const RqHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('onSuccess', data)
  }

  const onError = (err) => {
    console.log('onError', err)
  }

  // (3) custome hook
  const { isLoading, data, isError, error, refetch } = useHeroesData({
    onSuccess,
    onError,
  })

  if (isLoading) return <h2>loading...</h2>
  if (isError) return <h2>{error?.message}</h2>

  return (
    <div>
      <h3>RqHeroesPage</h3>
      <button onClick={refetch}>refetch</button>
      <br />
      {data?.data.map((item) => (
        <div key={item.id}>
          <Link to={`/rq-super-heroes/${item.id}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default RqHeroesPage

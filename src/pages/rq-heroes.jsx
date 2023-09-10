import { useQuery } from 'react-query'
import axios from 'axios'

import { heroesApi } from '../network'

const getData = () => axios.get(heroesApi)

const RqHeroesPage = () => {
  // (1) useQuery(key, fn)
  // const { isLoading, data } = useQuery('super-heroes', getData)
  // (2) useQuery({})
  const { isLoading, data, isError, error } = useQuery({
    queryKey: 'super-heroes',
    queryFn: getData,
  })

  if (isLoading) return <h2>loading...</h2>
  if (isError) return <h2>{error?.message}</h2>

  return (
    <div>
      <h3>RqHeroesPage</h3>
      {data?.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default RqHeroesPage

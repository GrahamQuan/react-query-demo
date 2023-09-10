import { useQuery } from 'react-query'
import axios from 'axios'

import { heroesApi } from '../network'

const getData = () => axios.get(heroesApi)

const RqHeroesPage = () => {
  const onSuccess = (data) => {
    console.log('onSuccess', data)
  }

  const onError = (err) => {
    console.log('onError', err)
  }

  // (1) useQuery(key, fn)
  // const { isLoading, data } = useQuery('super-heroes', getData)
  // (2) useQuery({})
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: 'super-heroes',
    queryFn: getData,
    // cacheTime: 5000,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    // retryOnMount: true,
    // refetchOnWindowFocus: true,
    // enabled: true,
    onSuccess,
    onError,
    select: (data) => {
      const formattedData = data.data.map((item) => ({
        ...item,
        name: item.name.toUpperCase(),
      }))
      return { data: formattedData }
    },
  })

  console.log({ isLoading, isFetching })
  if (isLoading) return <h2>loading...</h2>
  if (isError) return <h2>{error?.message}</h2>

  return (
    <div>
      <h3>RqHeroesPage</h3>
      <button onClick={refetch}>refetch</button>
      <br />
      {data?.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default RqHeroesPage

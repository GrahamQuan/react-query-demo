import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useHeroesData, useAddData } from '../hooks/useHeroesData'

const RqHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

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

  const { mutate, mutateAsync } = useAddData()
  const onDone = async () => {
    // mutate({ name, alterEgo })
    await mutateAsync({ name, alterEgo })
    setName('')
    setAlterEgo('')
  }

  if (isLoading) return <h2>loading...</h2>
  if (isError) return <h2>{error?.message}</h2>

  return (
    <div>
      <h3>RqHeroesPage</h3>
      <div>
        <button onClick={refetch}>refetch</button>
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={onDone}>Done</button>
      </div>
      {data?.data.map((item) => (
        <div key={item.id}>
          <Link to={`/rq-super-heroes/${item.id}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default RqHeroesPage

import { useState, useEffect } from 'react'
import axios from 'axios'
import { heroesApi } from '../network'

const TraditionalHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const res = await axios.get(heroesApi)
      setData(res.data)
      setIsLoading(false)
    })()
    return () => {}
  }, [])

  if (isLoading) return <h2>loading...</h2>

  return (
    <div>
      <h3>TraditionalHeroesPage</h3>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

export default TraditionalHeroesPage

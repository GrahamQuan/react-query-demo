import { useQueries } from 'react-query'
import axios from 'axios'

import { heroByIdApi } from '../network'

const getDataById = (id) => () => axios.get(heroByIdApi(id))

export default function ParallelPage({ heroIds }) {
  const data = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-heroes', id],
      queryFn: getDataById(id),
    }))
  )

  console.log(data)

  return <div>ParallelPage</div>
}

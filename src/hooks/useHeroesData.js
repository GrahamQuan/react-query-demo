import axios from 'axios'
import { useQuery } from 'react-query'

import { heroesApi, heroByIdApi } from '../network'

const getData = () => axios.get(heroesApi)

export function useHeroesData({ onSuccess, onError }) {
  return useQuery({
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
}

const getDataById = (id) => () => axios.get(heroByIdApi(id))

export function useHeroById(id) {
  return useQuery({
    queryKey: ['super-heroes', id],
    queryFn: getDataById(id),
  })
}

import axios from 'axios'
import { useQuery, useQueryClient, useMutation } from 'react-query'

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
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['super-heroes', id],
    queryFn: getDataById(id),
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(id))
      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
  })
}

const addData = (data) => axios.post(heroesApi, data)

export function useAddData() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes')
    },
  })
  return mutation
}

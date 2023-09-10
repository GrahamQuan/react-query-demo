import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export default function InfiniteQueryPage() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['infinite-colors'],
    queryFn: fetchColors,
    getNextPageParam: (_, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  return (
    <div>
      <h3>InfiniteQueryPage</h3>
      {data?.pages.map((group, idx) => (
        <Fragment key={idx}>
          {group.data.map((color) => (
            <div key={color.id}>
              {color.id} - {color.label}
            </div>
          ))}
        </Fragment>
      ))}
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          load more
        </button>
      </div>
    </div>
  )
}
